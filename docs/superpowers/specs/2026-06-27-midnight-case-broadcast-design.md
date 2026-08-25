# Midnight Case Broadcast Design

## Purpose

Midnight Case Broadcast upgrades the globe-click case detail experience into an entertaining interactive case file. When a user clicks a location or case marker, the app should feel like it has pulled that incident onto a late-night high-desert paranormal radio broadcast.

The experience should be theatrical, but the factual content must remain data-backed. It can say "signal acquired", "line open", "tape vault", and "case file", but it must not invent witnesses, official conclusions, evidence, or source claims that are not present in the case data.

## Product Direction

Use direction C from the visual concept: Midnight Case Broadcast, blended with the credibility and metadata clarity of the current dossier.

This should replace/evolve the existing `DossierView` presentation rather than adding a second modal. The current interaction path is already correct:

- globe marker click
- `CommandDeck.globe.onMarkerClick(caseData)`
- `this.dossier.open(caseData)`
- dossier overlay opens

The work should improve that existing overlay into a richer interactive broadcast case file.

## User Experience

When a user clicks a case marker, the overlay opens with an "On Air" feeling:

- station identity: The Midnight Meridian / AM 1090
- caller-style case intro: "Line 3: [location], [year]"
- waveform or signal visualization
- case title and classification/status
- short host-style setup generated from real case fields
- tabbed exploration of the file

The user should be able to move through the case like a broadcast segment and an investigation file at the same time.

## Tabs

### On Air

The first tab frames the selected case as the active broadcast segment.

Required content:

- station label
- case name
- "Line" intro using location and year
- source/classification/status chip
- waveform visual
- short case summary
- credibility meter or signal-strength meter based on `credibility`

### Case File

This tab preserves clear investigative details.

Required content:

- date
- location
- shape
- witnesses
- duration
- source
- classification
- status
- credibility
- coordinates when present

### Tape Vault

This tab presents evidence/resources/documents as broadcast tapes or source cards.

Required content:

- real `caseData.resources` when present
- generated visual-analysis card only when derived from existing case fields
- source links opened safely with `noopener,noreferrer`
- no fake evidence claims

Cards should be visually entertaining but clearly labeled as video, article, image, radar/telemetry, or source note.

### Signal Map

This tab keeps the existing tactical map concept and improves the presentation.

Required content:

- coordinate readout
- signal status
- animated map/radar canvas
- fallback state when coordinates are missing

### Analysis

This tab gives a conservative assessment based on existing fields.

Required content:

- incident id
- credibility-derived signal level
- source-derived confidence language
- classification/status
- short conclusion that avoids overclaiming

The analysis should not assert impossible physics, military confirmation, extraterrestrial origin, or cover-up claims unless those are explicitly present in the source data.

## Interaction Details

The overlay should support:

- close button
- Escape key to close
- tab buttons with visible active state
- keyboard focus management
- resource-card clicks for external sources
- safe external opens using `window.open(url, '_blank', 'noopener,noreferrer')`

Optional later interactions:

- "Next evidence" button
- "Play segment" visual/audio cue
- direct jump back to globe marker
- related archive documents

These are not required for the first implementation slice.

## Visual Style

The overlay should feel like:

- late-night AM broadcast
- declassified case file
- desert signal console
- tape vault
- paranormal radio, but credible

Use a darker theatrical palette with cyan/gold/red accents. Keep text legible and avoid hiding factual content behind effects.

The layout should work on desktop and mobile. On smaller screens, tabs can wrap or become horizontally scrollable, but the case file must remain readable.

## Data Rules

Use only the provided `caseData` object and existing local datasets available through the app.

Safe fields:

- `id`
- `name`
- `date`
- `year`
- `location`
- `coordinates`
- `summary`
- `shape`
- `witnesses`
- `duration`
- `source`
- `classification`
- `status`
- `credibility`
- `resources`

When a field is missing, show a clear fallback such as `Unknown`, `Not logged`, or `Coordinates unavailable`.

## Architecture

Modify:

- `js/dossier.js`
- `css/dossier.css`

Potentially touch:

- `js/app.js` only if close/focus integration requires it

Do not change the globe click API. `DossierView.open(caseData)` should remain the public entry point.

Recommended internal shape:

- `createOverlay()` builds the new structure once
- `open(caseData)` populates all tab content
- `switchTab(tabName)` controls visible tab panes
- `populateOnAir(caseData)` renders broadcast intro
- `populateCaseFile(caseData)` renders details
- `populateTapeVault(caseData)` renders resources
- `populateSignalMap(caseData)` renders canvas/readout
- `populateAnalysis(caseData)` renders conservative assessment

Prefer DOM creation and `textContent` for user/data-backed fields. Avoid adding new `innerHTML` surfaces for case data.

## Security And Robustness

The existing dossier uses several `innerHTML` render paths and opens external resources without `noopener,noreferrer`. This feature should reduce that risk while changing the overlay.

Requirements:

- no data-backed case field should be inserted as raw HTML
- external links must use `noopener,noreferrer`
- missing resource arrays should render a friendly empty state
- malformed URLs should not throw the overlay

## Testing And Verification

Verification should cover:

- clicking a real globe marker opens the case file
- title, location, date, summary, and credibility render correctly
- each tab switches cleanly
- resource cards render when a case has resources
- fallback states render for missing fields
- Escape closes the overlay
- external resource opens use safe opener flags
- desktop screenshot has no overlapping text
- mobile screenshot remains readable
- no new console errors

## First Implementation Slice

The first slice should ship:

- updated overlay structure
- On Air, Case File, Tape Vault, Signal Map, and Analysis tabs
- safer resource-card handling
- desktop/mobile styling
- browser verification through a real marker click

Do not add generated narration, persistent episodes, randomized related cases, or new audio cues in this slice.
