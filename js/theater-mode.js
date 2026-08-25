/**
 * Theater Mode - Midnight Broadcast segment controller.
 * Owns queue generation, segment rendering, and stage controls.
 */
class TheaterMode {
    constructor() {
        this.dataLoader = null;
        this.news = [];
        this.archives = [];
        this.audio = null;
        this.segments = [];
        this.currentIndex = 0;
        this.isPaused = false;
        this.isLive = false;
        this.root = null;
        this.segmentEl = null;
        this.logEl = null;
        this.bound = false;
        this.episodes = [];
        this.activeEpisodeId = '';
        this.episodeStorageKey = 'ufo-command-deck-nightly-episodes';
    }

    init({ dataLoader, news = [], archives = [], audio = null } = {}) {
        this.dataLoader = dataLoader;
        this.news = Array.isArray(news) ? news : [];
        this.archives = Array.isArray(archives) ? archives : [];
        this.audio = audio;
        this.root = document.getElementById('section-theater');
        this.segmentEl = document.getElementById('theaterSegment');
        this.logEl = document.getElementById('theaterLog');
        this.episodes = this.loadEpisodes();

        this.bindControls();
        this.buildQueue();
        this.renderLog();
        this.renderSegment(this.currentIndex);
    }

    bindControls() {
        if (this.bound) return;

        document.getElementById('theaterStartBtn')?.addEventListener('click', () => this.startShow());
        document.getElementById('theaterNextBtn')?.addEventListener('click', () => this.nextSegment());
        document.getElementById('theaterPauseBtn')?.addEventListener('click', () => this.pauseSignal());
        document.getElementById('theaterExitBtn')?.addEventListener('click', () => this.exit());
        this.ensureEpisodeControls();
        this.bound = true;
    }

    ensureEpisodeControls() {
        const controls = document.querySelector('.theater-controls');
        if (!controls || document.getElementById('theaterSaveEpisodeBtn')) return;

        const save = this.createElement('button', '', { id: 'theaterSaveEpisodeBtn', type: 'button' }, 'Save Episode');
        save.addEventListener('click', () => {
            this.audio?.playClick?.();
            this.saveCurrentEpisode('manual');
        });
        controls.append(save);
    }

    buildQueue() {
        const cases = this.dataLoader?.getAllCases?.() || [];
        const daily = window.commandDeck?.getDailyBroadcastBriefing?.() || {};
        const releaseCase = daily.featuredCase || this.selectFeaturedCase(cases);
        const historicalCase = daily.historicalCase || cases.find((item) => Number(item?.year) < 1900) || null;
        const queueCase = daily.queueItem?.id ? this.dataLoader?.getCase?.(daily.queueItem.id) : null;
        const newsItem = daily.latestNews || this.selectCurrentNews();
        const archiveItem = this.selectArchiveDocument();

        this.segments = [
            {
                type: 'station',
                title: 'The Midnight Meridian',
                subtitle: 'AM 1090 KHz / High Desert Relay',
                body: 'Tonight\'s transmission blends a current public signal, one featured dossier, one historical echo, and any open research queue item.'
            },
            {
                type: 'news',
                title: this.value(newsItem?.title, 'Current Signal Watch'),
                subtitle: this.formatItemSubtitle(newsItem, 'Current archive'),
                body: this.value(newsItem?.summary || newsItem?.description, 'No current news item is loaded.'),
                url: this.getSafeUrl(newsItem?.url)
            },
            {
                type: 'case',
                title: this.value(releaseCase?.name, 'Featured Case'),
                subtitle: this.formatCaseSubtitle(releaseCase),
                body: this.value(releaseCase?.summary, 'No case data is loaded.'),
                caseData: releaseCase
            },
            {
                type: 'history',
                title: this.value(historicalCase?.name, 'Historical Echo'),
                subtitle: this.formatCaseSubtitle(historicalCase),
                body: this.value(historicalCase?.summary, 'No historical case is loaded.'),
                caseData: historicalCase
            },
            {
                type: 'queue',
                title: this.value(queueCase?.name, 'Research Queue Standby'),
                subtitle: queueCase ? this.formatCaseSubtitle(queueCase) : 'No queued case selected',
                body: queueCase ? this.value(queueCase.summary, 'No queued case summary is loaded.') : 'Queue a case from any dossier to bring it into the nightly broadcast.',
                caseData: queueCase
            },
            {
                type: 'archive',
                title: this.value(archiveItem?.title || archiveItem?.name, 'Archive Tape'),
                subtitle: this.formatItemSubtitle(archiveItem, 'Document vault'),
                body: this.value(archiveItem?.summary || archiveItem?.description, 'No archive document is loaded.'),
                url: this.getSafeUrl(archiveItem?.url)
            },
            {
                type: 'globe',
                title: 'Globe Jump',
                subtitle: this.value(releaseCase?.location, 'Coordinates unavailable'),
                body: this.formatCoordinates(releaseCase),
                caseData: releaseCase
            },
            {
                type: 'closing',
                title: 'Closing Transmission',
                subtitle: 'Signal fading',
                body: 'Receiver stays warm. Every public record gets logged, every claim stays tied to its source, and the next signal waits in the static.'
            }
        ];
    }

    selectFeaturedCase(cases) {
        if (!Array.isArray(cases) || !cases.length) return null;

        return cases.find((item) => String(item?.source || '').toLowerCase() === 'pursue-release-02')
            || cases.find((item) => String(item?.source || '').toLowerCase().includes('pursue'))
            || cases.find((item) => item?.coordinates && item?.summary)
            || cases[0];
    }

    selectCurrentNews() {
        return [...this.news]
            .sort((a, b) => String(b?.date || '').localeCompare(String(a?.date || '')))[0] || null;
    }

    selectArchiveDocument() {
        return this.archives.find((item) => String(item?.title || item?.name || '').toLowerCase().includes('uap'))
            || this.archives[0]
            || null;
    }

    enter() {
        this.buildQueue();
        this.renderLog();
        this.root?.classList.add('theater-live');
        this.renderSegment(this.currentIndex);
    }

    exit() {
        this.isLive = false;
        this.root?.classList.remove('theater-live', 'signal-paused');
        this.isPaused = false;
        window.commandDeck?.navigateToSection?.('command');
    }

    startShow() {
        this.isLive = true;
        this.isPaused = false;
        this.currentIndex = 0;
        this.root?.classList.add('theater-live');
        this.root?.classList.remove('signal-paused');
        this.audio?.playTheaterTuning?.();
        this.saveCurrentEpisode('auto');
        this.renderSegment(this.currentIndex);
    }

    nextSegment() {
        if (!this.segments.length) return;

        this.currentIndex = (this.currentIndex + 1) % this.segments.length;
        this.isLive = true;
        this.isPaused = false;
        this.root?.classList.add('theater-live');
        this.root?.classList.remove('signal-paused');
        this.audio?.playTheaterSting?.();
        this.renderSegment(this.currentIndex);
    }

    pauseSignal() {
        this.isPaused = !this.isPaused;
        this.audio?.playClick?.();
        this.root?.classList.toggle('signal-paused', this.isPaused);
        const button = document.getElementById('theaterPauseBtn');
        if (button) button.textContent = this.isPaused ? 'Resume Signal' : 'Pause Signal';
    }

    renderLog() {
        if (!this.logEl) return;

        this.logEl.replaceChildren();
        this.logEl.append(this.createElement('div', 'theater-log-section-title', {}, 'Tonight'));
        this.segments.forEach((segment, index) => {
            const item = this.createElement('button', 'theater-log-item', {
                type: 'button',
                'aria-label': `Open segment ${index + 1}: ${segment.title}`
            });
            item.append(
                this.createElement('span', 'theater-log-index', {}, String(index + 1).padStart(2, '0')),
                this.createElement('span', 'theater-log-title', {}, segment.title),
                this.createElement('small', '', {}, segment.type)
            );
            item.addEventListener('click', () => {
                this.currentIndex = index;
                this.audio?.playClick?.();
                this.renderSegment(index);
            });
            this.logEl.appendChild(item);
        });

        this.renderEpisodeShelf();
        this.highlightLog(this.currentIndex);
    }

    renderEpisodeShelf() {
        if (!this.logEl) return;

        const shelf = this.createElement('div', 'theater-episode-shelf');
        shelf.append(this.createElement('div', 'theater-log-section-title', {}, 'Saved Episodes'));

        if (!this.episodes.length) {
            shelf.append(this.createElement('p', 'theater-empty-copy', {}, 'Start or save a broadcast to pin tonight\'s segment list.'));
            this.logEl.append(shelf);
            return;
        }

        this.episodes.slice(0, 5).forEach((episode) => {
            const item = this.createElement('button', 'theater-episode-item', {
                type: 'button',
                'data-episode-id': episode.id
            });
            item.append(
                this.createElement('strong', '', {}, episode.title),
                this.createElement('small', '', {}, `${episode.dateLabel} / ${episode.segments.length} segments`)
            );
            item.addEventListener('click', () => {
                this.audio?.playClick?.();
                this.loadEpisode(episode.id);
            });
            shelf.append(item);
        });

        this.logEl.append(shelf);
    }

    renderSegment(index) {
        const segment = this.segments[index];
        if (!segment || !this.segmentEl) return;

        this.segmentEl.replaceChildren();
        const frame = this.createElement('article', `theater-segment-card segment-${segment.type}`);
        frame.append(
            this.createElement('div', 'segment-kicker', {}, segment.type),
            this.createElement('h2', '', {}, segment.title),
            this.createElement('div', 'segment-subtitle', {}, segment.subtitle),
            this.createElement('p', 'segment-body', {}, segment.body)
        );

        const meta = this.createSegmentMeta(segment);
        if (meta) frame.append(meta);

        const script = this.createNarrationCard(segment);
        if (script) frame.append(script);

        const actions = this.createSegmentActions(segment);
        if (actions) frame.append(actions);

        this.segmentEl.append(frame);
        this.segmentEl.focus({ preventScroll: true });
        this.highlightLog(index);
    }

    saveCurrentEpisode(reason = 'manual') {
        if (!this.segments.length) return null;

        const episode = this.createEpisodeSnapshot(reason);
        const existingIndex = this.episodes.findIndex((item) => item.id === episode.id);
        if (existingIndex >= 0) {
            this.episodes[existingIndex] = episode;
        } else {
            this.episodes.unshift(episode);
        }

        this.episodes = this.episodes.slice(0, 12);
        this.persistEpisodes();
        this.activeEpisodeId = episode.id;
        this.renderLog();
        return episode;
    }

    createEpisodeSnapshot(reason) {
        const now = new Date();
        const dateKey = now.toISOString().slice(0, 10);
        const id = `episode-${dateKey}`;
        const news = this.segments.find((segment) => segment.type === 'news');
        const featured = this.segments.find((segment) => segment.type === 'case');

        return {
            id,
            reason,
            title: `Nightly Broadcast ${dateKey}`,
            dateLabel: now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
            savedAt: now.toISOString(),
            summary: `${this.value(news?.title, 'Current Signal Watch')} / ${this.value(featured?.title, 'Featured Case')}`,
            segments: this.segments.map((segment) => ({
                type: segment.type,
                title: segment.title,
                subtitle: segment.subtitle,
                body: segment.body,
                script: this.createNarrationScript(segment),
                url: segment.url || '',
                caseId: segment.caseData?.id || ''
            }))
        };
    }

    loadEpisode(id) {
        const episode = this.episodes.find((item) => item.id === id);
        if (!episode) return;

        const cases = this.dataLoader?.getAllCases?.() || [];
        this.segments = episode.segments.map((segment) => ({
            ...segment,
            caseData: segment.caseId ? cases.find((caseData) => caseData.id === segment.caseId) || null : null
        }));
        this.activeEpisodeId = episode.id;
        this.currentIndex = 0;
        this.renderLog();
        this.renderSegment(this.currentIndex);
    }

    loadEpisodes() {
        try {
            const parsed = JSON.parse(window.localStorage?.getItem(this.episodeStorageKey) || '[]');
            return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && Array.isArray(item.segments)) : [];
        } catch (error) {
            console.warn('Unable to load saved theater episodes:', error);
            return [];
        }
    }

    persistEpisodes() {
        try {
            window.localStorage?.setItem(this.episodeStorageKey, JSON.stringify(this.episodes));
        } catch (error) {
            console.warn('Unable to persist theater episodes:', error);
        }
    }

    createSegmentMeta(segment) {
        if (!['case', 'globe', 'history', 'queue'].includes(segment.type)) return null;

        const caseData = segment.caseData;
        const row = this.createElement('div', 'theater-meta-row');
        [
            ['Date', this.value(caseData?.date || caseData?.year, 'Unknown')],
            ['Source', this.value(caseData?.source, 'Local archive')],
            ['Status', this.value(caseData?.status, 'Unknown')],
            ['Credibility', `${this.normalizeCredibility(caseData?.credibility)}%`]
        ].forEach(([label, value]) => {
            const chip = this.createElement('span', 'theater-meta-chip');
            chip.append(this.createElement('small', '', {}, label), this.createElement('strong', '', {}, value));
            row.append(chip);
        });
        return row;
    }

    createSegmentActions(segment) {
        const actions = this.createElement('div', 'theater-action-row');

        if (segment.url) {
            const button = this.createElement('button', 'theater-action', { type: 'button' }, 'Open Source');
            button.addEventListener('click', () => window.open(segment.url, '_blank', 'noopener,noreferrer'));
            actions.append(button);
        }

        if (segment.caseData) {
            const button = this.createElement('button', 'theater-action', { type: 'button' }, segment.type === 'globe' ? 'Open Case File' : 'Inspect Case');
            button.addEventListener('click', () => {
                this.audio?.playClick?.();
                window.commandDeck?.dossier?.open(segment.caseData);
            });
            actions.append(button);
        }

        return actions.children.length ? actions : null;
    }

    createNarrationCard(segment) {
        const script = segment.script || this.createNarrationScript(segment);
        if (!script) return null;

        const card = this.createElement('section', 'theater-script-card');
        card.append(
            this.createElement('span', 'theater-script-label', {}, 'Host Script'),
            this.createElement('p', '', {}, script)
        );
        return card;
    }

    createNarrationScript(segment) {
        const title = this.value(segment.title, 'tonight\'s file');
        const source = this.value(segment.subtitle, 'the archive');

        if (segment.type === 'station') {
            return 'Good evening from the high desert. The board is live, the receiver is warm, and every claim tonight stays tied to the public record.';
        }

        if (segment.type === 'news') {
            return `Current signal first: ${title}. We treat this as a developing public-source item, not a conclusion. Source line: ${source}.`;
        }

        if (['case', 'history', 'queue'].includes(segment.type)) {
            return `Open the folder on ${title}. We have location, date, source context, and unresolved questions; what we do not have is permission to outrun the evidence.`;
        }

        if (segment.type === 'archive') {
            return `Tape vault is rolling: ${title}. Listen for what the source actually says, then mark what still needs verification.`;
        }

        if (segment.type === 'globe') {
            return `Take the globe view now. The coordinates are not decoration; they are the trailhead for comparison, clustering, and follow-up research.`;
        }

        if (segment.type === 'closing') {
            return 'That is the transmission. Save the episode, queue the next case, and keep the question open until the sources close it.';
        }

        return '';
    }

    highlightLog(index) {
        this.logEl?.querySelectorAll('.theater-log-item').forEach((item, itemIndex) => {
            const active = itemIndex === index;
            item.classList.toggle('active', active);
            item.setAttribute('aria-current', active ? 'step' : 'false');
        });

        this.logEl?.querySelectorAll('.theater-episode-item').forEach((item) => {
            item.classList.toggle('active', item.dataset.episodeId === this.activeEpisodeId);
        });
    }

    formatCaseSubtitle(caseData) {
        if (!caseData) return 'No case selected';
        return `Line 3: ${this.value(caseData.location, 'Unknown sector')}, ${this.value(caseData.year || this.getYear(caseData.date), 'unknown year')}`;
    }

    formatItemSubtitle(item, fallback) {
        if (!item) return fallback;
        const source = this.value(item.author || item.source || item.publication, fallback);
        const date = this.value(item.date, '');
        return date ? `${source} / ${date}` : source;
    }

    formatCoordinates(caseData) {
        const coords = caseData?.coordinates;
        if (!coords || !Number.isFinite(Number(coords.lat)) || !Number.isFinite(Number(coords.lng))) {
            return 'No coordinates are available for this transmission.';
        }

        const lat = Number(coords.lat).toFixed(2);
        const lng = Number(coords.lng).toFixed(2);
        return `Target coordinates: ${lat}, ${lng}. Return to the Command Deck to inspect the globe marker.`;
    }

    normalizeCredibility(value) {
        const number = Number(value);
        if (!Number.isFinite(number)) return 0;
        return Math.max(0, Math.min(100, Math.round(number)));
    }

    getYear(date) {
        const value = String(date || '').trim();
        const match = value.match(/^-?\d{1,4}/) || value.match(/\b(1[5-9]\d{2}|20\d{2})\b/);
        return match ? (match[1] || match[0]) : '';
    }

    getSafeUrl(url) {
        if (!url) return '';

        try {
            const parsed = new URL(url, window.location.href);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
                return parsed.href;
            }
        } catch (error) {
            console.warn('Skipping malformed theater URL:', url);
        }

        return '';
    }

    value(value, fallback) {
        if (value === null || value === undefined || value === '') return fallback;
        return String(value);
    }

    createElement(tag, className = '', attrs = {}, text = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text !== '') element.textContent = text;
        return element;
    }
}

window.TheaterMode = TheaterMode;
