const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CACHE_PATH = path.join(ROOT, '.cache', 'youtube-search-results.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'youtube_resources.js');
const SEARCH_DELAY_MS = 225;

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'at', 'case', 'close', 'encounter', 'event', 'from', 'in',
  'incident', 'light', 'lights', 'near', 'object', 'objects', 'of', 'on', 'over',
  'phenomena', 'phenomenon', 'report', 'reported', 'sighting', 'sightings', 'the',
  'to', 'uap', 'ufo', 'ufos', 'unknown', 'with'
]);

function loadScriptData() {
  const context = {};
  vm.createContext(context);

  [
    ['js/data.js', 'UFO_DATA'],
    ['data/nuforc_cases.js', 'NUFORC_CASES'],
    ['data/wikipedia_cases.js', 'WIKIPEDIA_CASES']
  ].forEach(([file, symbol]) => {
    const fullPath = path.join(ROOT, file);
    const code = fs.readFileSync(fullPath, 'utf8');
    vm.runInContext(`${code}\nthis.${symbol} = ${symbol};`, context, { filename: file });
  });

  return [
    context.UFO_DATA.cases,
    context.NUFORC_CASES,
    context.WIKIPEDIA_CASES,
    JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'supplemental_cases.json'), 'utf8'))
  ];
}

function loadCases() {
  const seen = new Set();
  const cases = [];

  loadScriptData().forEach((batch) => {
    batch.forEach((caseData) => {
      if (!caseData?.id || seen.has(caseData.id)) return;
      seen.add(caseData.id);
      cases.push(caseData);
    });
  });

  return cases;
}

function hasDirectYouTube(caseData) {
  const resources = Array.isArray(caseData.resources) ? caseData.resources : [];
  return resources.some((resource) => {
    const url = String(resource?.url || '');
    return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/live\/)[a-zA-Z0-9_-]{11}/.test(url);
  });
}

function distinctiveTokens(caseData) {
  const text = `${caseData.name || ''} ${caseData.location || ''}`;
  return Array.from(new Set(
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, ' ')
      .split(/[\s-]+/)
      .filter((token) => token.length > 2 && !STOP_WORDS.has(token) && !/^\d+$/.test(token))
  ));
}

function searchQuery(caseData) {
  const date = String(caseData.date || caseData.year || '').slice(0, 4);
  const parts = [caseData.name, caseData.location, date, 'UFO documentary'].filter(Boolean);
  return parts.join(' ');
}

function caseYear(caseData) {
  const raw = String(caseData.date || caseData.year || '').match(/-?\d{3,4}/)?.[0];
  return raw ? Number(raw) : 0;
}

function parseSearchResults(html) {
  const blocks = html.split('"videoRenderer":{').slice(1);
  const seen = new Set();
  const results = [];

  blocks.forEach((block) => {
    const id = block.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)?.[1];
    if (!id || seen.has(id)) return;

    const titleRaw =
      block.match(/"title":\{"runs":\[\{"text":"([^"]+)"/)?.[1] ||
      block.match(/"title":\{"simpleText":"([^"]+)"/)?.[1] ||
      '';

    const title = decodeYouTubeText(titleRaw);
    if (!title) return;

    seen.add(id);
    results.push({ id, title });
  });

  return results.slice(0, 8);
}

function decodeYouTubeText(value) {
  if (!value) return '';
  try {
    return JSON.parse(`"${value.replace(/"/g, '\\"')}"`);
  } catch {
    return value
      .replace(/\\u0026/g, '&')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();
  }
}

function relevanceScore(caseData, result) {
  const haystack = `${result.title}`.toLowerCase();
  const tokens = distinctiveTokens(caseData);
  const matches = tokens.filter((token) => haystack.includes(token));
  const titleHasUfo = /\b(ufo|uap|alien|abduction|flying saucer)\b/i.test(result.title);
  const nameTokens = distinctiveTokens({ name: caseData.name, location: '' });
  const nameMatches = nameTokens.filter((token) => haystack.includes(token));

  return {
    matches,
    nameMatches,
    score: matches.length + nameMatches.length + (titleHasUfo ? 1 : 0),
    titleHasUfo
  };
}

function chooseResult(caseData, results) {
  if (caseYear(caseData) && caseYear(caseData) < 1900) return null;

  const candidates = results
    .map((result) => ({ result, relevance: relevanceScore(caseData, result) }))
    .filter(({ relevance }) => (
      relevance.titleHasUfo &&
      relevance.nameMatches.length >= 1 &&
      relevance.score >= 3
    ))
    .sort((a, b) => b.relevance.score - a.relevance.score);

  return candidates[0] || null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return {};
  return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`);
}

async function searchYouTube(query, cache) {
  if (cache[query]) return cache[query];

  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, {
      headers: {
        'accept-language': 'en-US,en;q=0.9',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36'
      }
    });
    const html = await response.text();
    const results = parseSearchResults(html);
    cache[query] = results;
    saveCache(cache);
    await sleep(SEARCH_DELAY_MS);
    return results;
  } catch (error) {
    console.warn(`[skip] YouTube search failed for "${query}": ${error.message}`);
    cache[query] = [];
    saveCache(cache);
    await sleep(SEARCH_DELAY_MS);
    return [];
  }
}

function writeOutput(resources, stats) {
  const body = `// Auto-generated by tools/build-youtube-resources.js.\n` +
    `// Reviewed selection heuristic: first relevant YouTube search result by case name/location.\n` +
    `const YOUTUBE_CASE_RESOURCES = ${JSON.stringify(resources, null, 4)};\n\n` +
    `if (typeof window !== 'undefined') {\n` +
    `    window.YOUTUBE_CASE_RESOURCES = YOUTUBE_CASE_RESOURCES;\n` +
    `}\n`;

  fs.writeFileSync(OUTPUT_PATH, body);
  console.log(`Wrote ${Object.keys(resources).length} case video mappings to ${path.relative(ROOT, OUTPUT_PATH)}.`);
  console.log(JSON.stringify(stats, null, 2));
}

async function main() {
  const cases = loadCases();
  const cache = loadCache();
  const resources = {};
  const stats = { totalCases: cases.length, skippedDirect: 0, matched: 0, unmatched: 0 };

  for (const caseData of cases) {
    if (hasDirectYouTube(caseData)) {
      stats.skippedDirect += 1;
      continue;
    }

    const query = searchQuery(caseData);
    const results = await searchYouTube(query, cache);
    const picked = chooseResult(caseData, results);

    if (!picked) {
      stats.unmatched += 1;
      continue;
    }

    resources[caseData.id] = [
      {
        type: 'youtube',
        title: picked.result.title,
        url: `https://www.youtube.com/watch?v=${picked.result.id}`,
        source: 'youtube-search'
      }
    ];
    stats.matched += 1;
    console.log(`[match] ${caseData.id}: ${picked.result.title}`);
  }

  writeOutput(resources, stats);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
