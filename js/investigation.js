// ============================================
// INVESTIGATION TRACKER - GAMIFICATION SYSTEM
// ============================================

class InvestigationTracker {
    constructor() {
        this.storage_key = 'ufo_investigation_data';

        // Initialize state
        this.state = {
            casesViewed: new Set(),
            specimensAnalyzed: new Set(),
            archivesAccessed: new Set(),
            timelineInteractions: 0,
            achievements: new Set(),
            totalPoints: 0,
            level: 1,
            rank: 'Recruit',
            firstSession: true
        };

        // Define achievements
        this.achievementDefinitions = [
            // Explorer Achievements
            {
                id: 'first_steps',
                name: 'First Steps',
                description: 'View your first UFO case',
                icon: '👁️',
                category: 'explorer',
                check: (state) => state.casesViewed.size >= 1,
                points: 10
            },
            {
                id: 'investigator',
                name: 'Investigator',
                description: 'View 5 different cases',
                icon: '🔍',
                category: 'explorer',
                check: (state) => state.casesViewed.size >= 5,
                points: 25
            },
            {
                id: 'truth_seeker',
                name: 'Truth Seeker',
                description: 'View 10 different cases',
                icon: '🎯',
                category: 'explorer',
                check: (state) => state.casesViewed.size >= 10,
                points: 50
            },
            {
                id: 'dedicated_researcher',
                name: 'Dedicated Researcher',
                description: 'View 20 different cases',
                icon: '📊',
                category: 'explorer',
                check: (state) => state.casesViewed.size >= 20,
                points: 100
            },
            {
                id: 'master_investigator',
                name: 'Master Investigator',
                description: 'View 50 different cases',
                icon: '🏆',
                category: 'explorer',
                check: (state) => state.casesViewed.size >= 50,
                points: 200
            },
            {
                id: 'archive_hunter',
                name: 'Archive Hunter',
                description: 'View 100 different cases',
                icon: '🕵️',
                category: 'explorer',
                check: (state) => state.casesViewed.size >= 100,
                points: 300
            },
            {
                id: 'truth_revealed',
                name: 'The Truth Revealed',
                description: 'View 500 different cases',
                icon: '👽',
                category: 'elite',
                check: (state) => state.casesViewed.size >= 500,
                points: 500
            },

            // Scientist Achievements
            {
                id: 'lab_technician',
                name: 'Lab Technician',
                description: 'Analyze your first specimen',
                icon: '🧪',
                category: 'scientist',
                check: (state) => state.specimensAnalyzed.size >= 1,
                points: 15
            },
            {
                id: 'material_analyst',
                name: 'Material Analyst',
                description: 'Analyze all 4 specimens',
                icon: '🔬',
                category: 'scientist',
                check: (state) => state.specimensAnalyzed.size >= 4,
                points: 50
            },

            // Archive Achievements
            {
                id: 'declassified',
                name: 'Declassified',
                description: 'Access your first government archive',
                icon: '📁',
                category: 'archivist',
                check: (state) => state.archivesAccessed.size >= 1,
                points: 15
            },
            {
                id: 'vault_master',
                name: 'Vault Master',
                description: 'Access all 6 government archives',
                icon: '🔓',
                category: 'archivist',
                check: (state) => state.archivesAccessed.size >= 6,
                points: 75
            },

            // Timeline Achievements
            {
                id: 'time_traveler',
                name: 'Time Traveler',
                description: 'Interact with filters 10 times',
                icon: '⏰',
                category: 'historian',
                check: (state) => state.timelineInteractions >= 10,
                points: 25
            },
            {
                id: 'chronologist',
                name: 'Chronologist',
                description: 'Interact with filters 50 times',
                icon: '📅',
                category: 'historian',
                check: (state) => state.timelineInteractions >= 50,
                points: 75
            },

            // Special Achievements
            {
                id: 'blue_book_specialist',
                name: 'Blue Book Specialist',
                description: 'View 5 Project Blue Book cases',
                icon: '📘',
                category: 'specialist',
                check: (state) => {
                    // This will be checked with case data
                    return state.blueBookCases >= 5;
                },
                points: 40
            },
            {
                id: 'modern_analyst',
                name: 'Modern Analyst',
                description: 'View 3 AATIP/UAP Task Force cases',
                icon: '🛸',
                category: 'specialist',
                check: (state) => {
                    return state.aatipCases >= 3;
                },
                points: 40
            },
            {
                id: 'completionist',
                name: 'The Completionist',
                description: 'Become a Director Level Agent',
                icon: '⭐',
                category: 'elite',
                check: (state) => {
                    return state.level >= 5;
                },
                points: 500
            }
        ];

        // Define ranks
        this.ranks = [
            { level: 1, name: 'Recruit', minPoints: 0, color: '#00aaff' },
            { level: 2, name: 'Specialist', minPoints: 100, color: '#00ffd4' },
            { level: 3, name: 'Analyst', minPoints: 300, color: '#ffd700' },
            { level: 4, name: 'Senior Investigator', minPoints: 600, color: '#ff8800' },
            { level: 5, name: 'Director', minPoints: 1000, color: '#ff3366' }
        ];

        // Load saved progress
        this.load();
    }

    // ... (keeping methods same until getProgress)

    // Get current progress
    getProgress() {
        return {
            casesViewed: this.state.casesViewed.size,
            totalCases: 2500, // Updated Estimate
            casesPercent: Math.round((this.state.casesViewed.size / 2500) * 100),
            specimensAnalyzed: this.state.specimensAnalyzed.size,
            totalSpecimens: 4,
            archivesAccessed: this.state.archivesAccessed.size,
            totalArchives: 6,
            timelineInteractions: this.state.timelineInteractions,
            achievementsUnlocked: this.state.achievements.size,
            totalAchievements: this.achievementDefinitions.length,
            totalPoints: this.state.totalPoints,
            level: this.state.level,
            rank: this.state.rank,
            rankColor: this.getRankColor()
        };
    }

    // Get rank color
    getRankColor() {
        const rank = this.ranks.find(r => r.level === this.state.level);
        return rank ? rank.color : '#00aaff';
    }

    // Get all achievements with unlock status
    getAllAchievements() {
        return this.achievementDefinitions.map(achievement => ({
            ...achievement,
            unlocked: this.state.achievements.has(achievement.id)
        }));
    }

    // Get achievements by category
    getAchievementsByCategory() {
        const categories = {
            explorer: [],
            scientist: [],
            archivist: [],
            historian: [],
            specialist: [],
            elite: []
        };

        this.achievementDefinitions.forEach(achievement => {
            if (categories[achievement.category]) {
                categories[achievement.category].push({
                    ...achievement,
                    unlocked: this.state.achievements.has(achievement.id)
                });
            }
        });

        return categories;
    }

    // Save to localStorage
    save() {
        try {
            const saveData = {
                casesViewed: Array.from(this.state.casesViewed),
                specimensAnalyzed: Array.from(this.state.specimensAnalyzed),
                archivesAccessed: Array.from(this.state.archivesAccessed),
                timelineInteractions: this.state.timelineInteractions,
                achievements: Array.from(this.state.achievements),
                totalPoints: this.state.totalPoints,
                level: this.state.level,
                rank: this.state.rank,
                blueBookCases: this.state.blueBookCases || 0,
                aatipCases: this.state.aatipCases || 0,
                firstSession: false
            };

            localStorage.setItem(this.storage_key, JSON.stringify(saveData));
        } catch (e) {
            console.warn('Failed to save investigation progress:', e);
        }
    }

    // Load from localStorage
    load() {
        try {
            const savedData = localStorage.getItem(this.storage_key);

            if (savedData) {
                const data = JSON.parse(savedData);

                this.state.casesViewed = new Set(data.casesViewed || []);
                this.state.specimensAnalyzed = new Set(data.specimensAnalyzed || []);
                this.state.archivesAccessed = new Set(data.archivesAccessed || []);
                this.state.timelineInteractions = data.timelineInteractions || 0;
                this.state.achievements = new Set(data.achievements || []);
                this.state.totalPoints = data.totalPoints || 0;
                this.state.level = data.level || 1;
                this.state.rank = data.rank || 'Recruit';
                this.state.blueBookCases = data.blueBookCases || 0;
                this.state.aatipCases = data.aatipCases || 0;
                this.state.firstSession = data.firstSession !== undefined ? data.firstSession : true;
            }
        } catch (e) {
            console.warn('Failed to load investigation progress:', e);
        }
    }

    // Reset all progress (for testing or user request)
    reset() {
        this.state = {
            casesViewed: new Set(),
            specimensAnalyzed: new Set(),
            archivesAccessed: new Set(),
            timelineInteractions: 0,
            achievements: new Set(),
            totalPoints: 0,
            level: 1,
            rank: 'Recruit',
            firstSession: true
        };

        localStorage.removeItem(this.storage_key);
    }
}
