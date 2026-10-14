import { loadScriptGlobals, loadCases, youTubeIdFromUrl, fetchOEmbed, mapWithConcurrency } from './case-data.mjs';

const MATCH_KINDS = new Set(['case', 'context']);
const offline = process.argv.includes('--offline');

const globals = loadScriptGlobals();
const cases = loadCases(globals);
const caseIds = new Set(cases.map((caseData) => caseData.id));
const youtubeMap = globals.YOUTUBE_CASE_RESOURCES;
const problems = [];

Object.entries(youtubeMap).forEach(([caseId, resources]) => {
    if (!caseIds.has(caseId)) problems.push(`${caseId}: mapped videos for an unknown case`);
    resources.forEach((resource, index) => {
        const label = `${caseId}[${index}]`;
        if (!youTubeIdFromUrl(resource.url)) problems.push(`${label}: not a YouTube video URL (${resource.url})`);
        if (!MATCH_KINDS.has(resource.match)) problems.push(`${label}: match must be "case" or "context"`);
        if (!resource.verified) problems.push(`${label}: missing verified date`);
        if (!resource.title || !resource.channel) problems.push(`${label}: missing title or channel`);
    });
});

const videoIds = [...new Set(Object.values(youtubeMap).flat().map((resource) => youTubeIdFromUrl(resource.url)).filter(Boolean))];

if (!offline) {
    const results = await mapWithConcurrency(videoIds, 6, async (videoId) => [videoId, await fetchOEmbed(videoId)]);
    results.forEach(([videoId, result]) => {
        if (result.status !== 'ok') problems.push(`${videoId}: ${result.status}`);
    });
}

const withoutVideo = cases.filter((caseData) => !youtubeMap[caseData.id]?.length).map((caseData) => caseData.id);
console.log(`${cases.length} cases, ${cases.length - withoutVideo.length} with verified video, ${videoIds.length} unique videos${offline ? ' (offline: oEmbed skipped)' : ''}`);
if (withoutVideo.length) console.log(`No verified video (search fallback): ${withoutVideo.join(', ')}`);

if (problems.length) {
    console.error(`\n${problems.length} problem(s):\n${problems.map((problem) => `  - ${problem}`).join('\n')}`);
    process.exit(1);
}
console.log('All mapped videos verified.');
