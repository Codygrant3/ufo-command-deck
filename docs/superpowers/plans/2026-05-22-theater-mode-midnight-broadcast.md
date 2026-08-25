# Theater Mode Midnight Broadcast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Theater Mode, a full-screen Midnight Broadcast experience that stages current UAP news, archive documents, and globe cases as a spooky high-desert paranormal radio show.

**Architecture:** Add Theater Mode as an isolated section and controller instead of expanding the already-large `CommandDeck` class. `js/theater-mode.js` owns segment queue generation and UI state, `css/theater-mode.css` owns the stage look, and `js/app.js` only wires navigation/data/audio dependencies.

**Tech Stack:** Static HTML, vanilla JavaScript classes, existing `DataLoader`, existing `CURRENT_UAP_NEWS`, existing `ARCHIVE_DOCUMENTS`, CSS animations, Web Audio via the existing `AlienAudioSystem`.

---

## File Structure

- Create `C:\Users\chris\UfoFiles\js\theater-mode.js`: Theater controller, deterministic queue builder, segment rendering, control handlers.
- Create `C:\Users\chris\UfoFiles\css\theater-mode.css`: Full-screen stage, radio console, transmission log, mobile/reduced-motion states.
- Modify `C:\Users\chris\UfoFiles\index.html`: Add Broadcast navigation button, Theater section markup, stylesheet link, script tag.
- Modify `C:\Users\chris\UfoFiles\js\app.js`: Include `theater` in navigation, initialize `TheaterMode`, pause other sections, support escape-to-exit behavior.
- Modify `C:\Users\chris\UfoFiles\js\audio.js`: Add theater-specific audio methods that respect the existing initialized/muted audio flow.
- Maintain `C:\Users\chris\UfoFiles\plan.md`: Active chunk tracker for user review between chunks.
- Maintain `C:\Users\chris\UfoFiles\plan-archive.md`: Completed chunk history.

## Task 1: Theater Shell And Navigation

**Files:**
- Create: `C:\Users\chris\UfoFiles\plan.md`
- Create: `C:\Users\chris\UfoFiles\plan-archive.md`
- Modify: `C:\Users\chris\UfoFiles\index.html`
- Modify: `C:\Users\chris\UfoFiles\js\app.js`
- Create: `C:\Users\chris\UfoFiles\css\theater-mode.css`
- Test with: browser/manual DOM check and `node --check js/app.js`

- [ ] **Step 1: Write the active chunk tracker**

Create `plan.md` with:

```markdown
# Active Plan: Theater Mode

## Current Chunk: 1 - Theater Shell And Navigation

- [ ] Add Theater/Broadcast navigation entry.
- [ ] Add full-screen Theater section markup.
- [ ] Add base Theater stylesheet.
- [ ] Wire navigation without data rendering yet.
- [ ] Verify existing Command, Timeline, and Archives navigation still works.
```

- [ ] **Step 2: Write the archive tracker**

Create `plan-archive.md` with:

```markdown
# Plan Archive: Theater Mode

Completed chunks will be moved here after verification.
```

- [ ] **Step 3: Add the stylesheet link**

In `index.html`, after `css/archives-hallway.css`, add:

```html
<link rel="stylesheet" href="css/theater-mode.css">
```

- [ ] **Step 4: Add the Broadcast nav button**

In `.nav-sections`, add this button after Archives:

```html
<button class="nav-section" data-section="theater">Broadcast</button>
```

- [ ] **Step 5: Add Theater section markup**

In `index.html`, after the Archives section and before the detail panel modals, add:

```html
<section class="deck-section theater-mode" id="section-theater" aria-label="The Midnight Broadcast">
    <div class="theater-sky" aria-hidden="true"></div>
    <div class="theater-stage">
        <header class="theater-header">
            <div>
                <div class="theater-frequency">AM 1090 KHz</div>
                <h1>The Midnight Broadcast</h1>
            </div>
            <button class="theater-exit" id="theaterExitBtn" type="button">Exit Theater</button>
        </header>
        <div class="theater-console">
            <aside class="theater-log" id="theaterLog" aria-label="Transmission log"></aside>
            <main class="theater-segment" id="theaterSegment" tabindex="-1">
                <div class="segment-kicker">Signal standby</div>
                <h2>Awaiting Transmission</h2>
                <p>Start the broadcast to open tonight's high desert signal.</p>
            </main>
        </div>
        <footer class="theater-controls">
            <button id="theaterStartBtn" type="button">Start Show</button>
            <button id="theaterNextBtn" type="button">Next Segment</button>
            <button id="theaterPauseBtn" type="button">Pause Signal</button>
        </footer>
    </div>
</section>
```

- [ ] **Step 6: Create base CSS**

Create `css/theater-mode.css` with:

```css
.theater-mode {
    position: relative;
    min-height: calc(100vh - var(--nav-height));
    margin-top: var(--nav-height);
    overflow: hidden;
    background: #05050a;
    color: var(--text-primary);
}

.theater-mode:not(.active) {
    display: none;
}

.theater-sky {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 18% 18%, rgba(255, 214, 102, 0.16), transparent 18rem),
        linear-gradient(180deg, #02030a 0%, #10101a 58%, #261a12 100%);
}

.theater-stage {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 28px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 18px;
}

.theater-header,
.theater-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.theater-frequency,
.segment-kicker {
    font-family: 'Share Tech Mono', monospace;
    color: var(--glyph-gold);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.theater-header h1 {
    margin: 4px 0 0;
    font-family: 'Orbitron', sans-serif;
    color: var(--text-bright);
}

.theater-console {
    display: grid;
    grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
    gap: 18px;
    min-height: 0;
}

.theater-log,
.theater-segment {
    border: 1px solid rgba(0, 255, 212, 0.22);
    background: rgba(0, 0, 0, 0.46);
    box-shadow: 0 0 30px rgba(0, 255, 212, 0.08);
    padding: 18px;
}

.theater-segment:focus {
    outline: 2px solid var(--glyph-gold);
    outline-offset: 4px;
}

.theater-controls button,
.theater-exit {
    border: 1px solid rgba(255, 214, 102, 0.45);
    background: rgba(0, 0, 0, 0.55);
    color: var(--text-bright);
    padding: 10px 14px;
    font-family: 'Share Tech Mono', monospace;
    cursor: pointer;
}

@media (max-width: 820px) {
    .theater-stage {
        padding: 16px;
    }

    .theater-console {
        grid-template-columns: 1fr;
    }

    .theater-header,
    .theater-controls {
        align-items: stretch;
        flex-direction: column;
    }
}
```

- [ ] **Step 7: Include theater in navigation sections**

In `js/app.js`, update the earlier `sections` object inside the first `setupNavigation()` definition if it is retained, and the active `navigateToSection()` logic, so Theater can be shown by the shared section toggler:

```javascript
const sections = {
    command: document.getElementById('section-command'),
    timeline: document.getElementById('section-timeline'),
    archives: document.getElementById('section-archives'),
    theater: document.getElementById('section-theater')
};
```

- [ ] **Step 8: Run syntax check**

Run:

```powershell
node --check js/app.js
```

Expected: no output and exit code `0`.

- [ ] **Step 9: Browser verify shell**

Serve locally:

```powershell
python -m http.server 4173
```

Open `http://localhost:4173`, enter the app, click Broadcast, then click Command Deck. Expected: Theater screen appears, then Command Deck returns without console errors.

## Task 2: Segment Queue Controller

**Files:**
- Create: `C:\Users\chris\UfoFiles\js\theater-mode.js`
- Modify: `C:\Users\chris\UfoFiles\index.html`
- Modify: `C:\Users\chris\UfoFiles\js\app.js`
- Test with: `node --check js/theater-mode.js js/app.js` and browser segment advancement

- [ ] **Step 1: Add script tag**

In `index.html`, after `js/archives.js` and before `js/lab.js`, add:

```html
<script src="js/theater-mode.js"></script>
```

- [ ] **Step 2: Create TheaterMode class**

Create `js/theater-mode.js` with:

```javascript
class TheaterMode {
    constructor() {
        this.dataLoader = null;
        this.news = [];
        this.archives = [];
        this.audio = null;
        this.segments = [];
        this.currentIndex = 0;
        this.isPaused = false;
        this.root = null;
        this.segmentEl = null;
        this.logEl = null;
    }

    init({ dataLoader, news = [], archives = [], audio = null }) {
        this.dataLoader = dataLoader;
        this.news = Array.isArray(news) ? news : [];
        this.archives = Array.isArray(archives) ? archives : [];
        this.audio = audio;
        this.root = document.getElementById('section-theater');
        this.segmentEl = document.getElementById('theaterSegment');
        this.logEl = document.getElementById('theaterLog');
        this.bindControls();
        this.buildQueue();
        this.renderLog();
        this.renderSegment(0);
    }

    bindControls() {
        document.getElementById('theaterStartBtn')?.addEventListener('click', () => this.startShow());
        document.getElementById('theaterNextBtn')?.addEventListener('click', () => this.nextSegment());
        document.getElementById('theaterPauseBtn')?.addEventListener('click', () => this.pauseSignal());
        document.getElementById('theaterExitBtn')?.addEventListener('click', () => this.exit());
    }

    buildQueue() {
        const cases = this.dataLoader?.getAllCases?.() || [];
        const releaseCase = cases.find(item => item.source === 'pursue-release-02') || cases[0];
        const newsItem = this.news[0] || null;
        const archiveItem = this.archives[0] || null;

        this.segments = [
            { type: 'station', title: 'The Midnight Meridian', subtitle: 'AM 1090 KHz', body: 'Broadcasting from the edge of the unknown.' },
            { type: 'news', title: newsItem?.title || 'Current Signal Watch', subtitle: newsItem?.source || 'Local archive', body: newsItem?.summary || 'No current signal item is loaded.' },
            { type: 'case', title: releaseCase?.name || 'Featured Case', subtitle: this.formatCaseSubtitle(releaseCase), body: releaseCase?.summary || 'No case data is loaded.' },
            { type: 'archive', title: archiveItem?.title || 'Archive Tape', subtitle: archiveItem?.source || 'Document vault', body: archiveItem?.summary || archiveItem?.description || 'No archive document is loaded.' },
            { type: 'globe', title: 'Globe Jump', subtitle: releaseCase?.location || 'Coordinates unavailable', body: this.formatCoordinates(releaseCase) },
            { type: 'closing', title: 'Closing Transmission', subtitle: 'Signal fading', body: 'Keep your receiver warm. The desert remembers every light in the sky.' }
        ];
    }

    formatCaseSubtitle(caseData) {
        if (!caseData) return 'No case selected';
        return `Line 3: ${caseData.location || 'Unknown location'}, ${caseData.year || 'Unknown year'}`;
    }

    formatCoordinates(caseData) {
        const coords = caseData?.coordinates;
        if (!coords) return 'No coordinates are available for this transmission.';
        return `Target coordinates: ${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}. Open the Command Deck to inspect the marker.`;
    }

    enter() {
        this.root?.classList.add('theater-live');
        this.renderSegment(this.currentIndex);
    }

    exit() {
        window.commandDeck?.navigateToSection?.('command');
    }

    startShow() {
        this.isPaused = false;
        this.currentIndex = 0;
        this.audio?.playTheaterTuning?.();
        this.renderSegment(this.currentIndex);
    }

    nextSegment() {
        if (!this.segments.length) return;
        this.currentIndex = (this.currentIndex + 1) % this.segments.length;
        this.audio?.playTheaterSting?.();
        this.renderSegment(this.currentIndex);
    }

    pauseSignal() {
        this.isPaused = !this.isPaused;
        this.audio?.playClick?.();
        this.root?.classList.toggle('signal-paused', this.isPaused);
    }

    renderLog() {
        if (!this.logEl) return;
        this.logEl.innerHTML = '';
        this.segments.forEach((segment, index) => {
            const item = document.createElement('button');
            item.className = 'theater-log-item';
            item.type = 'button';
            item.textContent = `${String(index + 1).padStart(2, '0')} ${segment.title}`;
            item.addEventListener('click', () => {
                this.currentIndex = index;
                this.renderSegment(index);
            });
            this.logEl.appendChild(item);
        });
    }

    renderSegment(index) {
        const segment = this.segments[index];
        if (!segment || !this.segmentEl) return;
        this.segmentEl.innerHTML = '';
        const kicker = document.createElement('div');
        kicker.className = 'segment-kicker';
        kicker.textContent = segment.type;
        const title = document.createElement('h2');
        title.textContent = segment.title;
        const subtitle = document.createElement('div');
        subtitle.className = 'segment-subtitle';
        subtitle.textContent = segment.subtitle;
        const body = document.createElement('p');
        body.textContent = segment.body;
        this.segmentEl.append(kicker, title, subtitle, body);
        this.segmentEl.focus({ preventScroll: true });
        this.highlightLog(index);
    }

    highlightLog(index) {
        this.logEl?.querySelectorAll('.theater-log-item').forEach((item, itemIndex) => {
            item.classList.toggle('active', itemIndex === index);
        });
    }
}

window.TheaterMode = TheaterMode;
```

- [ ] **Step 3: Initialize from app**

In `js/app.js`, after `this.initAudioToggle();`, add:

```javascript
this.initTheaterMode();
```

Add a method to `CommandDeck`:

```javascript
initTheaterMode() {
    if (!window.TheaterMode) return;
    this.theater = new TheaterMode();
    this.theater.init({
        dataLoader: this.dataLoader,
        news: window.CURRENT_UAP_NEWS || [],
        archives: window.ARCHIVE_DOCUMENTS || [],
        audio: window.alienAudio || alienAudio
    });
}
```

- [ ] **Step 4: Call enter when navigating**

In `navigateToSection(section)`, add a branch before the final `else`:

```javascript
} else if (section === 'theater') {
    if (!this.theater) this.initTheaterMode();
    this.theater?.enter();
    if (this.timeline) this.timeline.pause();
    if (this.archives) this.archives.pause();
    if (this.lab) this.lab.pause();
```

- [ ] **Step 5: Expose commandDeck globally**

At the DOM ready initialization bottom of `js/app.js`, after `commandDeck = new CommandDeck();`, add:

```javascript
window.commandDeck = commandDeck;
```

- [ ] **Step 6: Run syntax checks**

Run:

```powershell
node --check js/theater-mode.js
node --check js/app.js
```

Expected: both exit `0`.

- [ ] **Step 7: Browser verify queue**

Open the app, click Broadcast, click Start Show, then click Next Segment five times. Expected: Station ID, Signal Watch, Featured Case, Archive Tape, Globe Jump, and Closing Transmission render without raw HTML or undefined text.

## Task 3: Theatrical Visual Stage

**Files:**
- Modify: `C:\Users\chris\UfoFiles\index.html`
- Modify: `C:\Users\chris\UfoFiles\css\theater-mode.css`
- Test with: desktop and mobile screenshots

- [ ] **Step 1: Add stage effects markup**

Inside `section-theater`, before `.theater-stage`, add:

```html
<div class="theater-static" aria-hidden="true"></div>
<div class="theater-horizon" aria-hidden="true"></div>
```

- [ ] **Step 2: Add VU meter markup**

Inside `.theater-header`, after the title block and before Exit Theater, add:

```html
<div class="theater-meter" aria-hidden="true">
    <span></span><span></span><span></span><span></span><span></span>
</div>
```

- [ ] **Step 3: Add polished CSS**

Append to `css/theater-mode.css`:

```css
.theater-static {
    position: absolute;
    inset: 0;
    opacity: 0.16;
    pointer-events: none;
    background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px);
    mix-blend-mode: screen;
    animation: theaterStatic 900ms steps(4) infinite;
}

.theater-horizon {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 32%;
    background: linear-gradient(180deg, transparent, rgba(255, 142, 60, 0.18));
    pointer-events: none;
}

.theater-meter {
    display: flex;
    align-items: end;
    gap: 4px;
    height: 34px;
    min-width: 86px;
}

.theater-meter span {
    width: 10px;
    min-height: 8px;
    background: var(--glyph-gold);
    box-shadow: 0 0 12px rgba(255, 214, 102, 0.45);
    animation: theaterMeter 780ms ease-in-out infinite alternate;
}

.theater-meter span:nth-child(2) { animation-delay: 90ms; }
.theater-meter span:nth-child(3) { animation-delay: 180ms; }
.theater-meter span:nth-child(4) { animation-delay: 270ms; }
.theater-meter span:nth-child(5) { animation-delay: 360ms; }

.theater-log-item {
    display: block;
    width: 100%;
    margin: 0 0 8px;
    border: 1px solid rgba(0, 255, 212, 0.16);
    background: rgba(0, 0, 0, 0.38);
    color: var(--text-primary);
    padding: 10px;
    text-align: left;
    font-family: 'Share Tech Mono', monospace;
    cursor: pointer;
}

.theater-log-item.active {
    border-color: var(--glyph-gold);
    color: var(--glyph-gold);
    box-shadow: 0 0 18px rgba(255, 214, 102, 0.14);
}

.segment-subtitle {
    margin: 8px 0 18px;
    color: var(--glyph-primary);
    font-family: 'Share Tech Mono', monospace;
}

.theater-segment h2 {
    margin: 8px 0 0;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.8rem, 4vw, 4rem);
}

.theater-segment p {
    max-width: 68ch;
    line-height: 1.7;
    font-size: 1rem;
}

.signal-paused .theater-meter span {
    animation-play-state: paused;
    opacity: 0.45;
}

@keyframes theaterStatic {
    from { transform: translateY(0); }
    to { transform: translateY(6px); }
}

@keyframes theaterMeter {
    from { height: 9px; }
    to { height: 34px; }
}

@media (prefers-reduced-motion: reduce) {
    .theater-static,
    .theater-meter span {
        animation: none;
    }
}
```

- [ ] **Step 4: Browser verify layout**

Check `http://localhost:4173` at desktop width and mobile width around `390x844`. Expected: no text overlaps controls, log is readable, segment text fits within the panel, and reduced-motion disables animation when emulated.

## Task 4: Theater Audio Cues

**Files:**
- Modify: `C:\Users\chris\UfoFiles\js\audio.js`
- Test with: `node --check js/audio.js` and browser audio toggle behavior

- [ ] **Step 1: Add theater tuning method**

Inside `AlienAudioSystem`, before `playHover()`, add:

```javascript
playTheaterTuning() {
    if (!this.isInitialized || !this.audioContext || !this.masterGain?.gain.value) return;

    const now = this.audioContext.currentTime;
    this.playRadioTuning(now, 1.2);
    this.playTransmissionBeeps(now + 0.9);
}
```

- [ ] **Step 2: Add theater sting method**

Inside `AlienAudioSystem`, after `playTheaterTuning()`, add:

```javascript
playTheaterSting() {
    if (!this.isInitialized || !this.audioContext || !this.masterGain?.gain.value) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.35);
    filter.type = 'bandpass';
    filter.frequency.value = 760;
    filter.Q.value = 8;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.uiGain || this.masterGain);
    osc.start(now);
    osc.stop(now + 0.6);
}
```

- [ ] **Step 3: Run syntax check**

Run:

```powershell
node --check js/audio.js
```

Expected: no output and exit code `0`.

- [ ] **Step 4: Browser verify audio behavior**

With audio enabled, enter Theater Mode and click Start Show, then Next Segment. Expected: short tuning/sting sounds play. Mute audio and repeat. Expected: controls still work and no obvious audio plays.

## Task 5: Final Verification And Chunk Archive

**Files:**
- Modify: `C:\Users\chris\UfoFiles\plan.md`
- Modify: `C:\Users\chris\UfoFiles\plan-archive.md`
- Test with: syntax checks and browser smoke test

- [ ] **Step 1: Run syntax checks**

Run:

```powershell
node --check js/theater-mode.js
node --check js/app.js
node --check js/audio.js
node --check js/data-loader.js
```

Expected: all commands exit `0`.

- [ ] **Step 2: Run loader smoke test**

Run:

```powershell
@'
const fs = require('fs');
JSON.parse(fs.readFileSync('data/supplemental_cases.json', 'utf8'));
console.log('supplemental JSON valid');
'@ | node -
```

Expected: `supplemental JSON valid`.

- [ ] **Step 3: Browser smoke test**

Open `http://localhost:4173` and verify:

- Command Deck loads.
- Broadcast nav enters Theater Mode.
- Start Show renders Station ID.
- Next Segment reaches current news, featured case, archive tape, globe jump, and closing.
- Exit Theater returns to Command Deck.
- Timeline and Archives still open.
- Mobile width does not overlap text or buttons.

- [ ] **Step 4: Archive completed chunk**

Move completed checklist items from `plan.md` to `plan-archive.md` under:

```markdown
## Completed: Chunk 1 - Theater Shell And Navigation

- Added Theater/Broadcast navigation entry.
- Added full-screen Theater section markup.
- Added base Theater stylesheet.
- Verified existing navigation remained functional.
```

- [ ] **Step 5: Leave next active chunk in plan.md**

Update `plan.md` with:

```markdown
# Active Plan: Theater Mode

## Current Chunk: 2 - Segment Queue Controller

- [ ] Create `js/theater-mode.js`.
- [ ] Build deterministic Station ID, Signal Watch, Featured Case, Archive Tape, Globe Jump, and Closing segments.
- [ ] Wire Theater Mode to DataLoader, CURRENT_UAP_NEWS, ARCHIVE_DOCUMENTS, and AlienAudioSystem.
- [ ] Verify segment advancement in browser.
```

## Self-Review

- Spec coverage: The plan covers Theater shell, data-backed queue, stage visuals, audio cues, navigation, accessibility basics, and browser/mobile verification.
- Scope check: Randomized nightly shows, saved episodes, AI narration, and direct globe camera jumps are excluded from first implementation as specified.
- Red-flag scan: No task relies on an undefined future detail; code snippets define the interfaces used by later tasks.
