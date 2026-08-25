/**
 * Data Loader - Consolidates multiple data sources into a unified queryable structure
 */
class DataLoader {
    constructor() {
        this.allCases = [];
        this.casesById = new Map();
        this.isLoaded = false;
    }

    /**
     * loads and merges all available data sources
     */
    async loadAllData() {
        if (this.isLoaded) return this.allCases;

        console.log("DataLoader: Initializing...");

        // 1. Main Curated Cases (from data.js)
        if (typeof UFO_DATA !== 'undefined' && UFO_DATA.cases) {
            this.processBatch(UFO_DATA.cases, 'curated');
        }

        // 2. NUFORC Data (from nuforc_cases.js)
        if (typeof NUFORC_CASES !== 'undefined') {
            this.processBatch(NUFORC_CASES, 'nuforc');
        }

        // 3. Wikipedia Data (from wikipedia_cases.js)
        if (typeof WIKIPEDIA_CASES !== 'undefined') {
            this.processBatch(WIKIPEDIA_CASES, 'wikipedia');
        }

        // 4. Supplemental curated cases (from supplemental_cases.json)
        await this.loadSupplementalCases();

        // 5. Curated external resources mapped by case id
        this.applyYouTubeResources();
        this.applyNewspaperResources();

        this.isLoaded = true;
        console.log(`DataLoader: Loaded ${this.allCases.length} total cases.`);

        // Broadcast event that data is ready
        const event = new CustomEvent('ufo-data-ready', {
            detail: { count: this.allCases.length }
        });
        window.dispatchEvent(event);

        return this.allCases;
    }

    async loadSupplementalCases() {
        if (typeof fetch !== 'function') return;

        try {
            const response = await fetch('./data/supplemental_cases.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const supplementalCases = await response.json();
            if (Array.isArray(supplementalCases)) {
                this.processBatch(supplementalCases, 'supplemental');
            }
        } catch (error) {
            console.warn('DataLoader: Supplemental cases not available:', error);
        }
    }

    processBatch(cases, sourceName) {
        cases.forEach(c => {
            // Standardize structure if needed
            const unifiedCase = {
                ...c,
                // Ensure coordinates exist
                coordinates: c.coordinates || { lat: 0, lng: 0 },
                // Add internal metadata
                _source: sourceName,
                _searchString: `${c.name} ${c.location} ${c.summary} ${c.shape} ${c.date}`.toLowerCase()
            };

            // Avoid duplicates
            if (!this.casesById.has(unifiedCase.id)) {
                this.casesById.set(unifiedCase.id, unifiedCase);
                this.allCases.push(unifiedCase);
            }
        });
    }

    applyYouTubeResources() {
        const resourceMap = this.getYouTubeResourceMap();
        this.applyMappedResources(resourceMap, {
            type: 'youtube',
            title: 'Case briefing video',
            source: 'curated-youtube'
        });
    }

    applyNewspaperResources() {
        const resourceMap = this.getNewspaperResourceMap();
        this.applyMappedResources(resourceMap, {
            type: 'newspaper',
            title: 'Press clipping',
            source: 'curated-newspaper'
        });
    }

    applyMappedResources(resourceMap, defaults = {}) {
        if (!resourceMap || !Object.keys(resourceMap).length) return;

        this.allCases.forEach((caseData) => {
            const mappedResources = this.normalizeResourceList(resourceMap[caseData.id], defaults);
            if (!mappedResources.length) return;

            const existingResources = this.normalizeResourceList(caseData.resources);
            caseData.resources = this.dedupeResources([...mappedResources, ...existingResources]);
        });
    }

    getYouTubeResourceMap() {
        if (typeof YOUTUBE_CASE_RESOURCES !== 'undefined') {
            return YOUTUBE_CASE_RESOURCES;
        }

        if (typeof window !== 'undefined' && window.YOUTUBE_CASE_RESOURCES) {
            return window.YOUTUBE_CASE_RESOURCES;
        }

        return {};
    }

    getNewspaperResourceMap() {
        if (typeof NEWSPAPER_CASE_RESOURCES !== 'undefined') {
            return NEWSPAPER_CASE_RESOURCES;
        }

        if (typeof window !== 'undefined' && window.NEWSPAPER_CASE_RESOURCES) {
            return window.NEWSPAPER_CASE_RESOURCES;
        }

        return {};
    }

    normalizeResourceList(resources, defaults = {}) {
        if (!resources) return [];
        return (Array.isArray(resources) ? resources : [resources])
            .filter((resource) => resource && resource.url)
            .map((resource) => ({
                ...resource,
                type: resource.type || defaults.type || 'source',
                title: resource.title || defaults.title || 'Source file',
                url: resource.url,
                source: resource.source || defaults.source || 'curated-source'
            }));
    }

    dedupeResources(resources) {
        const seenUrls = new Set();
        return resources.filter((resource) => {
            const key = String(resource.url || '').trim().toLowerCase();
            if (!key || seenUrls.has(key)) return false;
            seenUrls.add(key);
            return true;
        });
    }

    getCase(id) {
        return this.casesById.get(id);
    }

    getAllCases() {
        return this.allCases;
    }

    /**
     * Get a subset of cases for visualization (e.g. only Tier 1 & 2 for Global view if huge)
     */
    getGlobalViewBatch() {
        // Return all for now, but good hook for optimization later
        return this.allCases;
    }
}
