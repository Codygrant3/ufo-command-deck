# Theater Mode: The Midnight Broadcast Design

## Purpose

Theater Mode turns UFO Command Deck from a static investigation dashboard into an immersive late-night paranormal broadcast experience. The product should feel like a spooky high-desert radio show cutting through AM static at midnight, while preserving the credibility of the underlying archive.

The experience is inspired by late-night paranormal call-in radio, but it must remain an original product identity: The Midnight Meridian. It should not copy Coast to Coast branding, hosts, show names, audio clips, or protected presentation assets.

## Product Shape

The feature adds a dedicated immersive mode called The Midnight Broadcast. It stages real cases, current UAP news, and archive documents as a guided broadcast queue. The app remains data-backed: theatrical framing can be spooky, but factual claims come from the existing case, news, and document data.

The mode should be accessible from the existing navigation or a prominent console button. Entering Theater Mode should not replace the normal Command Deck, Timeline, or Archives views; it should be an alternate presentation layer that users can enter and exit at any time.

## Experience Goals

- Make the app feel like a live midnight paranormal broadcast from the high desert.
- Give the current news archive and case database a stronger product identity.
- Preserve research credibility by labeling sources, dates, classifications, and uncertainty.
- Keep audio optional and respectful of the existing audio toggle.
- Make the first version impressive but scoped enough to ship in chunks.

## Core Flow

The default show queue should follow this structure:

1. Station ID
2. Current Signal Watch
3. Featured Case
4. Archive Tape
5. Globe Jump
6. Closing Transmission

Each segment should have a title, subtitle, source label, display payload, and optional audio/visual cue. The queue can initially be generated from available local datasets:

- `CURRENT_UAP_NEWS` for current headlines
- `DataLoader.loadAllData()` for cases
- `ARCHIVE_DOCUMENTS` for document records

The first implementation can pick deterministic featured items so the show is stable during testing. Later versions can add user selection, shuffle, saved episodes, or generated nightly programs.

## Interface

The Theater Mode screen should be full-screen and visually distinct from the normal dashboard.

Primary stage elements:

- High-desert night backdrop with stars, subtle horizon glow, and radio interference.
- AM radio dial or frequency strip branded as The Midnight Meridian.
- Waveform or VU meter that reacts during segment transitions.
- Main segment panel for the active case, news item, or document.
- Transmission log listing the show queue.
- Minimal controls: Start Show, Next Segment, Pause Signal, Exit Theater.

The design should avoid a marketing-page feel. It should feel like an operating broadcast console: theatrical, but usable.

## Segment Types

### Station ID

Opens the mode with a short station identity:

- The Midnight Meridian
- AM 1090
- Broadcasting from the edge of the unknown
- Date/time or "Tonight's Transmission"

This can use original copy only.

### Current Signal Watch

Highlights one current UAP news item. It should show:

- headline
- date
- source
- short summary
- status/classification if available

This should pull from `data/current_news.js`.

### Featured Case

Frames a real case as a caller/file card:

- "Line 3: [location], [year]"
- case name
- shape/classification
- summary
- credibility/source labels

This should pull from the unified data loader, so supplemental PURSUE cases are included.

### Archive Tape

Shows a document or media item as a vault tape:

- source collection
- document title
- date
- classification
- summary or description

This should pull from `data/archive_documents.js`.

### Globe Jump

Bridges the theater back to the interactive globe. The active case should be usable as a target for the existing globe, if coordinates are present. The first version can show coordinates and an "Open on Command Deck" action; later versions can animate the camera jump directly.

### Closing Transmission

Ends the queue with a short original sign-off and a clear way to replay or return to the main app.

## Audio

Theater audio should extend the existing `AlienAudioSystem` rather than replacing it.

Required first-version sounds:

- AM tuning sweep
- low desert drone
- tape hiss bed
- short segment transition sting
- button/click feedback

Audio must:

- require user interaction before starting
- respect mute/audio toggle state
- stop or fade when exiting Theater Mode
- avoid external copyrighted show clips, theme music, or host impersonation

## Data And Credibility

All factual content must come from local datasets already used by the app. Theater Mode can change presentation language, but it cannot invent cases, sources, witness claims, or official conclusions.

The UI should make uncertainty visible through existing fields:

- `source`
- `classification`
- `status`
- `credibility`
- `date`
- `location`

For PURSUE material, the copy should continue to say "released" or "unresolved" rather than implying confirmed origin.

## Architecture

Recommended additions:

- New Theater Mode section in `index.html`.
- New `js/theater-mode.js` controller for queue generation and segment navigation.
- New `css/theater-mode.css` stylesheet for the immersive stage.
- Small integration points in `js/app.js` for navigation and shared data access.
- Optional small additions to `js/audio.js` for theater-specific cues.

The controller should expose a compact interface:

- `init({ dataLoader, news, archives, audio })`
- `enter()`
- `exit()`
- `startShow()`
- `nextSegment()`
- `pauseSignal()`

This keeps the feature isolated from the already-large app controller.

## Accessibility And Controls

The first version should include:

- keyboard navigation for Enter/Space on controls
- Escape to exit Theater Mode
- visible focus states
- reduced-motion handling for heavy visual effects
- audio-off operation with visual-only feedback

The mode should remain usable on desktop and mobile, though the theatrical layout can be richer on desktop.

## Testing And Verification

Verification should cover:

- Theater Mode can enter and exit without breaking existing navigation.
- Show queue builds from local data.
- Supplemental cases are eligible for Featured Case segments.
- Current news appears in Current Signal Watch.
- Archive documents appear in Archive Tape.
- Next Segment advances through the queue and wraps or closes predictably.
- Audio starts only after user interaction and stops/fades on exit.
- Desktop and mobile screenshots show no broken layout or overlapping text.

## Implementation Chunks

1. Theater Mode shell and navigation entry.
2. Segment queue from current news, cases, and archive documents.
3. Visual stage treatment and transitions.
4. Audio stingers and radio-console controls.
5. Browser verification and mobile polish.

## Open Decisions

The initial build should use deterministic segment selection, not random generation. This makes the first version easier to test and demo. Randomized nightly shows can be added after the core mode is stable.

The first version should avoid AI-generated narration. Original text cards and procedural audio are enough to establish the product identity without adding voice-rights, hallucination, or content-moderation complexity.
