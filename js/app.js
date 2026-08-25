// ============================================
// UFO COMMAND DECK - MAIN APPLICATION
// ============================================

class UFOCommandDeck {
    constructor() {
        this.globe = null;
        this.cases = [];
        this.filteredCases = [];
        this.currentSection = 'command';
        this.detailPanelOpen = false;
        this.selectedCase = null;
        this.investigation = null;
        this.dataLoader = null;
        this.currentFilter = 'all'; // Track current filter for source tracking
        this.visibleCount = 30; // Pagination limit
        this.theater = null;
        this.researchQueueStorageKey = 'ufo-command-deck-research-queue';
        this.notebookStorageKey = 'ufo-command-deck-investigation-notebook';
        this.credibilityTuningStorageKey = 'ufo-command-deck-credibility-tuning';
        this.globeLayersStorageKey = 'ufo-command-deck-globe-layers';
        this.stagingInboxStorageKey = 'ufo-command-deck-staging-inbox';
        this.savedInvestigationsStorageKey = 'ufo-command-deck-saved-investigations';
        this.guideStorageKey = 'ufo-command-deck-guide-complete';
        this.advancedSearchStorageKey = 'ufo-command-deck-advanced-searches';
        this.missionsStorageKey = 'ufo-command-deck-missions';
        this.sourceVerificationStorageKey = 'ufo-command-deck-source-verification';
        this.researchQueue = [];
        this.notebookEntries = [];
        this.credibilityWeights = this.getDefaultCredibilityWeights();
        this.activeGlobeLayers = this.getDefaultGlobeLayers();
        this.stagedItems = [];
        this.savedInvestigations = [];
        this.savedAdvancedSearches = [];
        this.completedMissions = [];
        this.sourceVerification = {};
        this.exhibitMode = false;

        this.init();
    }

    async init() {
        // Check if intro has been completed this session
        if (!sessionStorage.getItem('introComplete')) {
            // Setup intro splash first
            this.setupIntroSplash();
            return; // Wait for user to click Enter
        }

        this.hideIntroSplash();

        // Continue with normal initialization
        await this.continueInit();
    }

    hideIntroSplash() {
        const introSplash = document.getElementById('introSplash');
        if (introSplash) {
            if (introSplash.contains(document.activeElement)) {
                document.activeElement.blur();
            }
            introSplash.classList.add('hidden');
            introSplash.setAttribute('aria-hidden', 'true');
        }
    }

    setupIntroSplash() {
        const introSplash = document.getElementById('introSplash');
        const enterBtn = document.getElementById('introEnterBtn');
        const loadingOverlay = document.getElementById('loadingOverlay');

        if (!introSplash || !enterBtn) {
            // No intro splash, continue normally
            this.continueInit();
            return;
        }

        // Ensure loading is hidden until intro is complete
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }

        const handleEnter = async (e) => {
            // Prevent double-firing on mobile (touch + click)
            e.preventDefault();

            // Remove listeners to prevent multiple triggers
            enterBtn.removeEventListener('click', handleEnter);
            enterBtn.removeEventListener('touchend', handleEnter);

            try {
                // Initialize Audio Contexts immediately and concurrently (Critical for iOS)
                // iOS validates the 'new AudioContext' call synchronously within the handler
                const toneLoad = this.withTimeout(this.loadTone(), 2500, 'Tone.js load').catch((error) => {
                    console.info('Tone.js optional startup skipped:', error.message);
                    return null;
                });
                // alienAudio.init() creates the AudioContext, must happen NOW
                await Promise.allSettled([toneLoad, alienAudio.init()]);
                if (window.Tone) {
                    const toneStarted = await this.withTimeout(window.Tone.start(), 1000, 'Tone.js start')
                        .then(() => true)
                        .catch((error) => {
                            console.info('Tone.js optional start skipped:', error.message);
                            return false;
                        });
                    if (toneStarted) {
                        console.log('Tone.js initialized from user gesture');
                    }
                }
                await alienAudio.resume();

                // Start the configured background track from the user's click.
                await alienAudio.startAmbient();
                alienAudio.introComplete = true;
            } catch (e) {
                console.warn('Background audio failed to start:', e);
            }

            // Start the dramatic exit animation
            this.hideIntroSplash();

            // Show loading overlay
            if (loadingOverlay) {
                loadingOverlay.classList.remove('hidden');
            }

            // Mark intro as complete for this session
            sessionStorage.setItem('introComplete', 'true');

            // Continue with app initialization
            try {
                await this.continueInit();
            } catch (e) {
                console.error('Critical initialization error:', e);
                // Ensure loading overlay shows error state if init fails
                if (loadingOverlay) {
                    loadingOverlay.replaceChildren();
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.append(
                        document.createTextNode(`CRITICAL ERROR: ${e.message}`),
                        document.createElement('br'),
                        document.createTextNode('Please refresh')
                    );
                    loadingOverlay.appendChild(errorMessage);
                }
            }
        };

        enterBtn.addEventListener('click', handleEnter);
        enterBtn.addEventListener('touchend', handleEnter);
    }

    withTimeout(promise, timeoutMs, label) {
        return Promise.race([
            promise,
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error(`${label} timed out`)), timeoutMs);
            })
        ]);
    }

    loadTone() {
        if (window.Tone) return Promise.resolve(window.Tone);
        if (window.__toneLoadPromise) return window.__toneLoadPromise;

        window.__toneLoadPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js';
            script.async = true;
            script.onload = () => resolve(window.Tone);
            script.onerror = () => reject(new Error('Tone.js failed to load'));
            document.head.appendChild(script);
        });

        return window.__toneLoadPromise;
    }

    async continueInit() {
        // 1. Initialize Data Loader
        this.dataLoader = new DataLoader();
        this.cases = await this.dataLoader.loadAllData();
        this.researchQueue = this.loadResearchQueue();
        this.notebookEntries = this.loadNotebookEntries();
        this.credibilityWeights = this.loadCredibilityWeights();
        this.activeGlobeLayers = this.loadGlobeLayers();
        this.stagedItems = this.loadStagedItems();
        this.savedInvestigations = this.loadSavedInvestigations();
        this.savedAdvancedSearches = this.loadSavedAdvancedSearches();
        this.completedMissions = this.loadCompletedMissions();
        this.sourceVerification = this.loadSourceVerification();

        // 2. Initialize Search Engine
        this.searchEngine = new CaseSearch(this.dataLoader);

        // 3. Initialize Dossier UI
        this.dossier = new DossierView();

        // Initialize audio
        this.setupAudioInit();

        // Initialize Globe with ALL cases
        this.initGlobe();

        // Initialize investigation tracker
        this.investigation = new InvestigationTracker();

        // Setup UI
        this.setupNavigation();
        this.setupUfoTransition();
        this.setupFilters();
        this.setupSearch();
        this.setupGlobeControls();
        this.setupDetailPanel(); // Keep existing for minor details? Or replace fully?
        this.setupResearchReport();
        this.setupAchievementGallery();
        this.setupMobileMenu();
        this.setupKeyboardShortcuts();
        this.initUtilityPanels();

        // Populate Initial List
        this.filteredCases = this.cases;
        this.populateCaseList();

        this.updateStats();
        this.initAudioToggle();
        this.initJukebox();
        this.initTheaterMode();
        this.updateInvestigationUI();
        this.initTiltEffect();

        // Initialize timeline (lazy load logic handled in navigation)
        this.timeline = null;

        // Hide loading
        this.hideLoading();

        console.log('🛸 UFO Command Deck initialized with ' + this.cases.length + ' cases.');
    }

    async loadCases() {
        // Check for embedded data first to avoid CORS issues locally
        if (typeof UFO_DATA !== 'undefined') {
            this.cases = [...UFO_DATA.cases]; // Copy array

            // Load supplemental cases
            try {
                const response = await fetch('./data/supplemental_cases.json');
                const supplementalCases = await response.json();
                this.cases = [...this.cases, ...supplementalCases];
                console.log(`Loaded ${UFO_DATA.cases.length} embedded cases + ${supplementalCases.length} supplemental cases = ${this.cases.length} total`);
            } catch (e) {
                console.warn('Supplemental cases not available:', e);
                console.log(`Loaded ${this.cases.length} embedded cases only`);
            }

            this.filteredCases = [...this.cases];
            return;
        }

        try {
            const response = await fetch('./data/cases.json');
            const data = await response.json();
            this.cases = data.cases;
            this.filteredCases = [...this.cases];
        } catch (e) {
            console.error('Failed to load cases:', e);
            this.cases = [];
            this.filteredCases = [];
        }
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-section');
        const sections = {
            'command': document.getElementById('section-command'),
            'timeline': document.getElementById('section-timeline'),
            'archives': document.getElementById('section-archives'),
            'theater': document.getElementById('section-theater')
        };

        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetSection = btn.dataset.section;

                // Update active button
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Show target section, hide others
                Object.keys(sections).forEach(key => {
                    if (sections[key]) {
                        if (key === targetSection) {
                            sections[key].classList.add('active');
                            sections[key].style.display = 'block';
                        } else {
                            sections[key].classList.remove('active');
                            sections[key].style.display = 'none';
                        }
                    }
                });

                // Start lab animation when switching to specimen lab
                if (targetSection === 'specimen' && this.specimenLab && !this.specimenLab.isAnimating) {
                    this.specimenLab.play();
                }

                alienAudio.playClick();
            });
        });

        // Initialize: show command deck, hide others
        sections.command?.classList.add('active');
        Object.keys(sections).forEach(key => {
            if (key !== 'command' && sections[key]) {
                sections[key].style.display = 'none';
            }
        });

        console.log('✓ Navigation setup complete');
    }

    setupAudioInit() {
        // If intro already played (handled ambient), skip
        if (alienAudio.introComplete || alienAudio.isIntroPlaying) {
            return;
        }

        // Initialize audio on first user interaction (fallback if intro was skipped)
        const initAudio = async (event) => {
            if (event && event.isTrusted === false) {
                return;
            }

            if (alienAudio.introComplete || alienAudio.isIntroPlaying) {
                return; // Intro already handled it
            }
            await alienAudio.init();
            await alienAudio.resume();
            alienAudio.startAmbient();

            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        };

        document.addEventListener('click', initAudio, { once: true });
        document.addEventListener('keydown', initAudio, { once: true });
    }

    initAudioToggle() {
        const btn = document.getElementById('audioToggle');
        const soundWaves = document.getElementById('soundWaves');
        const muteLine = document.getElementById('muteLine');
        const visualizer = document.getElementById('audioVisualizer');

        const setVisualizerState = (active, muted = false) => {
            if (!visualizer) return;
            visualizer.classList.toggle('active', active && !muted);
            visualizer.classList.toggle('muted', muted);
        };

        this.setAudioControlState = (active, muted = false) => {
            if (soundWaves) soundWaves.style.display = muted ? 'none' : 'block';
            if (muteLine) muteLine.style.display = muted ? 'block' : 'none';
            btn?.classList.toggle('muted', muted);
            setVisualizerState(active, muted);
        };

        if (btn) {
            btn.addEventListener('click', () => {
                if (alienAudio.masterGain && alienAudio.masterGain.gain.value > 0) {
                    // Mute all audio
                    alienAudio.mute();
                    if (window.Tone) {
                        Tone.Destination.mute = true;
                    }
                    this.setAudioControlState(false, true);
                } else {
                    // Unmute all audio
                    alienAudio.unmute();
                    alienAudio.resume(); // Ensure context is running
                    if (window.Tone) {
                        Tone.Destination.mute = false;
                    }
                    this.setAudioControlState(alienAudio.isPlaying, false);
                }
            });
        }

        document.addEventListener('click', () => this.setAudioControlState?.(alienAudio.isPlaying, alienAudio.masterGain?.gain.value === 0), { passive: true });
        document.addEventListener('keydown', () => this.setAudioControlState?.(alienAudio.isPlaying, alienAudio.masterGain?.gain.value === 0), { passive: true });
    }

    initJukebox() {
        const panel = document.getElementById('jukeboxPanel');
        const toggle = document.getElementById('jukeboxToggle');
        const close = document.getElementById('jukeboxClose');
        const previous = document.getElementById('jukeboxPrev');
        const next = document.getElementById('jukeboxNext');
        const list = document.getElementById('jukeboxTrackList');
        const record = document.getElementById('jukeboxRecord');
        const recordLabel = document.getElementById('jukeboxRecordLabel');
        const nowTitle = document.getElementById('jukeboxNowTitle');
        const nowArtist = document.getElementById('jukeboxNowArtist');
        const progress = document.getElementById('jukeboxProgress');

        if (!panel || !toggle || !list) return;

        const tracks = alienAudio.getAmbientTracks();
        let recordAnimationTimer = null;
        let progressTimer = null;
        const storageKey = 'ufo-command-deck-ambient-track';
        const moodStorageKey = 'ufo-command-deck-jukebox-mood';
        const moodModes = [
            { id: 'high-desert', label: 'High Desert', trackIndex: 0 },
            { id: 'gov-files', label: 'Gov Files', trackIndex: 3 },
            { id: 'breaking-news', label: 'Breaking News', trackIndex: 2 },
            { id: 'deep-archive', label: 'Deep Archive', trackIndex: 1 },
            { id: 'signal-lost', label: 'Signal Lost', trackIndex: 3 }
        ];

        const setPanelOpen = (open) => {
            panel.classList.toggle('is-open', open);
            panel.setAttribute('aria-hidden', String(!open));
            toggle.setAttribute('aria-expanded', String(open));
            toggle.classList.toggle('active', open);
        };

        const triggerRecordChange = () => {
            if (!record) return;
            record.classList.remove('record-changing');
            void record.offsetWidth;
            record.classList.add('record-changing');
            window.clearTimeout(recordAnimationTimer);
            recordAnimationTimer = window.setTimeout(() => {
                record.classList.remove('record-changing');
            }, 1050);
        };

        const selectTrack = async (index) => {
            if (!tracks.length) return;

            const normalizedIndex = ((Number(index) || 0) % tracks.length + tracks.length) % tracks.length;
            triggerRecordChange();
            alienAudio.playClick();
            alienAudio.init();
            alienAudio.unmute();
            if (window.Tone) Tone.Destination.mute = false;
            this.setAudioControlState?.(true, false);
            const selected = await alienAudio.selectAmbientTrack(normalizedIndex);
            if (!selected) {
                updateActiveTrack(alienAudio.getCurrentAmbientTrackIndex(), false);
            }
        };

        const renderMoodModes = () => {
            if (panel.querySelector('.jukebox-modes')) return;

            const transport = panel.querySelector('.jukebox-transport');
            const modeWrap = document.createElement('div');
            modeWrap.className = 'jukebox-modes';
            const label = document.createElement('span');
            label.textContent = 'Mood Modes';
            modeWrap.append(label);

            const grid = document.createElement('div');
            grid.className = 'jukebox-mode-grid';
            moodModes.forEach((mode) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.mode = mode.id;
                button.textContent = mode.label;
                button.addEventListener('click', async () => {
                    window.localStorage?.setItem(moodStorageKey, mode.id);
                    await selectTrack(mode.trackIndex);
                    updateMoodState(mode.id);
                });
                grid.append(button);
            });
            modeWrap.append(grid);
            transport?.after(modeWrap);
        };

        const updateMoodState = (activeMode = window.localStorage?.getItem(moodStorageKey)) => {
            panel.querySelectorAll('.jukebox-mode-grid button').forEach((button) => {
                button.classList.toggle('active', button.dataset.mode === activeMode);
            });
        };

        const renderTrackButtons = () => {
            list.replaceChildren();
            tracks.forEach((track, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'jukebox-track';
                button.dataset.index = String(index);
                button.setAttribute('role', 'option');
                button.setAttribute('aria-selected', 'false');
                button.style.setProperty('--track-accent', track.accent || '#4de082');
                const code = document.createElement('span');
                code.className = 'track-code';
                code.textContent = track.code;

                const copy = document.createElement('span');
                copy.className = 'track-copy';
                const title = document.createElement('strong');
                title.textContent = track.title;
                const artist = document.createElement('small');
                artist.textContent = track.artist;
                copy.append(title, artist);

                const icon = document.createElement('span');
                icon.className = 'material-symbols-outlined';
                icon.setAttribute('aria-hidden', 'true');
                icon.textContent = 'album';

                button.append(code, copy, icon);
                button.addEventListener('click', async (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    await selectTrack(index);
                });
                list.appendChild(button);
            });
        };

        const updateActiveTrack = (index = alienAudio.getCurrentAmbientTrackIndex(), animate = false) => {
            const track = tracks[index] || tracks[0];
            if (!track) return;

            if (animate) triggerRecordChange();
            panel.style.setProperty('--jukebox-accent', track.accent || '#4de082');
            if (recordLabel) recordLabel.textContent = track.code;
            if (nowTitle) nowTitle.textContent = track.title;
            if (nowArtist) nowArtist.textContent = track.artist;
            window.localStorage?.setItem(storageKey, String(index));

            list.querySelectorAll('.jukebox-track').forEach((button) => {
                const active = Number(button.dataset.index) === index;
                button.classList.toggle('active', active);
                button.setAttribute('aria-selected', String(active));
            });
        };

        const updateProgress = () => {
            const audio = alienAudio.mediaAmbientElement;
            if (!progress || !audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
                if (progress) progress.style.width = '0%';
                return;
            }
            progress.style.width = `${Math.min(100, (audio.currentTime / audio.duration) * 100)}%`;
        };

        renderTrackButtons();
        renderMoodModes();
        const savedIndex = Number(window.localStorage?.getItem(storageKey));
        if (Number.isFinite(savedIndex) && tracks[savedIndex]) {
            alienAudio.mediaAmbientPlaylistIndex = savedIndex;
        }
        updateActiveTrack();
        updateMoodState();

        toggle.addEventListener('click', () => {
            setPanelOpen(!panel.classList.contains('is-open'));
            alienAudio.playClick();
        });
        close?.addEventListener('click', () => {
            setPanelOpen(false);
            alienAudio.playClick();
        });
        previous?.addEventListener('click', async () => {
            await selectTrack(alienAudio.getCurrentAmbientTrackIndex() - 1);
        });
        next?.addEventListener('click', async () => {
            await selectTrack(alienAudio.getCurrentAmbientTrackIndex() + 1);
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && panel.classList.contains('is-open')) {
                setPanelOpen(false);
            }
        });

        window.addEventListener('ufo-ambient-track-change', (event) => {
            updateActiveTrack(event.detail?.index || 0, event.detail?.reason === 'select' || event.detail?.reason === 'next');
            this.setAudioControlState?.(event.detail?.isPlaying, alienAudio.masterGain?.gain.value === 0);
        });

        window.clearInterval(progressTimer);
        progressTimer = window.setInterval(updateProgress, 1000);
    }

    playAudioDramaCue(cue, caseData = null) {
        const audio = window.alienAudio || alienAudio;
        audio.init?.();
        audio.resume?.();

        if (cue === 'station-id') {
            audio.playTheaterTuning?.();
        } else if (cue === 'signal-break') {
            audio.playTheaterSting?.();
        } else {
            audio.playNavigation?.();
        }

        const toastText = {
            'station-id': 'Station ID cue',
            'tape-hiss': 'Tape hiss cue',
            'signal-break': 'Signal break cue'
        }[cue] || 'Broadcast cue';

        this.showCaseHandoff({
            name: `${toastText}: ${caseData?.name || 'Open transmission'}`
        }, 0);

        window.clearTimeout(this.caseHandoffTimer);
        this.caseHandoffTimer = window.setTimeout(() => {
            document.body.classList.remove('case-handoff-active');
        }, 900);
    }

    initTheaterMode() {
        if (!window.TheaterMode) return;

        if (!this.theater) {
            this.theater = new TheaterMode();
        }

        const news = typeof CURRENT_UAP_NEWS !== 'undefined' ? CURRENT_UAP_NEWS : window.CURRENT_UAP_NEWS || [];
        const fallbackArchives = typeof UFO_DATA !== 'undefined' ? UFO_DATA.archiveDocuments || [] : [];
        const archives = typeof ARCHIVE_DOCUMENTS !== 'undefined'
            ? ARCHIVE_DOCUMENTS
            : window.ARCHIVE_DOCUMENTS || fallbackArchives;

        this.theater.init({
            dataLoader: this.dataLoader,
            news,
            archives,
            audio: window.alienAudio || alienAudio
        });
    }

    openBroadcastDossierFromCase(caseData, options = {}) {
        if (!caseData) return;

        const { focusGlobe = true } = options;
        const canFocus = focusGlobe && this.globe && caseData.coordinates;
        const delay = canFocus && !this.prefersReducedMotion?.matches ? 650 : 0;

        if (canFocus) {
            this.globe.focusOnLocation(caseData.coordinates.lat, caseData.coordinates.lng, 1200);
            this.globe.selectMarkerByCase?.(caseData);
            this.updateRotationButtonState?.();
        }

        this.showCaseHandoff(caseData, delay);

        window.clearTimeout(this.caseHandoffTimer);
        this.caseHandoffTimer = window.setTimeout(() => {
            document.body.classList.remove('case-handoff-active');
            if (this.dossier) {
                this.dossier.open(caseData);
            } else {
                this.openDetailPanel(caseData);
            }
        }, delay);
    }

    showCaseHandoff(caseData, delay) {
        document.body.classList.add('case-handoff-active');
        let toast = document.getElementById('caseHandoffToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'caseHandoffToast';
            toast.className = 'case-handoff-toast';
            document.body.appendChild(toast);
        }

        toast.replaceChildren();
        toast.append(
            this.createTextNodeElement('span', 'SIGNAL LOCK'),
            this.createTextNodeElement('strong', caseData.name || 'Unknown Case'),
            this.createTextNodeElement('small', delay ? 'Aligning globe before opening case file' : 'Opening case file')
        );
    }

    getRelatedCases(caseData, limit = 5) {
        if (!caseData || !Array.isArray(this.cases)) return [];

        return this.cases
            .filter((candidate) => candidate && candidate.id !== caseData.id)
            .map((candidate) => ({
                caseData: candidate,
                score: this.scoreRelatedCase(caseData, candidate)
            }))
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map((item) => item.caseData);
    }

    scoreRelatedCase(base, candidate) {
        let score = 0;
        const baseShape = String(base.shape || '').toLowerCase();
        const candidateShape = String(candidate.shape || '').toLowerCase();
        const baseSource = String(base.source || '').toLowerCase();
        const candidateSource = String(candidate.source || '').toLowerCase();
        const baseYear = Number(base.year || String(base.date || '').match(/^-?\d{1,4}/)?.[0]);
        const candidateYear = Number(candidate.year || String(candidate.date || '').match(/^-?\d{1,4}/)?.[0]);

        if (baseShape && candidateShape && baseShape === candidateShape) score += 28;
        if (baseSource && candidateSource && baseSource === candidateSource) score += 18;
        if (Number.isFinite(baseYear) && Number.isFinite(candidateYear)) {
            const delta = Math.abs(baseYear - candidateYear);
            if (delta <= 1) score += 22;
            else if (delta <= 10) score += 12;
            else if (delta <= 50) score += 6;
        }

        const distance = this.getCoordinateDistanceMiles(base.coordinates, candidate.coordinates);
        if (Number.isFinite(distance)) {
            if (distance <= 100) score += 26;
            else if (distance <= 500) score += 16;
            else if (distance <= 1500) score += 8;
        }

        const baseTags = new Set([...(base.tags || []), ...(base.classification ? [base.classification] : [])].map((tag) => String(tag).toLowerCase()));
        const sharedTags = [...(candidate.tags || [])].filter((tag) => baseTags.has(String(tag).toLowerCase()));
        score += Math.min(18, sharedTags.length * 6);

        return score;
    }

    getCoordinateDistanceMiles(a, b) {
        if (!a || !b || !Number.isFinite(Number(a.lat)) || !Number.isFinite(Number(a.lng)) || !Number.isFinite(Number(b.lat)) || !Number.isFinite(Number(b.lng))) {
            return NaN;
        }

        const toRad = (value) => Number(value) * Math.PI / 180;
        const earthMiles = 3958.8;
        const dLat = toRad(b.lat - a.lat);
        const dLng = toRad(b.lng - a.lng);
        const lat1 = toRad(a.lat);
        const lat2 = toRad(b.lat);
        const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
        return earthMiles * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    }

    initUtilityPanels() {
        this.createUtilityDock();
        this.renderResearchQueuePanel();
        this.renderDiagnosticsPanel();
        this.renderCredibilityPanel();
        this.renderDailyBriefingPanel();
        this.renderGlobeLayersPanel();
        this.renderShortcutsPanel();
        this.renderGuidePanel();
        this.renderGraphPanel();
        this.renderMissionsPanel();
        this.renderExhibitPanel();
        this.renderResearchAssistantPanel();
        this.maybeShowFirstRunGuide();
    }

    createUtilityDock() {
        if (document.getElementById('utilityDock')) return;

        const dock = document.createElement('div');
        dock.id = 'utilityDock';
        dock.className = 'utility-dock';

        [
            ['researchQueuePanel', 'Queue', 'playlist_add_check'],
            ['credibilityPanel', 'Credibility', 'tune'],
            ['dailyBriefingPanel', 'Briefing', 'newspaper'],
            ['globeLayersPanel', 'Layers', 'filter_alt'],
            ['shortcutsPanel', 'Shortcuts', 'keyboard'],
            ['guidePanel', 'Guide', 'tour'],
            ['graphPanel', 'Graph', 'hub'],
            ['missionsPanel', 'Missions', 'flag'],
            ['exhibitPanel', 'Exhibit', 'museum'],
            ['researchAssistantPanel', 'Research', 'psychology_alt'],
            ['diagnosticsPanel', 'Diagnostics', 'monitor_heart']
        ].forEach(([target, label, icon]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.target = target;
            button.title = label;
            button.setAttribute('aria-label', label);
            button.setAttribute('aria-controls', target);
            button.setAttribute('aria-expanded', 'false');
            const iconEl = document.createElement('span');
            iconEl.className = 'material-symbols-outlined';
            iconEl.setAttribute('aria-hidden', 'true');
            iconEl.textContent = icon;
            button.append(iconEl);
            button.addEventListener('click', () => this.toggleUtilityPanel(target));
            dock.append(button);
        });

        document.body.appendChild(dock);
    }

    toggleUtilityPanel(panelId) {
        document.querySelectorAll('.utility-panel').forEach((panel) => {
            panel.classList.toggle('active', panel.id === panelId && !panel.classList.contains('active'));
        });
        document.querySelectorAll('.utility-dock button').forEach((button) => {
            button.classList.toggle('active', button.dataset.target === panelId && document.getElementById(panelId)?.classList.contains('active'));
        });

        if (panelId === 'diagnosticsPanel') this.renderDiagnosticsPanel();
        if (panelId === 'dailyBriefingPanel') this.renderDailyBriefingPanel();
        if (panelId === 'globeLayersPanel') this.renderGlobeLayersPanel();
        if (panelId === 'shortcutsPanel') this.renderShortcutsPanel();
        if (panelId === 'guidePanel') this.renderGuidePanel();
        if (panelId === 'graphPanel') this.renderGraphPanel();
        if (panelId === 'missionsPanel') this.renderMissionsPanel();
        if (panelId === 'exhibitPanel') this.renderExhibitPanel();
        if (panelId === 'researchAssistantPanel') this.renderResearchAssistantPanel();

        document.querySelectorAll('.utility-dock button').forEach((button) => {
            button.setAttribute('aria-expanded', String(document.getElementById(button.dataset.target)?.classList.contains('active')));
        });
    }

    closeUtilityPanels() {
        document.querySelectorAll('.utility-panel').forEach((panel) => panel.classList.remove('active'));
        document.querySelectorAll('.utility-dock button').forEach((button) => {
            button.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
        });
    }

    createUtilityPanel(id, title) {
        let panel = document.getElementById(id);
        if (!panel) {
            panel = document.createElement('aside');
            panel.id = id;
            panel.className = 'utility-panel';
            panel.setAttribute('role', 'dialog');
            panel.setAttribute('aria-modal', 'false');
            panel.setAttribute('aria-label', title);
            document.body.appendChild(panel);
        }

        panel.replaceChildren();
        const header = document.createElement('header');
        const heading = document.createElement('h2');
        heading.textContent = title;
        const close = document.createElement('button');
        close.type = 'button';
        close.setAttribute('aria-label', `Close ${title}`);
        close.textContent = '×';
        close.addEventListener('click', () => this.toggleUtilityPanel(id));
        header.append(heading, close);
        panel.append(header);
        return panel;
    }

    loadResearchQueue() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.researchQueueStorageKey) || '[]');
            return Array.isArray(parsed) ? parsed.filter((item) => item && item.id) : [];
        } catch (error) {
            console.warn('Unable to load research queue:', error);
            return [];
        }
    }

    persistResearchQueue() {
        window.localStorage?.setItem(this.researchQueueStorageKey, JSON.stringify(this.researchQueue));
    }

    isCaseQueued(caseId) {
        return this.researchQueue.some((item) => item.id === caseId);
    }

    toggleResearchQueueCase(caseData) {
        if (!caseData?.id) return;

        if (this.isCaseQueued(caseData.id)) {
            this.researchQueue = this.researchQueue.filter((item) => item.id !== caseData.id);
        } else {
            this.researchQueue.unshift({
                id: caseData.id,
                name: caseData.name || 'Unknown Case',
                location: caseData.location || 'Unknown location',
                date: caseData.date || caseData.year || 'Date unknown',
                source: caseData.source || 'Local archive',
                savedAt: new Date().toISOString()
            });
        }

        this.persistResearchQueue();
        this.renderResearchQueuePanel();
    }

    renderResearchQueuePanel() {
        const panel = this.createUtilityPanel('researchQueuePanel', 'Research Queue');
        const body = document.createElement('div');
        body.className = 'utility-panel-body';

        if (!this.researchQueue.length) {
            body.append(this.createTextNodeElement('p', 'No queued cases yet.'));
        } else {
            const list = document.createElement('div');
            list.className = 'queue-list';
            this.researchQueue.forEach((item) => {
                const row = document.createElement('div');
                row.className = 'queue-item';
                row.append(
                    this.createTextNodeElement('strong', item.name),
                    this.createTextNodeElement('span', `${item.location} / ${item.date}`),
                    this.createTextNodeElement('small', item.source)
                );
                const open = document.createElement('button');
                open.type = 'button';
                open.textContent = 'Open';
                open.addEventListener('click', () => {
                    const caseData = this.dataLoader?.getCase?.(item.id);
                    if (caseData) this.openBroadcastDossierFromCase(caseData);
                });
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.textContent = 'Remove';
                remove.addEventListener('click', () => {
                    this.researchQueue = this.researchQueue.filter((queued) => queued.id !== item.id);
                    this.persistResearchQueue();
                    this.renderResearchQueuePanel();
                    this.dossier?.updateQueueButton?.();
                });
                row.append(open, remove);
                list.append(row);
            });
            body.append(list);
        }

        const exportButton = document.createElement('button');
        exportButton.type = 'button';
        exportButton.className = 'utility-primary-action';
        exportButton.textContent = 'Copy Research Packet';
        exportButton.addEventListener('click', () => this.copyResearchPacket(exportButton));
        body.append(exportButton);

        panel.append(body);
    }

    copyResearchPacket(button) {
        const packet = [
            '# UFO Command Deck Research Packet',
            '',
            ...this.researchQueue.map((item, index) => `${index + 1}. ${item.name} (${item.date})\n   Location: ${item.location}\n   Source: ${item.source}\n   Case ID: ${item.id}`)
        ].join('\n');

        navigator.clipboard?.writeText(packet).then(() => {
            button.textContent = 'Copied';
        }).catch(() => {
            button.textContent = 'Packet Ready';
            console.info(packet);
        });
    }

    loadNotebookEntries() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.notebookStorageKey) || '[]');
            return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && item.body) : [];
        } catch (error) {
            console.warn('Unable to load investigation notebook:', error);
            return [];
        }
    }

    persistNotebookEntries() {
        window.localStorage?.setItem(this.notebookStorageKey, JSON.stringify(this.notebookEntries.slice(0, 80)));
    }

    addNotebookEntry(entry) {
        const normalized = {
            id: entry.id || `note-${Date.now()}`,
            title: entry.title || 'Untitled note',
            body: entry.body || '',
            linkedCaseId: entry.linkedCaseId || '',
            linkedCaseName: entry.linkedCaseName || '',
            createdAt: entry.createdAt || new Date().toISOString()
        };

        this.notebookEntries.unshift(normalized);
        this.notebookEntries = this.notebookEntries.slice(0, 80);
        this.persistNotebookEntries();
        this.renderNotebookPanel();
        return normalized;
    }

    quickAddNotebookEntry(caseData) {
        if (!caseData?.id) return null;

        const entry = this.addNotebookEntry({
            title: `Follow up: ${caseData.name || caseData.id}`,
            body: `Review ${caseData.name || caseData.id}. Check source reliability, related cases, current-news links, and unresolved evidence gaps.`,
            linkedCaseId: caseData.id,
            linkedCaseName: caseData.name || caseData.id
        });

        const button = document.getElementById('dossierNoteButton');
        if (button) {
            button.textContent = 'Noted';
            window.setTimeout(() => {
                button.textContent = 'Note';
            }, 1400);
        }

        return entry;
    }

    renderNotebookPanel() {
        const panel = this.createUtilityPanel('notebookPanel', 'Investigation Notebook');
        const body = document.createElement('div');
        body.className = 'utility-panel-body notebook-panel-body';

        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Note title';
        const titleInput = document.createElement('input');
        titleInput.id = 'notebookTitleInput';
        titleInput.placeholder = 'Open question or theory';
        titleLabel.append(titleInput);

        const bodyLabel = document.createElement('label');
        bodyLabel.textContent = 'Note';
        const noteInput = document.createElement('textarea');
        noteInput.id = 'notebookBodyInput';
        noteInput.placeholder = 'Keep claims tied to sources, cases, or open questions.';
        bodyLabel.append(noteInput);

        const add = document.createElement('button');
        add.type = 'button';
        add.className = 'utility-primary-action';
        add.textContent = 'Add Notebook Note';
        add.addEventListener('click', () => {
            const title = titleInput.value.trim() || 'Untitled investigation note';
            const bodyText = noteInput.value.trim();
            if (!bodyText) return;
            this.addNotebookEntry({ title, body: bodyText });
            titleInput.value = '';
            noteInput.value = '';
        });

        body.append(titleLabel, bodyLabel, add);

        const list = document.createElement('div');
        list.className = 'notebook-list';
        if (!this.notebookEntries.length) {
            list.append(this.createTextNodeElement('p', 'No notebook entries yet.'));
        } else {
            this.notebookEntries.slice(0, 12).forEach((entry) => {
                const item = document.createElement('div');
                item.className = 'notebook-item';
                item.append(
                    this.createTextNodeElement('strong', entry.title),
                    this.createTextNodeElement('span', new Date(entry.createdAt).toLocaleString()),
                    this.createTextNodeElement('p', entry.body)
                );

                const actions = document.createElement('div');
                actions.className = 'utility-inline-actions';
                if (entry.linkedCaseId) {
                    const open = document.createElement('button');
                    open.type = 'button';
                    open.textContent = 'Open Case';
                    open.addEventListener('click', () => {
                        const caseData = this.dataLoader?.getCase?.(entry.linkedCaseId);
                        if (caseData) this.openBroadcastDossierFromCase(caseData);
                    });
                    actions.append(open);
                }

                const remove = document.createElement('button');
                remove.type = 'button';
                remove.textContent = 'Delete';
                remove.addEventListener('click', () => {
                    this.notebookEntries = this.notebookEntries.filter((note) => note.id !== entry.id);
                    this.persistNotebookEntries();
                    this.renderNotebookPanel();
                });
                actions.append(remove);
                item.append(actions);
                list.append(item);
            });
        }
        body.append(list);

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'utility-primary-action';
        copy.textContent = 'Copy Notebook';
        copy.addEventListener('click', () => {
            const packet = this.notebookEntries.map((entry, index) => `${index + 1}. ${entry.title}\n${entry.body}\nCase: ${entry.linkedCaseName || entry.linkedCaseId || 'Unlinked'}`).join('\n\n');
            navigator.clipboard?.writeText(packet || 'No notebook entries.');
            copy.textContent = 'Copied';
        });
        body.append(copy);
        panel.append(body);
    }

    getDefaultCredibilityWeights() {
        return {
            officialSource: 18,
            witnessDetail: 16,
            externalSources: 18,
            coordinateLock: 14,
            unexplainedStatus: 14,
            mediaEvidence: 10,
            currentNewsLink: 10
        };
    }

    loadCredibilityWeights() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.credibilityTuningStorageKey) || '{}');
            return { ...this.getDefaultCredibilityWeights(), ...(parsed || {}) };
        } catch (error) {
            console.warn('Unable to load credibility tuning:', error);
            return this.getDefaultCredibilityWeights();
        }
    }

    persistCredibilityWeights() {
        window.localStorage?.setItem(this.credibilityTuningStorageKey, JSON.stringify(this.credibilityWeights));
    }

    renderCredibilityPanel() {
        const panel = this.createUtilityPanel('credibilityPanel', 'Credibility Tuning');
        const body = document.createElement('div');
        body.className = 'utility-panel-body credibility-tuning-panel';
        const labels = {
            officialSource: 'Official source',
            witnessDetail: 'Witness detail',
            externalSources: 'External sources',
            coordinateLock: 'Coordinate lock',
            unexplainedStatus: 'Unresolved status',
            mediaEvidence: 'Photo/video evidence',
            currentNewsLink: 'Current-news link'
        };

        Object.entries(labels).forEach(([key, label]) => {
            const wrap = document.createElement('label');
            wrap.className = 'tuning-control';
            const top = document.createElement('span');
            top.textContent = label;
            const value = document.createElement('strong');
            value.textContent = String(this.credibilityWeights[key] ?? 0);
            const input = document.createElement('input');
            input.type = 'range';
            input.min = '0';
            input.max = '30';
            input.value = String(this.credibilityWeights[key] ?? 0);
            input.addEventListener('input', () => {
                this.credibilityWeights[key] = Number(input.value);
                value.textContent = input.value;
                this.persistCredibilityWeights();
                this.renderCredibilityPreview();
            });
            wrap.append(top, value, input);
            body.append(wrap);
        });

        const preview = document.createElement('div');
        preview.id = 'credibilityPreview';
        preview.className = 'utility-preview-card';
        body.append(preview);

        const reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'utility-primary-action';
        reset.textContent = 'Reset Tuning';
        reset.addEventListener('click', () => {
            this.credibilityWeights = this.getDefaultCredibilityWeights();
            this.persistCredibilityWeights();
            this.renderCredibilityPanel();
            if (this.dossier?.activeCase) this.dossier.open(this.dossier.activeCase);
        });
        body.append(reset);
        panel.append(body);
        this.renderCredibilityPreview();
    }

    renderCredibilityPreview() {
        const preview = document.getElementById('credibilityPreview');
        if (!preview) return;
        const caseData = this.dossier?.activeCase || this.selectedCase || this.cases[0];
        if (!caseData) {
            preview.textContent = 'No case loaded.';
            return;
        }
        const tuned = this.getTunedCredibility(caseData);
        preview.replaceChildren();
        preview.append(
            this.createTextNodeElement('span', 'Preview case'),
            this.createTextNodeElement('strong', caseData.name || 'Unknown case'),
            this.createTextNodeElement('p', `Tuned credibility: ${tuned}%`)
        );
    }

    getTunedCredibility(caseData) {
        if (!caseData) return 0;

        const weights = this.credibilityWeights || this.getDefaultCredibilityWeights();
        const totalWeight = Object.values(weights).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0) || 1;
        const source = String(caseData.source || '').toLowerCase();
        const status = String(caseData.status || '').toLowerCase();
        const witnesses = String(caseData.witnesses || '').toLowerCase();
        const resources = Array.isArray(caseData.resources) ? caseData.resources : [];
        const hasMedia = resources.some((resource) => /video|photo|image|youtube|media/i.test(`${resource.type || ''} ${resource.url || ''}`));
        const hasCurrentNews = this.getNewsLinksForCase(caseData, 1).length > 0;

        const checks = {
            officialSource: /aaro|aatip|blue|pursue|government|nasa|usaf|navy|cia|war|department/i.test(source),
            witnessDetail: witnesses && !/unknown|not logged|n\/a/.test(witnesses),
            externalSources: resources.length > 0,
            coordinateLock: caseData.coordinates && Number.isFinite(Number(caseData.coordinates.lat)) && Number.isFinite(Number(caseData.coordinates.lng)),
            unexplainedStatus: /unexplained|unresolved|unknown|active|open/.test(status),
            mediaEvidence: hasMedia,
            currentNewsLink: hasCurrentNews
        };

        const weighted = Object.entries(checks).reduce((score, [key, passed]) => {
            return score + (passed ? Math.max(0, Number(weights[key]) || 0) : 0);
        }, 0);

        const evidenceScore = Math.round((weighted / totalWeight) * 100);
        const base = Number(caseData.credibility);
        if (!Number.isFinite(base)) return evidenceScore;
        return Math.max(0, Math.min(100, Math.round(base * 0.55 + evidenceScore * 0.45)));
    }

    getCaseProgressionPath(caseData, limit = 5) {
        if (!caseData) return [];
        return this.getRelatedCases(caseData, limit + 4)
            .map((relatedCase) => ({
                caseData: relatedCase,
                reason: this.getProgressionReason(caseData, relatedCase),
                quality: this.getCaseQualityScore(relatedCase).score
            }))
            .slice(0, limit);
    }

    getProgressionReason(base, candidate) {
        const reasons = [];
        if (base.shape && candidate.shape && String(base.shape).toLowerCase() === String(candidate.shape).toLowerCase()) reasons.push('same morphology');
        if (base.source && candidate.source && String(base.source).toLowerCase() === String(candidate.source).toLowerCase()) reasons.push('same source family');
        const distance = this.getCoordinateDistanceMiles(base.coordinates, candidate.coordinates);
        if (Number.isFinite(distance) && distance <= 500) reasons.push(`${Math.round(distance)} miles away`);
        const baseYear = Number(base.year || String(base.date || '').match(/^-?\d{1,4}/)?.[0]);
        const candidateYear = Number(candidate.year || String(candidate.date || '').match(/^-?\d{1,4}/)?.[0]);
        if (Number.isFinite(baseYear) && Number.isFinite(candidateYear) && Math.abs(baseYear - candidateYear) <= 10) reasons.push('nearby era');
        return reasons.slice(0, 2).join(' + ') || 'highest related-case score';
    }

    getNewsLinksForCase(caseData, limit = 5) {
        const news = typeof CURRENT_UAP_NEWS !== 'undefined' ? CURRENT_UAP_NEWS : window.CURRENT_UAP_NEWS || [];
        if (!caseData || !Array.isArray(news)) return [];

        const caseId = String(caseData.id || '').toLowerCase();
        const keywords = this.getCaseKeywords(caseData);

        return news
            .map((item) => {
                let score = 0;
                const haystack = [
                    item.title,
                    item.summary,
                    item.description,
                    item.author,
                    ...(Array.isArray(item.tags) ? item.tags : [])
                ].map((value) => String(value || '').toLowerCase()).join(' ');

                if (Array.isArray(item.relatedCases) && item.relatedCases.map((id) => String(id).toLowerCase()).includes(caseId)) score += 80;
                keywords.forEach((keyword) => {
                    if (keyword.length > 3 && haystack.includes(keyword)) score += 10;
                });

                return { item, score };
            })
            .filter((result) => result.score > 0)
            .sort((a, b) => b.score - a.score || String(b.item.date || '').localeCompare(String(a.item.date || '')))
            .slice(0, limit)
            .map((result) => ({
                ...result.item,
                linkScore: result.score,
                linkReason: Array.isArray(result.item.relatedCases) && result.item.relatedCases.includes(caseData.id)
                    ? 'explicit relatedCases match'
                    : 'keyword overlap'
            }));
    }

    getCaseKeywords(caseData) {
        const values = [
            caseData.name,
            caseData.location,
            caseData.shape,
            caseData.source,
            ...(Array.isArray(caseData.tags) ? caseData.tags : [])
        ];
        return [...new Set(values.flatMap((value) => String(value || '').toLowerCase().split(/[^a-z0-9-]+/)).filter((word) => word.length > 3))];
    }

    suggestRelatedCaseIdsForNews(entry, limit = 5) {
        const text = [entry.title, entry.summary, entry.description, entry.author, ...(entry.tags || [])].join(' ').toLowerCase();
        return this.cases
            .map((caseData) => {
                const keywords = this.getCaseKeywords(caseData);
                const score = keywords.reduce((sum, keyword) => sum + (text.includes(keyword) ? 1 : 0), 0);
                return { caseData, score };
            })
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map((item) => item.caseData.id);
    }

    getDailyBroadcastBriefing() {
        const news = typeof CURRENT_UAP_NEWS !== 'undefined' ? CURRENT_UAP_NEWS : window.CURRENT_UAP_NEWS || [];
        const latestNews = [...news].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))[0] || null;
        const featuredCase = this.cases.find((item) => String(item.source || '').toLowerCase().includes('pursue'))
            || this.cases.find((item) => this.getNewsLinksForCase(item, 1).length)
            || this.cases[0]
            || null;
        const historicalCase = this.cases.find((item) => {
            const year = Number(item.year || String(item.date || '').match(/^-?\d{1,4}/)?.[0]);
            return Number.isFinite(year) && year < 1900;
        }) || null;
        const queueItem = this.researchQueue[0] || null;

        return { latestNews, featuredCase, historicalCase, queueItem };
    }

    renderDailyBriefingPanel() {
        const panel = this.createUtilityPanel('dailyBriefingPanel', 'Tonight\'s Transmission');
        const body = document.createElement('div');
        body.className = 'utility-panel-body daily-briefing-panel';
        const briefing = this.getDailyBroadcastBriefing();
        const cards = [
            ['Current Signal', briefing.latestNews?.title || 'No current news loaded', briefing.latestNews?.summary || 'Add recent UAP items through News Intake.', briefing.latestNews?.url],
            ['Featured Case', briefing.featuredCase?.name || 'No featured case', briefing.featuredCase?.summary || '', '', briefing.featuredCase],
            ['Historical Echo', briefing.historicalCase?.name || 'No historical case', briefing.historicalCase?.summary || '', '', briefing.historicalCase],
            ['Research Queue', briefing.queueItem?.name || 'Queue is empty', briefing.queueItem ? `${briefing.queueItem.location} / ${briefing.queueItem.date}` : 'Queue a case from a dossier.', '', briefing.queueItem ? this.dataLoader?.getCase?.(briefing.queueItem.id) : null]
        ];

        cards.forEach(([label, title, copy, url, caseData]) => {
            const card = document.createElement('div');
            card.className = 'briefing-pick-card';
            card.append(
                this.createTextNodeElement('span', label),
                this.createTextNodeElement('strong', title),
                this.createTextNodeElement('p', copy || 'No summary available.')
            );
            const action = document.createElement('button');
            action.type = 'button';
            action.textContent = url ? 'Open Source' : caseData ? 'Open Case' : 'Stand By';
            action.disabled = !url && !caseData;
            action.addEventListener('click', () => {
                if (url) window.open(this.getSafeExternalUrl(url), '_blank', 'noopener,noreferrer');
                if (caseData) this.openBroadcastDossierFromCase(caseData);
            });
            card.append(action);
            body.append(card);
        });

        const theater = document.createElement('button');
        theater.type = 'button';
        theater.className = 'utility-primary-action';
        theater.textContent = 'Open Theater Broadcast';
        theater.addEventListener('click', () => this.navigateToSection('theater'));
        body.append(theater);
        panel.append(body);
    }

    getCaseQualityScore(caseData) {
        const issues = [];
        const strengths = [];
        let score = 100;

        if (!caseData?.coordinates || !Number.isFinite(Number(caseData.coordinates.lat)) || !Number.isFinite(Number(caseData.coordinates.lng))) {
            issues.push('Missing coordinates');
            score -= 18;
        } else {
            strengths.push('Coordinate lock');
        }

        if (!caseData?.summary || String(caseData.summary).length < 80) {
            issues.push('Thin summary');
            score -= 16;
        } else {
            strengths.push('Usable summary');
        }

        if (!caseData?.source) {
            issues.push('Missing source');
            score -= 16;
        } else {
            strengths.push('Source labeled');
        }

        if (!Array.isArray(caseData?.resources) || !caseData.resources.length) {
            issues.push('No external source links');
            score -= 14;
        } else {
            strengths.push(`${caseData.resources.length} source link${caseData.resources.length === 1 ? '' : 's'}`);
        }

        if (!caseData?.status) {
            issues.push('Missing status');
            score -= 10;
        }

        if (!caseData?.witnesses || /unknown|not logged/i.test(String(caseData.witnesses))) {
            issues.push('Witness detail incomplete');
            score -= 10;
        }

        const duplicateCount = this.cases.filter((item) => item.id !== caseData.id && String(item.name || '').toLowerCase() === String(caseData.name || '').toLowerCase()).length;
        if (duplicateCount) {
            issues.push('Possible duplicate name');
            score -= 8;
        }

        if (this.getNewsLinksForCase(caseData, 1).length) strengths.push('Current-news link');
        if (!issues.length) strengths.push('Ready for spotlight');

        return {
            score: Math.max(0, Math.min(100, score)),
            issues,
            strengths
        };
    }

    renderQualityPanel() {
        const panel = this.createUtilityPanel('qualityPanel', 'Quality Scores');
        const body = document.createElement('div');
        body.className = 'utility-panel-body quality-panel-body';
        const scored = this.cases.map((caseData) => ({
            caseData,
            quality: this.getCaseQualityScore(caseData)
        })).sort((a, b) => a.quality.score - b.quality.score);

        const summary = document.createElement('div');
        summary.className = 'quality-summary-grid';
        [
            ['Needs work', scored.filter((item) => item.quality.score < 70).length],
            ['Missing coords', scored.filter((item) => item.quality.issues.includes('Missing coordinates')).length],
            ['No links', scored.filter((item) => item.quality.issues.includes('No external source links')).length]
        ].forEach(([label, value]) => {
            const card = document.createElement('div');
            card.className = 'diagnostic-card';
            card.append(this.createTextNodeElement('span', label), this.createTextNodeElement('strong', String(value)));
            summary.append(card);
        });
        body.append(summary);

        scored.slice(0, 10).forEach(({ caseData, quality }) => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'quality-case-item';
            item.append(
                this.createTextNodeElement('strong', `${quality.score}% / ${caseData.name || caseData.id}`),
                this.createTextNodeElement('span', quality.issues.join(' | ') || 'No major issues')
            );
            item.addEventListener('click', () => this.openBroadcastDossierFromCase(caseData));
            body.append(item);
        });

        panel.append(body);
    }

    getDefaultGlobeLayers() {
        return {
            military: false,
            ocean: false,
            historical: false,
            currentNews: false,
            highStrangeness: false,
            highCredibility: false
        };
    }

    loadGlobeLayers() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.globeLayersStorageKey) || '{}');
            return { ...this.getDefaultGlobeLayers(), ...(parsed || {}) };
        } catch (error) {
            console.warn('Unable to load globe layers:', error);
            return this.getDefaultGlobeLayers();
        }
    }

    persistGlobeLayers() {
        window.localStorage?.setItem(this.globeLayersStorageKey, JSON.stringify(this.activeGlobeLayers));
    }

    getGlobeLayerDefinitions() {
        return [
            ['military', 'Military / official', 'AARO, AATIP, Blue Book, Navy, USAF, PURSUE, or government-linked cases.'],
            ['ocean', 'Ocean / maritime', 'Cases with ocean, gulf, sea, navy, ship, coast, or underwater context.'],
            ['historical', 'Historical', 'Cases before 1900.'],
            ['currentNews', 'Current-news linked', 'Cases connected to the current news archive.'],
            ['highStrangeness', 'High strangeness', 'Humanoid, abduction, mutilation, entity, beam, paranormal, or CE-3 style cases.'],
            ['highCredibility', 'High credibility', 'Cases with tuned credibility of 70% or higher.']
        ];
    }

    caseMatchesGlobeLayer(caseData, layerKey) {
        const text = [
            caseData.name,
            caseData.location,
            caseData.source,
            caseData.status,
            caseData.classification,
            caseData.summary,
            caseData.shape,
            ...(Array.isArray(caseData.tags) ? caseData.tags : [])
        ].join(' ').toLowerCase();
        const year = Number(caseData.year || String(caseData.date || '').match(/^-?\d{1,4}/)?.[0]);

        if (layerKey === 'military') return /aaro|aatip|blue book|project blue|navy|usaf|air force|military|pentagon|pursue|government|war|cia/.test(text);
        if (layerKey === 'ocean') return /ocean|sea|gulf|navy|ship|fleet|coast|underwater|submarine|bay|lake|water|maritime/.test(text);
        if (layerKey === 'historical') return Number.isFinite(year) && year < 1900;
        if (layerKey === 'currentNews') return this.getNewsLinksForCase(caseData, 1).length > 0;
        if (layerKey === 'highStrangeness') return /humanoid|entity|abduction|missing time|mutilation|beam|paranormal|monster|ce-3|landing|occupant/.test(text);
        if (layerKey === 'highCredibility') return this.getTunedCredibility(caseData) >= 70;
        return false;
    }

    getLayerFilteredCases(baseCases = this.cases) {
        const active = Object.entries(this.activeGlobeLayers)
            .filter(([, enabled]) => enabled)
            .map(([key]) => key);
        if (!active.length) return [...baseCases];
        return baseCases.filter((caseData) => active.some((layerKey) => this.caseMatchesGlobeLayer(caseData, layerKey)));
    }

    applyGlobeLayerFilters() {
        const baseCases = this.searchEngine?.search?.() || this.cases;
        this.filteredCases = this.getLayerFilteredCases(baseCases);
        this.updateFilteredView();
        this.renderGlobeLayersPanel();
    }

    renderGlobeLayersPanel() {
        const panel = this.createUtilityPanel('globeLayersPanel', 'Globe Cluster Layers');
        const body = document.createElement('div');
        body.className = 'utility-panel-body layer-panel-body';

        const activeCount = Object.values(this.activeGlobeLayers).filter(Boolean).length;
        const summary = document.createElement('div');
        summary.className = 'utility-preview-card';
        summary.append(
            this.createTextNodeElement('span', 'Active layer filters'),
            this.createTextNodeElement('strong', String(activeCount)),
            this.createTextNodeElement('p', `${this.getLayerFilteredCases(this.cases).length} of ${this.cases.length} cases match the active cluster view.`)
        );
        body.append(summary);

        this.getGlobeLayerDefinitions().forEach(([key, label, description]) => {
            const row = document.createElement('label');
            row.className = 'layer-toggle-row';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = Boolean(this.activeGlobeLayers[key]);
            checkbox.addEventListener('change', () => {
                this.activeGlobeLayers[key] = checkbox.checked;
                this.persistGlobeLayers();
                this.applyGlobeLayerFilters();
            });
            const copy = document.createElement('span');
            copy.append(
                this.createTextNodeElement('strong', label),
                this.createTextNodeElement('small', description)
            );
            row.append(checkbox, copy);
            body.append(row);
        });

        const clear = document.createElement('button');
        clear.type = 'button';
        clear.className = 'utility-primary-action';
        clear.textContent = 'Clear Layers';
        clear.addEventListener('click', () => {
            this.activeGlobeLayers = this.getDefaultGlobeLayers();
            this.persistGlobeLayers();
            this.applyGlobeLayerFilters();
        });
        body.append(clear);
        panel.append(body);
    }

    loadStagedItems() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.stagingInboxStorageKey) || '[]');
            return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && item.raw) : [];
        } catch (error) {
            console.warn('Unable to load staging inbox:', error);
            return [];
        }
    }

    persistStagedItems() {
        window.localStorage?.setItem(this.stagingInboxStorageKey, JSON.stringify(this.stagedItems.slice(0, 60)));
    }

    validateStagedRecord(record) {
        const issues = [];
        const type = record?.source === 'current-news' || record?.fileType ? 'news' : 'case';
        const required = type === 'news'
            ? ['id', 'title', 'date', 'summary', 'url']
            : ['id', 'name', 'date', 'location', 'summary', 'source'];

        required.forEach((field) => {
            if (!record || record[field] === undefined || record[field] === '') issues.push(`Missing ${field}`);
        });

        if (record?.id && this.cases.some((caseData) => caseData.id === record.id)) issues.push('Duplicate case id');
        const news = typeof CURRENT_UAP_NEWS !== 'undefined' ? CURRENT_UAP_NEWS : window.CURRENT_UAP_NEWS || [];
        if (record?.id && news.some((item) => item.id === record.id)) issues.push('Duplicate news id');
        if (record?.url && !this.getSafeExternalUrl(record.url)) issues.push('Invalid URL');
        if (type === 'case' && (!record?.coordinates || !Number.isFinite(Number(record.coordinates.lat)) || !Number.isFinite(Number(record.coordinates.lng)))) {
            issues.push('Missing or invalid coordinates');
        }

        return { type, issues, status: issues.length ? 'needs-review' : 'ready' };
    }

    stageInboxRecords(rawText, button = null) {
        let parsed;
        try {
            parsed = JSON.parse(rawText);
        } catch (error) {
            if (button) button.textContent = 'Invalid JSON';
            return [];
        }

        const records = Array.isArray(parsed) ? parsed : [parsed];
        const staged = records.map((record) => {
            const validation = this.validateStagedRecord(record);
            return {
                id: `stage-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                recordId: record.id || '',
                title: record.name || record.title || 'Untitled staged item',
                type: validation.type,
                status: validation.status,
                issues: validation.issues,
                raw: record,
                createdAt: new Date().toISOString()
            };
        });

        this.stagedItems.unshift(...staged);
        this.stagedItems = this.stagedItems.slice(0, 60);
        this.persistStagedItems();
        this.renderStagingPanel();
        if (button) button.textContent = `Staged ${staged.length}`;
        return staged;
    }

    renderStagingPanel() {
        const panel = this.createUtilityPanel('stagingPanel', 'Data Staging Inbox');
        const body = document.createElement('div');
        body.className = 'utility-panel-body staging-panel-body';

        const label = document.createElement('label');
        label.textContent = 'Paste case or news JSON';
        const input = document.createElement('textarea');
        input.id = 'stagingJsonInput';
        input.placeholder = '{ \"id\": \"case-id\", \"name\": \"Case name\", ... }';
        label.append(input);
        body.append(label);

        const actions = document.createElement('div');
        actions.className = 'utility-inline-actions';
        const stage = document.createElement('button');
        stage.type = 'button';
        stage.className = 'utility-primary-action';
        stage.textContent = 'Validate And Stage';
        stage.addEventListener('click', () => this.stageInboxRecords(input.value, stage));
        const copyReady = document.createElement('button');
        copyReady.type = 'button';
        copyReady.className = 'utility-primary-action';
        copyReady.textContent = 'Copy Ready JSON';
        copyReady.addEventListener('click', () => {
            const ready = this.stagedItems.filter((item) => item.status === 'ready').map((item) => item.raw);
            navigator.clipboard?.writeText(JSON.stringify(ready, null, 4));
            copyReady.textContent = 'Copied';
        });
        actions.append(stage, copyReady);
        body.append(actions);

        const list = document.createElement('div');
        list.className = 'staging-list';
        if (!this.stagedItems.length) {
            list.append(this.createTextNodeElement('p', 'No staged items yet.'));
        } else {
            this.stagedItems.slice(0, 12).forEach((item) => {
                const row = document.createElement('div');
                row.className = `staging-item status-${this.sanitizeClassToken(item.status)}`;
                row.append(
                    this.createTextNodeElement('strong', item.title),
                    this.createTextNodeElement('span', `${item.type} / ${item.status}`),
                    this.createTextNodeElement('small', item.issues.length ? item.issues.join(' | ') : 'Ready to add to source files')
                );
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.textContent = 'Remove';
                remove.addEventListener('click', () => {
                    this.stagedItems = this.stagedItems.filter((staged) => staged.id !== item.id);
                    this.persistStagedItems();
                    this.renderStagingPanel();
                });
                row.append(remove);
                list.append(row);
            });
        }
        body.append(list);
        panel.append(body);
    }

    loadSavedInvestigations() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.savedInvestigationsStorageKey) || '[]');
            return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && item.name) : [];
        } catch (error) {
            console.warn('Unable to load saved investigations:', error);
            return [];
        }
    }

    persistSavedInvestigations() {
        window.localStorage?.setItem(this.savedInvestigationsStorageKey, JSON.stringify(this.savedInvestigations.slice(0, 30)));
    }

    saveCurrentInvestigation(name) {
        const title = String(name || '').trim() || `Investigation ${new Date().toLocaleDateString()}`;
        const episodes = this.theater?.episodes || [];
        const snapshot = {
            id: `investigation-${Date.now()}`,
            name: title,
            savedAt: new Date().toISOString(),
            researchQueue: this.researchQueue,
            notebookEntries: this.notebookEntries,
            credibilityWeights: this.credibilityWeights,
            theaterEpisodes: episodes
        };

        this.savedInvestigations.unshift(snapshot);
        this.savedInvestigations = this.savedInvestigations.slice(0, 30);
        this.persistSavedInvestigations();
        this.renderInvestigationsPanel();
        return snapshot;
    }

    loadSavedInvestigation(id) {
        const snapshot = this.savedInvestigations.find((item) => item.id === id);
        if (!snapshot) return;

        this.researchQueue = Array.isArray(snapshot.researchQueue) ? snapshot.researchQueue : [];
        this.notebookEntries = Array.isArray(snapshot.notebookEntries) ? snapshot.notebookEntries : [];
        this.credibilityWeights = { ...this.getDefaultCredibilityWeights(), ...(snapshot.credibilityWeights || {}) };
        if (this.theater && Array.isArray(snapshot.theaterEpisodes)) {
            this.theater.episodes = snapshot.theaterEpisodes;
            this.theater.persistEpisodes?.();
            this.theater.renderLog?.();
        }
        this.persistResearchQueue();
        this.persistNotebookEntries();
        this.persistCredibilityWeights();
        this.renderResearchQueuePanel();
        this.renderNotebookPanel();
        this.renderCredibilityPanel();
        this.renderInvestigationsPanel();
        this.dossier?.updateQueueButton?.();
    }

    renderInvestigationsPanel() {
        const panel = this.createUtilityPanel('investigationsPanel', 'Saved Investigations');
        const body = document.createElement('div');
        body.className = 'utility-panel-body investigations-panel-body';

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Investigation name';
        const nameInput = document.createElement('input');
        nameInput.id = 'investigationNameInput';
        nameInput.placeholder = 'e.g. PURSUE Release Review';
        nameLabel.append(nameInput);
        const save = document.createElement('button');
        save.type = 'button';
        save.className = 'utility-primary-action';
        save.textContent = 'Save Current Investigation';
        save.addEventListener('click', () => this.saveCurrentInvestigation(nameInput.value));
        body.append(nameLabel, save);

        const list = document.createElement('div');
        list.className = 'investigation-list';
        if (!this.savedInvestigations.length) {
            list.append(this.createTextNodeElement('p', 'No saved investigations yet.'));
        } else {
            this.savedInvestigations.slice(0, 12).forEach((snapshot) => {
                const row = document.createElement('div');
                row.className = 'investigation-item';
                row.append(
                    this.createTextNodeElement('strong', snapshot.name),
                    this.createTextNodeElement('span', new Date(snapshot.savedAt).toLocaleString()),
                    this.createTextNodeElement('small', `${snapshot.researchQueue?.length || 0} queued / ${snapshot.notebookEntries?.length || 0} notes / ${snapshot.theaterEpisodes?.length || 0} episodes`)
                );
                const actions = document.createElement('div');
                actions.className = 'utility-inline-actions';
                const load = document.createElement('button');
                load.type = 'button';
                load.textContent = 'Load';
                load.addEventListener('click', () => this.loadSavedInvestigation(snapshot.id));
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.textContent = 'Delete';
                remove.addEventListener('click', () => {
                    this.savedInvestigations = this.savedInvestigations.filter((item) => item.id !== snapshot.id);
                    this.persistSavedInvestigations();
                    this.renderInvestigationsPanel();
                });
                actions.append(load, remove);
                row.append(actions);
                list.append(row);
            });
        }
        body.append(list);
        panel.append(body);
    }

    getSourceExcerpt(source, fallback = '') {
        const text = source?.excerpt || source?.quote || source?.summary || source?.description || fallback || '';
        return String(text).replace(/\s+/g, ' ').trim().slice(0, 240);
    }

    getSourceManagerEntries(caseData) {
        const resources = Array.isArray(caseData?.resources) ? caseData.resources : [];
        const newsLinks = this.getNewsLinksForCase(caseData, 3);
        const generated = [
            {
                title: 'Black Vault search',
                type: 'research',
                reliability: 'Context source',
                excerpt: 'Search the FOIA archive for source context, document mentions, and public declassification trails.',
                url: `https://www.theblackvault.com/?s=${encodeURIComponent(`${caseData?.name || ''} UFO`)}`
            },
            {
                title: 'News search',
                type: 'research',
                reliability: 'Follow-up source',
                excerpt: 'Search recent coverage for updates, corrections, witness follow-ups, or official responses.',
                url: `https://news.google.com/search?q=${encodeURIComponent(`${caseData?.name || ''} UFO`)}&hl=en-US&gl=US&ceid=US:en`
            }
        ];

        return [
            ...resources.map((resource) => ({
                title: resource.title || resource.url || 'Linked source',
                type: resource.type || 'source',
                reliability: 'Attached to case record',
                excerpt: this.getSourceExcerpt(resource, caseData?.summary),
                url: resource.url || ''
            })),
            ...newsLinks.map((item) => ({
                title: item.title,
                type: 'current-news',
                reliability: item.linkReason,
                excerpt: this.getSourceExcerpt(item),
                url: item.url || ''
            })),
            ...generated
        ].map((entry) => ({
            ...entry,
            verificationStatus: this.getSourceVerificationStatus(entry)
        }));
    }

    getComparisonTimeline(caseData, limit = 6) {
        if (!caseData) return [];
        const cases = [caseData, ...this.getRelatedCases(caseData, limit - 1)];
        return cases
            .map((item) => ({
                id: item.id,
                name: item.name || item.id || 'Unknown case',
                date: item.date || item.year || 'Date unknown',
                year: Number(item.year || String(item.date || '').match(/^-?\d{1,4}/)?.[0]),
                location: item.location || 'Unknown location',
                shape: item.shape || 'Unknown shape',
                source: item.source || 'Local archive',
                quality: this.getCaseQualityScore(item).score,
                isBase: item.id === caseData.id,
                caseData: item
            }))
            .sort((a, b) => {
                if (Number.isFinite(a.year) && Number.isFinite(b.year)) return a.year - b.year;
                return String(a.date).localeCompare(String(b.date));
            });
    }

    generateCaseReportHtml(caseData) {
        if (!caseData) return '';
        const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
        const quality = this.getCaseQualityScore(caseData);
        const sources = this.getSourceManagerEntries(caseData).slice(0, 10);
        const timeline = this.getComparisonTimeline(caseData, 6);
        const news = this.getNewsLinksForCase(caseData, 5);

        return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escape(caseData.name || 'Case Report')}</title>
<style>
body{font-family:Arial,sans-serif;line-height:1.55;color:#18201c;padding:32px;max-width:920px;margin:auto}
h1,h2{letter-spacing:.02em}
.meta,.card{border:1px solid #cfd8d1;border-radius:8px;padding:14px;margin:12px 0}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
small{color:#52615a}
@media print{body{padding:0}.no-print{display:none}}
</style>
</head>
<body>
<h1>${escape(caseData.name || 'Unknown Case')}</h1>
<p>${escape(caseData.summary || 'No summary available.')}</p>
<div class="grid">
<div class="meta"><strong>Date</strong><br>${escape(caseData.date || caseData.year || 'Unknown')}</div>
<div class="meta"><strong>Location</strong><br>${escape(caseData.location || 'Unknown')}</div>
<div class="meta"><strong>Source</strong><br>${escape(caseData.source || 'Local archive')}</div>
<div class="meta"><strong>Quality</strong><br>${quality.score}% archive-ready</div>
</div>
<h2>Open Issues</h2>
<ul>${(quality.issues.length ? quality.issues : ['No major gaps detected']).map((issue) => `<li>${escape(issue)}</li>`).join('')}</ul>
<h2>Evidence Timeline</h2>
<ul>${timeline.map((item) => `<li><strong>${escape(item.date)}</strong> - ${escape(item.name)} <small>${escape(item.location)} / ${escape(item.source)}</small></li>`).join('')}</ul>
<h2>Sources</h2>
${sources.map((source) => `<div class="card"><strong>${escape(source.title)}</strong><br><small>${escape(source.type)} / ${escape(source.reliability)}</small><p>${escape(source.excerpt || '')}</p>${source.url ? `<a href="${escape(source.url)}">${escape(source.url)}</a>` : ''}</div>`).join('')}
<h2>Current News Links</h2>
${news.length ? news.map((item) => `<div class="card"><strong>${escape(item.title)}</strong><br><small>${escape(item.date)} / ${escape(item.author || '')}</small><p>${escape(item.summary || '')}</p></div>`).join('') : '<p>No current-news links.</p>'}
<button class="no-print" onclick="window.print()">Print / Save PDF</button>
</body>
</html>`;
    }

    exportCaseReport(caseData) {
        const html = this.generateCaseReportHtml(caseData);
        if (!html) return;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener,noreferrer');
        window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    }

    getDataHealthReport() {
        const caseIssues = this.cases.map((caseData) => ({
            caseData,
            quality: this.getCaseQualityScore(caseData)
        }));
        const names = new Map();
        this.cases.forEach((caseData) => {
            const key = String(caseData.name || '').toLowerCase();
            if (!key) return;
            names.set(key, [...(names.get(key) || []), caseData]);
        });
        const duplicateNames = [...names.values()].filter((group) => group.length > 1);
        const badResourceUrls = this.cases.flatMap((caseData) => (caseData.resources || [])
            .filter((resource) => resource.url && !this.getSafeExternalUrl(resource.url))
            .map((resource) => ({ caseData, resource })));

        return {
            totalCases: this.cases.length,
            missingCoordinates: caseIssues.filter((item) => item.quality.issues.includes('Missing coordinates')),
            thinSummaries: caseIssues.filter((item) => item.quality.issues.includes('Thin summary')),
            missingSources: caseIssues.filter((item) => item.quality.issues.includes('Missing source')),
            noExternalLinks: caseIssues.filter((item) => item.quality.issues.includes('No external source links')),
            duplicateNames,
            badResourceUrls,
            stagedNeedsReview: this.stagedItems.filter((item) => item.status !== 'ready')
        };
    }

    renderDataHealthPanel() {
        const panel = this.createUtilityPanel('dataHealthPanel', 'Data Health Admin');
        const body = document.createElement('div');
        body.className = 'utility-panel-body data-health-panel';
        const report = this.getDataHealthReport();

        const metrics = [
            ['Missing coordinates', report.missingCoordinates.length],
            ['Thin summaries', report.thinSummaries.length],
            ['Missing sources', report.missingSources.length],
            ['No source links', report.noExternalLinks.length],
            ['Duplicate names', report.duplicateNames.length],
            ['Bad URLs', report.badResourceUrls.length],
            ['Staged review', report.stagedNeedsReview.length]
        ];
        const grid = document.createElement('div');
        grid.className = 'quality-summary-grid';
        metrics.forEach(([label, value]) => {
            const card = document.createElement('div');
            card.className = 'diagnostic-card';
            card.append(this.createTextNodeElement('span', label), this.createTextNodeElement('strong', String(value)));
            grid.append(card);
        });
        body.append(grid);

        const list = document.createElement('div');
        list.className = 'health-issue-list';
        report.missingCoordinates.concat(report.thinSummaries, report.noExternalLinks).slice(0, 14).forEach(({ caseData, quality }) => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'quality-case-item';
            item.append(
                this.createTextNodeElement('strong', `${quality.score}% / ${caseData.name || caseData.id}`),
                this.createTextNodeElement('span', quality.issues.join(' | '))
            );
            item.addEventListener('click', () => this.openBroadcastDossierFromCase(caseData));
            list.append(item);
        });
        body.append(list);

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'utility-primary-action';
        copy.textContent = 'Copy Health Report';
        copy.addEventListener('click', () => {
            const packet = {
                generatedAt: new Date().toISOString(),
                metrics: Object.fromEntries(metrics),
                worstCases: report.missingCoordinates.concat(report.thinSummaries, report.noExternalLinks).slice(0, 20).map(({ caseData, quality }) => ({
                    id: caseData.id,
                    name: caseData.name,
                    score: quality.score,
                    issues: quality.issues
                }))
            };
            navigator.clipboard?.writeText(JSON.stringify(packet, null, 4));
            copy.textContent = 'Copied';
        });
        body.append(copy);
        panel.append(body);
    }

    setupKeyboardShortcuts() {
        if (this.keyboardShortcutsBound) return;
        this.keyboardShortcutsBound = true;

        document.addEventListener('keydown', (event) => {
            const target = event.target;
            const isTyping = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

            if (event.key === 'Escape') {
                this.closeUtilityPanels();
                return;
            }

            if (isTyping || event.ctrlKey || event.metaKey || event.altKey) return;

            if (event.key === '/') {
                event.preventDefault();
                document.getElementById('searchInput')?.focus();
            } else if (event.key === '?') {
                event.preventDefault();
                this.toggleUtilityPanel('shortcutsPanel');
            } else if (event.key.toLowerCase() === 'b') {
                this.toggleUtilityPanel('dailyBriefingPanel');
            } else if (event.key.toLowerCase() === 'l') {
                this.toggleUtilityPanel('globeLayersPanel');
            } else if (event.key.toLowerCase() === 'g') {
                this.toggleUtilityPanel('graphPanel');
            } else if (event.key.toLowerCase() === 'm') {
                this.toggleUtilityPanel('missionsPanel');
            } else if (event.key.toLowerCase() === 'r') {
                this.toggleUtilityPanel('researchAssistantPanel');
            } else if (event.key.toLowerCase() === 's') {
                this.toggleUtilityPanel('stagingPanel');
            }
        });
    }

    renderShortcutsPanel() {
        const panel = this.createUtilityPanel('shortcutsPanel', 'Keyboard Shortcuts');
        const body = document.createElement('div');
        body.className = 'utility-panel-body shortcuts-panel-body';
        [
            ['/', 'Focus case search'],
            ['?', 'Open shortcuts panel'],
            ['B', 'Open Tonight\'s Transmission'],
            ['L', 'Open Globe Layers'],
            ['G', 'Open Case Graph'],
            ['M', 'Open Missions'],
            ['R', 'Open Research Workspace'],
            ['S', 'Open Staging Inbox'],
            ['Esc', 'Close utility panels']
        ].forEach(([key, action]) => {
            const row = document.createElement('div');
            row.className = 'shortcut-row';
            row.append(this.createTextNodeElement('strong', key), this.createTextNodeElement('span', action));
            body.append(row);
        });
        panel.append(body);
    }

    maybeShowFirstRunGuide() {
        if (window.localStorage?.getItem(this.guideStorageKey) === 'true') return;
        window.setTimeout(() => {
            if (!document.body.classList.contains('dossier-open')) {
                this.toggleUtilityPanel('guidePanel');
            }
        }, 900);
    }

    renderGuidePanel() {
        const panel = this.createUtilityPanel('guidePanel', 'Guided Transmission');
        const body = document.createElement('div');
        body.className = 'utility-panel-body guide-panel-body';

        [
            ['1', 'Start at the globe', 'Use layers and search to find clusters before opening a case.'],
            ['2', 'Open a dossier', 'Read On Air, Case File, Tape Vault, Signal Map, and Analysis in order.'],
            ['3', 'Queue and note', 'Save interesting cases into the research queue and notebook.'],
            ['4', 'Check evidence', 'Use source excerpts, media viewer, current-news links, and verification statuses.'],
            ['5', 'Build a transmission', 'Use Theater Mode, missions, saved investigations, and reports to package the story.']
        ].forEach(([number, title, copy]) => {
            const step = document.createElement('div');
            step.className = 'guide-step-card';
            step.append(
                this.createTextNodeElement('span', `STEP ${number}`),
                this.createTextNodeElement('strong', title),
                this.createTextNodeElement('p', copy)
            );
            body.append(step);
        });

        const actions = document.createElement('div');
        actions.className = 'utility-inline-actions';
        const start = document.createElement('button');
        start.type = 'button';
        start.className = 'utility-primary-action';
        start.textContent = 'Open First Case';
        start.addEventListener('click', () => this.openBroadcastDossierFromCase(this.filteredCases[0] || this.cases[0], { focusGlobe: true }));
        const done = document.createElement('button');
        done.type = 'button';
        done.className = 'utility-primary-action';
        done.textContent = 'Mark Guide Complete';
        done.addEventListener('click', () => {
            window.localStorage?.setItem(this.guideStorageKey, 'true');
            this.closeUtilityPanels();
        });
        actions.append(start, done);
        body.append(actions);
        panel.append(body);
    }

    getActiveCaseForTools() {
        return this.dossier?.activeCase || this.selectedCase || this.filteredCases[0] || this.cases[0] || null;
    }

    getCaseGraphData(caseData = this.getActiveCaseForTools()) {
        const base = caseData || this.cases[0];
        if (!base) return { nodes: [], links: [] };

        const related = this.getRelatedCases(base, 5);
        const newsLinks = this.getNewsLinksForCase(base, 3);
        const sourceEntries = this.getSourceManagerEntries(base).slice(0, 4);
        const tagNodes = [...new Set([base.shape, base.source, ...(base.tags || [])].filter(Boolean))].slice(0, 4);
        const nodes = [
            { id: base.id, label: base.name || base.id, type: 'case', caseData: base },
            ...related.map((item) => ({ id: item.id, label: item.name || item.id, type: 'related-case', caseData: item })),
            ...newsLinks.map((item) => ({ id: item.id, label: item.title, type: 'news', url: item.url })),
            ...sourceEntries.map((item, index) => ({ id: `source-${index}-${item.title}`, label: item.title, type: 'source', url: item.url })),
            ...tagNodes.map((tag) => ({ id: `tag-${tag}`, label: String(tag), type: 'tag' }))
        ];
        const links = nodes.slice(1).map((node) => ({ from: base.id, to: node.id, label: node.type }));
        return { nodes, links };
    }

    renderGraphPanel() {
        const panel = this.createUtilityPanel('graphPanel', 'Case Graph View');
        const body = document.createElement('div');
        body.className = 'utility-panel-body graph-panel-body';
        const graph = this.getCaseGraphData();
        const center = graph.nodes[0];

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 360 260');
        svg.setAttribute('class', 'case-graph-svg');
        const cx = 180;
        const cy = 130;
        const radius = 98;
        graph.nodes.forEach((node, index) => {
            const angle = index === 0 ? 0 : ((index - 1) / Math.max(1, graph.nodes.length - 1)) * Math.PI * 2;
            node.x = index === 0 ? cx : cx + Math.cos(angle) * radius;
            node.y = index === 0 ? cy : cy + Math.sin(angle) * radius;
        });
        graph.links.forEach((link) => {
            const from = graph.nodes.find((node) => node.id === link.from);
            const to = graph.nodes.find((node) => node.id === link.to);
            if (!from || !to) return;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y);
            svg.append(line);
        });
        graph.nodes.forEach((node) => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', `graph-node node-${this.sanitizeClassToken(node.type)}`);
            group.setAttribute('tabindex', '0');
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', node.id === center?.id ? 16 : 10);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 26);
            text.textContent = String(node.label || '').slice(0, 22);
            group.append(circle, text);
            svg.append(group);
        });
        body.append(svg);

        const list = document.createElement('div');
        list.className = 'graph-node-list';
        graph.nodes.slice(1).forEach((node) => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'graph-node-row';
            row.append(
                this.createTextNodeElement('strong', node.label || node.id),
                this.createTextNodeElement('span', node.type)
            );
            row.addEventListener('click', () => {
                if (node.caseData) this.openBroadcastDossierFromCase(node.caseData);
                else if (node.url) window.open(this.getSafeExternalUrl(node.url), '_blank', 'noopener,noreferrer');
            });
            list.append(row);
        });
        body.append(list);
        panel.append(body);
    }

    loadSavedAdvancedSearches() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.advancedSearchStorageKey) || '[]');
            return Array.isArray(parsed) ? parsed.filter((item) => item && item.name && item.filters) : [];
        } catch (error) {
            console.warn('Unable to load saved advanced searches:', error);
            return [];
        }
    }

    persistSavedAdvancedSearches() {
        window.localStorage?.setItem(this.advancedSearchStorageKey, JSON.stringify(this.savedAdvancedSearches.slice(0, 24)));
    }

    getAdvancedSearchFiltersFromPanel() {
        return {
            query: document.getElementById('advancedSearchQuery')?.value || '',
            shape: document.getElementById('advancedSearchShape')?.value || 'all',
            source: document.getElementById('advancedSearchSource')?.value || 'all',
            era: document.getElementById('advancedSearchEra')?.value || 'all',
            status: document.getElementById('advancedSearchStatus')?.value || 'all',
            newsLinked: Boolean(document.getElementById('advancedSearchNewsLinked')?.checked)
        };
    }

    applyAdvancedSearch(filters) {
        const query = String(filters.query || '').toLowerCase().trim();
        this.filteredCases = this.cases.filter((caseData) => {
            const text = [caseData.name, caseData.summary, caseData.location, caseData.source, caseData.shape, caseData.status, ...(caseData.tags || [])].join(' ').toLowerCase();
            const year = Number(caseData.year || String(caseData.date || '').match(/^-?\d{1,4}/)?.[0]);
            if (query && !text.includes(query)) return false;
            if (filters.shape !== 'all' && String(caseData.shape || '').toLowerCase() !== filters.shape) return false;
            if (filters.source !== 'all' && String(caseData.source || '').toLowerCase() !== filters.source) return false;
            if (filters.status !== 'all' && !String(caseData.status || '').toLowerCase().includes(filters.status)) return false;
            if (filters.newsLinked && !this.getNewsLinksForCase(caseData, 1).length) return false;
            if (filters.era === 'historical' && !(Number.isFinite(year) && year < 1900)) return false;
            if (filters.era === 'modern' && !(Number.isFinite(year) && year >= 1947 && year < 2000)) return false;
            if (filters.era === 'uap' && !(Number.isFinite(year) && year >= 2000)) return false;
            return true;
        });
        this.visibleCount = 30;
        this.updateFilteredView();
        this.renderSearchBuilderPanel();
    }

    renderSearchBuilderPanel() {
        const panel = this.createUtilityPanel('searchBuilderPanel', 'Advanced Search Builder');
        const body = document.createElement('div');
        body.className = 'utility-panel-body search-builder-panel';
        const shapes = ['all', ...new Set(this.cases.map((item) => String(item.shape || '').toLowerCase()).filter(Boolean))].slice(0, 18);
        const sources = ['all', ...new Set(this.cases.map((item) => String(item.source || '').toLowerCase()).filter(Boolean))].slice(0, 24);
        const controls = [
            ['advancedSearchQuery', 'Query', 'input', []],
            ['advancedSearchShape', 'Shape', 'select', shapes],
            ['advancedSearchSource', 'Source', 'select', sources],
            ['advancedSearchEra', 'Era', 'select', ['all', 'historical', 'modern', 'uap']],
            ['advancedSearchStatus', 'Status contains', 'select', ['all', 'unexplained', 'unresolved', 'explained', 'unknown']]
        ];
        controls.forEach(([id, label, kind, options]) => {
            const wrap = document.createElement('label');
            wrap.textContent = label;
            const input = kind === 'select' ? document.createElement('select') : document.createElement('input');
            input.id = id;
            options.forEach((option) => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option === 'all' ? 'All' : option;
                input.append(opt);
            });
            wrap.append(input);
            body.append(wrap);
        });
        const newsLabel = document.createElement('label');
        newsLabel.className = 'layer-toggle-row';
        const news = document.createElement('input');
        news.type = 'checkbox';
        news.id = 'advancedSearchNewsLinked';
        const newsCopy = document.createElement('span');
        newsCopy.append(this.createTextNodeElement('strong', 'Current-news linked'), this.createTextNodeElement('small', 'Only cases with current-news matches'));
        newsLabel.append(news, newsCopy);
        body.append(newsLabel);

        const actions = document.createElement('div');
        actions.className = 'utility-inline-actions';
        const apply = document.createElement('button');
        apply.type = 'button';
        apply.className = 'utility-primary-action';
        apply.textContent = 'Apply Search';
        apply.addEventListener('click', () => this.applyAdvancedSearch(this.getAdvancedSearchFiltersFromPanel()));
        const save = document.createElement('button');
        save.type = 'button';
        save.className = 'utility-primary-action';
        save.textContent = 'Save Search';
        save.addEventListener('click', () => {
            const filters = this.getAdvancedSearchFiltersFromPanel();
            const name = filters.query || `${filters.shape}/${filters.source}/${filters.era}`;
            this.savedAdvancedSearches.unshift({ id: `search-${Date.now()}`, name, filters });
            this.persistSavedAdvancedSearches();
            this.renderSearchBuilderPanel();
        });
        actions.append(apply, save);
        body.append(actions);

        const chips = document.createElement('div');
        chips.className = 'saved-search-list';
        this.savedAdvancedSearches.slice(0, 8).forEach((search) => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'saved-search-chip';
            chip.textContent = search.name;
            chip.addEventListener('click', () => this.applyAdvancedSearch(search.filters));
            chips.append(chip);
        });
        body.append(chips);
        panel.append(body);
    }

    loadCompletedMissions() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.missionsStorageKey) || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('Unable to load missions:', error);
            return [];
        }
    }

    persistCompletedMissions() {
        window.localStorage?.setItem(this.missionsStorageKey, JSON.stringify(this.completedMissions));
    }

    getMissionDefinitions() {
        return [
            {
                id: 'ocean-cases',
                title: 'Find 3 ocean cases',
                target: 3,
                current: this.cases.filter((caseData) => this.caseMatchesGlobeLayer(caseData, 'ocean')).length,
                action: () => {
                    this.activeGlobeLayers = { ...this.getDefaultGlobeLayers(), ocean: true };
                    this.persistGlobeLayers();
                    this.applyGlobeLayerFilters();
                }
            },
            {
                id: 'news-linked',
                title: 'Open current-news linked cases',
                target: 5,
                current: this.cases.filter((caseData) => this.getNewsLinksForCase(caseData, 1).length).length,
                action: () => this.toggleUtilityPanel('graphPanel')
            },
            {
                id: 'data-cleanup',
                title: 'Fix 5 weak records',
                target: 5,
                current: this.cases.filter((caseData) => this.getCaseQualityScore(caseData).score < 70).length,
                action: () => this.toggleUtilityPanel('dataHealthPanel')
            },
            {
                id: 'broadcast-builder',
                title: 'Build a nightly broadcast',
                target: 1,
                current: this.theater?.episodes?.length || 0,
                action: () => this.navigateToSection('theater')
            }
        ];
    }

    renderMissionsPanel() {
        const panel = this.createUtilityPanel('missionsPanel', 'Investigation Missions');
        const body = document.createElement('div');
        body.className = 'utility-panel-body missions-panel-body';
        this.getMissionDefinitions().forEach((mission) => {
            const complete = this.completedMissions.includes(mission.id);
            const card = document.createElement('div');
            card.className = `mission-card${complete ? ' complete' : ''}`;
            const percent = Math.min(100, Math.round((Math.min(mission.current, mission.target) / mission.target) * 100));
            const meter = document.createElement('div');
            meter.className = 'quality-meter';
            meter.append(Object.assign(document.createElement('div'), { className: 'quality-meter-fill' }));
            meter.firstChild.style.width = `${percent}%`;
            card.append(
                this.createTextNodeElement('strong', mission.title),
                this.createTextNodeElement('span', `${Math.min(mission.current, mission.target)} / ${mission.target}`),
                meter
            );
            const actions = document.createElement('div');
            actions.className = 'utility-inline-actions';
            const go = document.createElement('button');
            go.type = 'button';
            go.textContent = 'Go';
            go.addEventListener('click', mission.action);
            const mark = document.createElement('button');
            mark.type = 'button';
            mark.textContent = complete ? 'Completed' : 'Mark Complete';
            mark.addEventListener('click', () => {
                if (!this.completedMissions.includes(mission.id)) this.completedMissions.push(mission.id);
                this.persistCompletedMissions();
                this.renderMissionsPanel();
            });
            actions.append(go, mark);
            card.append(actions);
            body.append(card);
        });
        panel.append(body);
    }

    buildWorkspaceBackup() {
        const keys = [
            this.researchQueueStorageKey,
            this.notebookStorageKey,
            this.credibilityTuningStorageKey,
            this.globeLayersStorageKey,
            this.stagingInboxStorageKey,
            this.savedInvestigationsStorageKey,
            this.advancedSearchStorageKey,
            this.missionsStorageKey,
            this.sourceVerificationStorageKey,
            'ufo-command-deck-nightly-episodes'
        ];
        return {
            version: 1,
            exportedAt: new Date().toISOString(),
            app: 'UFO Command Deck',
            localStorage: Object.fromEntries(keys.map((key) => [key, window.localStorage?.getItem(key) || '']))
        };
    }

    restoreWorkspaceBackup(rawText) {
        try {
            const backup = JSON.parse(rawText);
            Object.entries(backup.localStorage || {}).forEach(([key, value]) => {
                window.localStorage?.setItem(key, String(value));
            });
            this.researchQueue = this.loadResearchQueue();
            this.notebookEntries = this.loadNotebookEntries();
            this.credibilityWeights = this.loadCredibilityWeights();
            this.activeGlobeLayers = this.loadGlobeLayers();
            this.stagedItems = this.loadStagedItems();
            this.savedInvestigations = this.loadSavedInvestigations();
            this.savedAdvancedSearches = this.loadSavedAdvancedSearches();
            this.completedMissions = this.loadCompletedMissions();
            this.sourceVerification = this.loadSourceVerification();
            this.initUtilityPanels();
            return true;
        } catch (error) {
            console.warn('Unable to restore backup:', error);
            return false;
        }
    }

    renderBackupPanel() {
        const panel = this.createUtilityPanel('backupPanel', 'Archive Backup');
        const body = document.createElement('div');
        body.className = 'utility-panel-body backup-panel-body';
        const preview = document.createElement('pre');
        preview.className = 'utility-preview';
        preview.id = 'backupPreview';
        preview.textContent = JSON.stringify(this.buildWorkspaceBackup(), null, 2);
        body.append(preview);
        const actions = document.createElement('div');
        actions.className = 'utility-inline-actions';
        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'utility-primary-action';
        copy.textContent = 'Copy Backup';
        copy.addEventListener('click', () => {
            navigator.clipboard?.writeText(preview.textContent);
            copy.textContent = 'Copied';
        });
        const restoreLabel = document.createElement('label');
        restoreLabel.textContent = 'Restore backup JSON';
        const restoreInput = document.createElement('textarea');
        restoreInput.id = 'backupRestoreInput';
        restoreLabel.append(restoreInput);
        const restore = document.createElement('button');
        restore.type = 'button';
        restore.className = 'utility-primary-action';
        restore.textContent = 'Restore';
        restore.addEventListener('click', () => {
            restore.textContent = this.restoreWorkspaceBackup(restoreInput.value) ? 'Restored' : 'Restore Failed';
        });
        actions.append(copy, restore);
        body.append(actions, restoreLabel);
        panel.append(body);
    }

    loadSourceVerification() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.sourceVerificationStorageKey) || '{}');
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (error) {
            console.warn('Unable to load source verification:', error);
            return {};
        }
    }

    persistSourceVerification() {
        window.localStorage?.setItem(this.sourceVerificationStorageKey, JSON.stringify(this.sourceVerification));
    }

    getSourceVerificationKey(source) {
        return this.sanitizeClassToken(`${source?.type || 'source'}-${source?.title || source?.url || 'unknown'}`).slice(0, 90);
    }

    getSourceVerificationStatus(source) {
        return this.sourceVerification[this.getSourceVerificationKey(source)] || 'unchecked';
    }

    setSourceVerificationStatus(source, status) {
        this.sourceVerification[this.getSourceVerificationKey(source)] = status;
        this.persistSourceVerification();
        this.renderSourceVerificationPanel();
    }

    renderSourceVerificationPanel() {
        const panel = this.createUtilityPanel('sourceVerificationPanel', 'Source Verification');
        const body = document.createElement('div');
        body.className = 'utility-panel-body source-verification-panel';
        const entries = this.cases.flatMap((caseData) => this.getSourceManagerEntries(caseData).map((source) => ({ caseData, source })));
        const counts = ['unchecked', 'verified', 'needs-excerpt', 'stale-link', 'duplicate'].map((status) => [
            status,
            entries.filter(({ source }) => this.getSourceVerificationStatus(source) === status).length
        ]);
        const grid = document.createElement('div');
        grid.className = 'quality-summary-grid';
        counts.forEach(([label, value]) => {
            const card = document.createElement('div');
            card.className = 'diagnostic-card';
            card.append(this.createTextNodeElement('span', label), this.createTextNodeElement('strong', String(value)));
            grid.append(card);
        });
        body.append(grid);
        entries.slice(0, 12).forEach(({ caseData, source }) => {
            const row = document.createElement('div');
            row.className = 'source-verification-row';
            row.append(
                this.createTextNodeElement('strong', source.title || 'Untitled source'),
                this.createTextNodeElement('span', `${caseData.name || caseData.id} / ${this.getSourceVerificationStatus(source)}`)
            );
            const actions = document.createElement('div');
            actions.className = 'utility-inline-actions';
            ['verified', 'needs-excerpt', 'stale-link', 'duplicate'].forEach((status) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = status;
                button.addEventListener('click', () => {
                    this.setSourceVerificationStatus(source, status);
                    this.dossier?.activeCase && this.dossier.open(this.dossier.activeCase);
                });
                actions.append(button);
            });
            row.append(actions);
            body.append(row);
        });
        panel.append(body);
    }

    getEvidenceMediaItems(caseData) {
        const sources = this.getSourceManagerEntries(caseData);
        return sources.map((source) => {
            const url = source.url || '';
            const lower = url.toLowerCase();
            let mediaType = 'document';
            if (/youtube\.com|youtu\.be|video/.test(`${lower} ${source.type}`)) mediaType = 'video';
            else if (/\.(png|jpg|jpeg|webp|gif)$/i.test(lower) || /image|photo/.test(source.type)) mediaType = 'image';
            else if (/current-news|article|news/.test(`${source.type} ${source.title}`)) mediaType = 'article';
            return { ...source, mediaType, status: this.getSourceVerificationStatus(source) };
        });
    }

    getLocationIntelligence(caseData) {
        const nearby = this.cases
            .filter((candidate) => candidate.id !== caseData?.id)
            .map((candidate) => ({
                caseData: candidate,
                distance: this.getCoordinateDistanceMiles(caseData?.coordinates, candidate.coordinates)
            }))
            .filter((item) => Number.isFinite(item.distance))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 6);
        const distances = [100, 500, 1500].map((miles) => ({
            miles,
            count: this.cases.filter((candidate) => {
                const distance = this.getCoordinateDistanceMiles(caseData?.coordinates, candidate.coordinates);
                return Number.isFinite(distance) && distance <= miles;
            }).length
        }));
        return {
            coordinates: this.formatCoordinates(caseData?.coordinates),
            nearby,
            distances,
            militaryMatches: nearby.filter((item) => this.caseMatchesGlobeLayer(item.caseData, 'military')).length,
            oceanMatches: nearby.filter((item) => this.caseMatchesGlobeLayer(item.caseData, 'ocean')).length
        };
    }

    toggleExhibitMode(force = null) {
        this.exhibitMode = force === null ? !this.exhibitMode : Boolean(force);
        document.body.classList.toggle('exhibit-mode', this.exhibitMode);
        this.renderExhibitPanel();
    }

    renderExhibitPanel() {
        const panel = this.createUtilityPanel('exhibitPanel', 'Public Exhibit Mode');
        const body = document.createElement('div');
        body.className = 'utility-panel-body exhibit-panel-body';
        const featured = [
            this.getDailyBroadcastBriefing().featuredCase,
            this.getDailyBroadcastBriefing().historicalCase,
            ...this.cases.filter((caseData) => this.getTunedCredibility(caseData) >= 75).slice(0, 3)
        ].filter(Boolean);
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'utility-primary-action';
        toggle.textContent = this.exhibitMode ? 'Exit Exhibit Mode' : 'Enter Exhibit Mode';
        toggle.addEventListener('click', () => this.toggleExhibitMode());
        body.append(toggle);
        featured.slice(0, 5).forEach((caseData) => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'briefing-pick-card';
            card.append(
                this.createTextNodeElement('span', 'Curated exhibit case'),
                this.createTextNodeElement('strong', caseData.name || caseData.id),
                this.createTextNodeElement('p', caseData.summary || 'No summary available.')
            );
            card.addEventListener('click', () => this.openBroadcastDossierFromCase(caseData));
            body.append(card);
        });
        const theater = document.createElement('button');
        theater.type = 'button';
        theater.className = 'utility-primary-action';
        theater.textContent = 'Start Broadcast Playlist';
        theater.addEventListener('click', () => this.navigateToSection('theater'));
        body.append(theater);
        panel.append(body);
    }

    getResearchAssistantWorkspace(caseData = this.getActiveCaseForTools()) {
        if (!caseData) return null;
        const sourceEntries = this.getSourceManagerEntries(caseData);
        const quality = this.getCaseQualityScore(caseData);
        const questions = [
            `What is the strongest primary source for ${caseData.name || 'this case'}?`,
            `Which witness, sensor, or official detail needs verification first?`,
            `Are there nearby or same-era cases that change the interpretation?`,
            `Does current news alter the status or public context?`,
            `What claim should be excluded until a source supports it?`
        ];
        const searches = [
            ['Black Vault', `https://www.theblackvault.com/?s=${encodeURIComponent(`${caseData.name || ''} UFO`)}`],
            ['News', `https://news.google.com/search?q=${encodeURIComponent(`${caseData.name || ''} UFO`)}&hl=en-US&gl=US&ceid=US:en`],
            ['Scholar', `https://scholar.google.com/scholar?q=${encodeURIComponent(`${caseData.name || ''} UFO`)}`],
            ['Internet Archive', `https://archive.org/search?query=${encodeURIComponent(`${caseData.name || ''} UFO`)}`]
        ];
        const outline = [
            'One-paragraph incident summary',
            'Known source trail and excerpts',
            'Evidence timeline and location intelligence',
            'Credibility factors and quality gaps',
            'Open questions and next research actions'
        ];
        return { caseData, sourceEntries, quality, questions, searches, outline };
    }

    renderResearchAssistantPanel() {
        const panel = this.createUtilityPanel('researchAssistantPanel', 'Research Assistant Workspace');
        const body = document.createElement('div');
        body.className = 'utility-panel-body research-assistant-panel';
        const workspace = this.getResearchAssistantWorkspace();
        if (!workspace) {
            body.append(this.createTextNodeElement('p', 'No case is available for research.'));
            panel.append(body);
            return;
        }
        body.append(
            this.createTextNodeElement('span', 'Active case'),
            this.createTextNodeElement('strong', workspace.caseData.name || workspace.caseData.id),
            this.createTextNodeElement('p', `${workspace.quality.score}% archive-ready / ${workspace.sourceEntries.length} source leads`)
        );
        const questions = document.createElement('div');
        questions.className = 'assistant-section-list';
        workspace.questions.forEach((question) => questions.append(this.createTextNodeElement('p', question)));
        body.append(this.createTextNodeElement('strong', 'Research Questions'), questions);
        const links = document.createElement('div');
        links.className = 'utility-inline-actions';
        workspace.searches.forEach(([label, url]) => {
            const link = document.createElement('button');
            link.type = 'button';
            link.textContent = label;
            link.addEventListener('click', () => window.open(url, '_blank', 'noopener,noreferrer'));
            links.append(link);
        });
        body.append(this.createTextNodeElement('strong', 'Search Links'), links);
        const outline = document.createElement('ol');
        workspace.outline.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            outline.append(li);
        });
        body.append(this.createTextNodeElement('strong', 'Draft Report Outline'), outline);
        panel.append(body);
    }

    renderNewsIntakePanel() {
        const panel = this.createUtilityPanel('newsIntakePanel', 'Current News Intake');
        const body = document.createElement('div');
        body.className = 'utility-panel-body';
        const fields = [
            ['newsTitleInput', 'Title'],
            ['newsDateInput', 'Date'],
            ['newsAuthorInput', 'Author'],
            ['newsUrlInput', 'URL'],
            ['newsSummaryInput', 'Summary']
        ];

        fields.forEach(([id, label]) => {
            const wrap = document.createElement('label');
            wrap.textContent = label;
            const input = label === 'Summary' ? document.createElement('textarea') : document.createElement('input');
            input.id = id;
            input.addEventListener('input', () => this.updateNewsIntakePreview());
            wrap.append(input);
            body.append(wrap);
        });

        const preview = document.createElement('pre');
        preview.id = 'newsIntakePreview';
        preview.className = 'utility-preview';
        body.append(preview);

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'utility-primary-action';
        copy.textContent = 'Copy Entry';
        copy.addEventListener('click', () => navigator.clipboard?.writeText(preview.textContent || ''));
        body.append(copy);

        panel.append(body);
        this.updateNewsIntakePreview();
    }

    updateNewsIntakePreview() {
        const preview = document.getElementById('newsIntakePreview');
        if (!preview) return;

        const title = document.getElementById('newsTitleInput')?.value || 'Reader-facing title';
        const date = document.getElementById('newsDateInput')?.value || new Date().toISOString().slice(0, 10);
        const author = document.getElementById('newsAuthorInput')?.value || 'Publisher or agency';
        const url = document.getElementById('newsUrlInput')?.value || 'https://example.com/source';
        const summary = document.getElementById('newsSummaryInput')?.value || 'One source-backed sentence.';
        const slug = this.sanitizeClassToken(title).slice(0, 42) || 'news-item';
        const sourceCode = this.sanitizeClassToken(author).replace(/-/g, '').slice(0, 12).toUpperCase() || 'SOURCE';

        const entry = {
            id: `news-${date}-${slug}`,
            source: 'current-news',
            title,
            refNumber: `NEWS-${date}-${sourceCode}`,
            date,
            pages: 1,
            classification: 'PUBLIC',
            fileType: 'article',
            fileSize: 'News article',
            author,
            location: 'United States',
            relatedCases: [],
            tags: ['current-news'],
            summary,
            description: summary,
            url
        };

        entry.relatedCases = this.suggestRelatedCaseIdsForNews(entry, 5);

        preview.textContent = JSON.stringify(entry, null, 4);
    }

    renderDiagnosticsPanel() {
        const panel = this.createUtilityPanel('diagnosticsPanel', 'System Diagnostics');
        const body = document.createElement('div');
        body.className = 'utility-panel-body diagnostics-grid';

        const news = typeof CURRENT_UAP_NEWS !== 'undefined' ? CURRENT_UAP_NEWS : [];
        const archiveDocs = typeof UFO_DATA !== 'undefined' ? UFO_DATA.archiveDocuments || [] : [];
        const supplemental = this.cases.filter((item) => item._source === 'supplemental').length;
        const missingCoords = this.cases.filter((item) => !item.coordinates || !Number.isFinite(Number(item.coordinates.lat)) || !Number.isFinite(Number(item.coordinates.lng))).length;
        const missingSummary = this.cases.filter((item) => !item.summary).length;
        const malformedUrls = archiveDocs.filter((doc) => doc.url && !this.getSafeExternalUrl(doc.url)).length;
        const lowQualityCases = this.cases.filter((item) => this.getCaseQualityScore(item).score < 70).length;

        [
            ['Total cases', this.cases.length],
            ['Supplemental cases', supplemental],
            ['Current news items', news.length],
            ['Archive documents', archiveDocs.length],
            ['Missing coordinates', missingCoords],
            ['Missing summaries', missingSummary],
            ['Malformed archive URLs', malformedUrls],
            ['Research queue', this.researchQueue.length],
            ['Notebook entries', this.notebookEntries.length],
            ['Staged inbox items', this.stagedItems.length],
            ['Saved investigations', this.savedInvestigations.length],
            ['Cases needing cleanup', lowQualityCases]
        ].forEach(([label, value]) => {
            const card = document.createElement('div');
            card.className = 'diagnostic-card';
            card.append(this.createTextNodeElement('span', label), this.createTextNodeElement('strong', String(value)));
            body.append(card);
        });

        panel.append(body);
    }

    createTextNodeElement(tag, text) {
        const element = document.createElement(tag);
        element.textContent = text;
        return element;
    }

    initGlobe() {
        const canvas = document.getElementById('globeCanvas');
        if (!canvas) return;

        try {
            this.globe = new HolographicGlobe(canvas, this.cases);
        } catch (error) {
            console.warn('Globe renderer unavailable; continuing with case list and dossiers.', error);
            this.globe = null;
            return;
        }

        // Setup callbacks
        this.globe.onMarkerHover = (caseData, event) => {
            this.showTooltip(caseData, event);
            alienAudio.playHover();
        };

        this.globe.onMarkerLeave = () => {
            this.hideTooltip();
        };

        this.globe.onMarkerClick = (caseData) => {
            console.log('🌍 app.js onMarkerClick callback triggered:', caseData?.name || caseData?.id);
            alienAudio.playMarkerSelect();

            if (caseData.coordinates) {
                this.globe.focusOnLocation(
                    caseData.coordinates.lat,
                    caseData.coordinates.lng,
                    1500
                );
            }

            this.openBroadcastDossierFromCase(caseData, { focusGlobe: false });
        };
    }

    // ============================================
    // NAVIGATION
    // ============================================

    setupNavigation() {
        document.querySelectorAll('.nav-section').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.navigateToSection(section);
            });

            btn.addEventListener('mouseenter', () => {
                alienAudio.playHover();
            });
        });

        document.getElementById('theaterExitBtn')?.addEventListener('click', () => {
            this.navigateToSection('command');
        });
    }

    setupUfoTransition() {
        this.ufoTransitionOverlay = document.getElementById('ufoTransitionOverlay');
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.ufoTransitionTimer = null;
    }

    playUfoTransition(section) {
        if (!this.ufoTransitionOverlay || this.prefersReducedMotion?.matches) return;

        clearTimeout(this.ufoTransitionTimer);
        this.ufoTransitionOverlay.dataset.transitionTarget = section;
        this.ufoTransitionOverlay.classList.remove('active');
        void this.ufoTransitionOverlay.offsetWidth;
        this.ufoTransitionOverlay.classList.add('active');

        this.ufoTransitionTimer = setTimeout(() => {
            this.ufoTransitionOverlay?.classList.remove('active');
        }, 1250);
    }

    navigateToSection(section) {
        if (section === this.currentSection) return;

        alienAudio.playNavigation();
        this.playUfoTransition(section);

        // Update nav buttons
        document.querySelectorAll('.nav-section').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === section);
        });

        // Hide all sections
        document.querySelectorAll('.deck-section').forEach(sec => {
            sec.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(`section-${section}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        this.currentSection = section;

        // Handle WebGL Contexts
        if (section === 'command') {
            // Resume Globe
            this.timeline?.pause?.();
            this.archives?.pause?.();
            this.lab?.pause?.();
        } else if (section === 'timeline') {
            // Init Timeline if needed
            if (!this.timeline) this.initTimeline();
            this.timeline?.play?.();
            this.archives?.pause?.();
            this.lab?.pause?.();
        } else if (section === 'archives') {
            if (!this.archives) this.initArchives();
            this.archives?.play?.();
            this.timeline?.pause?.();
            this.lab?.pause?.();
        } else if (section === 'theater') {
            if (!this.theater) this.initTheaterMode();
            this.theater?.enter();
            this.timeline?.pause?.();
            this.archives?.pause?.();
            this.lab?.pause?.();
        } else if (section === 'lab') {
            if (!this.lab) this.initLab();
            this.lab?.play?.();
            this.timeline?.pause?.();
            this.archives?.pause?.();
        } else {
            // Pause all
            this.timeline?.pause?.();
            this.archives?.pause?.();
            this.lab?.pause?.();
        }
    }

    initTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        this.timeline = new TimeCorridor(container, this.cases, (caseData) => {
            this.openBroadcastDossierFromCase(caseData);
        });

        // Wire up controls
        const slider = document.getElementById('timelineSlider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const year = parseInt(e.target.value);
                this.timeline.setYear(year);
                // Track timeline interaction
                if (this.investigation) {
                    this.investigation.trackTimelineInteraction();
                    this.updateInvestigationUI();
                }
            });
        }
    }

    initArchives() {
        const container = document.getElementById('archive-view-container');
        if (!container) return;

        // Ensure UFO_DATA.programs exists
        const programs = UFO_DATA.programs || [];

        this.archives = new ArchiveVault(container, programs, (program) => {
            this.openProgramPanel(program);
        });
    }

    openProgramPanel(program) {
        // Track archive access
        if (this.investigation) {
            this.investigation.trackArchiveAccess(program.id);
            const newAchievements = this.investigation.checkAchievements();
            newAchievements.forEach(achievement => this.showAchievementNotification(achievement));
            this.updateInvestigationUI();
        }

        // Create panel if it doesn't exist
        let panel = document.getElementById('programDetailPanel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'programDetailPanel';
            panel.className = 'program-detail-panel';
            document.body.appendChild(panel);
        }

        panel.replaceChildren();

        const title = document.createElement('div');
        title.className = 'program-title';
        title.textContent = program.name || 'Unknown Program';

        const era = document.createElement('div');
        era.className = 'program-era';
        era.textContent = `ERA: ${program.era || 'Unknown'}`;

        const description = document.createElement('div');
        description.className = 'program-desc';
        description.textContent = program.description || 'No description available.';

        const status = document.createElement('div');
        status.className = 'program-status';
        const color = this.getSafeHexColor(program.color, '00ffd4');
        status.style.color = `#${color}`;
        status.style.borderColor = `#${color}`;
        status.textContent = `STATUS: ${program.status || 'Unknown'}`;

        const close = document.createElement('button');
        close.className = 'alien-btn primary-action';
        close.type = 'button';
        close.style.marginTop = '20px';
        close.textContent = 'CLOSE FILE';
        close.addEventListener('click', () => panel.classList.remove('active'));

        panel.append(title, era, description, status, close);

        // Trigger reflow
        void panel.offsetWidth;
        panel.classList.add('active');
    }

    initLab() {
        const container = document.getElementById('lab-scanner-viewport');
        if (!container) return;

        const specimens = UFO_DATA.specimens || [];
        this.lab = new SpecimenLab(container, specimens);

        // Populate specimen selector
        const select = document.getElementById('specimenSelect');
        if (select) {
            specimens.forEach(spec => {
                const option = document.createElement('option');
                option.value = spec.id;
                option.textContent = spec.name;
                select.appendChild(option);
            });

            select.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.lab.loadSpecimen(e.target.value);
                    // Track specimen analysis
                    if (this.investigation) {
                        this.investigation.trackSpecimenAnalysis(e.target.value);
                        const newAchievements = this.investigation.checkAchievements();
                        newAchievements.forEach(achievement => this.showAchievementNotification(achievement));
                        this.updateInvestigationUI();
                    }
                }
            });
        }

        // Wire up scan mode buttons
        const scanBtns = document.querySelectorAll('.scan-btn');
        scanBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                scanBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');
                // Set mode
                const mode = btn.getAttribute('data-mode');
                this.lab.setScanMode(mode);
            });
        });

        // Set default active button
        if (scanBtns.length > 0) {
            scanBtns[0].classList.add('active');
        }
    }

    populateCaseList() {
        const list = document.getElementById('caseList');
        if (!list) return;

        list.replaceChildren();

        if (this.filteredCases.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No signals detected matching query.';
            list.appendChild(noResults);
            this.updateStats(); // Update stats even if no cases
            return;
        }

        // Slice for pagination
        const visibleCases = this.filteredCases.slice(0, this.visibleCount);

        visibleCases.forEach(caseData => {
            const card = this.createCaseCard(caseData);
            list.appendChild(card);
        });

        // Add Load More Button if needed
        if (this.filteredCases.length > this.visibleCount) {
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'alien-btn full-width';
            loadMoreBtn.style.marginTop = '20px';
            loadMoreBtn.innerText = `LOAD MORE SIGNALS (${this.filteredCases.length - this.visibleCount} REMAINING)`;
            loadMoreBtn.addEventListener('click', () => {
                this.visibleCount += 30;
                alienAudio.playClick();
                this.populateCaseList();
            });
            list.appendChild(loadMoreBtn);
        }

        this.updateStats();
    }

    updateStats() {
        const total = this.filteredCases.length;
        const unexplained = this.filteredCases.filter(c =>
            c.status.toLowerCase().includes('unexplained') || c.tier === 1
        ).length;
        const sources = new Set(this.filteredCases.map(c => c.source)).size;

        this.animateValue("statTotal", parseInt(document.getElementById("statTotal").textContent), total, 1000);
        this.animateValue("statUnexplained", parseInt(document.getElementById("statUnexplained").textContent), unexplained, 1000);
        this.animateValue("statSources", parseInt(document.getElementById("statSources").textContent), sources, 1000);
    }

    updateFilteredView() {
        // Reset pagination to start when filters change
        this.visibleCount = 30;
        this.populateCaseList();

        if (this.globe) {
            this.globe.updateVisibleMarkers(this.filteredCases);
        }
    }

    animateValue(id, start, end, duration) {
        if (start === end) return;
        const obj = document.getElementById(id);
        const range = end - start;
        const minTimer = 50;
        let stepTime = Math.abs(Math.floor(duration / range));
        stepTime = Math.max(stepTime, minTimer);
        const startTime = new Date().getTime();
        const endTime = startTime + duration;
        let timer;

        const run = () => {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));
            obj.textContent = value;
            if (value == end) {
                clearInterval(timer);
            }
        };

        timer = setInterval(run, stepTime);
        run();
    }

    // ============================================
    // TILT & EFFECTS
    // ============================================

    initTiltEffect() {
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const cards = document.querySelectorAll('.alien-panel, .encounter-card, .menu-item'); // Add more selectors as needed
        const bg = document.querySelector('.volumetric-bg');

        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Move background slightly
            if (bg) {
                bg.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
            }

            // Tilt panels
            // Note: We use a more localized approach for panels if possible,
            // but global mouse position is easier for "floating" feel.
            document.querySelectorAll('.alien-panel').forEach(panel => {
                const rect = panel.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const factorX = (e.clientY - centerY) / 500; // Sensitive factor
                const factorY = (e.clientX - centerX) / 500;

                // Limit rotation
                const rotX = Math.max(-5, Math.min(5, factorX * -5));
                const rotY = Math.max(-5, Math.min(5, factorY * 5));

                panel.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            });
        });
    }

    createCaseCard(caseData) {
        const card = document.createElement('div');
        card.className = `case-card tier-${this.sanitizeClassToken(caseData.tier || 'unknown')}`;

        const sourceClass = this.sanitizeClassToken(caseData.source || 'source');

        const header = document.createElement('div');
        header.className = 'case-card-header';
        const titleGroup = document.createElement('div');
        const name = document.createElement('div');
        name.className = 'case-name';
        name.textContent = caseData.name || 'Unknown Case';
        const date = document.createElement('div');
        date.className = 'case-date';
        date.textContent = caseData.date || 'Date unknown';
        titleGroup.append(name, date);

        const source = document.createElement('span');
        source.className = `case-source-tag ${sourceClass}`;
        source.textContent = String(caseData.source || 'source').toUpperCase();
        header.append(titleGroup, source);

        const summary = document.createElement('p');
        summary.className = 'case-summary';
        summary.textContent = caseData.summary || 'No summary available.';

        const meta = document.createElement('div');
        meta.className = 'case-meta';
        meta.append(
            this.createCaseMetaItem('◉', caseData.shape || 'Unknown shape'),
            this.createCaseMetaItem('◎', String(caseData.location || 'Unknown location').split(',')[0])
        );

        card.append(header, summary, meta);

        card.addEventListener('click', () => {
            alienAudio.playClick();
            this.openBroadcastDossierFromCase(caseData);
        });

        card.addEventListener('mouseenter', () => {
            alienAudio.playHover();
        });

        return card;
    }

    // ============================================
    // FILTERS
    // ============================================

    setupFilters() {
        // 1. Sidebar Chips
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                alienAudio.playClick();
                this.applyFilter(filter);
            });
        });

        // 2. Credibility Slider
        const credSlider = document.getElementById('credibilitySlider');
        if (credSlider) {
            credSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value);
                const gauge = document.getElementById('filterCredLow');

                // Visual updates
                gauge.className = 'radar-circle ' + (val > 66 ? 'high' : val > 33 ? 'med' : 'low');

                // Logic
                if (this.searchEngine) {
                    this.searchEngine.setFilter('minCredibility', val);
                    this.filteredCases = this.searchEngine.search();
                    this.updateFilteredView();
                }
            });
        }

        // 3. Time Slider (Start Era)
        const eraSlider = document.getElementById('eraStartSlider');
        if (eraSlider) {
            eraSlider.addEventListener('input', (e) => {
                const year = parseInt(e.target.value);
                document.getElementById('eraStartDisplay').textContent = year;

                document.getElementById('eraStartDisplay').textContent = year;

                // Logic 
                if (this.searchEngine) {
                    this.searchEngine.setFilter('minYear', year);
                    this.filteredCases = this.searchEngine.search();
                    this.updateFilteredView();

                    // Track interaction
                    if (this.investigation) this.investigation.trackTimelineInteraction();
                }
            });
        }

        // 4. Shape Matrix
        const shapeMatrix = document.getElementById('shapeFilterMatrix');
        if (shapeMatrix) {
            shapeMatrix.querySelectorAll('.shape-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const shape = btn.dataset.shape;
                    const isActive = btn.classList.contains('active');

                    // Toggle
                    shapeMatrix.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
                    if (!isActive) {
                        btn.classList.add('active');
                        this.searchEngine.setFilter('shape', shape);
                    } else {
                        this.searchEngine.setFilter('shape', 'all');
                    }

                    this.filteredCases = this.searchEngine.search();
                    this.updateFilteredView();
                    alienAudio.playClick();

                    // Track interaction (could be its own category, but timeline is close enough for exploratory)
                    if (this.investigation) this.investigation.trackTimelineInteraction();
                });
            });
        }
    }

    applyFilter(filter) {
        this.currentFilter = filter; // Track current filter

        if (this.searchEngine) {
            this.searchEngine.setFilter('source', filter);
            this.filteredCases = this.searchEngine.search();
        }

        this.updateFilteredView();
    }

    // ============================================
    // SEARCH
    // ============================================

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.searchCases(e.target.value);
            }, 300);
        });
    }

    searchCases(query) {
        // Update filter state
        if (this.searchEngine) {
            this.searchEngine.setFilter('search', query);
            this.filteredCases = this.searchEngine.search();
        } else {
            // Fallback if search engine not loaded
            console.warn('Search Engine not ready');
            return;
        }

        this.updateFilteredView();

        // Auto-zoom to first result if specific match found
        if (query.trim().length > 2 && this.filteredCases.length > 0) {
            const topMatch = this.filteredCases[0];
            if (this.globe && topMatch.coordinates) {
                this.globe.focusOnLocation(
                    topMatch.coordinates.lat,
                    topMatch.coordinates.lng,
                    2000 // duration
                );
            }
        }
    }

    // ============================================
    // GLOBE CONTROLS
    // ============================================

    setupGlobeControls() {
        const btnZoomIn = document.getElementById('btnZoomIn');
        const btnZoomOut = document.getElementById('btnZoomOut');
        const btnRotate = document.getElementById('btnRotate');
        const btnReset = document.getElementById('btnReset');

        if (btnZoomIn) {
            btnZoomIn.addEventListener('click', () => {
                alienAudio.playClick();
                if (this.globe) this.globe.zoomIn();
            });
        }

        if (btnZoomOut) {
            btnZoomOut.addEventListener('click', () => {
                alienAudio.playClick();
                if (this.globe) this.globe.zoomOut();
            });
        }

        if (btnRotate) {
            btnRotate.addEventListener('click', () => {
                alienAudio.playClick();
                if (this.globe) {
                    const rotating = this.globe.toggleRotation();
                    btnRotate.classList.toggle('active', rotating);
                }
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => {
                alienAudio.playClick();
                if (this.globe) {
                    this.globe.resetView();
                    // Update rotation button state (resetView re-enables auto-rotate)
                    this.updateRotationButtonState();
                }
            });
        }
    }

    // Helper to sync the rotation button's visual state with the globe's actual rotation state
    updateRotationButtonState() {
        const btnRotate = document.getElementById('btnRotate');
        if (btnRotate && this.globe && this.globe.controls) {
            btnRotate.classList.toggle('active', this.globe.controls.autoRotate);
        }
    }

    // ============================================
    // MOBILE MENU
    // ============================================

    setupMobileMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const overlay = document.getElementById('mobileOverlay');
        const sidebar = document.querySelector('.case-database');

        if (!menuToggle || !sidebar) return;

        // Toggle menu on button click
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            overlay?.classList.toggle('active');
            menuToggle.textContent = sidebar.classList.contains('mobile-open') ? '✕' : '☰';
            alienAudio.playClick();
        });

        // Close menu on overlay click
        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        }

        // Close menu when a case is selected (for mobile)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.case-card')) {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                    overlay?.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            }
        });

        console.log('✓ Mobile menu setup complete');
    }

    // ============================================
    // DETAIL PANEL
    // ============================================

    setupDetailPanel() {
        const closeBtn = document.getElementById('detailClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeDetailPanel();
            });
        }
    }

    openDetailPanel(caseData) {
        this.selectedCase = caseData;

        const panel = document.getElementById('detailPanel');
        if (!panel) return;

        // Populate data
        this.setElementText('detailClassification', caseData.classification);
        this.setElementText('detailTitle', caseData.name);
        this.setElementText('detailCoords', this.formatCoordinates(caseData.coordinates));
        this.setElementText('detailSummary', caseData.summary);
        this.setElementText('detailDate', caseData.date);
        this.setElementText('detailShape', caseData.shape);
        this.setElementText('detailDuration', caseData.duration);
        this.setElementText('detailWitnesses', caseData.witnesses);
        this.setElementText('detailStatus', caseData.status);
        this.setElementText('detailSource', caseData.source.toUpperCase());

        // Resources Section
        const resourcesContainer = document.getElementById('detailResources');
        if (resourcesContainer) {
            resourcesContainer.replaceChildren(); // Clear previous

            // Add specific resources if they exist
            if (caseData.resources && caseData.resources.length > 0) {
                caseData.resources.forEach(res => {
                    const safeUrl = this.getSafeExternalUrl(res.url);
                    if (!safeUrl) return;

                    const btn = document.createElement('a');
                    btn.href = safeUrl;
                    btn.target = "_blank";
                    btn.rel = 'noopener noreferrer';
                    btn.className = 'resource-link';
                    const icon = document.createElement('span');
                    icon.className = 'icon';
                    icon.textContent = '▶';
                    btn.append(icon, document.createTextNode(` ${res.title || 'Source file'}`));
                    resourcesContainer.appendChild(btn);
                });
            }

            // Research Report button (opens modal instead of direct link)
            const searchBtn = document.createElement('button');
            searchBtn.className = 'resource-link search';
            const searchIcon = document.createElement('span');
            searchIcon.className = 'icon';
            searchIcon.textContent = '🔍';
            searchBtn.append(searchIcon, document.createTextNode(' Research Report'));
            searchBtn.style.cursor = 'pointer';
            searchBtn.style.border = 'none';
            searchBtn.style.width = '100%';
            searchBtn.addEventListener('click', () => {
                alienAudio.playClick();
                this.openResearchReport(caseData);
            });
            resourcesContainer.appendChild(searchBtn);
        }

        // Track case view
        if (this.investigation) {
            // Determine source filter for tracking
            let sourceFilter = null;
            if (this.currentFilter === 'bluebook') sourceFilter = 'bluebook';
            else if (this.currentFilter === 'aatip') sourceFilter = 'aatip';

            this.investigation.trackCaseView(caseData.id, sourceFilter);
            const newAchievements = this.investigation.checkAchievements();
            newAchievements.forEach(achievement => this.showAchievementNotification(achievement));
            this.updateInvestigationUI();
        }

        // Show panel
        panel.classList.add('open');
        this.detailPanelOpen = true;

        alienAudio.playPanelOpen();
    }

    closeDetailPanel() {
        const panel = document.getElementById('detailPanel');
        if (panel) {
            panel.classList.remove('open');
        }
        this.detailPanelOpen = false;
        this.selectedCase = null;

        // Reset marker highlighting
        if (this.globe) {
            this.globe.clearSelection();
        }

        alienAudio.playPanelClose();
    }

    // ============================================
    // RESEARCH REPORT MODAL
    // ============================================

    setupResearchReport() {
        const closeBtn = document.getElementById('researchClose');
        const modal = document.getElementById('researchReportModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                alienAudio.playClick();
                if (modal) modal.classList.remove('active');
            });
        }

        // Close on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }

    openResearchReport(caseData) {
        const modal = document.getElementById('researchReportModal');
        const caseNameEl = document.getElementById('researchCaseName');

        if (!modal) return;

        // Set case name
        if (caseNameEl) {
            caseNameEl.textContent = caseData.name;
        }

        // Populate sources
        this.populateResearchSources(caseData);

        // Populate analysis
        this.populateResearchAnalysis(caseData);

        // Show modal
        modal.classList.add('active');
        alienAudio.playPanelOpen();
    }

    populateResearchSources(caseData) {
        // Build comprehensive search queries
        const caseName = caseData.name || 'UFO Sighting';
        const location = caseData.location || '';
        const year = caseData.year || '';
        const date = caseData.date || '';

        // Various encoded search terms
        const searchQuery = encodeURIComponent(caseName);
        const searchQueryWithUFO = encodeURIComponent(`${caseName} UFO`);
        const fullQuery = encodeURIComponent(`${caseName} UFO ${year}`);
        const locationQuery = encodeURIComponent(`UFO ${location} ${year}`);
        const detailedQuery = encodeURIComponent(`"${caseName}" UFO sighting`);

        // Official Databases - with proper search URLs
        const officialSources = [
            {
                name: 'MUFON',
                icon: '🗂️',
                desc: 'Case Database Search',
                // MUFON doesn't have a direct search URL, use Google site search
                url: `https://www.google.com/search?q=site:mufon.com+${searchQueryWithUFO}`,
                badge: 'Civilian'
            },
            {
                name: 'NUFORC',
                icon: '📊',
                desc: 'Report Archive',
                // NUFORC search via Direct Site Search
                url: `https://nuforc.org/?s=${searchQuery}`,
                badge: 'Civilian'
            },
            {
                name: 'The Black Vault',
                icon: '📁',
                desc: 'Declassified Documents',
                // Black Vault has a search function
                url: `https://www.theblackvault.com/?s=${searchQueryWithUFO}`,
                badge: 'FOIA'
            }
        ];

        // Media & Documentation - with proper search URLs
        const mediaSources = [
            {
                name: 'YouTube',
                icon: '▶️',
                desc: 'Documentaries & Analysis',
                url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${caseName} UFO documentary`)}`,
                badge: 'Video'
            },
            {
                name: 'Google News',
                icon: '📰',
                desc: 'Historical Coverage',
                url: `https://news.google.com/search?q=${fullQuery}&hl=en-US&gl=US&ceid=US:en`,
                badge: 'News'
            },
            {
                name: 'Internet Archive',
                icon: '📚',
                desc: 'Historical Records',
                url: `https://archive.org/search?query=${fullQuery}`,
                badge: 'Archive'
            }
        ];

        // General Research - with proper search URLs
        const generalSources = [
            {
                name: 'Grokipedia',
                icon: '🤖',
                desc: 'AI-Powered Research',
                url: `https://grokipedia.com/search?q=${encodeURIComponent(`${caseName} UFO`)}`,
                badge: 'AI'
            },
            {
                name: 'Wikipedia',
                icon: '📖',
                desc: 'Encyclopedia Entry',
                url: `https://en.wikipedia.org/w/index.php?search=${searchQuery}&title=Special:Search&ns0=1`,
                badge: 'Reference'
            },
            {
                name: 'Google Scholar',
                icon: '🎓',
                desc: 'Academic Papers',
                url: `https://scholar.google.com/scholar?q=${detailedQuery}`,
                badge: 'Academic'
            },
            {
                name: 'Web Search',
                icon: '🔍',
                desc: 'Comprehensive Search',
                url: `https://www.google.com/search?q=${detailedQuery}`,
                badge: 'General'
            }
        ];

        // Populate grids
        this.renderResearchGrid('researchOfficialGrid', officialSources, 'official');
        this.renderResearchGrid('researchMediaGrid', mediaSources, 'media');
        this.renderResearchGrid('researchGeneralGrid', generalSources, 'general');
    }

    populateResearchAnalysis(caseData) {
        const container = document.getElementById('researchAnalysis');
        if (!container) return;

        try {
            container.replaceChildren();

            const tier = Number(caseData.tier) || 4;
            const name = caseData.name || 'Unknown Subject';
            const location = caseData.location || 'Unknown Sector';
            const year = Number(caseData.year) || Number(String(caseData.date || '').match(/\b(1[5-9]\d{2}|20\d{2})\b/)?.[1]) || 0;
            const date = caseData.date || 'Unknown';
            const shape = caseData.shape || 'Anomalous';
            const status = caseData.status || 'Unknown';
            const classification = caseData.classification || 'CLASSIFIED';
            const credibility = Math.max(0, Math.min(100, Number(caseData.credibility) || 0));
            const duration = caseData.duration || 'Unknown';
            const witnesses = caseData.witnesses || 'Unknown';
            const source = caseData.source || 'Unknown';
            const summary = caseData.summary || 'No summary available.';
            const coordsFormatted = this.formatCoordinates(caseData.coordinates);

            // Calculate Threat Level
            let threatLevel = 'LOW';
            let threatColor = '#00ffd4';
            if (tier <= 1) { threatLevel = 'CRITICAL'; threatColor = '#ff3366'; }
            else if (tier === 2) { threatLevel = 'ELEVATED'; threatColor = '#ffd700'; }

            // Era classification
            let era = 'MODERN ERA';
            let eraColor = '#00aaff';
            if (year < 1900) { era = 'ANCIENT/HISTORICAL'; eraColor = '#00ffd4'; }
            else if (year < 1947) { era = 'PRE-MODERN ERA'; eraColor = '#44ddaa'; }
            else if (year < 1970) { era = 'BLUE BOOK ERA'; eraColor = '#ffd700'; }
            else if (year < 2000) { era = 'POST-BLUE BOOK'; eraColor = '#ff9944'; }
            else if (year >= 2017) { era = 'AATIP/UAP ERA'; eraColor = '#ff00ff'; }

            // Generate synthetic signal data (consistent per case via name hash)
            const hashCode = name.toUpperCase().split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
            const signalFreq = (Math.abs(hashCode % 900) + 100).toFixed(2);
            const signalTypes = ['Pulse', 'Continuous', 'Burst', 'Harmonic', 'Modulated', 'Intermittent'];
            const signalType = signalTypes[Math.abs(hashCode) % signalTypes.length];

            // Observation conditions (derived from data)
            const timeOfDay = hashCode % 2 === 0 ? 'NOCTURNAL' : 'DIURNAL';
            const visibility = ['CLEAR', 'PARTIAL', 'OBSCURED', 'VARIABLE'][Math.abs(hashCode) % 4];

            // Witness classification
            let witnessClass = 'CIVILIAN';
            const sourceUpper = source.toUpperCase();
            if (sourceUpper.includes('BLUE') || sourceUpper.includes('AATIP') || sourceUpper.includes('PURSUE')) {
                witnessClass = 'MILITARY/OFFICIAL';
            } else if (sourceUpper.includes('MUFON') || sourceUpper.includes('NUFORC')) {
                witnessClass = 'CIVILIAN INVESTIGATOR';
            }

            const grid = document.createElement('div');
            grid.className = 'analysis-grid expanded';

            const threatBox = this.createAnalysisStat('ASSESSED THREAT', threatLevel, 'threat');
            threatBox.style.borderColor = threatColor;
            threatBox.querySelector('.stat-value').style.color = threatColor;
            grid.append(threatBox);

            const credibilityBox = this.createAnalysisStat('CREDIBILITY SCORE', `${credibility}%`);
            const statBar = document.createElement('div');
            statBar.className = 'stat-bar';
            const statFill = document.createElement('div');
            statFill.className = 'stat-bar-fill';
            statFill.style.width = `${credibility}%`;
            statBar.appendChild(statFill);
            credibilityBox.appendChild(statBar);
            grid.append(credibilityBox);

            [
                ['TIER CLASSIFICATION', `TIER ${tier}`],
                ['INCIDENT DATE', date],
                ['ERA CLASSIFICATION', era],
                ['DURATION', duration],
                ['GEOGRAPHIC SECTOR', location, 'wide'],
                ['COORDINATES', coordsFormatted],
                ['OBJECT MORPHOLOGY', shape],
                ['OBSERVATION TIME', timeOfDay],
                ['VISIBILITY', visibility],
                ['WITNESS COUNT', witnesses],
                ['WITNESS CLASS', witnessClass],
                ['DATA SOURCE', source],
                ['SIGNAL FREQUENCY', `${signalFreq} MHz`],
                ['SIGNAL PATTERN', signalType],
                ['CASE STATUS', status.toUpperCase()]
            ].forEach(([label, value, modifier]) => {
                const stat = this.createAnalysisStat(label, value, modifier || '');
                if (label === 'ERA CLASSIFICATION') stat.querySelector('.stat-value').style.color = eraColor;
                grid.append(stat);
            });

            const summaryBox = document.createElement('div');
            summaryBox.className = 'analysis-text-box';
            const summaryLabel = document.createElement('div');
            summaryLabel.className = 'stat-label';
            summaryLabel.textContent = 'INTELLIGENCE SUMMARY';
            const summaryText = document.createElement('p');
            summaryText.className = 'case-summary-text';
            summaryText.textContent = summary;
            const divider = document.createElement('div');
            divider.className = 'intel-divider';
            const analysisText = document.createElement('p');
            analysisText.className = 'intel-analysis';
            analysisText.textContent = `Subject ${name} is cataloged as a Tier ${tier} case within the ${era} period. The record source is ${source}, with location listed as ${location} and date listed as ${date}. Available fields describe ${shape} morphology, status "${status}", classification "${classification}", and credibility ${credibility}%. This generated analysis is a navigation aid only and does not establish origin, intent, or extraordinary cause.`;
            summaryBox.append(summaryLabel, summaryText, divider, analysisText);
            grid.append(summaryBox);

            container.appendChild(grid);
        } catch (e) {
            console.error("Analysis generation failed:", e);
            container.replaceChildren();
            const fallback = document.createElement('div');
            fallback.className = 'analysis-text-box';
            fallback.textContent = 'Data fragment corrupted. Unable to generate analysis.';
            container.appendChild(fallback);
        }
    }

    renderResearchGrid(containerId, sources, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.replaceChildren();

        sources.forEach(source => {
            const card = document.createElement('a');
            const safeUrl = this.getSafeExternalUrl(source.url);
            if (!safeUrl) return;

            card.href = safeUrl;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = `research-source-card type-${this.sanitizeClassToken(type)}`;

            const icon = document.createElement('div');
            icon.className = 'research-source-icon';
            icon.textContent = source.icon || '◈';
            const name = document.createElement('div');
            name.className = 'research-source-name';
            name.textContent = source.name || 'Research Source';
            const desc = document.createElement('div');
            desc.className = 'research-source-desc';
            desc.textContent = source.desc || '';
            const badge = document.createElement('div');
            badge.className = 'research-source-badge';
            badge.textContent = source.badge || 'SOURCE';

            card.append(icon, name, desc, badge);

            card.addEventListener('mouseenter', () => {
                alienAudio.playHover();
            });

            card.addEventListener('click', () => {
                alienAudio.playClick();
            });

            container.appendChild(card);
        });
    }

    setElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text || 'N/A';
    }

    sanitizeClassToken(value) {
        return String(value || 'unknown').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'unknown';
    }

    getSafeExternalUrl(url) {
        if (!url) return '';

        try {
            const parsed = new URL(url, window.location.href);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
                return parsed.href;
            }
        } catch (error) {
            console.warn('Skipping malformed external URL:', url);
        }

        return '';
    }

    getSafeHexColor(value, fallback = '00ffd4') {
        if (Number.isFinite(Number(value))) {
            return Number(value).toString(16).padStart(6, '0').slice(-6);
        }

        const normalized = String(value || '').replace(/^#/, '').trim();
        return /^[0-9a-fA-F]{6}$/.test(normalized) ? normalized : fallback;
    }

    createCaseMetaItem(iconValue, textValue) {
        const item = document.createElement('span');
        item.className = 'case-meta-item';
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.textContent = iconValue;
        item.append(icon, document.createTextNode(` ${textValue}`));
        return item;
    }

    createAnalysisStat(labelText, valueText, modifier = '') {
        const box = document.createElement('div');
        const safeModifier = modifier ? this.sanitizeClassToken(modifier) : '';
        box.className = `analysis-stat-box${safeModifier ? ` ${safeModifier}` : ''}`;
        const label = document.createElement('div');
        label.className = 'stat-label';
        label.textContent = labelText;
        const value = document.createElement('div');
        value.className = 'stat-value';
        value.textContent = valueText;
        box.append(label, value);
        return box;
    }

    formatCoordinates(coords) {
        if (!coords || !Number.isFinite(Number(coords.lat)) || !Number.isFinite(Number(coords.lng))) {
            return 'Coordinates unavailable';
        }

        const lat = coords.lat;
        const lng = coords.lng;
        const latDir = lat >= 0 ? 'N' : 'S';
        const lngDir = lng >= 0 ? 'E' : 'W';
        return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
    }

    // ============================================
    // TOOLTIP
    // ============================================

    showTooltip(caseData, event) {
        const tooltip = document.getElementById('globeTooltip');
        if (!tooltip) return;

        tooltip.replaceChildren();
        const name = document.createElement('strong');
        name.textContent = caseData.name || 'Unknown Case';
        const location = document.createElement('div');
        location.style.fontSize = '0.8em';
        location.style.color = 'var(--glyph-primary)';
        location.style.marginTop = '2px';
        location.textContent = caseData.location || 'Unknown location';
        const date = document.createElement('div');
        date.style.fontSize = '0.7em';
        date.style.color = 'var(--text-dim)';
        date.style.marginTop = '2px';
        date.textContent = caseData.date || 'Date unknown';
        tooltip.append(name, location, date);
        tooltip.style.left = event.clientX + 'px';
        tooltip.style.top = event.clientY + 'px';
        tooltip.classList.add('visible');
    }

    hideTooltip() {
        const tooltip = document.getElementById('globeTooltip');
        if (tooltip) {
            tooltip.classList.remove('visible');
        }
    }

    // ============================================
    // STATS
    // ============================================



    // ============================================
    // INVESTIGATION UI
    // ============================================

    updateInvestigationUI() {
        if (!this.investigation) return;

        const progress = this.investigation.getProgress();

        // Update rank display
        const rankEl = document.getElementById('investigationRank');
        if (rankEl) {
            rankEl.textContent = progress.rank;
            rankEl.style.color = progress.rankColor;
        }

        // Update progress bar
        const bar = document.getElementById('investigationBar');
        if (bar) {
            bar.style.width = `${progress.casesPercent}%`;
        }

        // Update individual stats
        this.setElementText('statRank', progress.rank);
        this.setElementText('statCases', progress.casesViewed.toString());
        this.setElementText('statPoints', progress.totalPoints.toString());
    }

    setupAchievementGallery() {
        // Wire up achievement gallery button
        const achievementsBtn = document.getElementById('achievementsBtn');
        const gallery = document.getElementById('achievementGallery');
        const galleryClose = document.getElementById('galleryClose');

        if (achievementsBtn && gallery) {
            achievementsBtn.addEventListener('click', () => {
                alienAudio.playClick();
                this.openAchievementGallery();
            });
        }

        if (galleryClose && gallery) {
            galleryClose.addEventListener('click', () => {
                alienAudio.playClick();
                gallery.classList.remove('active');
            });
        }

        // Close on background click
        if (gallery) {
            gallery.addEventListener('click', (e) => {
                if (e.target === gallery) {
                    gallery.classList.remove('active');
                }
            });
        }
    }

    openAchievementGallery() {
        if (!this.investigation) return;

        const gallery = document.getElementById('achievementGallery');
        if (!gallery) return;

        const achievements = this.investigation.getAllAchievements();
        const unlockedCount = achievements.filter(a => a.unlocked).length;
        const totalCount = achievements.length;
        const progress = Math.round((unlockedCount / totalCount) * 100);

        // Update gallery stats
        this.setElementText('galleryUnlocked', unlockedCount.toString());
        this.setElementText('galleryTotal', totalCount.toString());
        this.setElementText('galleryProgress', `${progress}%`);

        // Populate categories
        const categoriesContainer = document.getElementById('achievementCategories');
        if (!categoriesContainer) return;

        categoriesContainer.replaceChildren();

        // Group achievements by category
        const categories = {};
        const categoryOrder = ['explorer', 'scientist', 'archivist', 'historian', 'specialist', 'elite'];
        const categoryNames = {
            explorer: '🌍 EXPLORER',
            scientist: '🔬 SCIENTIST',
            archivist: '📚 ARCHIVIST',
            historian: '⏳ HISTORIAN',
            specialist: '🎯 SPECIALIST',
            elite: '⭐ ELITE'
        };

        achievements.forEach(achievement => {
            if (!categories[achievement.category]) {
                categories[achievement.category] = [];
            }
            categories[achievement.category].push(achievement);
        });

        // Render each category
        categoryOrder.forEach(categoryKey => {
            if (!categories[categoryKey]) return;

            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'achievement-category';

            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = categoryNames[categoryKey] || categoryKey.toUpperCase();
            categoryDiv.appendChild(categoryTitle);

            const grid = document.createElement('div');
            grid.className = 'achievement-grid';

            categories[categoryKey].forEach(achievement => {
                const card = document.createElement('div');
                card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;

                const icon = document.createElement('div');
                icon.className = 'achievement-card-icon';
                icon.textContent = achievement.unlocked ? achievement.icon : '🔒';

                const content = document.createElement('div');
                content.className = 'achievement-card-content';

                const name = document.createElement('div');
                name.className = 'achievement-card-name';
                name.textContent = achievement.unlocked ? achievement.name : '???';

                const desc = document.createElement('div');
                desc.className = 'achievement-card-desc';
                desc.textContent = achievement.unlocked ? achievement.description : 'Locked: Complete the required actions to unlock.';

                const points = document.createElement('div');
                points.className = 'achievement-card-points';
                points.textContent = achievement.unlocked ? `+${achievement.points} Points` : `? Points`;

                content.appendChild(name);
                content.appendChild(desc);
                content.appendChild(points);

                card.appendChild(icon);
                card.appendChild(content);

                grid.appendChild(card);
            });

            categoryDiv.appendChild(grid);
            categoriesContainer.appendChild(categoryDiv);
        });

        // Show the gallery
        gallery.classList.add('active');
    }

    showAchievementNotification(achievement) {
        const toast = document.getElementById('achievementToast');
        if (!toast) return;

        // Update toast content
        this.setElementText('toastName', achievement.name);
        this.setElementText('toastDesc', achievement.description);
        this.setElementText('toastPoints', `+${achievement.points} Points`);

        const toastIcon = document.getElementById('toastIcon');
        if (toastIcon) {
            toastIcon.textContent = achievement.icon;
        }

        // Show toast
        toast.classList.add('show');

        // Play sound
        alienAudio.playAchievement && alienAudio.playAchievement();

        // Hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // ============================================
    // LOADING
    // ============================================

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 2000);
        }
    }
}

// ============================================
// INITIALIZE ON DOM READY
// ============================================

let commandDeck;

document.addEventListener('DOMContentLoaded', () => {
    commandDeck = new UFOCommandDeck();
    window.commandDeck = commandDeck;
});
