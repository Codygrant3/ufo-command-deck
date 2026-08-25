// Archives - Broadcast Vault Explorer
class ModernArchives {
    constructor() {
        this.documents = [];
        this.sources = {
            bluebook: {
                name: 'Project Blue Book',
                icon: 'radar',
                description: 'USAF investigation files from the classic official UFO program.',
                accent: 'cyan'
            },
            aatip: {
                name: 'AATIP/AARO',
                icon: 'policy',
                description: 'Pentagon UAP program reports, historical volumes, and oversight releases.',
                accent: 'gold'
            },
            blackvault: {
                name: 'Black Vault',
                icon: 'folder_open',
                description: 'FOIA-driven declassified document collections and agency indexes.',
                accent: 'green'
            },
            mufon: {
                name: 'MUFON',
                icon: 'manage_search',
                description: 'Civilian investigation records, symposium material, and case research.',
                accent: 'pink'
            },
            geipan: {
                name: 'GEIPAN',
                icon: 'language',
                description: 'French official UAP study files and scientific case evaluations.',
                accent: 'violet'
            },
            'current-news': {
                name: 'Current UAP News',
                icon: 'newspaper',
                description: 'Recent UAP reporting, releases, and oversight updates.',
                accent: 'orange'
            }
        };
        this.currentSource = null;
        this.filteredDocs = [];
        this.activeFilters = {
            source: 'all',
            type: 'all',
            date: 'all',
            tag: '',
            linkedOnly: false,
            query: ''
        };

        this.doorMap = {
            collections: { filter: 'all', title: 'Private Collections' },
            sketch: { filter: 'all', title: 'Witness Sketch Gallery' },
            news: { filter: 'current-news', title: 'Current UAP News Archive' },
            marrs: { filter: 'aatip', title: 'M.A.R.R.S Repository' },
            maps: { filter: 'all', title: 'UFO Report Maps' },
            journals: { filter: 'bluebook', title: 'Historic Journal Collection' },
            symposium: { filter: 'mufon', title: 'Historic Symposium Proceedings' }
        };

        this.init();
    }

    init() {
        if (typeof UFO_DATA === 'undefined' || !UFO_DATA.archiveDocuments) {
            console.log('Archive documents not available');
            return;
        }

        this.documents = UFO_DATA.archiveDocuments;
        this.createCorridorConsole();
        this.createArchiveOverview();
        this.createSourceCards();
        this.setupEventListeners();
        this.setupHallwayInteractions();
        this.updateArchiveOverview();
        this.updateSourceCardsByFilters();

        console.log('Modern Archives initialized with', this.documents.length, 'documents');
    }

    createElement(tag, className = '', attrs = {}, text = null) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attrs || {}).forEach(([key, value]) => {
            if (value === null || value === undefined || value === false) return;
            if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
                return;
            }
            if (key === 'ariaLabel') {
                element.setAttribute('aria-label', value);
                return;
            }
            element.setAttribute(key, value);
        });
        if (text !== null && text !== undefined) element.textContent = text;
        return element;
    }

    createIcon(name, className = '') {
        const icon = this.createElement('span', `material-symbols-outlined ${className}`.trim(), {
            'aria-hidden': 'true'
        }, name);
        return icon;
    }

    getSourceClassification(source) {
        const classMap = {
            bluebook: 'Declassified',
            aatip: 'Public',
            blackvault: 'Declassified',
            mufon: 'Public',
            geipan: 'Public',
            'current-news': 'Public'
        };
        return classMap[source] || 'Public';
    }

    createCorridorConsole() {
        const hallway = document.getElementById('archivesHallway');
        if (!hallway || document.getElementById('archiveCorridorConsole')) return;

        const consolePanel = this.createElement('aside', 'archive-corridor-console', {
            id: 'archiveCorridorConsole',
            'aria-label': 'Archive corridor console'
        });

        const signal = this.createElement('div', 'archive-console-signal');
        signal.append(
            this.createElement('span', 'archive-signal-dot'),
            this.createElement('span', '', {}, 'Evidence Wing')
        );

        const title = this.createElement('h2', '', {}, 'The Vault Index');
        const stats = this.createElement('div', 'archive-console-stats', { id: 'archiveCorridorStats' });

        const actions = this.createElement('div', 'archive-console-actions');
        [
            ['collections', 'All Files', 'inventory_2'],
            ['marrs', 'Pentagon Desk', 'policy'],
            ['journals', 'Blue Book', 'radar'],
            ['news', 'News Wire', 'newspaper']
        ].forEach(([door, label, icon]) => {
            const button = this.createElement('button', 'archive-console-btn', {
                type: 'button',
                dataset: { archiveRoom: door }
            });
            button.append(this.createIcon(icon), this.createElement('span', '', {}, label));
            button.addEventListener('click', () => this.enterRoom(door));
            actions.append(button);
        });

        consolePanel.append(signal, title, stats, actions);
        hallway.append(consolePanel);
        this.updateCorridorStats();
    }

    updateCorridorStats() {
        const stats = document.getElementById('archiveCorridorStats');
        if (!stats) return;

        stats.replaceChildren(
            this.createStatChip('Files', this.documents.length),
            this.createStatChip('Linked', this.getLinkedCount(this.documents)),
            this.createStatChip('Sources', this.getActiveSourceCount()),
            this.createStatChip('Latest', this.formatYear(this.getLatestDocument(this.documents)?.date))
        );
    }

    createArchiveOverview() {
        const header = document.querySelector('.archives-modern-header');
        if (!header || document.getElementById('archiveDashboard')) return;

        const dashboard = this.createElement('section', 'archive-dashboard', {
            id: 'archiveDashboard',
            'aria-label': 'Archive overview'
        });

        const telemetry = this.createElement('div', 'archive-telemetry-grid', { id: 'archiveTelemetryGrid' });
        const featured = this.createElement('article', 'archive-featured-file', { id: 'archiveFeaturedFile' });
        const filterSummary = this.createElement('div', 'archive-filter-summary', { id: 'archiveFilterSummary' });

        dashboard.append(telemetry, featured, filterSummary);
        header.after(dashboard);
    }

    createSourceCards() {
        const grid = document.getElementById('sourceCardsGrid');
        if (!grid) return;

        grid.replaceChildren();
        grid.setAttribute('aria-live', 'polite');

        Object.keys(this.sources).forEach(sourceKey => {
            const card = this.createSourceCard(sourceKey);
            grid.append(card);
        });

        const emptyState = this.createElement('div', 'archive-empty-state hidden', { id: 'archiveEmptyState' });
        emptyState.append(
            this.createIcon('travel_explore', 'archive-empty-icon'),
            this.createElement('h3', '', {}, 'No matching files on this frequency'),
            this.createElement('p', '', {}, 'Try another source, date range, file type, or tag.'),
            this.createElement('button', 'archive-reset-btn', { type: 'button', id: 'archiveResetFilters' }, 'Reset Filters')
        );
        emptyState.querySelector('button')?.addEventListener('click', () => this.resetFilters());
        grid.append(emptyState);
    }

    createSourceCard(sourceKey) {
        const source = this.sources[sourceKey];
        const stats = this.getSourceStats(sourceKey);
        const classification = this.getSourceClassification(sourceKey);

        const card = this.createElement('article', `source-card archive-source-card accent-${source.accent}`, {
            role: 'button',
            tabindex: '0',
            dataset: { source: sourceKey }
        });

        const header = this.createElement('div', 'source-card-header');
        const identity = this.createElement('div', 'source-card-identity');
        const iconWrap = this.createElement('div', 'source-icon');
        iconWrap.append(this.createIcon(source.icon));
        const titleStack = this.createElement('div', 'source-title-stack');
        titleStack.append(
            this.createElement('h3', '', {}, source.name),
            this.createElement('p', 'source-description', {}, source.description)
        );
        identity.append(
            iconWrap,
            titleStack
        );
        header.append(
            identity,
            this.createElement('span', `classification-badge ${this.toClassName(classification)}`, {}, classification)
        );

        const metrics = this.createElement('div', 'archive-source-metrics');
        metrics.append(
            this.createMetric('Files', stats.filteredCount, 'doc-count-badge', 'files'),
            this.createMetric('Linked', stats.linkedCount, '', 'linked'),
            this.createMetric('Latest', this.formatYear(stats.latest?.date), '', 'latest'),
            this.createMetric('Types', stats.typeCount, '', 'types')
        );

        const latest = this.createElement('div', 'source-latest-pull');
        latest.append(
            this.createElement('span', '', {}, 'Latest Pull'),
            this.createElement('strong', '', {}, stats.latest?.title || 'No matching file')
        );

        const tags = this.createElement('div', 'source-tag-strip');
        stats.topTags.forEach(tag => tags.append(this.createElement('span', 'source-tag', {}, tag)));
        if (!stats.topTags.length) tags.append(this.createElement('span', 'source-tag muted', {}, 'No tags indexed'));

        const footer = this.createElement('div', 'source-card-footer');
        const action = this.createElement('button', 'source-open-btn', { type: 'button' });
        action.append(this.createIcon('folder_open'), this.createElement('span', '', {}, 'Open Drawer'));
        action.addEventListener('click', (event) => {
            event.stopPropagation();
            this.openSource(sourceKey);
        });
        footer.append(
            this.createElement('span', 'source-hit-count', {}, `${stats.filteredCount} matching`),
            action
        );

        card.append(header, metrics, latest, tags, footer);
        card.addEventListener('click', () => this.openSource(sourceKey));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.openSource(sourceKey);
            }
        });

        return card;
    }

    createMetric(label, value, extraClass = '', key = '') {
        const attrs = key ? { dataset: { metric: key } } : {};
        const metric = this.createElement('div', `archive-source-metric ${extraClass}`.trim(), attrs);
        metric.append(
            this.createElement('span', '', {}, label),
            this.createElement('strong', '', {}, this.value(value, '--'))
        );
        return metric;
    }

    createStatChip(label, value) {
        const chip = this.createElement('div', 'archive-stat-chip');
        chip.append(
            this.createElement('span', '', {}, label),
            this.createElement('strong', '', {}, this.value(value, '--'))
        );
        return chip;
    }

    setupEventListeners() {
        const searchInput = document.getElementById('archiveSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                this.handleSearch(event.target.value);
            });
        }

        const filterSelect = document.getElementById('archiveFilter');
        if (filterSelect) {
            if (![...filterSelect.options].some((option) => option.value === 'current-news')) {
                filterSelect.append(new Option('Current UAP News', 'current-news'));
            }
            filterSelect.addEventListener('change', (event) => {
                this.handleFilter(event.target.value);
            });
        }

        this.createAdvancedFilters();

        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('documentModal');
        const overlay = modal?.querySelector('.modal-overlay');

        modalClose?.addEventListener('click', () => this.closeModal());
        overlay?.addEventListener('click', () => this.closeModal());

        const backBtn = document.getElementById('btnBackToCorridor');
        backBtn?.addEventListener('click', () => this.returnToHallway());
    }

    createAdvancedFilters() {
        const controls = document.querySelector('.archives-controls');
        if (!controls || document.getElementById('archiveAdvancedFilters')) return;

        const wrap = this.createElement('div', 'archive-advanced-filters', { id: 'archiveAdvancedFilters' });

        const type = this.createSelect('archiveFileTypeFilter', 'Filter documents by file type', [
            ['all', 'All Types'],
            ['article', 'Articles'],
            ['report', 'Reports'],
            ['memo', 'Memos'],
            ['video', 'Videos'],
            ['photo', 'Photos'],
            ['analysis', 'Analysis']
        ]);

        const date = this.createSelect('archiveDateFilter', 'Filter documents by date range', [
            ['all', 'All Dates'],
            ['recent', 'Recent'],
            ['2020s', '2020s'],
            ['2000s', '2000s'],
            ['pre2000', 'Pre-2000']
        ]);

        const tag = this.createElement('input', '', {
            id: 'archiveTagFilter',
            type: 'search',
            placeholder: 'Tag filter',
            ariaLabel: 'Filter documents by tag'
        });

        const linkedLabel = this.createElement('label', 'archive-linked-filter');
        const linked = this.createElement('input', '', {
            id: 'archiveLinkedFilter',
            type: 'checkbox'
        });
        linkedLabel.append(linked, this.createElement('span', '', {}, 'Linked cases'));

        [type, date, tag, linked].forEach((control) => {
            control.addEventListener('input', () => this.handleAdvancedFilterChange());
            control.addEventListener('change', () => this.handleAdvancedFilterChange());
        });

        wrap.append(type, date, tag, linkedLabel);
        controls.append(wrap);
    }

    createSelect(id, label, options) {
        const select = this.createElement('select', '', { id, ariaLabel: label });
        options.forEach(([value, optionLabel]) => select.append(new Option(optionLabel, value)));
        return select;
    }

    setupHallwayInteractions() {
        const doors = document.querySelectorAll('.door-container');
        doors.forEach(door => {
            door.addEventListener('mouseover', () => {
                window.alienAudio?.playHover?.();
            });

            door.addEventListener('click', () => {
                const doorKey = door.dataset.door;
                this.enterRoom(doorKey);
            });
        });

        const hallwayContainer = document.getElementById('archivesHallway');
        hallwayContainer?.addEventListener('mousemove', (event) => {
            this.handleParallax(event);
        });
    }

    handleParallax(event) {
        const hallway = document.getElementById('archivesHallway');
        if (!hallway?.offsetParent) return;

        const x = (window.innerWidth / 2 - event.pageX) / 50;
        const y = (window.innerHeight / 2 - event.pageY) / 50;

        const scene = document.querySelector('.hallway-scene');
        if (scene) {
            scene.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        }
    }

    enterRoom(doorKey) {
        const config = this.doorMap[doorKey];
        if (!config) return;

        const scene = document.querySelector('.hallway-scene');
        if (scene) {
            scene.style.transition = 'transform 1.5s ease-in';
            scene.style.transform = 'scale(3) translateZ(500px)';
        }

        window.alienAudio?.playPanelOpen?.();

        setTimeout(() => {
            const hallway = document.getElementById('archivesHallway');
            if (hallway) hallway.style.opacity = '0';

            setTimeout(() => {
                if (hallway) hallway.style.display = 'none';
                const grid = document.getElementById('archivesGrid');
                if (grid) {
                    grid.style.display = 'flex';
                    void grid.offsetWidth;
                    grid.classList.add('active');
                }
            }, 500);

            this.applyRoomFilters(config);
        }, 1000);
    }

    returnToHallway() {
        const grid = document.getElementById('archivesGrid');
        const hallway = document.getElementById('archivesHallway');
        const scene = document.querySelector('.hallway-scene');

        grid?.classList.remove('active');

        setTimeout(() => {
            if (grid) grid.style.display = 'none';
            if (hallway) hallway.style.display = 'flex';

            requestAnimationFrame(() => {
                if (hallway) hallway.style.opacity = '1';
                if (scene) {
                    scene.style.transition = 'transform 1.5s ease-out';
                    scene.style.transform = 'scale(1) translateZ(0)';
                }
            });
        }, 500);
    }

    applyRoomFilters(config) {
        const titleEl = document.getElementById('gridTitle');
        if (titleEl) titleEl.textContent = String(config.title || 'Classified Archives').toUpperCase();

        const subtitle = document.getElementById('archiveSubtitle') || document.querySelector('.archives-subtitle');
        if (subtitle) subtitle.textContent = this.getRoomSubtitle(config);

        this.activeFilters.source = config.filter || 'all';
        this.activeFilters.type = config.type || 'all';
        this.activeFilters.tag = config.tag || '';
        this.activeFilters.linkedOnly = false;

        this.syncControls();
        this.updateSourceCardsByFilters();
    }

    getRoomSubtitle(config) {
        if (config.filter === 'current-news') return 'Recent UAP reporting and release watch';
        if (config.filter === 'aatip') return 'Pentagon program files and historical UAP reports';
        if (config.filter === 'bluebook') return 'USAF case files and early official analysis';
        if (config.filter === 'mufon') return 'Civilian field reports and symposium records';
        return 'Declassified document repository and source index';
    }

    openSource(sourceKey) {
        this.currentSource = sourceKey;
        const sourceDocs = this.getFilteredDocuments(sourceKey);
        this.filteredDocs = sourceDocs;

        this.showModal();
        this.updateModalTitle(sourceKey);
        this.renderDocumentList(sourceDocs);

        if (sourceDocs.length) {
            this.showDocumentDetails(sourceDocs[0]);
        } else {
            this.showEmptyDetails();
        }

        window.alienAudio?.playClick?.();
    }

    showModal() {
        const modal = document.getElementById('documentModal');
        modal?.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('documentModal');
        modal?.classList.remove('active');
        this.currentSource = null;
        this.showEmptyDetails();
        window.alienAudio?.playClick?.();
    }

    showEmptyDetails(message = 'Select a document to view details') {
        const detailsPanel = document.getElementById('documentDetails');
        if (!detailsPanel) return;

        const empty = this.createElement('div', 'no-selection');
        empty.append(
            this.createIcon('description', 'icon'),
            this.createElement('p', '', {}, message)
        );
        detailsPanel.replaceChildren(empty);
    }

    updateModalTitle(sourceKey) {
        const source = this.sources[sourceKey] || { name: 'Documents' };
        const titleEl = document.getElementById('modalSourceTitle');
        const countEl = document.getElementById('docCount');

        if (titleEl) titleEl.textContent = source.name;
        if (countEl) countEl.textContent = `${this.filteredDocs.length} docs`;
    }

    renderDocumentList(docs) {
        const listContainer = document.getElementById('documentList');
        if (!listContainer) return;

        listContainer.replaceChildren();

        if (!docs.length) {
            const empty = this.createElement('div', 'document-list-empty');
            empty.append(
                this.createIcon('search_off'),
                this.createElement('strong', '', {}, 'No files match'),
                this.createElement('span', '', {}, 'Adjust the vault filters and retune the source.')
            );
            listContainer.append(empty);
            return;
        }

        docs.forEach(doc => {
            const item = this.createElement('button', 'document-item', {
                type: 'button',
                dataset: { docId: doc.id }
            });
            const icon = this.createElement('span', 'document-type-icon');
            icon.append(this.createIcon(this.getTypeIcon(doc.fileType)));

            const content = this.createElement('span', 'document-item-content');
            content.append(
                this.createElement('span', 'document-item-title', {}, this.value(doc.title, 'Untitled file')),
                this.createElement('span', 'document-item-meta', {}, `${this.value(doc.refNumber, 'NO-REF')} / ${this.formatYear(doc.date)} / ${this.value(doc.pages, '--')} pages`),
                this.createElement('span', 'document-item-excerpt', {}, this.value(doc.summary, 'No summary available.'))
            );

            item.append(
                icon,
                content,
                this.createElement('span', `document-classification-badge ${this.toClassName(doc.classification || 'public')}`, {}, this.value(doc.classification, 'PUBLIC'))
            );

            item.addEventListener('click', () => this.showDocumentDetails(doc));
            listContainer.append(item);
        });
    }

    showDocumentDetails(doc) {
        const detailsPanel = document.getElementById('documentDetails');
        if (!detailsPanel) return;

        document.querySelectorAll('.document-item').forEach(item => {
            const isActive = item.dataset.docId === doc.id;
            item.classList.toggle('active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
        });

        const relatedDocs = this.getRelatedDocuments(doc, 5);
        const view = this.createElement('div', 'document-detail-view');

        const header = this.createElement('div', 'document-header');
        const largeIcon = this.createElement('div', 'document-type-large');
        largeIcon.append(this.createIcon(this.getTypeIcon(doc.fileType)));
        const headerText = this.createElement('div', 'document-heading-copy');
        headerText.append(
            this.createElement('span', 'document-kicker', {}, this.value(this.getSourceName(doc.source), 'Archive source')),
            this.createElement('h2', '', {}, this.value(doc.title, 'Untitled file')),
            this.createElement('div', 'document-ref', {}, this.value(doc.refNumber, 'NO-REF'))
        );
        header.append(largeIcon, headerText);

        const classification = this.createElement('div', `classification-indicator ${this.toClassName(doc.classification || 'public')}`);
        classification.append(
            this.createIcon('verified_user'),
            this.createElement('span', 'classification-label', {}, this.value(doc.classification, 'PUBLIC'))
        );

        const metaGrid = this.createElement('div', 'detail-meta-grid');
        [
            ['calendar_month', 'Date', this.formatDate(doc.date)],
            ['description', 'Pages', this.value(doc.pages, '--')],
            ['database', 'File Size', this.value(doc.fileSize, '--')],
            ['category', 'File Type', String(this.value(doc.fileType, 'file')).toUpperCase()]
        ].forEach(([icon, label, value]) => metaGrid.append(this.createMetaCard(icon, label, value)));

        const sections = [
            this.createDetailSection('Summary', this.value(doc.summary, 'No summary available.'), 'detail-summary'),
            this.createDetailSection('Description', this.value(doc.description, 'No description available.'), 'detail-description')
        ];

        if (doc.author || doc.location) {
            const row = this.createElement('div', 'detail-meta-row');
            if (doc.author) row.append(this.createInlineMeta('Author', doc.author));
            if (doc.location) row.append(this.createInlineMeta('Location', doc.location));
            sections.splice(0, 0, row);
        }

        if (Array.isArray(doc.relatedCases) && doc.relatedCases.length) {
            const relatedCases = this.createElement('div', 'related-cases');
            doc.relatedCases.forEach(caseId => relatedCases.append(this.createElement('span', 'case-badge', {}, caseId)));
            sections.push(this.createDetailSection('Related Timeline Cases', relatedCases));
        }

        const tagStrip = this.createElement('div', 'detail-tags');
        (Array.isArray(doc.tags) ? doc.tags : []).forEach(tag => tagStrip.append(this.createElement('span', 'tag', {}, tag)));
        if (!tagStrip.children.length) tagStrip.append(this.createElement('span', 'tag muted', {}, 'untagged'));
        sections.push(this.createDetailSection('Tags', tagStrip));

        if (relatedDocs.length) {
            const relatedGrid = this.createElement('div', 'related-docs-grid');
            relatedDocs.forEach(relDoc => {
                const card = this.createElement('button', 'related-doc-card', {
                    type: 'button',
                    dataset: { docId: relDoc.id }
                });
                const icon = this.createElement('div', 'related-doc-icon');
                icon.append(this.createIcon(this.getTypeIcon(relDoc.fileType)));
                card.append(
                    icon,
                    this.createElement('div', 'related-doc-title', {}, this.value(relDoc.title, 'Untitled file')),
                    this.createElement('div', 'related-doc-meta', {}, this.value(relDoc.refNumber, 'NO-REF'))
                );
                card.addEventListener('click', () => this.showDocumentDetails(relDoc));
                relatedGrid.append(card);
            });
            sections.push(this.createDetailSection('Related Documents', relatedGrid));
        }

        const actions = this.createElement('div', 'detail-actions');
        const safeUrl = this.getSafeExternalUrl(doc.url);
        if (safeUrl) {
            const link = this.createElement('a', 'btn-view-document', {
                href: safeUrl,
                target: '_blank',
                rel: 'noopener noreferrer'
            });
            link.append(this.createIcon('open_in_new'), this.createElement('span', '', {}, 'View Original Document'));
            actions.append(link);
        }

        view.append(header, classification, metaGrid, ...sections, actions);
        detailsPanel.replaceChildren(view);
        window.alienAudio?.playClick?.();
    }

    createMetaCard(icon, label, value) {
        const card = this.createElement('div', 'detail-meta-card');
        const iconWrap = this.createElement('div', 'meta-card-icon');
        iconWrap.append(this.createIcon(icon));
        const content = this.createElement('div', 'meta-card-content');
        content.append(
            this.createElement('div', 'detail-meta-label', {}, label),
            this.createElement('div', 'detail-meta-value', {}, this.value(value, '--'))
        );
        card.append(iconWrap, content);
        return card;
    }

    createInlineMeta(label, value) {
        const item = this.createElement('div', 'detail-meta-item');
        item.append(
            this.createElement('div', 'detail-meta-label', {}, label),
            this.createElement('div', 'detail-meta-value', {}, this.value(value, '--'))
        );
        return item;
    }

    createDetailSection(title, content, contentClass = '') {
        const section = this.createElement('section', 'detail-section');
        section.append(this.createElement('h3', 'detail-section-title', {}, title));
        if (content instanceof HTMLElement) {
            section.append(content);
        } else {
            section.append(this.createElement('div', contentClass, {}, content));
        }
        return section;
    }

    getRelatedDocuments(doc, limit = 5) {
        const scoredDocs = this.documents
            .filter(item => item.id !== doc.id)
            .map(item => {
                let score = 0;

                if (Array.isArray(item.tags) && Array.isArray(doc.tags)) {
                    const commonTags = item.tags.filter(tag => doc.tags.includes(tag));
                    const tagScore = (commonTags.length / Math.max(doc.tags.length, item.tags.length, 1)) * 70;
                    score += tagScore;
                }

                if (item.source === doc.source) score += 15;

                const docDate = new Date(doc.date);
                const compareDate = new Date(item.date);
                const yearsDiff = Math.abs(docDate.getFullYear() - compareDate.getFullYear());
                if (Number.isFinite(yearsDiff)) score += Math.max(0, 1 - yearsDiff / 5) * 15;

                return { doc: item, score };
            })
            .filter(item => item.score > 10)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.doc);

        return scoredDocs;
    }

    updateArchiveOverview() {
        const telemetry = document.getElementById('archiveTelemetryGrid');
        const featured = document.getElementById('archiveFeaturedFile');
        const summary = document.getElementById('archiveFilterSummary');
        if (!telemetry || !featured || !summary) return;

        const filtered = this.getFilteredDocuments();
        const latest = this.getLatestDocument(filtered) || this.getLatestDocument(this.documents);
        const activeCount = this.getActiveFilterCount();

        telemetry.replaceChildren(
            this.createTelemetryCard('Indexed Files', this.documents.length, `${filtered.length} tuned in`),
            this.createTelemetryCard('Linked Cases', this.getLinkedCount(filtered), `${this.getLinkedCount(this.documents)} total`),
            this.createTelemetryCard('Active Sources', this.getActiveSourceCount(filtered), 'document channels'),
            this.createTelemetryCard('Latest Pull', this.formatYear(latest?.date), this.formatShortDate(latest?.date))
        );

        featured.replaceChildren();
        if (latest) {
            const eyebrow = this.createElement('div', 'featured-eyebrow');
            eyebrow.append(this.createIcon('graphic_eq'), this.createElement('span', '', {}, 'Featured Signal'));
            const title = this.createElement('h3', '', {}, latest.title);
            const copy = this.createElement('p', '', {}, this.value(latest.summary, latest.description || 'No summary available.'));
            const meta = this.createElement('div', 'featured-meta');
            [
                this.getSourceName(latest.source),
                this.formatShortDate(latest.date),
                String(latest.fileType || 'file').toUpperCase()
            ].forEach(item => meta.append(this.createElement('span', '', {}, item)));
            const button = this.createElement('button', 'archive-featured-open', { type: 'button' });
            button.append(this.createIcon('quick_reference_all'), this.createElement('span', '', {}, 'Open Featured File'));
            button.addEventListener('click', () => {
                this.openSource(latest.source);
                this.showDocumentDetails(latest);
            });
            featured.append(eyebrow, title, copy, meta, button);
        }

        const sourceLabel = this.activeFilters.source === 'all'
            ? 'all sources'
            : this.getSourceName(this.activeFilters.source);
        summary.replaceChildren(
            this.createElement('span', '', {}, `${filtered.length} files on ${sourceLabel}`),
            this.createElement('span', '', {}, `${activeCount} active filter${activeCount === 1 ? '' : 's'}`)
        );
    }

    createTelemetryCard(label, value, note) {
        const card = this.createElement('div', 'archive-telemetry-card');
        card.append(
            this.createElement('span', '', {}, label),
            this.createElement('strong', '', {}, this.value(value, '--')),
            this.createElement('small', '', {}, this.value(note, ''))
        );
        return card;
    }

    updateSourceCardsByFilters() {
        const cards = document.querySelectorAll('.source-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const sourceKey = card.dataset.source;
            const stats = this.getSourceStats(sourceKey);
            const visibleBySource = this.activeFilters.source === 'all' || sourceKey === this.activeFilters.source;
            const shouldShow = visibleBySource && stats.filteredCount > 0;

            card.hidden = !shouldShow;
            if (shouldShow) visibleCount += 1;

            const badge = card.querySelector('.doc-count-badge strong');
            if (badge) badge.textContent = stats.filteredCount;

            const linked = card.querySelector('[data-metric="linked"] strong');
            if (linked) linked.textContent = stats.linkedCount;

            const latestYear = card.querySelector('[data-metric="latest"] strong');
            if (latestYear) latestYear.textContent = this.formatYear(stats.latest?.date);

            const typeCount = card.querySelector('[data-metric="types"] strong');
            if (typeCount) typeCount.textContent = stats.typeCount;

            const hitCount = card.querySelector('.source-hit-count');
            if (hitCount) hitCount.textContent = `${stats.filteredCount} matching`;

            const latestTitle = card.querySelector('.source-latest-pull strong');
            if (latestTitle) latestTitle.textContent = stats.latest?.title || 'No matching file';

            const tagStrip = card.querySelector('.source-tag-strip');
            if (tagStrip) {
                tagStrip.replaceChildren();
                stats.topTags.forEach(tag => tagStrip.append(this.createElement('span', 'source-tag', {}, tag)));
                if (!stats.topTags.length) tagStrip.append(this.createElement('span', 'source-tag muted', {}, 'No tags indexed'));
            }
        });

        const emptyState = document.getElementById('archiveEmptyState');
        emptyState?.classList.toggle('hidden', visibleCount > 0);

        this.updateArchiveOverview();
    }

    handleSearch(query) {
        this.activeFilters.query = String(query || '').trim().toLowerCase();
        this.refreshFilteredViews();
    }

    handleFilter(sourceKey) {
        this.activeFilters.source = sourceKey || 'all';
        this.refreshFilteredViews();
    }

    handleAdvancedFilterChange() {
        this.activeFilters.type = document.getElementById('archiveFileTypeFilter')?.value || 'all';
        this.activeFilters.date = document.getElementById('archiveDateFilter')?.value || 'all';
        this.activeFilters.tag = String(document.getElementById('archiveTagFilter')?.value || '').trim().toLowerCase();
        this.activeFilters.linkedOnly = Boolean(document.getElementById('archiveLinkedFilter')?.checked);
        this.refreshFilteredViews();
    }

    refreshFilteredViews() {
        this.updateSourceCardsByFilters();

        if (this.currentSource) {
            this.filteredDocs = this.getFilteredDocuments(this.currentSource);
            this.renderDocumentList(this.filteredDocs);
            const countEl = document.getElementById('docCount');
            if (countEl) countEl.textContent = `${this.filteredDocs.length} docs`;
            if (!this.filteredDocs.length) this.showEmptyDetails('No documents match the current vault filters.');
        }
    }

    resetFilters() {
        this.activeFilters = {
            source: 'all',
            type: 'all',
            date: 'all',
            tag: '',
            linkedOnly: false,
            query: ''
        };
        const titleEl = document.getElementById('gridTitle');
        if (titleEl) titleEl.textContent = 'CLASSIFIED ARCHIVES';
        const subtitle = document.getElementById('archiveSubtitle') || document.querySelector('.archives-subtitle');
        if (subtitle) subtitle.textContent = 'Declassified document repository and source index';
        this.syncControls();
        this.refreshFilteredViews();
    }

    syncControls() {
        const search = document.getElementById('archiveSearch');
        const source = document.getElementById('archiveFilter');
        const type = document.getElementById('archiveFileTypeFilter');
        const date = document.getElementById('archiveDateFilter');
        const tag = document.getElementById('archiveTagFilter');
        const linked = document.getElementById('archiveLinkedFilter');

        if (search) search.value = this.activeFilters.query;
        if (source) source.value = this.activeFilters.source;
        if (type) type.value = this.activeFilters.type;
        if (date) date.value = this.activeFilters.date;
        if (tag) tag.value = this.activeFilters.tag;
        if (linked) linked.checked = this.activeFilters.linkedOnly;
    }

    getFilteredDocuments(sourceKey = null) {
        return this.documents.filter((doc) => {
            if (sourceKey && doc.source !== sourceKey) return false;
            if (this.activeFilters.source !== 'all' && !sourceKey && doc.source !== this.activeFilters.source) return false;
            if (this.activeFilters.type !== 'all' && doc.fileType !== this.activeFilters.type) return false;
            if (this.activeFilters.linkedOnly && (!Array.isArray(doc.relatedCases) || !doc.relatedCases.length)) return false;
            if (this.activeFilters.tag) {
                const tags = Array.isArray(doc.tags) ? doc.tags : [];
                if (!tags.some((tag) => String(tag).toLowerCase().includes(this.activeFilters.tag))) return false;
            }
            if (!this.matchesDateFilter(doc)) return false;
            if (this.activeFilters.query && !this.matchesQuery(doc, this.activeFilters.query)) return false;
            return true;
        });
    }

    matchesQuery(doc, query) {
        const fields = [
            doc.title,
            doc.description,
            doc.summary,
            doc.refNumber,
            doc.author,
            this.getSourceName(doc.source),
            ...(Array.isArray(doc.tags) ? doc.tags : [])
        ].map((value) => String(value || '').toLowerCase());
        return fields.some((value) => value.includes(query));
    }

    matchesDateFilter(doc) {
        if (this.activeFilters.date === 'all') return true;
        const year = new Date(doc.date).getFullYear();
        if (!Number.isFinite(year)) return false;

        if (this.activeFilters.date === 'recent') return year >= 2024;
        if (this.activeFilters.date === '2020s') return year >= 2020 && year <= 2029;
        if (this.activeFilters.date === '2000s') return year >= 2000 && year <= 2019;
        if (this.activeFilters.date === 'pre2000') return year < 2000;
        return true;
    }

    getSourceStats(sourceKey) {
        const allDocs = this.documents.filter(doc => doc.source === sourceKey);
        const filteredDocs = this.getFilteredDocuments(sourceKey);
        const typeSet = new Set(filteredDocs.map(doc => doc.fileType).filter(Boolean));
        return {
            allCount: allDocs.length,
            filteredCount: filteredDocs.length,
            linkedCount: this.getLinkedCount(filteredDocs),
            latest: this.getLatestDocument(filteredDocs),
            typeCount: typeSet.size,
            topTags: this.getTopTags(filteredDocs, 3)
        };
    }

    getLinkedCount(docs) {
        return docs.filter(doc => Array.isArray(doc.relatedCases) && doc.relatedCases.length).length;
    }

    getActiveSourceCount(docs = this.documents) {
        return new Set(docs.map(doc => doc.source).filter(Boolean)).size;
    }

    getActiveFilterCount() {
        let count = 0;
        if (this.activeFilters.source !== 'all') count += 1;
        if (this.activeFilters.type !== 'all') count += 1;
        if (this.activeFilters.date !== 'all') count += 1;
        if (this.activeFilters.tag) count += 1;
        if (this.activeFilters.linkedOnly) count += 1;
        if (this.activeFilters.query) count += 1;
        return count;
    }

    getLatestDocument(docs) {
        return [...(docs || [])].sort((a, b) => new Date(b.date) - new Date(a.date))[0] || null;
    }

    getTopTags(docs, limit = 3) {
        const tags = new Map();
        (docs || []).forEach(doc => {
            (Array.isArray(doc.tags) ? doc.tags : []).forEach(tag => {
                tags.set(tag, (tags.get(tag) || 0) + 1);
            });
        });
        return [...tags.entries()]
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .slice(0, limit)
            .map(([tag]) => tag);
    }

    getSourceName(sourceKey) {
        return this.sources[sourceKey]?.name || sourceKey || 'Archive source';
    }

    getTypeIcon(fileType) {
        const icons = {
            report: 'description',
            memo: 'article',
            photo: 'photo_camera',
            video: 'smart_display',
            analysis: 'monitoring',
            article: 'newspaper',
            map: 'map'
        };
        return icons[fileType] || 'draft';
    }

    getSafeExternalUrl(url) {
        if (!url) return null;
        try {
            const parsed = new URL(url, window.location.href);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
        } catch (error) {
            return null;
        }
        return null;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        if (!Number.isFinite(date.getTime())) return 'Unknown date';
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    formatShortDate(dateStr) {
        const date = new Date(dateStr);
        if (!Number.isFinite(date.getTime())) return 'Unknown date';
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    formatYear(dateStr) {
        const date = new Date(dateStr);
        if (!Number.isFinite(date.getTime())) return '--';
        return String(date.getFullYear());
    }

    toClassName(value) {
        return String(value || 'public').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    value(value, fallback) {
        if (value === null || value === undefined || value === '') return fallback;
        return value;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.modernArchives = new ModernArchives();
    });
} else {
    window.modernArchives = new ModernArchives();
}
