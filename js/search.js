/**
 * Case Search Engine
 * Handles client-side indexing, filtering, and full-text search for UFO cases.
 */
class CaseSearch {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
        this.activeFilters = {
            search: '',
            era: 'all', // all, 1940s, 1950s, modern
            shape: 'all',
            source: 'all', // bluebook, nuforc, etc.
            minCredibility: 0,
            minYear: -10000 // Default to show all cases including ancient
        };
    }

    setFilter(key, value) {
        this.activeFilters[key] = value;
    }

    /**
     * Main search function
     * @returns {Array} Filtered and sorted cases
     */
    search() {
        const allCases = this.dataLoader.getAllCases();
        const query = this.activeFilters.search.toLowerCase().trim();

        return allCases.filter(c => {
            // 1. Full Text Search
            if (query.length > 0) {
                // Check cached search string first
                if (c._searchString && !c._searchString.includes(query)) {
                    return false;
                } else if (!c._searchString) {
                    // Fallback
                    const searchStr = `${c.name} ${c.location} ${c.summary}`.toLowerCase();
                    if (!searchStr.includes(query)) return false;
                }
            }

            // 2. Source Filter
            if (this.activeFilters.source !== 'all') {
                // Mappings for UI filter values to data values
                if (this.activeFilters.source === 'bluebook' && c.source !== 'bluebook') return false;
                if (this.activeFilters.source === 'nuforc' && c.source !== 'nuforc') return false;
                if (this.activeFilters.source === 'wikipedia' && c.source !== 'wikipedia') return false;
                if (this.activeFilters.source === 'aatip' && c.source !== 'aatip') return false;
                if (this.activeFilters.source === 'mufon' && c.source !== 'mufon') return false;
                if (this.activeFilters.source === 'unexplained' && c.status.toLowerCase() !== 'unexplained') return false;
            }

            // 3. Shape Filter
            if (this.activeFilters.shape !== 'all') {
                if (!c.shape || c.shape.toLowerCase() !== this.activeFilters.shape) return false;
            }

            // 4. Credibility Filter
            if (c.credibility < this.activeFilters.minCredibility) return false;

            // 5. Date Filter (Min Year)
            // Parse year from date string (YYYY-MM-DD or YYYY)
            // Handle negative years (BC) if any, though slider is 1940+
            let caseYear = 0;
            if (c.date) {
                // Handle negative dates like "-593-07-01"
                const parts = c.date.split('-');
                if (parts[0] === '') {
                    // Negative year (e.g. -593)
                    caseYear = -parseInt(parts[1]);
                } else {
                    caseYear = parseInt(parts[0]);
                }
            }

            if (caseYear < this.activeFilters.minYear) return false;

            return true;
        });
    }

    getStats(filteredCases) {
        const stats = {
            total: filteredCases.length,
            sources: {},
            shapes: {}
        };

        filteredCases.forEach(c => {
            // Source counts
            const src = c.source || 'unknown';
            stats.sources[src] = (stats.sources[src] || 0) + 1;

            // Shape counts
            const shp = c.shape || 'unknown';
            stats.shapes[shp] = (stats.shapes[shp] || 0) + 1;
        });

        return stats;
    }
}
