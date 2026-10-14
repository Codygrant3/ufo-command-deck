/**
 * Dossier View - Midnight Case Broadcast
 * Displays selected globe cases as a data-backed late-night broadcast file.
 */
class DossierView {
    constructor() {
        this.activeCase = null;
        this.activeTab = 'onair';
        this.isOpen = false;
        this.mapAnimationFrame = null;
        this.lastFocusedElement = null;
        this.blockedYouTubeVideoIds = new Set([
            'B07X5-f-OIk'
        ]);
        this.activeVideoContext = null;
        this.boundHandleYouTubeMessage = (event) => this.handleYouTubeMessage(event);

        this.tabs = [
            { id: 'onair', label: 'On Air', icon: 'radio' },
            { id: 'casefile', label: 'Case File', icon: 'folder_open' },
            { id: 'tapevault', label: 'Tape Vault', icon: 'inventory_2' },
            { id: 'signalmap', label: 'Signal Map', icon: 'radar' },
            { id: 'analysis', label: 'Analysis', icon: 'assignment' }
        ];

        this.createOverlay();
        this.boundHandleKeydown = (event) => this.handleKeydown(event);
        window.addEventListener('message', this.boundHandleYouTubeMessage);
    }

    createOverlay() {
        const existing = document.getElementById('dossierOverlay');
        if (existing) {
            existing.remove();
        }

        const overlay = this.createElement('div', 'dossier-overlay hidden', { id: 'dossierOverlay' });
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'dossierTitle');

        const shell = this.createElement('article', 'dossier-shell');

        const appBar = this.createElement('header', 'dossier-appbar');
        const appIdentity = this.createElement('div', 'dossier-app-identity');
        appIdentity.append(
            this.createIcon('radio'),
            this.createElement('span', 'dossier-app-title', { id: 'dossierAppTitle' }, 'MIDNIGHT MERIDIAN CASE')
        );

        const actions = this.createElement('div', 'dossier-actions');
        const queueButton = this.createElement('button', 'dossier-action-button', { id: 'dossierQueueButton', type: 'button' }, 'Queue');
        queueButton.addEventListener('click', () => {
            if (!this.activeCase) return;
            window.commandDeck?.toggleResearchQueueCase?.(this.activeCase);
            this.updateQueueButton();
        });
        const noteButton = this.createElement('button', 'dossier-action-button', { id: 'dossierNoteButton', type: 'button' }, 'Note');
        noteButton.addEventListener('click', () => {
            if (!this.activeCase) return;
            window.commandDeck?.quickAddNotebookEntry?.(this.activeCase);
        });
        const reportButton = this.createElement('button', 'dossier-action-button', { id: 'dossierReportButton', type: 'button' }, 'Report');
        reportButton.addEventListener('click', () => {
            if (!this.activeCase) return;
            window.commandDeck?.exportCaseReport?.(this.activeCase);
        });
        const closeButton = this.createElement('button', 'dossier-icon-button', { id: 'dossierClose', type: 'button', title: 'Close broadcast case file' });
        closeButton.setAttribute('aria-label', 'Close broadcast case file');
        closeButton.append(this.createIcon('close'));
        actions.append(queueButton, noteButton, reportButton, closeButton);
        appBar.append(appIdentity, actions);

        const scrollArea = this.createElement('div', 'dossier-scroll', { id: 'dossierScroll' });
        const hero = this.createElement('section', 'dossier-hero');

        const heroLeft = this.createElement('div', 'dossier-hero-primary');
        heroLeft.append(
            this.createElement('p', 'dossier-classification', { id: 'dossierClassification' }, 'CLASSIFICATION: UNKNOWN'),
            this.createElement('h2', 'dossier-title', { id: 'dossierTitle' }, 'CASE BRIEFING'),
            this.createElement('p', 'dossier-case-id', { id: 'dossierId' }, 'CASE-000'),
            this.createElement('p', 'dossier-broadcast-line', { id: 'dossierBroadcastLine' }, 'LINE 3: UNKNOWN SIGNAL')
        );

        const heroRight = this.createElement('div', 'dossier-hero-meta');
        heroRight.append(
            this.createElement('p', 'dossier-date', { id: 'dossierDate' }, 'UNKNOWN DATE'),
            this.createElement('p', 'dossier-sector', { id: 'dossierLocation' }, 'UNKNOWN SECTOR')
        );

        hero.append(heroLeft, heroRight);

        const briefCard = this.createElement('section', 'briefing-card case-brief-card', { id: 'dossierBriefCard' });
        briefCard.setAttribute('aria-label', 'Case brief');
        const briefHeading = this.createElement('div', 'case-brief-heading');
        briefHeading.append(
            this.createHeading('description', 'Case Brief'),
            this.createElement('span', 'case-brief-status', { id: 'dossierBriefStatus' }, 'STATUS UNKNOWN')
        );
        briefCard.append(
            briefHeading,
            this.createElement('p', 'case-brief-summary', { id: 'dossierBriefSummary' }, ''),
            this.createElement('dl', 'case-brief-facts', { id: 'dossierBriefFacts' }),
            this.createElement('p', 'case-brief-note hidden', { id: 'dossierBriefNote' }, ''),
            this.createElement('div', 'case-brief-sources', { id: 'dossierBriefSources' })
        );

        const videoCard = this.createElement('section', 'briefing-card briefing-video-card hidden', { id: 'dossierVideoCard' });
        const videoHeader = this.createElement('div', 'briefing-video-header');
        videoHeader.append(
            this.createHeading('smart_display', 'Briefing Video'),
            this.createElement('span', 'video-match-badge', { id: 'dossierVideoMatch' }, 'CASE FOOTAGE')
        );
        const videoStage = this.createElement('div', 'briefing-video-stage hidden', { id: 'dossierVideoStage' });
        const videoFacade = this.createElement('button', 'briefing-video-facade', { id: 'dossierVideoFacade', type: 'button' });
        const videoThumb = this.createElement('img', 'briefing-video-thumb', { id: 'dossierVideoThumb', alt: '' });
        videoThumb.loading = 'lazy';
        videoThumb.decoding = 'async';
        videoThumb.referrerPolicy = 'no-referrer';
        const playRing = this.createElement('span', 'briefing-video-play');
        playRing.append(this.createIcon('play_arrow'));
        const facadeHud = this.createElement('span', 'briefing-video-hud');
        facadeHud.append(
            this.createElement('span', 'video-hud-dot'),
            this.createElement('span', '', { id: 'dossierVideoDuration' }, 'SIGNAL READY · PRESS TO PLAY')
        );
        videoFacade.append(videoThumb, playRing, facadeHud);
        const videoFrame = this.createElement('iframe', 'briefing-video-frame hidden', { id: 'dossierVideoFrame', title: 'Case briefing video' });
        videoFrame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; web-share');
        videoFrame.setAttribute('allowfullscreen', '');
        videoFrame.setAttribute('loading', 'lazy');
        videoFrame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        videoStage.append(videoFacade, videoFrame);

        const videoMeta = this.createElement('div', 'briefing-video-meta hidden', { id: 'dossierVideoMeta' });
        videoMeta.append(
            this.createElement('p', 'briefing-video-title', { id: 'dossierVideoTitle' }, ''),
            this.createElement('p', 'briefing-video-channel', { id: 'dossierVideoChannel' }, '')
        );
        const videoActions = this.createElement('div', 'briefing-video-actions hidden', { id: 'dossierVideoActions' });
        videoActions.append(
            this.createElement('p', 'briefing-video-privacy', {}, 'Privacy-enhanced embed: nothing loads from YouTube until you press play.'),
            this.createElement('button', 'briefing-action video-watch-action', { id: 'dossierVideoOpenButton', type: 'button' }, 'Watch on YouTube')
        );
        const videoFallback = this.createElement('div', 'briefing-video-fallback hidden', { id: 'dossierVideoFallback' });
        videoFallback.append(
            this.createIcon('youtube_searched_for'),
            this.createElement('p', 'video-fallback-title', { id: 'dossierVideoFallbackTitle' }, 'No verified video on file'),
            this.createElement('p', 'video-fallback-copy', {}, 'No verified, embeddable video is linked to this case yet.'),
            this.createElement('button', 'briefing-action video-search-action', { id: 'dossierVideoSearchButton', type: 'button' }, 'Search YouTube')
        );
        videoCard.append(videoHeader, videoStage, videoMeta, videoActions, videoFallback);

        const pressCard = this.createElement('section', 'briefing-card briefing-press-card hidden', { id: 'dossierPressCard' });
        pressCard.append(
            this.createHeading('article', 'Press & Articles'),
            this.createElement('div', 'press-clipping-list', { id: 'dossierPressList' })
        );

        const confidenceCard = this.createElement('section', 'briefing-card confidence-card');
        const confidenceTop = this.createElement('div', 'confidence-header');
        confidenceTop.append(
            this.createElement('span', 'confidence-label', {}, 'Signal Strength'),
            this.createElement('span', 'confidence-score', { id: 'dossierCredibility' }, '0% CREDIBILITY')
        );
        const meter = this.createElement('div', 'confidence-meter');
        meter.append(this.createElement('div', 'confidence-fill', { id: 'dossierCredibilityFill' }));
        confidenceCard.append(
            confidenceTop,
            meter,
            this.createElement('p', 'confidence-note', { id: 'dossierConfidenceNote' }, 'Signal confidence has not been assessed.')
        );

        const tabBar = this.createElement('nav', 'dossier-tabs', { id: 'dossierTabs' });
        tabBar.setAttribute('aria-label', 'Broadcast case file sections');
        this.tabs.forEach((tab) => {
            const button = this.createElement('button', 'dossier-tab', {
                type: 'button',
                'data-tab': tab.id,
                id: `dossierTab-${tab.id}`
            });
            button.setAttribute('aria-controls', `pane-${tab.id}`);
            button.append(this.createIcon(tab.icon), this.createElement('span', '', {}, tab.label));
            button.addEventListener('click', () => this.switchTab(tab.id));
            tabBar.append(button);
        });

        const panes = this.createElement('div', 'dossier-panes');
        this.tabs.forEach((tab) => {
            const pane = this.createElement('section', 'tab-pane', { id: `pane-${tab.id}` });
            pane.setAttribute('role', 'tabpanel');
            pane.setAttribute('aria-labelledby', `dossierTab-${tab.id}`);
            panes.append(pane);
        });

        const bottomNav = this.createElement('nav', 'dossier-bottom-nav', { id: 'dossierBottomNav' });
        bottomNav.setAttribute('aria-label', 'Briefing quick navigation');
        this.tabs.forEach((tab) => {
            const button = this.createElement('button', 'bottom-nav-item', { type: 'button', 'data-tab': tab.id });
            button.append(this.createIcon(tab.icon), this.createElement('span', '', {}, tab.label));
            button.addEventListener('click', () => this.switchTab(tab.id));
            bottomNav.append(button);
        });

        const briefingGrid = this.createElement('div', 'dossier-briefing-grid');
        briefingGrid.append(briefCard, videoCard);

        scrollArea.append(hero, briefingGrid, confidenceCard, pressCard, tabBar, panes);
        shell.append(appBar, scrollArea, bottomNav);
        overlay.append(shell);
        document.body.appendChild(overlay);

        closeButton.addEventListener('click', () => this.close());
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                this.close();
            }
        });
    }

    open(caseData) {
        if (!caseData) return;

        this.activeCase = caseData;
        this.activeTab = 'onair';
        this.isOpen = true;
        this.lastFocusedElement = document.activeElement;

        this.setText('dossierAppTitle', `MIDNIGHT MERIDIAN: ${this.value(caseData.id, 'UNKNOWN').toUpperCase()}`);
        this.setText('dossierClassification', `CLASSIFICATION: ${this.value(caseData.classification, 'UNCLASSIFIED')}`);
        this.setText('dossierTitle', this.value(caseData.name, 'Unknown Case'));
        this.setText('dossierId', `CASE-${this.value(caseData.id, '000').toUpperCase()}`);
        this.setText('dossierBroadcastLine', this.getBroadcastLine(caseData));
        this.setText('dossierDate', CaseContext.formatCaseDate(caseData));
        this.setText('dossierLocation', this.value(caseData.location, 'LOCATION UNKNOWN'));
        const credibility = this.getCredibility(caseData);
        this.setText('dossierConfidenceNote', this.getConfidenceNote(caseData, credibility));
        this.animateCredibility(credibility);

        this.populateCaseBrief(caseData);
        this.populateOnAir(caseData);
        this.populateBriefingVideo(caseData);
        this.populatePressClippings(caseData);
        this.populateCaseFile(caseData);
        this.populateTapeVault(caseData);
        this.populateSignalMapPane(caseData);
        this.populateAnalysis(caseData);
        this.updateQueueButton();

        document.getElementById('dossierScroll')?.scrollTo({ top: 0 });
        const overlay = document.getElementById('dossierOverlay');
        overlay.classList.remove('hidden');
        document.body.classList.add('dossier-open');
        document.addEventListener('keydown', this.boundHandleKeydown);

        this.switchTab('onair');
        requestAnimationFrame(() => {
            const closeButton = document.getElementById('dossierClose');
            closeButton?.focus({ preventScroll: true });
        });
    }

    populateOnAir(caseData) {
        const pane = this.getPane('onair');
        pane.replaceChildren();

        const credibility = this.getCredibility(caseData);
        const stationCard = this.createElement('section', 'briefing-card broadcast-card');
        stationCard.append(
            this.createElement('p', 'broadcast-station', {}, 'THE MIDNIGHT MERIDIAN / AM 1090 KHz'),
            this.createHeading('radio', 'Line Open'),
            this.createElement('p', 'broadcast-line-copy', {}, this.getBroadcastLine(caseData)),
            this.createRadioWaveform(),
            this.createChipRow([
                ['Source', this.value(caseData.source, 'Local archive')],
                ['Status', this.value(caseData.status, 'Not logged')],
                ['Signal', this.getSignalLevel(credibility)]
            ]),
            this.createAnalystNote(caseData),
            this.createAudioDramaControls(caseData)
        );

        pane.append(stationCard);
    }

    briefFact(raw) {
        const value = this.value(raw, '');
        return /^(n\/?a|unknown|none)?$/i.test(value.trim()) ? 'Not recorded' : value;
    }

    populateCaseBrief(caseData) {
        this.setText('dossierBriefStatus', this.value(caseData.status, 'Status not logged'));
        this.setText('dossierBriefSummary', this.value(caseData.summary, 'No summary available in the dataset.'));

        const facts = document.getElementById('dossierBriefFacts');
        if (facts) {
            facts.replaceChildren();
            [
                ['event', 'When', CaseContext.formatCaseDate(caseData)],
                ['location_on', 'Where', this.value(caseData.location, 'Location not logged')],
                ['groups', 'Witnesses', this.briefFact(caseData.witnesses)],
                ['timer', 'Duration', this.briefFact(caseData.duration)],
                ['category', 'Object', this.briefFact(caseData.shape)],
                ['account_balance', 'Source', CaseContext.getSourceProgram(caseData.source).name]
            ].forEach(([icon, label, value]) => {
                const fact = this.createElement('div', 'case-brief-fact');
                const term = this.createElement('dt', '');
                term.append(this.createIcon(icon), this.createElement('span', '', {}, label));
                fact.append(term, this.createElement('dd', '', {}, value));
                facts.append(fact);
            });
        }

        const note = document.getElementById('dossierBriefNote');
        if (note) {
            const contextNote = this.value(caseData.contextNote, '');
            note.textContent = contextNote;
            note.classList.toggle('hidden', !contextNote);
        }

        const sources = document.getElementById('dossierBriefSources');
        if (!sources) return;
        sources.replaceChildren();

        const program = CaseContext.getSourceProgram(caseData.source);
        const pressUrls = new Set(this.findPressResources(caseData).slice(0, 4).map((resource) => String(resource.url || '').toLowerCase()));
        const links = CaseContext.getSourceLinks(caseData, 12)
            .filter((resource) => !pressUrls.has(String(resource.url).toLowerCase()))
            .slice(0, 4);
        const programUrl = this.getSafeUrl(program.url);
        if (!links.length && !programUrl) return;

        sources.append(this.createElement('p', 'case-brief-sources-label', {}, 'Key sources'));
        const list = this.createElement('ul', 'case-brief-source-list');
        links.forEach((resource) => {
            const url = this.getSafeUrl(resource.url);
            if (!url) return;
            const item = this.createElement('li', '');
            const link = this.createElement('a', 'case-brief-source-link', { href: url, target: '_blank', rel: 'noopener noreferrer' });
            link.append(
                this.createIcon(this.getResourceIcon(resource)),
                this.createElement('span', 'case-brief-source-title', {}, this.value(resource.title, 'Source file')),
                this.createElement('span', 'case-brief-source-meta', {}, [this.formatResourceSource(resource), resource.date].filter(Boolean).join(' · '))
            );
            item.append(link);
            list.append(item);
        });
        if (programUrl) {
            const item = this.createElement('li', '');
            const link = this.createElement('a', 'case-brief-source-link program', { href: programUrl, target: '_blank', rel: 'noopener noreferrer' });
            link.append(
                this.createIcon('account_balance'),
                this.createElement('span', 'case-brief-source-title', {}, program.name),
                this.createElement('span', 'case-brief-source-meta', {}, 'Originating archive')
            );
            item.append(link);
            list.append(item);
        }
        sources.append(list);
    }

    populateCaseFile(caseData) {
        const pane = this.getPane('casefile');
        pane.replaceChildren();

        const caseFile = this.createElement('section', 'briefing-card');
        caseFile.append(this.createHeading('folder_open', 'Case File'));
        const grid = this.createElement('div', 'case-file-grid expanded');
        [
            ['Date', this.value(caseData.date || caseData.year, 'Date not logged')],
            ['Location', this.value(caseData.location, 'Location not logged')],
            ['Shape', this.value(caseData.shape, 'Unknown')],
            ['Witnesses', this.value(caseData.witnesses, 'Not logged')],
            ['Duration', this.value(caseData.duration, 'Not logged')],
            ['Source', this.value(caseData.source, 'Local archive')],
            ['Classification', this.value(caseData.classification, 'Unknown')],
            ['Status', this.value(caseData.status, 'Unknown')],
            ['Credibility', `${this.getCredibility(caseData)}%`],
            ['Coordinates', this.formatCoordinates(caseData.coordinates)]
        ].forEach(([label, value]) => grid.append(this.createDataTile(label, value)));
        caseFile.append(grid);
        caseFile.append(this.createEvidenceTimeline(caseData), this.createQualityScoreCard(caseData));

        pane.append(caseFile);
    }

    populateTapeVault(caseData) {
        const pane = this.getPane('tapevault');
        pane.replaceChildren();

        const resources = Array.isArray(caseData.resources) ? caseData.resources : [];
        const vault = this.createElement('section', 'briefing-card tape-vault-card');
        vault.append(
            this.createHeading('inventory_2', 'Tape Vault'),
            this.createElement('p', 'briefing-muted-copy', {}, resources.length
                ? 'Linked source cards are opened in a new tab using safe opener settings.'
                : 'No external source links are attached to this case. Derived cards below are based only on the selected case fields.')
        );

        const grid = this.createElement('div', 'evidence-grid tape-grid');
        this.buildEvidenceItems(caseData).forEach((item) => grid.append(this.createEvidenceCard(item)));
        vault.append(grid, this.createEvidenceMediaViewer(caseData), this.createEvidenceBoard(caseData), this.createSourceManager(caseData));

        pane.append(vault);
    }

    populateSignalMapPane(caseData) {
        const pane = this.getPane('signalmap');
        pane.replaceChildren();

        const signalCard = this.createElement('section', 'briefing-card signal-card signal-map-pane');
        signalCard.append(
            this.createHeading('radar', 'Signal Map'),
            this.createElement('canvas', 'signal-canvas', { id: 'dossierMapCanvas' }),
            this.createSignalReadout(caseData),
            this.createLocationIntelligenceCard(caseData),
            this.createElement('p', 'briefing-muted-copy', {}, caseData.coordinates
                ? 'Coordinate lock is drawn from the selected case record.'
                : 'Coordinates are unavailable for this case, so the map renders a neutral signal sweep.')
        );

        pane.append(signalCard);
        requestAnimationFrame(() => this.renderSignalMap(caseData));
    }

    populateAnalysis(caseData) {
        const pane = this.getPane('analysis');
        pane.replaceChildren();

        const credibility = this.getCredibility(caseData);
        const assessment = this.createElement('section', 'briefing-card');
        assessment.append(
            this.createHeading('assignment', 'Conservative Analysis'),
            this.createChipRow([
                ['Incident', this.value(caseData.id, 'Unknown')],
                ['Signal', this.getSignalLevel(credibility)],
                ['Class', this.value(caseData.classification, 'Unknown')],
                ['Status', this.value(caseData.status, 'Unknown')]
            ]),
            this.createElement('p', 'briefing-summary-text', {}, this.getAssessmentText(caseData, credibility)),
            this.createCredibilityExplanation(caseData),
            this.createInvestigationPath(caseData),
            this.createComparisonTimeline(caseData),
            this.createNewsLinkCard(caseData),
            this.createRelatedCases(caseData)
        );

        const controls = this.createElement('div', 'briefing-controls');
        const close = this.createElement('button', 'briefing-action secondary', { type: 'button' });
        close.append(this.createIcon('lock'), this.createElement('span', '', {}, 'Close Case File'));
        close.addEventListener('click', () => this.close());
        controls.append(close);

        assessment.append(controls);
        pane.append(assessment);
    }

    populateSummary(caseData) {
        const pane = this.getPane('summary');
        pane.replaceChildren();

        const quickGrid = this.createElement('div', 'briefing-data-grid');
        [
            ['Status', this.value(caseData.status, 'Not logged')],
            ['Shape', this.value(caseData.shape, 'Unknown')],
            ['Duration', this.value(caseData.duration, 'Not logged')],
            ['Source', this.value(caseData.source, 'Local archive')]
        ].forEach(([label, value]) => quickGrid.append(this.createDataTile(label, value)));

        const evidencePreview = this.createElement('div', 'evidence-grid compact');
        this.buildEvidenceItems(caseData).slice(0, 2).forEach((item) => evidencePreview.append(this.createEvidenceCard(item)));

        pane.append(
            quickGrid,
            this.createSectionLabel('Primary Evidence'),
            evidencePreview,
            this.createAnalystNote(caseData)
        );
    }

    populateBriefingVideo(caseData) {
        this.clearBriefingVideo();

        const videoCard = document.getElementById('dossierVideoCard');
        const frame = document.getElementById('dossierVideoFrame');
        const fallback = document.getElementById('dossierVideoFallback');
        const searchButton = document.getElementById('dossierVideoSearchButton');

        if (!videoCard || !frame || !fallback || !searchButton) return;

        const resources = this.findYouTubeResources(caseData);
        const candidates = CaseContext.getVerifiedVideos(caseData)
            .filter((resource) => !this.shouldSkipYouTubeResource(resource));

        if (candidates.length) {
            this.showBriefingVideoCandidate(caseData, candidates, 0);
            return;
        }

        const fallbackResource = this.createYouTubeSearchResource(caseData);
        if (fallbackResource) {
            this.showBriefingVideoFallback(fallbackResource, resources.length);
            return;
        }

        videoCard.classList.add('hidden');
    }

    populatePressClippings(caseData) {
        const pressCard = document.getElementById('dossierPressCard');
        const pressList = document.getElementById('dossierPressList');
        if (!pressCard || !pressList) return;

        pressList.replaceChildren();
        const clippings = this.findPressResources(caseData).slice(0, 4);

        if (!clippings.length) {
            pressCard.classList.add('hidden');
            return;
        }

        clippings.forEach((resource) => pressList.append(this.createPressClipping(resource)));
        pressCard.classList.remove('hidden');
    }

    createPressClipping(resource) {
        const url = this.getSafeUrl(resource.url);
        const item = this.createElement(url ? 'button' : 'div', 'press-clipping-item');
        if (url) {
            item.type = 'button';
            item.title = `Open ${this.value(resource.title, 'press clipping')}`;
            item.addEventListener('click', () => window.open(url, '_blank', 'noopener,noreferrer'));
        }

        item.append(
            this.createElement('span', 'press-clipping-date', {}, this.value(resource.date, 'DATE UNKNOWN')),
            this.createElement('span', 'press-clipping-title', {}, this.value(resource.title, 'Press clipping')),
            this.createElement('span', 'press-clipping-source', {}, this.formatResourceSource(resource))
        );

        return item;
    }

    populateTimeline(caseData) {
        const pane = this.getPane('timeline');
        pane.replaceChildren();

        const timeline = this.createElement('div', 'briefing-timeline');
        [
            ['Incident Date', this.value(caseData.date || caseData.year, 'Date not logged')],
            ['Geographic Sector', this.value(caseData.location, 'Location not logged')],
            ['Observation Window', this.value(caseData.duration, 'Duration not logged')],
            ['Witness Record', this.value(caseData.witnesses, 'Witness details not logged')],
            ['Current Status', this.value(caseData.status, 'Status not logged')]
        ].forEach(([label, value]) => {
            const row = this.createElement('div', 'timeline-row');
            row.append(this.createElement('span', 'timeline-dot'), this.createElement('div', 'timeline-label', {}, label), this.createElement('div', 'timeline-value', {}, value));
            timeline.append(row);
        });

        pane.append(timeline);
    }

    populateEvidence(caseData) {
        const pane = this.getPane('evidence');
        pane.replaceChildren();

        const items = this.buildEvidenceItems(caseData);
        const grid = this.createElement('div', 'evidence-grid');
        items.forEach((item) => grid.append(this.createEvidenceCard(item)));

        const signalCard = this.createElement('section', 'briefing-card signal-card');
        signalCard.append(
            this.createHeading('radar', 'Signal Map'),
            this.createElement('canvas', 'signal-canvas', { id: 'dossierMapCanvas' }),
            this.createSignalReadout(caseData)
        );

        pane.append(grid, signalCard);
        requestAnimationFrame(() => this.renderSignalMap(caseData));
    }

    populateWitnesses(caseData) {
        const pane = this.getPane('witnesses');
        pane.replaceChildren();

        const witnessCard = this.createElement('section', 'briefing-card');
        witnessCard.append(
            this.createHeading('visibility', 'Witness Record'),
            this.createDataTile('Logged Witnesses', this.value(caseData.witnesses, 'Not logged')),
            this.createElement('p', 'briefing-muted-copy', {}, 'No verbatim witness transcript is present in this dataset. The briefing preserves only the witness information available on the selected case record.')
        );

        const caseFile = this.createElement('section', 'briefing-card');
        caseFile.append(this.createHeading('folder_open', 'Case File'));
        const grid = this.createElement('div', 'case-file-grid');
        [
            ['Case ID', this.value(caseData.id, 'Unknown')],
            ['Classification', this.value(caseData.classification, 'Unknown')],
            ['Status', this.value(caseData.status, 'Unknown')],
            ['Coordinates', this.formatCoordinates(caseData.coordinates)],
            ['Shape', this.value(caseData.shape, 'Unknown')],
            ['Source', this.value(caseData.source, 'Local archive')]
        ].forEach(([label, value]) => grid.append(this.createDataTile(label, value)));
        caseFile.append(grid);

        pane.append(witnessCard, caseFile);
    }

    populateBriefing(caseData) {
        const pane = this.getPane('briefing');
        pane.replaceChildren();

        const credibility = this.getCredibility(caseData);
        const assessment = this.createElement('section', 'briefing-card');
        assessment.append(
            this.createHeading('assignment', 'Analyst Briefing'),
            this.createElement('p', 'briefing-summary-text', {}, this.getAssessmentText(caseData, credibility))
        );

        const controls = this.createElement('div', 'briefing-controls');
        const close = this.createElement('button', 'briefing-action secondary', { type: 'button' });
        close.append(this.createIcon('lock'), this.createElement('span', '', {}, 'Close Briefing'));
        close.addEventListener('click', () => this.close());
        controls.append(close);

        pane.append(assessment, controls);
    }

    buildEvidenceItems(caseData) {
        const items = [];
        const resources = Array.isArray(caseData.resources) ? caseData.resources : [];

        resources.forEach((resource, index) => {
            items.push({
                title: this.value(resource.title, `Source ${index + 1}`),
                type: this.getResourceType(resource),
                tags: this.getResourceTags(resource),
                url: this.getSafeUrl(resource.url),
                state: 'UNCLASSIFIED',
                icon: this.getResourceIcon(resource)
            });
        });

        if (caseData.shape) {
            items.push({
                title: `Visual profile: ${caseData.shape}`,
                type: 'CASE NOTE',
                tags: ['SHAPE', 'FIELD'],
                state: 'DERIVED',
                icon: 'view_in_ar'
            });
        }

        if (caseData.coordinates) {
            items.push({
                title: 'Coordinate signal lock',
                type: 'MAP LOG',
                tags: ['COORD', 'GLOBE'],
                state: 'ACTIVE',
                icon: 'radar'
            });
        }

        if (items.length === 0) {
            items.push({
                title: 'No external evidence digitized',
                type: 'EMPTY RECORD',
                tags: ['LOCAL', 'CASE'],
                state: 'PENDING',
                icon: 'folder_off'
            });
        }

        return items;
    }

    createEvidenceCard(item) {
        const card = this.createElement(item.url ? 'button' : 'div', 'evidence-card');
        if (item.url) {
            card.type = 'button';
            card.title = `Open ${item.title}`;
            card.addEventListener('click', () => {
                window.open(item.url, '_blank', 'noopener,noreferrer');
            });
        }

        const preview = this.createElement('div', 'evidence-preview');
        preview.append(this.createIcon(item.icon), this.createElement('span', 'evidence-state', {}, item.state));

        const title = this.createElement('p', 'evidence-title', {}, item.title);
        const meta = this.createElement('div', 'evidence-tags');
        item.tags.forEach((tag) => meta.append(this.createElement('span', 'evidence-tag', {}, tag)));

        card.append(preview, title, meta, this.createElement('p', 'evidence-type', {}, item.type));
        return card;
    }

    createAudioDramaControls(caseData) {
        const card = this.createElement('section', 'audio-drama-card');
        card.append(
            this.createHeading('settings_voice', 'Broadcast Texture'),
            this.createElement('p', 'briefing-muted-copy', {}, 'Short radio cues add atmosphere without changing the case facts.')
        );

        const controls = this.createElement('div', 'audio-drama-controls');
        [
            ['station-id', 'Station ID'],
            ['tape-hiss', 'Tape Hiss'],
            ['signal-break', 'Signal Break']
        ].forEach(([cue, label]) => {
            const button = this.createElement('button', 'briefing-action secondary', { type: 'button' }, label);
            button.addEventListener('click', () => window.commandDeck?.playAudioDramaCue?.(cue, caseData));
            controls.append(button);
        });
        card.append(controls);
        return card;
    }

    createEvidenceTimeline(caseData) {
        const card = this.createElement('section', 'evidence-timeline-card');
        card.append(this.createHeading('timeline', 'Evidence Timeline'));
        const timeline = this.createElement('div', 'case-evidence-timeline');
        const resources = Array.isArray(caseData.resources) ? caseData.resources : [];
        const events = [
            ['Incident', this.value(caseData.date || caseData.year, 'Date unknown'), this.value(caseData.summary, 'No incident summary is logged.')],
            ['Witness Record', this.value(caseData.witnesses, 'Not logged'), 'Witness metadata as stored on the case record.'],
            ['Source Logged', this.value(caseData.source, 'Local archive'), resources.length ? `${resources.length} linked source item${resources.length === 1 ? '' : 's'} available.` : 'No external source link is attached yet.'],
            ['Status Review', this.value(caseData.status, 'Unknown'), 'Current case status from the loaded dataset.']
        ];

        events.forEach(([label, value, detail]) => {
            const row = this.createElement('div', 'case-timeline-row');
            row.append(
                this.createElement('span', 'timeline-node'),
                this.createElement('strong', '', {}, label),
                this.createElement('span', '', {}, value),
                this.createElement('small', '', {}, detail)
            );
            timeline.append(row);
        });
        card.append(timeline);
        return card;
    }

    createQualityScoreCard(caseData) {
        const quality = window.commandDeck?.getCaseQualityScore?.(caseData);
        const card = this.createElement('section', 'quality-score-card');
        card.append(this.createHeading('grading', 'Completeness Score'));

        if (!quality) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'Quality scoring is unavailable.'));
            return card;
        }

        const meter = this.createElement('div', 'quality-meter');
        meter.append(this.createElement('div', 'quality-meter-fill', { style: `width:${quality.score}%` }));
        const issueList = this.createElement('div', 'quality-issue-list');
        (quality.issues.length ? quality.issues : ['No major gaps detected']).forEach((issue) => {
            issueList.append(this.createElement('span', 'quality-issue', {}, issue));
        });

        card.append(
            this.createElement('strong', 'quality-score-value', {}, `${quality.score}% archive-ready`),
            meter,
            issueList
        );
        return card;
    }

    createSourceManager(caseData) {
        const card = this.createElement('section', 'source-manager-card');
        card.append(this.createHeading('source_notes', 'Source Manager'));
        const entries = window.commandDeck?.getSourceManagerEntries?.(caseData) || [];

        if (!entries.length) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'No source entries are available yet.'));
            return card;
        }

        const list = this.createElement('div', 'source-manager-list');
        entries.slice(0, 8).forEach((entry) => {
            const safeUrl = this.getSafeUrl(entry.url);
            const item = this.createElement('div', 'source-manager-item');
            item.append(
                this.createElement('strong', '', {}, this.value(entry.title, 'Untitled source')),
                this.createElement('span', '', {}, `${this.value(entry.type, 'source')} / ${this.value(entry.verificationStatus, 'unchecked')}`),
                this.createElement('small', '', {}, this.value(entry.reliability, 'Review source context')),
                this.createElement('p', 'source-excerpt', {}, this.value(entry.excerpt, 'No excerpt is available for this source yet.'))
            );
            const controls = this.createElement('div', 'source-verification-actions');
            if (safeUrl) {
                const open = this.createElement('button', 'source-status-button', { type: 'button' }, 'open');
                open.addEventListener('click', () => window.open(safeUrl, '_blank', 'noopener,noreferrer'));
                controls.append(open);
            }
            ['verified', 'needs-excerpt', 'stale-link'].forEach((status) => {
                const button = this.createElement('button', 'source-status-button', { type: 'button' }, status);
                button.addEventListener('click', (event) => {
                    window.commandDeck?.setSourceVerificationStatus?.(entry, status);
                    this.populateTapeVault(this.activeCase);
                });
                controls.append(button);
            });
            item.append(controls);
            list.append(item);
        });
        card.append(list);
        return card;
    }

    createEvidenceMediaViewer(caseData) {
        const card = this.createElement('section', 'media-viewer-card');
        card.append(this.createHeading('perm_media', 'Evidence Media Viewer'));
        const items = window.commandDeck?.getEvidenceMediaItems?.(caseData) || [];

        if (!items.length) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'No media or source preview items are available yet.'));
            return card;
        }

        const preview = this.createElement('div', 'media-viewer-preview');
        const first = items[0];
        const renderPreview = (item) => {
            preview.replaceChildren();
            preview.append(
                this.createElement('span', 'media-type-label', {}, this.value(item.mediaType, 'source')),
                this.createElement('strong', '', {}, this.value(item.title, 'Untitled source')),
                this.createElement('p', '', {}, this.value(item.excerpt, 'No excerpt available.'))
            );

            const safeUrl = this.getSafeUrl(item.url);
            if (safeUrl) {
                const open = this.createElement('button', 'briefing-action secondary', { type: 'button' }, 'Open Source');
                open.addEventListener('click', () => window.open(safeUrl, '_blank', 'noopener,noreferrer'));
                preview.append(open);
            }
        };
        renderPreview(first);

        const rail = this.createElement('div', 'media-viewer-rail');
        items.slice(0, 8).forEach((item) => {
            const button = this.createElement('button', 'media-thumb-button', { type: 'button' });
            button.append(
                this.createElement('span', '', {}, this.value(item.mediaType, 'source')),
                this.createElement('strong', '', {}, this.value(item.title, 'Untitled').slice(0, 48))
            );
            button.addEventListener('click', () => renderPreview(item));
            rail.append(button);
        });
        card.append(preview, rail);
        return card;
    }

    createLocationIntelligenceCard(caseData) {
        const intel = window.commandDeck?.getLocationIntelligence?.(caseData);
        const card = this.createElement('section', 'location-intelligence-card');
        card.append(this.createHeading('travel_explore', 'Location Intelligence'));
        if (!intel) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'Location intelligence is unavailable for this case.'));
            return card;
        }

        const bands = this.createElement('div', 'location-band-grid');
        intel.distances.forEach((band) => {
            const item = this.createElement('div', 'location-band-card');
            item.append(
                this.createElement('strong', '', {}, `${band.count}`),
                this.createElement('span', '', {}, `within ${band.miles} mi`)
            );
            bands.append(item);
        });

        const nearby = this.createElement('div', 'nearby-case-list');
        intel.nearby.slice(0, 4).forEach(({ caseData: nearbyCase, distance }) => {
            const button = this.createElement('button', 'nearby-case-item', { type: 'button' });
            button.append(
                this.createElement('strong', '', {}, this.value(nearbyCase.name, 'Unknown case')),
                this.createElement('span', '', {}, `${Math.round(distance)} mi / ${this.value(nearbyCase.location, 'Unknown location')}`)
            );
            button.addEventListener('click', () => window.commandDeck?.openBroadcastDossierFromCase?.(nearbyCase));
            nearby.append(button);
        });

        card.append(
            this.createElement('p', 'briefing-muted-copy', {}, `Coordinate lock: ${intel.coordinates}. Nearby official matches: ${intel.militaryMatches}; maritime matches: ${intel.oceanMatches}.`),
            bands,
            nearby
        );
        return card;
    }

    createEvidenceBoard(caseData) {
        const board = this.createElement('section', 'evidence-board');
        board.append(this.createHeading('hub', 'Evidence Board'));

        const lanes = this.createElement('div', 'evidence-board-lanes');
        const resources = Array.isArray(caseData.resources) ? caseData.resources : [];
        const related = window.commandDeck?.getRelatedCases?.(caseData, 4) || [];
        const sourceCount = resources.length;

        [
            ['Case Signal', this.value(caseData.name, 'Unknown case'), this.value(caseData.status, 'Status not logged')],
            ['Source Links', `${sourceCount} linked`, sourceCount ? 'Open Tape Vault cards' : 'No external links logged'],
            ['Archive Tags', this.value((caseData.tags || []).slice?.(0, 3)?.join(', '), 'Local archive'), this.value(caseData.source, 'Source unknown')],
            ['Related Cases', `${related.length} suggested`, related.map((item) => item.name).join(' / ') || 'No related cases yet']
        ].forEach(([label, value, detail]) => {
            const lane = this.createElement('div', 'evidence-board-lane');
            lane.append(
                this.createElement('span', 'board-label', {}, label),
                this.createElement('strong', '', {}, value),
                this.createElement('small', '', {}, detail)
            );
            lanes.append(lane);
        });

        board.append(lanes);
        return board;
    }

    createCredibilityExplanation(caseData) {
        const card = this.createElement('section', 'credibility-explainer');
        card.append(this.createHeading('fact_check', 'Credibility Factors'));

        const factors = this.getCredibilityFactors(caseData);
        const list = this.createElement('div', 'credibility-factor-list');
        factors.forEach((factor) => {
            const row = this.createElement('div', 'credibility-factor');
            row.append(
                this.createElement('span', '', {}, factor.label),
                this.createElement('strong', '', {}, factor.value),
                this.createElement('small', '', {}, factor.note)
            );
            list.append(row);
        });

        card.append(list);
        return card;
    }

    createComparisonTimeline(caseData) {
        const card = this.createElement('section', 'comparison-timeline-card');
        card.append(this.createHeading('stacked_line_chart', 'Comparison Timeline'));
        const entries = window.commandDeck?.getComparisonTimeline?.(caseData, 6) || [];

        if (!entries.length) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'No related timeline entries are available.'));
            return card;
        }

        const list = this.createElement('div', 'comparison-timeline-list');
        entries.forEach((entry) => {
            const button = this.createElement('button', `comparison-timeline-item${entry.isBase ? ' active' : ''}`, { type: 'button' });
            button.append(
                this.createElement('span', 'timeline-date-pill', {}, this.value(entry.date, 'Date unknown')),
                this.createElement('strong', '', {}, this.value(entry.name, 'Unknown case')),
                this.createElement('small', '', {}, `${this.value(entry.location, 'Unknown location')} / ${this.value(entry.shape, 'Unknown shape')} / quality ${entry.quality}%`)
            );
            button.addEventListener('click', () => window.commandDeck?.openBroadcastDossierFromCase?.(entry.caseData));
            list.append(button);
        });

        card.append(list);
        return card;
    }

    createInvestigationPath(caseData) {
        const card = this.createElement('section', 'investigation-path-card');
        card.append(this.createHeading('route', 'Investigation Path'));
        const path = window.commandDeck?.getCaseProgressionPath?.(caseData, 5) || [];

        if (!path.length) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'No next-step cases are available from the loaded archive.'));
            return card;
        }

        const list = this.createElement('div', 'investigation-path-list');
        path.forEach((step, index) => {
            const button = this.createElement('button', 'investigation-path-item', { type: 'button' });
            button.append(
                this.createElement('span', 'path-step', {}, `STEP ${index + 1}`),
                this.createElement('strong', '', {}, this.value(step.caseData?.name, 'Unknown case')),
                this.createElement('small', '', {}, `${this.value(step.reason, 'related case')} / quality ${step.quality}%`)
            );
            button.addEventListener('click', () => window.commandDeck?.openBroadcastDossierFromCase?.(step.caseData));
            list.append(button);
        });
        card.append(list);
        return card;
    }

    createNewsLinkCard(caseData) {
        const card = this.createElement('section', 'news-link-card');
        card.append(this.createHeading('newspaper', 'Current News Links'));
        const links = window.commandDeck?.getNewsLinksForCase?.(caseData, 5) || [];

        if (!links.length) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'No current-news items are linked to this case yet.'));
            return card;
        }

        const list = this.createElement('div', 'news-link-list');
        links.forEach((item) => {
            const safeUrl = this.getSafeUrl(item.url);
            const button = this.createElement(safeUrl ? 'button' : 'div', 'news-link-item');
            if (safeUrl) {
                button.type = 'button';
                button.addEventListener('click', () => window.open(safeUrl, '_blank', 'noopener,noreferrer'));
            }
            button.append(
                this.createElement('strong', '', {}, this.value(item.title, 'News item')),
                this.createElement('span', '', {}, `${this.value(item.author, 'Source')} / ${this.value(item.date, 'Date unknown')}`),
                this.createElement('small', '', {}, this.value(item.linkReason, 'keyword overlap'))
            );
            list.append(button);
        });
        card.append(list);
        return card;
    }

    getCredibilityFactors(caseData) {
        const resources = Array.isArray(caseData.resources) ? caseData.resources : [];
        const source = this.value(caseData.source, 'local archive');
        const officialSource = /aaro|aatip|blue|pursue|government|nasa|usaf|navy|cia/i.test(source);
        const witnesses = this.value(caseData.witnesses, 'Not logged');
        const status = this.value(caseData.status, 'Not logged');

        return [
            {
                label: 'Source Quality',
                value: officialSource ? 'Official/Public Record' : source,
                note: officialSource ? 'Government or official-style source metadata is present.' : 'Review source context before relying on this entry.'
            },
            {
                label: 'Documentation',
                value: resources.length ? `${resources.length} linked item${resources.length === 1 ? '' : 's'}` : 'No links',
                note: resources.length ? 'Tape Vault has external source cards.' : 'The case currently depends on local summary fields.'
            },
            {
                label: 'Witness Detail',
                value: witnesses,
                note: witnesses === 'Not logged' ? 'Witness count or class is missing.' : 'Witness field is present in the case record.'
            },
            {
                label: 'Resolution',
                value: status,
                note: /explained|identified/i.test(status) ? 'Status suggests a resolved or partly resolved record.' : 'Status does not establish origin.'
            }
        ];
    }

    createRelatedCases(caseData) {
        const card = this.createElement('section', 'related-cases-card');
        card.append(this.createHeading('device_hub', 'Related Cases'));

        const related = window.commandDeck?.getRelatedCases?.(caseData, 5) || [];
        if (!related.length) {
            card.append(this.createElement('p', 'briefing-muted-copy', {}, 'No related cases are available from the loaded case set.'));
            return card;
        }

        const list = this.createElement('div', 'related-case-list');
        related.forEach((relatedCase) => {
            const button = this.createElement('button', 'related-case-item', { type: 'button' });
            button.append(
                this.createElement('strong', '', {}, this.value(relatedCase.name, 'Unknown case')),
                this.createElement('span', '', {}, this.value(relatedCase.location, 'Unknown location')),
                this.createElement('small', '', {}, `${this.value(relatedCase.date || relatedCase.year, 'Date unknown')} / ${this.value(relatedCase.shape, 'Unknown shape')}`)
            );
            button.addEventListener('click', () => {
                window.commandDeck?.openBroadcastDossierFromCase?.(relatedCase);
            });
            list.append(button);
        });

        card.append(list);
        return card;
    }

    createAnalystNote(caseData) {
        const note = this.createElement('section', 'analyst-note');
        const header = this.createElement('div', 'analyst-header');
        header.append(this.createElement('span', 'analyst-badge', {}, 'ANALYST_772'), this.createElement('span', 'analyst-meta', {}, 'INTERNAL MEMO'));
        const copy = `Record contains ${this.value(caseData.classification, 'unclassified')} material from ${this.value(caseData.source, 'local archive')}. Assessment should remain tied to the available summary, status, and source metadata.`;
        note.append(header, this.createElement('p', 'analyst-copy', {}, copy));
        return note;
    }

    createSignalReadout(caseData) {
        const readout = this.createElement('div', 'signal-readout');
        readout.append(
            this.createElement('span', '', {}, caseData.coordinates ? 'SIGNAL LOCK: SECURED' : 'SIGNAL LOCK: UNAVAILABLE'),
            this.createElement('span', '', {}, this.formatCoordinates(caseData.coordinates))
        );
        return readout;
    }

    updateQueueButton() {
        const button = document.getElementById('dossierQueueButton');
        if (!button || !this.activeCase) return;

        const queued = window.commandDeck?.isCaseQueued?.(this.activeCase.id);
        button.textContent = queued ? 'Queued' : 'Queue';
        button.classList.toggle('active', Boolean(queued));
    }

    renderSignalMap(caseData) {
        cancelAnimationFrame(this.mapAnimationFrame);
        const canvas = document.getElementById('dossierMapCanvas');
        if (!canvas || !this.isOpen) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));

        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const width = rect.width;
        const height = rect.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const start = performance.now();

        const draw = (now) => {
            if (!this.isOpen || this.activeTab !== 'signalmap') return;

            const elapsed = (now - start) / 1000;
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'rgba(4, 8, 12, 0.86)';
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = 'rgba(77, 224, 130, 0.16)';
            ctx.lineWidth = 1;
            for (let x = 0; x < width; x += 28) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += 28) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            const radius = Math.min(width, height) * 0.34;
            ctx.strokeStyle = 'rgba(77, 224, 130, 0.45)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - radius, centerY);
            ctx.lineTo(centerX + radius, centerY);
            ctx.moveTo(centerX, centerY - radius);
            ctx.lineTo(centerX, centerY + radius);
            ctx.stroke();

            const sweep = elapsed * 1.4;
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(77, 224, 130, 0.32)');
            gradient.addColorStop(1, 'rgba(77, 224, 130, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, sweep, sweep + 0.55);
            ctx.closePath();
            ctx.fill();

            const pulse = 3 + Math.sin(elapsed * 5) * 1.5;
            ctx.fillStyle = caseData.coordinates ? '#4de082' : '#8e9192';
            ctx.beginPath();
            ctx.arc(centerX + radius * 0.28, centerY - radius * 0.18, pulse, 0, Math.PI * 2);
            ctx.fill();

            this.mapAnimationFrame = requestAnimationFrame(draw);
        };

        this.mapAnimationFrame = requestAnimationFrame(draw);
    }

    switchTab(tabName) {
        this.activeTab = tabName;

        document.querySelectorAll('.dossier-tab, .bottom-nav-item').forEach((tab) => {
            const isActive = tab.dataset.tab === tabName;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });

        document.querySelectorAll('.tab-pane').forEach((pane) => {
            const isActive = pane.id === `pane-${tabName}`;
            pane.classList.toggle('active', isActive);
            pane.hidden = !isActive;
        });

        if (tabName === 'signalmap' && this.activeCase) {
            requestAnimationFrame(() => this.renderSignalMap(this.activeCase));
        } else {
            cancelAnimationFrame(this.mapAnimationFrame);
        }
    }

    close() {
        this.activeCase = null;
        this.isOpen = false;
        cancelAnimationFrame(this.mapAnimationFrame);
        this.clearBriefingVideo();

        document.getElementById('dossierOverlay')?.classList.add('hidden');
        document.body.classList.remove('dossier-open');
        document.removeEventListener('keydown', this.boundHandleKeydown);

        if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
            this.lastFocusedElement.focus({ preventScroll: true });
        }
    }

    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.close();
            return;
        }

        if (event.key === 'Tab') {
            const overlay = document.getElementById('dossierOverlay');
            const focusable = overlay
                ? [...overlay.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])')]
                    .filter((element) => !element.disabled && element.offsetParent !== null)
                : [];
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }

    getPane(tabName) {
        return document.getElementById(`pane-${tabName}`);
    }

    createHeading(icon, text) {
        const heading = this.createElement('div', 'briefing-heading');
        heading.append(this.createIcon(icon), this.createElement('h3', '', {}, text));
        return heading;
    }

    createSectionLabel(text) {
        return this.createElement('h3', 'section-label', {}, text);
    }

    createRadioWaveform() {
        const waveform = this.createElement('div', 'broadcast-waveform');
        for (let index = 0; index < 18; index += 1) {
            const height = 14 + (index % 7) * 6;
            waveform.append(this.createElement('span', '', { style: `--wave-index:${index}; --wave-height:${height}px` }));
        }
        return waveform;
    }

    createChipRow(entries) {
        const row = this.createElement('div', 'broadcast-chip-row');
        entries.forEach(([label, value]) => {
            const chip = this.createElement('span', 'broadcast-chip');
            chip.append(
                this.createElement('small', '', {}, label),
                this.createElement('strong', '', {}, value)
            );
            row.append(chip);
        });
        return row;
    }

    createDataTile(label, value) {
        const tile = this.createElement('div', 'data-tile');
        tile.append(this.createElement('span', 'data-label', {}, label), this.createElement('span', 'data-value', {}, value));
        return tile;
    }

    createIcon(name) {
        return this.createElement('span', 'material-symbols-outlined', { 'aria-hidden': 'true' }, name);
    }

    createElement(tag, className = '', attrs = {}, text = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text !== '') element.textContent = text;
        return element;
    }

    setText(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }

    animateCredibility(target) {
        const score = document.getElementById('dossierCredibility');
        const fill = document.getElementById('dossierCredibilityFill');
        if (!score || !fill) return;

        fill.classList.remove('locked');
        fill.style.width = '0%';
        score.textContent = '0% CREDIBILITY';

        const duration = 780;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            score.textContent = `${value}% CREDIBILITY`;
            fill.style.width = `${value}%`;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                fill.classList.add('locked');
            }
        };

        requestAnimationFrame(tick);
    }

    clearBriefingVideo() {
        const videoCard = document.getElementById('dossierVideoCard');
        const stage = document.getElementById('dossierVideoStage');
        const facade = document.getElementById('dossierVideoFacade');
        const thumb = document.getElementById('dossierVideoThumb');
        const frame = document.getElementById('dossierVideoFrame');
        const fallback = document.getElementById('dossierVideoFallback');
        const searchButton = document.getElementById('dossierVideoSearchButton');
        const actions = document.getElementById('dossierVideoActions');
        const meta = document.getElementById('dossierVideoMeta');
        const openButton = document.getElementById('dossierVideoOpenButton');

        if (frame) {
            frame.removeAttribute('src');
            frame.removeAttribute('data-video-id');
            frame.onload = null;
            frame.classList.add('hidden');
        }

        if (thumb) {
            thumb.onerror = null;
            thumb.removeAttribute('src');
        }

        if (facade) {
            facade.onclick = null;
            facade.classList.remove('hidden');
        }

        stage?.classList.add('hidden');
        stage?.classList.remove('playing');
        meta?.classList.add('hidden');
        fallback?.classList.add('hidden');
        actions?.classList.add('hidden');
        videoCard?.classList.add('hidden');

        if (searchButton) {
            searchButton.onclick = null;
        }

        if (openButton) {
            openButton.onclick = null;
        }

        window.alienAudio?.restoreAfterVideo?.();
        this.activeVideoContext = null;
    }

    showBriefingVideoCandidate(caseData, candidates, index) {
        const videoCard = document.getElementById('dossierVideoCard');
        const stage = document.getElementById('dossierVideoStage');
        const facade = document.getElementById('dossierVideoFacade');
        const thumb = document.getElementById('dossierVideoThumb');
        const frame = document.getElementById('dossierVideoFrame');
        const fallback = document.getElementById('dossierVideoFallback');
        const actions = document.getElementById('dossierVideoActions');
        const meta = document.getElementById('dossierVideoMeta');
        const openButton = document.getElementById('dossierVideoOpenButton');
        const resource = candidates[index];
        const videoId = this.getYouTubeVideoId(resource?.url);
        const safeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';

        if (!videoCard || !stage || !facade || !thumb || !frame || !fallback || !resource || !videoId) return;

        this.activeVideoContext = {
            caseId: caseData?.id || '',
            candidates,
            index,
            videoId
        };

        const title = this.value(resource.title, 'Case briefing video');
        const isContext = resource.match === 'context';
        const matchBadge = document.getElementById('dossierVideoMatch');
        this.setText('dossierVideoMatch', isContext ? 'CONTEXT' : 'CASE FOOTAGE');
        matchBadge?.classList.toggle('context', isContext);
        matchBadge?.setAttribute('title', isContext
            ? 'Closest verified coverage of this topic or region, not footage of this exact incident'
            : 'Coverage of this specific incident');
        this.setText('dossierVideoTitle', title);
        this.setText('dossierVideoChannel', resource.channel ? `${resource.channel} · YouTube` : 'YouTube');
        this.setText('dossierVideoDuration', isContext
            ? 'RELATED COVERAGE · PRESS TO PLAY'
            : 'SIGNAL READY · PRESS TO PLAY');

        videoCard.classList.remove('hidden');
        stage.classList.remove('hidden', 'playing');
        meta?.classList.remove('hidden');
        fallback.classList.add('hidden');
        frame.removeAttribute('src');
        frame.classList.add('hidden');
        facade.classList.remove('hidden');
        facade.setAttribute('aria-label', `Play video: ${title}`);

        thumb.onerror = () => {
            if (thumb.dataset.fallbackStep !== 'hq') {
                thumb.dataset.fallbackStep = 'hq';
                thumb.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                return;
            }
            this.advanceBriefingVideo('The thumbnail for this video could not be loaded.');
        };
        thumb.dataset.fallbackStep = '';
        thumb.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        facade.onclick = () => this.playBriefingVideo();

        if (openButton && safeUrl) {
            actions?.classList.remove('hidden');
            openButton.onclick = () => window.open(safeUrl, '_blank', 'noopener,noreferrer');
        }
    }

    playBriefingVideo() {
        const context = this.activeVideoContext;
        const stage = document.getElementById('dossierVideoStage');
        const facade = document.getElementById('dossierVideoFacade');
        const frame = document.getElementById('dossierVideoFrame');
        const resource = context?.candidates?.[context.index];
        const embedUrl = this.getYouTubeEmbedUrl(resource?.url);
        if (!context || !stage || !facade || !frame || !embedUrl) return;

        frame.title = this.value(resource.title, 'Case briefing video');
        frame.dataset.videoId = context.videoId;
        frame.onload = () => this.registerYouTubeFrameListener(frame);
        frame.src = embedUrl;
        frame.classList.remove('hidden');
        facade.classList.add('hidden');
        stage.classList.add('playing');
        window.alienAudio?.duckForVideo?.();
        frame.focus({ preventScroll: true });
    }

    showBriefingVideoFallback(resource, skippedCount = 0) {
        const videoCard = document.getElementById('dossierVideoCard');
        const stage = document.getElementById('dossierVideoStage');
        const frame = document.getElementById('dossierVideoFrame');
        const fallback = document.getElementById('dossierVideoFallback');
        const searchButton = document.getElementById('dossierVideoSearchButton');
        const fallbackTitle = document.getElementById('dossierVideoFallbackTitle');
        const fallbackCopy = fallback?.querySelector('.video-fallback-copy');
        const actions = document.getElementById('dossierVideoActions');
        const meta = document.getElementById('dossierVideoMeta');
        const safeUrl = this.getSafeUrl(resource?.url);

        if (!videoCard || !frame || !fallback || !searchButton || !safeUrl) return;

        this.activeVideoContext = null;
        this.setText('dossierVideoMatch', 'SIGNAL LOST');
        document.getElementById('dossierVideoMatch')?.classList.add('context');
        videoCard.classList.remove('hidden');
        stage?.classList.add('hidden');
        frame.removeAttribute('src');
        frame.classList.add('hidden');
        actions?.classList.add('hidden');
        meta?.classList.add('hidden');
        fallback.classList.remove('hidden');
        fallbackTitle.textContent = this.value(resource.title, 'No verified video on file');
        if (fallbackCopy) {
            fallbackCopy.textContent = skippedCount > 0
                ? 'The linked video is unavailable or cannot be embedded. You can search YouTube for coverage of this case instead.'
                : 'No verified, embeddable video is linked to this case yet. You can search YouTube for coverage instead.';
        }
        searchButton.onclick = () => window.open(safeUrl, '_blank', 'noopener,noreferrer');
    }

    handleYouTubeMessage(event) {
        const origin = String(event.origin || '').toLowerCase();
        if (!origin.includes('youtube.com') && !origin.includes('youtube-nocookie.com')) return;
        if (!this.activeVideoContext) return;

        let payload = event.data;
        if (typeof payload === 'string') {
            try {
                payload = JSON.parse(payload);
            } catch {
                return;
            }
        }

        if (!payload || typeof payload !== 'object') return;
        if (payload.event === 'onError' || payload.event === 'error') {
            this.advanceBriefingVideo('YouTube reported this embed as unavailable.');
        }
    }

    registerYouTubeFrameListener(frame) {
        try {
            frame.contentWindow?.postMessage(JSON.stringify({
                event: 'listening',
                id: frame.id
            }), 'https://www.youtube-nocookie.com');
        } catch (error) {
            console.warn('Unable to register YouTube frame listener:', error);
        }
    }

    advanceBriefingVideo(reason = 'Current YouTube embed is unavailable.') {
        const context = this.activeVideoContext;
        if (!context) return;

        const nextIndex = context.candidates.findIndex((resource, index) => {
            return index > context.index && this.getYouTubeEmbedUrl(resource.url);
        });

        if (nextIndex >= 0) {
            this.showBriefingVideoCandidate(this.activeCase, context.candidates, nextIndex);
            return;
        }

        const searchResource = this.createYouTubeSearchResource(this.activeCase);
        if (searchResource) {
            this.showBriefingVideoFallback({
                ...searchResource,
                title: reason
            }, 1);
        } else {
            this.clearBriefingVideo();
        }
    }

    findYouTubeResources(caseData) {
        const resources = Array.isArray(caseData?.resources) ? caseData.resources : [];
        return resources.filter((resource) => {
            const type = String(resource?.type || '').toLowerCase();
            const url = String(resource?.url || '').toLowerCase();
            return type.includes('youtube') || url.includes('youtube.com') || url.includes('youtu.be');
        });
    }

    findYouTubeResource(caseData) {
        return this.findYouTubeResources(caseData).find((resource) => !this.shouldSkipYouTubeResource(resource));
    }

    shouldSkipYouTubeResource(resource) {
        if (!resource) return true;
        const availability = String(resource.availability || resource.status || '').toLowerCase();
        const title = String(resource.title || '').toLowerCase();
        const videoId = this.getYouTubeVideoId(resource.url);

        return Boolean(resource.skipEmbed)
            || availability.includes('paid')
            || availability.includes('rental')
            || availability.includes('blocked')
            || title.includes('requires payment')
            || this.blockedYouTubeVideoIds.has(videoId);
    }

    createYouTubeSearchResource(caseData) {
        const name = this.value(caseData?.name, '').trim();
        if (!name) return null;

        return {
            type: 'youtube',
            title: 'No verified video on file',
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} UFO`)}`
        };
    }

    findPressResources(caseData) {
        const resources = Array.isArray(caseData?.resources) ? caseData.resources : [];
        return resources.filter((resource) => {
            const type = String(resource?.type || '').toLowerCase();
            const source = String(resource?.source || '').toLowerCase();
            return type.includes('newspaper') || type.includes('press') || type.includes('article') || source.includes('newspaper');
        });
    }

    getYouTubeEmbedUrl(url) {
        const videoId = this.getYouTubeVideoId(url);
        if (!videoId) return '';

        const params = new URLSearchParams({
            autoplay: '1',
            playsinline: '1',
            rel: '0',
            modestbranding: '1',
            enablejsapi: '1',
            origin: window.location.origin
        });

        return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
    }

    getYouTubeVideoId(url) {
        if (!url) return '';

        try {
            const parsed = new URL(url, window.location.href);
            const host = parsed.hostname.replace(/^www\./, '').toLowerCase();

            if (host === 'youtu.be') {
                return this.normalizeYouTubeId(parsed.pathname.split('/').filter(Boolean)[0]);
            }

            if (host.endsWith('youtube.com')) {
                if (parsed.pathname === '/watch') {
                    return this.normalizeYouTubeId(parsed.searchParams.get('v'));
                }

                const parts = parsed.pathname.split('/').filter(Boolean);
                if (['embed', 'shorts', 'live'].includes(parts[0])) {
                    return this.normalizeYouTubeId(parts[1]);
                }
            }
        } catch (error) {
            console.warn('Unable to parse YouTube URL:', url);
        }

        return '';
    }

    normalizeYouTubeId(value) {
        const id = String(value || '').trim();
        return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : '';
    }

    value(value, fallback) {
        if (value === null || value === undefined || value === '') return fallback;
        return String(value);
    }

    getCredibility(caseData) {
        const tuned = window.commandDeck?.getTunedCredibility?.(caseData);
        if (Number.isFinite(Number(tuned))) {
            return Math.max(0, Math.min(100, Math.round(Number(tuned))));
        }

        const value = Number(caseData.credibility);
        if (!Number.isFinite(value)) return 0;
        return Math.max(0, Math.min(100, Math.round(value)));
    }

    getConfidenceNote(caseData, credibility) {
        const source = this.value(caseData.source, 'local archive');
        const witnesses = this.value(caseData.witnesses, 'witness details not logged');

        if (credibility >= 85) {
            return `High-confidence archive entry based on ${source} metadata and ${witnesses}.`;
        }

        if (credibility >= 60) {
            return `Moderate-confidence archive entry. Review source context and witness detail before drawing conclusions.`;
        }

        return `Low-confidence or incomplete archive entry. Treat as preliminary until corroborating records are available.`;
    }

    getBroadcastLine(caseData) {
        const location = this.value(caseData.location, 'Unknown sector');
        const year = this.value(caseData.year || this.getYearFromDate(caseData.date), 'unknown year');
        return `LINE 3: ${location}, ${year}`;
    }

    getYearFromDate(date) {
        const value = String(date || '').trim();
        const match = value.match(/^-?\d{1,4}/) || value.match(/\b(1[5-9]\d{2}|20\d{2})\b/);
        return match ? (match[1] || match[0]) : '';
    }

    getSignalLevel(credibility) {
        if (credibility >= 85) return 'Clear signal';
        if (credibility >= 60) return 'Moderate signal';
        if (credibility > 0) return 'Weak signal';
        return 'Unrated signal';
    }

    getAssessmentText(caseData, credibility) {
        const status = this.value(caseData.status, 'not logged');
        const classification = this.value(caseData.classification, 'unclassified');
        const source = this.value(caseData.source, 'local archive');
        const shape = this.value(caseData.shape, 'unknown morphology');

        return `This briefing summarizes a case classified as ${classification} from ${source}. The selected record lists a ${shape} observation with current status "${status}" and a credibility score of ${credibility}%. The available data supports careful review of the incident record; it does not, by itself, establish origin, intent, or extraordinary cause.`;
    }

    formatCoordinates(coords) {
        if (!coords || !Number.isFinite(Number(coords.lat)) || !Number.isFinite(Number(coords.lng))) {
            return 'Coordinates unavailable';
        }

        const lat = Number(coords.lat);
        const lng = Number(coords.lng);
        return `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}°${lng >= 0 ? 'E' : 'W'}`;
    }

    getSafeUrl(url) {
        if (!url) return '';

        try {
            const parsed = new URL(url, window.location.href);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
                return parsed.href;
            }
        } catch (error) {
            console.warn('Skipping malformed resource URL:', url);
        }

        return '';
    }

    getResourceType(resource) {
        const type = this.value(resource?.type, 'source').toUpperCase();
        if (type.includes('YOUTUBE') || String(resource?.url || '').includes('youtube')) return 'VIDEO LOG';
        if (type.includes('NEWSPAPER') || type.includes('PRESS')) return 'PRESS CLIPPING';
        if (type.includes('IMAGE')) return 'IMAGE FILE';
        if (type.includes('ARTICLE')) return 'EXTERNAL REPORT';
        if (type.includes('PDF')) return 'DOCUMENT';
        return 'SOURCE FILE';
    }

    getResourceTags(resource) {
        const type = this.value(resource?.type, 'source').toUpperCase();
        if (type.includes('YOUTUBE')) return ['VIDEO', 'EXT'];
        if (type.includes('NEWSPAPER') || type.includes('PRESS')) return ['PRESS', 'ARCHIVE'];
        if (type.includes('IMAGE')) return ['IMAGE', 'MEDIA'];
        if (type.includes('ARTICLE')) return ['ARTICLE', 'WEB'];
        if (type.includes('PDF')) return ['PDF', 'DOC'];
        return ['SOURCE', 'LINK'];
    }

    getResourceIcon(resource) {
        const type = this.value(resource?.type, 'source').toLowerCase();
        const url = String(resource?.url || '').toLowerCase();
        if (type.includes('youtube') || url.includes('youtube')) return 'play_circle';
        if (type.includes('newspaper') || type.includes('press')) return 'article';
        if (type.includes('image')) return 'image';
        if (type.includes('article')) return 'article';
        if (type.includes('pdf')) return 'picture_as_pdf';
        return 'description';
    }

    formatResourceSource(resource) {
        const label = this.value(resource?.publication || resource?.source, 'Archive source');
        if (/^curated-(source|newspaper|youtube)$/i.test(label)) {
            return 'Archive source';
        }

        return label;
    }
}
