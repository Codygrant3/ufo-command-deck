import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SCRIPT_SOURCES = [
    ['js/data.js', 'UFO_DATA'],
    ['data/nuforc_cases.js', 'NUFORC_CASES'],
    ['data/wikipedia_cases.js', 'WIKIPEDIA_CASES'],
    ['data/youtube_resources.js', 'YOUTUBE_CASE_RESOURCES'],
    ['data/newspaper_resources.js', 'NEWSPAPER_CASE_RESOURCES']
];

export function loadScriptGlobals() {
    const context = { window: {} };
    vm.createContext(context);
    SCRIPT_SOURCES.forEach(([file, symbol]) => {
        const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
        vm.runInContext(`${code}\nthis.${symbol} = ${symbol};`, context, { filename: file });
    });
    return context;
}

/** Mirrors DataLoader ordering and de-duplication so tools see the same cases as the app. */
export function loadCases(globals = loadScriptGlobals()) {
    const supplemental = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'supplemental_cases.json'), 'utf8'));
    const batches = [
        ['curated', globals.UFO_DATA.cases],
        ['nuforc', globals.NUFORC_CASES],
        ['wikipedia', globals.WIKIPEDIA_CASES],
        ['supplemental', supplemental]
    ];
    const seen = new Set();
    const cases = [];
    batches.forEach(([batch, list]) => {
        list.forEach((caseData) => {
            if (!caseData?.id || seen.has(caseData.id)) return;
            seen.add(caseData.id);
            cases.push({ ...caseData, _batch: batch });
        });
    });
    return cases;
}

const YOUTUBE_ID_PATTERN = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function youTubeIdFromUrl(url) {
    return String(url || '').match(YOUTUBE_ID_PATTERN)?.[1] || '';
}

export function caseVideoResources(caseData, youtubeMap) {
    const mapped = Array.isArray(youtubeMap[caseData.id]) ? youtubeMap[caseData.id] : [];
    const inline = Array.isArray(caseData.resources) ? caseData.resources : [];
    return [...mapped, ...inline].filter((resource) => youTubeIdFromUrl(resource?.url));
}

export async function fetchOEmbed(videoId) {
    const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`;
    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            const response = await fetch(url, { headers: { 'accept-language': 'en-US,en;q=0.9' } });
            if (response.ok) {
                const data = await response.json();
                return { status: 'ok', title: data.title, channel: data.author_name };
            }
            // 401/403: video exists but embedding is disabled; 400/404: removed, private, or never existed.
            if (response.status === 401 || response.status === 403) return { status: 'embed-disabled' };
            if (response.status === 400 || response.status === 404) return { status: 'unavailable' };
        } catch {
            // retry transient network errors
        }
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
    return { status: 'network-error' };
}

export async function mapWithConcurrency(items, limit, worker) {
    const results = new Array(items.length);
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (next < items.length) {
            const index = next;
            next += 1;
            results[index] = await worker(items[index], index);
        }
    }));
    return results;
}
