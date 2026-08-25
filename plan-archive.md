# Plan Archive: Theater Mode

Completed chunks will be moved here after verification.

## Completed: Prerequisite Fix - Intro Session Overlay

- Fixed returning-session initialization so `#introSplash` receives `.hidden` and `aria-hidden="true"` before the app continues.
- Verified a returning session loads the Command Deck with `367` cases and no blocking intro overlay.

## Completed: Audio Autoplay Warning Fix

- Removed the eager Tone.js script load from `index.html`.
- Added lazy Tone.js loading from the Enter Broadcast user gesture.
- Guarded fallback audio initialization against untrusted synthetic events.
- Guarded UI sound effects so they only play when the AudioContext is running.
- Verified returning-session load and first-time Enter Broadcast flow produce no AudioContext autoplay warnings.

## Completed: Chunk 1 - Theater Shell And Navigation

- Added Theater/Broadcast navigation entry.
- Added full-screen Theater section markup.
- Added base Theater stylesheet.
- Wired navigation without data rendering yet.
- Added Exit Theater behavior back to Command Deck.
- Verified Command Deck, Broadcast, Archives, and Timeline navigation in browser.
