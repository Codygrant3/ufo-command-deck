/**
 * Case Context - shared helpers for presenting case dates, sources, and verified briefing videos.
 */
const CaseContext = (() => {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const SOURCE_PROGRAMS = {
        sign: { name: 'Project Sign (USAF)', url: 'https://www.archives.gov/research/military/air-force/ufos' },
        grudge: { name: 'Project Grudge (USAF)', url: 'https://www.archives.gov/research/military/air-force/ufos' },
        bluebook: { name: 'Project Blue Book (USAF)', url: 'https://www.archives.gov/research/military/air-force/ufos' },
        aatip: { name: 'AATIP / AAWSAP (DoD)', url: 'https://www.aaro.mil' },
        aaro: { name: 'AARO (DoD)', url: 'https://www.aaro.mil' },
        pentagon: { name: 'U.S. Department of Defense', url: 'https://www.aaro.mil' },
        odni: { name: 'Office of the Director of National Intelligence', url: 'https://www.dni.gov/index.php/newsroom/reports-publications' },
        'pursue-release-02': { name: 'DoD PURSUE UAP release', url: 'https://www.aaro.mil' },
        navy: { name: 'U.S. Navy records', url: 'https://www.aaro.mil' },
        congress: { name: 'U.S. Congressional hearing record', url: 'https://oversight.house.gov' },
        faa: { name: 'FAA records', url: 'https://www.faa.gov' },
        dhs: { name: 'U.S. Department of Homeland Security', url: 'https://www.dhs.gov' },
        uk_mod: { name: 'UK Ministry of Defence files', url: 'https://www.nationalarchives.gov.uk/ufos/' },
        'uk-mod': { name: 'UK Ministry of Defence files', url: 'https://www.nationalarchives.gov.uk/ufos/' },
        mod: { name: 'UK Ministry of Defence files', url: 'https://www.nationalarchives.gov.uk/ufos/' },
        geipan: { name: 'GEIPAN (CNES, France)', url: 'https://www.cnes-geipan.fr/' },
        brazil: { name: 'Brazil National Archives', url: 'https://www.gov.br/arquivonacional/' },
        cefaa: { name: 'CEFAA (Chile)', url: '' },
        canada: { name: 'Canada Department of National Defence', url: '' },
        rcmp: { name: 'Royal Canadian Mounted Police', url: '' },
        mufon: { name: 'MUFON case files', url: 'https://www.mufon.com' },
        nuforc: { name: 'NUFORC report database', url: 'https://nuforc.org' },
        blackvault: { name: 'The Black Vault (FOIA archive)', url: 'https://www.theblackvault.com' },
        bigelow: { name: 'Bigelow / NIDS research files', url: '' },
        wikipedia: { name: 'Wikipedia summary of published accounts', url: '' },
        historical: { name: 'Historical chronicle', url: '' },
        military: { name: 'Military reports', url: '' },
        mexico: { name: 'Mexican government release', url: '' },
        russia: { name: 'Soviet / Russian military files', url: '' },
        china: { name: 'Chinese state media reports', url: '' },
        italy: { name: 'Italian Air Force records', url: '' },
        police: { name: 'Police reports', url: '' },
        aviation: { name: 'Civil aviation reports', url: '' }
    };

    function parseDate(raw) {
        const value = String(raw ?? '').trim();
        const match = value.match(/^(-?)(\d{1,4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?/);
        if (!match) return null;
        return {
            bc: match[1] === '-',
            year: Number(match[2]),
            month: match[3] ? Number(match[3]) : null,
            day: match[4] ? Number(match[4]) : null
        };
    }

    function formatYear(parts) {
        if (parts.bc) return `${parts.year} BC`;
        if (parts.year < 1000) return `AD ${parts.year}`;
        return String(parts.year);
    }

    /**
     * Ancient dates are stored as -YYYY-MM-DD; precision may be 'day' (default), 'month', or 'year'.
     */
    function formatDate(raw, precision = 'day') {
        const parts = parseDate(raw);
        if (!parts) return raw ? String(raw) : 'Date unknown';

        const year = formatYear(parts);
        if (parts.bc || parts.year < 1000 || precision === 'year' || !parts.month) return year;
        const month = MONTHS[parts.month - 1] || '';
        if (precision === 'month' || !parts.day) return `${month} ${year}`.trim();
        return `${parts.day} ${month} ${year}`;
    }

    function formatCaseDate(caseData) {
        return formatDate(caseData?.date || caseData?.year, caseData?.datePrecision);
    }

    function getSourceProgram(code) {
        const key = String(code || '').toLowerCase();
        return SOURCE_PROGRAMS[key] || { name: key ? key.toUpperCase() : 'Local archive', url: '' };
    }

    function getYouTubeId(url) {
        const match = String(url || '').match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : '';
    }

    function getVerifiedVideos(caseData) {
        const resources = Array.isArray(caseData?.resources) ? caseData.resources : [];
        return resources.filter((resource) => resource?.verified && getYouTubeId(resource.url));
    }

    function hasVerifiedVideo(caseData) {
        return getVerifiedVideos(caseData).length > 0;
    }

    function getSourceLinks(caseData, limit = 6) {
        const resources = Array.isArray(caseData?.resources) ? caseData.resources : [];
        const documents = Array.isArray(caseData?.documents) ? caseData.documents : [];
        const seen = new Set();
        return [...documents, ...resources]
            .filter((resource) => resource?.url && !getYouTubeId(resource.url) && !/youtube\.com\/results/i.test(resource.url))
            .filter((resource) => {
                const key = String(resource.url).toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            })
            .slice(0, limit);
    }

    return {
        formatDate,
        formatCaseDate,
        getSourceProgram,
        getYouTubeId,
        getVerifiedVideos,
        hasVerifiedVideo,
        getSourceLinks
    };
})();

if (typeof window !== 'undefined') {
    window.CaseContext = CaseContext;
}
