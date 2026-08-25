// ============================================
// UFO COMMAND DECK - SPATIAL AUDIO SYSTEM
// Surf Rock Radio Background Vibe
// ============================================

class AlienAudioSystem {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.ambientGain = null;
        this.uiGain = null;
        this.introGain = null;
        this.isInitialized = false;
        this.isPlaying = false;
        this.isIntroPlaying = false;
        this.introComplete = false;
        this.oscillators = [];
        this.ambientNodes = [];
        this.introNodes = [];
        this.mediaAmbientElement = null;
        this.mediaAmbientSource = null;
        this.mediaAmbientUnavailable = false;
        this.mediaAmbientPlaylistIndex = 0;
        this.mediaAmbientBoundEnded = () => this.playNextAmbientTrack();

        // Audio settings
        this.settings = {
            masterVolume: 0.4,
            ambientVolume: 0.25,
            uiVolume: 0.4,
            introVolume: 0.5,
            mediaAmbientVolume: 0.72,
            ambientTrackSrc: 'assets/background-music.mp3',
            ambientTrackPlaylist: ['assets/background-music.mp3']
        };
    }

    init() {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Master gain
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.settings.masterVolume;
            this.masterGain.connect(this.audioContext.destination);

            // Ambient channel
            this.ambientGain = this.audioContext.createGain();
            this.ambientGain.gain.value = this.settings.ambientVolume;
            this.ambientGain.connect(this.masterGain);

            // UI sounds channel
            this.uiGain = this.audioContext.createGain();
            this.uiGain.gain.value = this.settings.uiVolume;
            this.uiGain.connect(this.masterGain);

            // Intro channel
            this.introGain = this.audioContext.createGain();
            this.introGain.gain.value = this.settings.introVolume;
            this.introGain.connect(this.masterGain);

            this.isInitialized = true;
            console.log('🔊 Alien Audio System initialized');
        } catch (e) {
            console.warn('Audio initialization failed:', e);
        }
    }

    // Resume audio context (required after user interaction)
    async resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    canPlayAudio() {
        return this.isInitialized && this.audioContext && this.audioContext.state === 'running';
    }

    // ============================================
    // COAST TO COAST AM STYLE INTRO
    // Mysterious, eerie radio broadcast opening
    // ============================================

    async playIntro(onComplete) {
        if (!this.isInitialized) await this.init();
        await this.resume();
        await this.startAmbient();
        this.isIntroPlaying = false;
        this.introComplete = true;
        if (onComplete) onComplete();
    }

    // ============================================
    // PROJECT: ART BELL INTRO (High Desert Signal)
    // ============================================

    async playArtBellIntro(onComplete) {
        if (!this.isInitialized) await this.init();

        console.log('🌵 Initiating High Desert Signal (Project Art Bell)...');
        this.isIntroPlaying = true;

        await Tone.start();
        Tone.Transport.bpm.value = 126;

        // A. MASTER EFFECTS
        const limiter = new Tone.Limiter(-2).toDestination();
        const reverb = new Tone.Reverb({ decay: 2, wet: 0.3 }).connect(limiter);

        // B. THE BASS 
        const lowPassFilter = new Tone.Filter(200, "lowpass", -24).connect(limiter);

        const bassSynth = new Tone.MonoSynth({
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0.1, release: 0.1 }
        }).connect(lowPassFilter);

        // C. THE DRUMS
        const kickDrum = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 4,
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
        }).connect(limiter);

        const hiHat = new Tone.MetalSynth({
            frequency: 200,
            envelope: { attack: 0.001, decay: 0.05, release: 0.05 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).connect(reverb);
        hiHat.volume.value = -8;

        // D. THE LEAD
        const leadSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "square" },
            envelope: { attack: 0.02, decay: 0.1, sustain: 0.1, release: 1 }
        }).connect(reverb);

        const leadDelay = new Tone.PingPongDelay("8n", 0.3).connect(limiter);
        leadSynth.connect(leadDelay);

        // --- SCHEDULING ---

        // PATTERN 1: THE BASSLINE
        const bassLoop = new Tone.Loop(time => {
            bassSynth.triggerAttackRelease("A1", "16n", time);
            bassSynth.triggerAttackRelease("A2", "16n", time + Tone.Time("16n"));
            bassSynth.triggerAttackRelease("A1", "16n", time + Tone.Time("16n") * 2);
            bassSynth.triggerAttackRelease("A2", "16n", time + Tone.Time("16n") * 3);
        }, "4n").start(0);

        // PATTERN 2: THE KICK
        const kickLoop = new Tone.Loop(time => {
            kickDrum.triggerAttackRelease("C1", "8n", time);
        }, "4n").start("8:0:0");

        // PATTERN 3: THE HI-HATS
        const hatLoop = new Tone.Sequence((time, note) => {
            hiHat.triggerAttackRelease(32, "32n", time, note);
        }, [null, 1, null, 1], "8n").start("4:0:0");

        // PATTERN 4: THE MELODY 
        const melodyNotes = [
            { "time": "0:0:0", "note": "E4", "dur": "8n" },
            { "time": "0:0:2", "note": "G4", "dur": "8n" },
            { "time": "0:1:0", "note": "A4", "dur": "4n" },
            { "time": "0:2:0", "note": "B4", "dur": "8n" },
            { "time": "0:2:2", "note": "A4", "dur": "8n" },
            { "time": "0:3:0", "note": "G4", "dur": "4n" },
            { "time": "1:0:0", "note": "E4", "dur": "8n" },
            { "time": "1:0:2", "note": "D4", "dur": "8n" },
            { "time": "1:1:0", "note": "E4", "dur": "2n" },
        ];

        const melodyPart = new Tone.Part((time, value) => {
            leadSynth.triggerAttackRelease(value.note, value.dur, time);
        }, melodyNotes).start("16:0:0");

        melodyPart.loop = true;
        melodyPart.loopEnd = "2m";

        // --- AUTOMATION ---
        Tone.Transport.schedule(time => {
            lowPassFilter.frequency.rampTo(4000, 10);
        }, "0:0:0");

        // FADE OUT
        Tone.Transport.schedule(time => {
            console.log("> TRANSITIONING TO AMBIENT...");
            Tone.Destination.volume.rampTo(-60, 2);
        }, "24:0:0");

        // START
        Tone.Transport.start();

        // Handover to App
        setTimeout(() => {
            this.startAmbient();
            this.isIntroPlaying = false;
            this.introComplete = true;
            if (onComplete) onComplete();
        }, 8000);
    }

    async playCoastToCoastIntro(onComplete) {
        if (!this.isInitialized) await this.init();

        // Safety check - if init failed (e.g. browser policy or error)
        if (!this.audioContext) {
            console.warn('Audio context not available, skipping intro audio');
            if (onComplete) onComplete();
            return;
        }

        if (this.isIntroPlaying) return;

        await this.resume();
        this.isIntroPlaying = true;

        console.log('📻 Starting Coast to Coast AM style intro...');

        const startTime = this.audioContext.currentTime;
        const introDuration = 8; // Total intro length in seconds

        // Fade in master
        this.masterGain.gain.setValueAtTime(0, startTime);
        this.masterGain.gain.linearRampToValueAtTime(this.settings.masterVolume, startTime + 2);

        // Layer 1: Radio Tuning Static (0-2s)
        this.playRadioTuning(startTime, 3);

        // Layer 2: Deep Space Drone (starts 0.5s, sustained)
        this.playDeepSpaceDrone(startTime + 0.5, introDuration);

        // Layer 3: Mysterious Synth Pad (starts 1s)
        this.playMysteriousPad(startTime + 1, introDuration - 1);

        // Layer 4: Theremin-like sweep (2-4s)
        this.playThereminSweep(startTime + 2, 3);

        // Layer 5: Radio transmission beeps (3-5s)
        this.playTransmissionBeeps(startTime + 3);

        // Layer 6: Dramatic Stinger/Sting (5s)
        this.playDramaticSting(startTime + 5);

        // Layer 7: "Welcome" chime (6.5s)
        this.playWelcomeChime(startTime + 6.5);

        // Transition to ambient after intro
        setTimeout(() => {
            this.fadeOutIntro();
            this.startAmbient();
            this.isIntroPlaying = false;
            this.introComplete = true;
            console.log('✨ Intro complete, ambient started');
            if (onComplete) onComplete();
        }, introDuration * 1000);
    }

    playRadioTuning(startTime, duration) {
        // Create radio static with tuning effect
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate static with occasional "tuning" sweeps
        for (let i = 0; i < bufferSize; i++) {
            const t = i / this.audioContext.sampleRate;
            const tuneModulation = Math.sin(t * 3) * 0.5 + 0.5;
            data[i] = (Math.random() * 2 - 1) * 0.3 * tuneModulation;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;

        // Bandpass filter that sweeps (radio tuning effect)
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 5;
        filter.frequency.setValueAtTime(300, startTime);
        filter.frequency.exponentialRampToValueAtTime(1500, startTime + 1);
        filter.frequency.exponentialRampToValueAtTime(800, startTime + 2);
        filter.frequency.linearRampToValueAtTime(1000, startTime + duration);

        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0.4, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.introGain);

        noise.start(startTime);
        noise.stop(startTime + duration);

        this.introNodes.push(noise, filter, gain);
    }

    playDeepSpaceDrone(startTime, duration) {
        // Deep, ominous drone - foundation of the intro
        const frequencies = [55, 82.5, 110]; // A1, E2, A2 - open fifth chord

        frequencies.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            // Add slight detune for richness
            osc.detune.value = (i - 1) * 5;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.08, startTime + 2);
            gain.gain.setValueAtTime(0.08, startTime + duration - 2);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);

            osc.connect(gain);
            gain.connect(this.introGain);

            osc.start(startTime);
            osc.stop(startTime + duration);

            this.introNodes.push(osc, gain);
        });
    }

    playMysteriousPad(startTime, duration) {
        // Eerie synth pad with slight modulation
        const notes = [220, 277.18, 329.63, 440]; // A3, C#4, E4, A4 - minor-ish chord

        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const pan = this.audioContext.createStereoPanner();

            osc.type = 'triangle';
            osc.frequency.value = freq;

            // Slow vibrato
            const vibrato = this.audioContext.createOscillator();
            const vibratoGain = this.audioContext.createGain();
            vibrato.frequency.value = 3 + i * 0.5;
            vibratoGain.gain.value = 2;
            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.start(startTime);
            vibrato.stop(startTime + duration);

            // Stereo spread
            pan.pan.value = (i / notes.length) * 2 - 1;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.04, startTime + 1.5);
            gain.gain.setValueAtTime(0.04, startTime + duration - 1.5);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);

            osc.connect(gain);
            gain.connect(pan);
            pan.connect(this.introGain);

            osc.start(startTime);
            osc.stop(startTime + duration);

            this.introNodes.push(osc, vibrato, gain, vibratoGain, pan);
        });
    }

    playThereminSweep(startTime, duration) {
        // Classic theremin-like sci-fi sweep
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, startTime);
        osc.frequency.exponentialRampToValueAtTime(800, startTime + duration * 0.3);
        osc.frequency.exponentialRampToValueAtTime(400, startTime + duration * 0.7);
        osc.frequency.exponentialRampToValueAtTime(600, startTime + duration);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.2);
        gain.gain.setValueAtTime(0.08, startTime + duration - 0.5);
        gain.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(gain);
        gain.connect(this.introGain);

        osc.start(startTime);
        osc.stop(startTime + duration);

        this.introNodes.push(osc, gain);
    }

    playTransmissionBeeps(startTime) {
        // Radio transmission beep pattern
        const beepTimes = [0, 0.3, 0.6, 1.2];
        const beepFreqs = [880, 880, 880, 1760];

        beepTimes.forEach((offset, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.value = beepFreqs[i];

            const beepStart = startTime + offset;
            gain.gain.setValueAtTime(0, beepStart);
            gain.gain.linearRampToValueAtTime(0.12, beepStart + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, beepStart + 0.15);

            osc.connect(gain);
            gain.connect(this.introGain);

            osc.start(beepStart);
            osc.stop(beepStart + 0.2);

            this.introNodes.push(osc, gain);
        });
    }

    playDramaticSting(startTime) {
        // Big dramatic chord hit
        const chordFreqs = [130.81, 164.81, 196, 261.63, 392]; // C major chord spread

        chordFreqs.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = i < 2 ? 'sawtooth' : 'triangle';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.02, startTime + 1);
            gain.gain.linearRampToValueAtTime(0, startTime + 1.5);

            osc.connect(gain);
            gain.connect(this.introGain);

            osc.start(startTime);
            osc.stop(startTime + 1.5);

            this.introNodes.push(osc, gain);
        });
    }

    playWelcomeChime(startTime) {
        // Ethereal "welcome" chime sequence
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        const delays = [0, 0.15, 0.3, 0.45];

        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            const noteStart = startTime + delays[i];
            gain.gain.setValueAtTime(0, noteStart);
            gain.gain.linearRampToValueAtTime(0.1, noteStart + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.8);

            osc.connect(gain);
            gain.connect(this.introGain);

            osc.start(noteStart);
            osc.stop(noteStart + 1);

            this.introNodes.push(osc, gain);
        });
    }

    fadeOutIntro() {
        if (this.introGain) {
            const now = this.audioContext.currentTime;
            this.introGain.gain.setValueAtTime(this.introGain.gain.value, now);
            this.introGain.gain.linearRampToValueAtTime(0, now + 1);
        }

        // Clean up intro nodes after fade
        setTimeout(() => {
            this.introNodes.forEach(node => {
                try { if (node.stop) node.stop(); } catch (e) { }
            });
            this.introNodes = [];
        }, 1000);
    }

    // ============================================
    // SURF ROCK RADIO BACKGROUND
    // Late night beach vibes, reverb-drenched guitar
    // ============================================

    async startAmbient() {
        if (!this.isInitialized) this.init();
        if (this.audioContext) {
            await this.resume().catch(() => {});
        }

        if (this.isPlaying && this.mediaAmbientElement && !this.mediaAmbientElement.paused) {
            return;
        }

        if (this.isPlaying && !this.mediaAmbientElement) {
            this.stopGeneratedAmbient();
            this.isPlaying = false;
        }

        if (await this.startMediaAmbient()) {
            return;
        }

        if (this.isPlaying) return;

        this.isPlaying = true;

        // Layer 1: Ethereal Sine Pad (Musical, not just a hum)
        this.createEtherealPad();

        // Layer 2: Space Wind (Dynamic filtered noise)
        this.createSpaceWind();

        // Layer 3: Rare, subtle sparkles
        this.createStarSparkles();

        console.log('✨ Ethereal Ambience - Harmonizing with the cosmos...');
    }

    async startMediaAmbient() {
        const playlist = this.getAmbientPlaylist();
        const src = playlist[this.mediaAmbientPlaylistIndex] || playlist[0];
        if (!src || this.mediaAmbientUnavailable) return false;

        try {
            const audio = this.prepareMediaAmbientElement(src);
            const resumePromise = this.audioContext?.state === 'suspended'
                ? this.audioContext.resume()
                : Promise.resolve();
            const playPromise = audio.play();

            await resumePromise;
            await playPromise;
            this.isPlaying = true;
            this.emitAmbientTrackChange('play');
            console.log(`🎵 Background track playing: ${src}`);
            return true;
        } catch (error) {
            if (error.name !== 'NotAllowedError') {
                this.mediaAmbientUnavailable = true;
            }
            console.warn(`Background track unavailable (${src}); using generated ambience instead.`, error);
            return false;
        }
    }

    async playNextAmbientTrack() {
        const playlist = this.getAmbientPlaylist();
        if (!playlist.length || !this.mediaAmbientElement) return;

        this.mediaAmbientPlaylistIndex = (this.mediaAmbientPlaylistIndex + 1) % playlist.length;
        const nextSrc = playlist[this.mediaAmbientPlaylistIndex];

        try {
            const audio = this.prepareMediaAmbientElement(nextSrc);
            await audio.play();
            this.isPlaying = true;
            this.emitAmbientTrackChange('next');
            console.log(`🎵 Background track playing: ${nextSrc}`);
        } catch (error) {
            console.warn(`Skipping unavailable background track (${nextSrc}).`, error);
            if (playlist.length > 1) {
                this.playNextAmbientTrack();
            }
        }
    }

    async selectAmbientTrack(index) {
        const playlist = this.getAmbientPlaylist();
        if (!playlist.length) return false;

        const normalizedIndex = ((Number(index) || 0) % playlist.length + playlist.length) % playlist.length;
        const nextSrc = playlist[normalizedIndex];

        this.mediaAmbientPlaylistIndex = normalizedIndex;
        this.mediaAmbientUnavailable = false;

        if (!this.isInitialized) this.init();
        if (this.audioContext) {
            await this.resume().catch(() => {});
        }

        this.stopGeneratedAmbient();

        try {
            const audio = this.prepareMediaAmbientElement(nextSrc);
            audio.muted = false;

            const resumePromise = this.audioContext?.state === 'suspended'
                ? this.audioContext.resume()
                : Promise.resolve();
            const playPromise = audio.play();

            await resumePromise;
            await playPromise;
            this.isPlaying = true;
            this.emitAmbientTrackChange('select');
            console.log(`🎵 Background track selected: ${nextSrc}`);
            return true;
        } catch (error) {
            console.warn(`Selected background track unavailable (${nextSrc}).`, error);
            return false;
        }
    }

    prepareMediaAmbientElement(src) {
        const nextHref = new URL(src, window.location.href).href;

        if (!this.mediaAmbientElement) {
            const audio = new Audio();
            audio.loop = false;
            audio.preload = 'auto';
            audio.volume = this.getMediaAmbientVolume();
            audio.addEventListener('ended', this.mediaAmbientBoundEnded);

            this.mediaAmbientElement = audio;
        }

        this.mediaAmbientElement.volume = this.getMediaAmbientVolume();

        if (this.mediaAmbientElement.src !== nextHref) {
            this.mediaAmbientElement.pause();
            this.mediaAmbientElement.src = src;
            this.mediaAmbientElement.load();
        } else if (this.mediaAmbientElement.ended) {
            this.mediaAmbientElement.currentTime = 0;
        }

        return this.mediaAmbientElement;
    }

    getMediaAmbientVolume() {
        const value = Number(this.settings.mediaAmbientVolume);
        return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0.72));
    }

    getCurrentAmbientTrackIndex() {
        return this.mediaAmbientPlaylistIndex;
    }

    getCurrentAmbientTrack() {
        return this.getAmbientTracks()[this.getCurrentAmbientTrackIndex()] || null;
    }

    getAmbientTracks() {
        if (Array.isArray(window.UFO_AMBIENT_TRACKS) && window.UFO_AMBIENT_TRACKS.length) {
            return window.UFO_AMBIENT_TRACKS
                .filter((track) => track && track.src)
                .map((track, index) => ({
                    title: track.title || this.getTrackTitleFromSrc(track.src),
                    artist: track.artist || 'UFO Command Deck',
                    code: track.code || `SIG-${String(index + 1).padStart(2, '0')}`,
                    src: track.src,
                    accent: track.accent || '#4de082'
                }));
        }

        return this.getAmbientPlaylist().map((src, index) => ({
            title: this.getTrackTitleFromSrc(src),
            artist: 'UFO Command Deck',
            code: `SIG-${String(index + 1).padStart(2, '0')}`,
            src,
            accent: '#4de082'
        }));
    }

    getAmbientPlaylist() {
        if (Array.isArray(window.UFO_AMBIENT_PLAYLIST) && window.UFO_AMBIENT_PLAYLIST.length) {
            return window.UFO_AMBIENT_PLAYLIST.filter(Boolean);
        }

        if (window.UFO_AMBIENT_TRACK) {
            return [window.UFO_AMBIENT_TRACK];
        }

        return this.settings.ambientTrackPlaylist?.length
            ? this.settings.ambientTrackPlaylist
            : [this.settings.ambientTrackSrc];
    }

    getAmbientTrackSrc() {
        return this.getAmbientPlaylist()[0] || '';
    }

    getTrackTitleFromSrc(src) {
        const filename = String(src || '').split('/').pop()?.replace(/\.[^.]+$/, '') || 'Unknown Signal';
        return filename
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    emitAmbientTrackChange(reason = 'play') {
        if (typeof window === 'undefined') return;

        window.dispatchEvent(new CustomEvent('ufo-ambient-track-change', {
            detail: {
                reason,
                index: this.getCurrentAmbientTrackIndex(),
                track: this.getCurrentAmbientTrack(),
                isPlaying: this.isPlaying
            }
        }));
    }

    async ensureAmbientTrackAvailable(src) {
        const url = new URL(src, window.location.href);
        if (url.origin !== window.location.origin) return;

        const response = await fetch(url.href, { method: 'HEAD', cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
    }

    createEtherealPad() {
        // Create a suspended chord for a floating feeling (Dmaj9 sort of vibe)
        const frequencies = [146.83, 220.00, 293.66, 369.99]; // D3, A3, D4, F#4

        frequencies.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const pan = this.audioContext.createStereoPanner();

            osc.type = 'sine';
            osc.frequency.value = freq;

            // Subtle detuning for richness
            osc.detune.value = (Math.random() - 0.5) * 10;

            // Breathing effect (Amplitude Modulation)
            const breather = this.audioContext.createOscillator();
            const breatherGain = this.audioContext.createGain();
            breather.frequency.value = 0.1 + (Math.random() * 0.1); // Different rates for each note
            breather.type = 'sine';
            breatherGain.gain.value = 0.02; // Depth of breath

            // Base volume
            gain.gain.value = 0.03;

            breather.connect(breatherGain);
            breatherGain.connect(gain.gain);
            breather.start();

            // Panning spread
            pan.pan.value = (i / frequencies.length) * 1.5 - 0.75;

            osc.connect(gain);
            gain.connect(pan);
            pan.connect(this.ambientGain);

            osc.start();

            this.oscillators.push(osc, breather);
            this.ambientNodes.push(gain, pan, breatherGain);
        });
    }

    createSpaceWind() {
        // Pink noise generation
        const bufferSize = this.audioContext.sampleRate * 5;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Bandpass filter that sweeps slowly
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 400;
        filter.Q.value = 1;

        // Wind sweep LFO
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        lfo.frequency.value = 0.04; // 25 seconds full sweep
        lfo.type = 'sine';
        lfoGain.gain.value = 300; // Sweep range (+/- 300Hz)

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const gain = this.audioContext.createGain();
        gain.gain.value = 0.05; // Gentle wind volume

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        noise.start();

        this.oscillators.push(lfo);
        this.ambientNodes.push(noise, filter, gain, lfoGain);
    }

    createStarSparkles() {
        const playSparkle = () => {
            if (!this.isPlaying) return;

            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const pan = this.audioContext.createStereoPanner();

            osc.type = 'sine';
            osc.frequency.value = 1500 + Math.random() * 1000; // High pitch

            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.03, this.audioContext.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5);

            pan.pan.value = (Math.random() * 2) - 1;

            osc.connect(gain);
            gain.connect(pan);
            pan.connect(this.ambientGain);

            osc.start();
            osc.stop(this.audioContext.currentTime + 1.5);

            // Schedule next sparkle (random interval 5-15s)
            setTimeout(playSparkle, 5000 + Math.random() * 10000);
        };

        // Start the loop
        setTimeout(playSparkle, 2000);
    }

    createSurfGuitar() {
        // Tremolo guitar simulation using modulated oscillators
        const guitar = this.audioContext.createOscillator();
        const guitar2 = this.audioContext.createOscillator();
        const guitarFilter = this.audioContext.createBiquadFilter();
        const guitarGain = this.audioContext.createGain();
        const tremolo = this.audioContext.createOscillator();
        const tremoloGain = this.audioContext.createGain();

        // Main guitar tone (open string vibe)
        guitar.type = 'sawtooth';
        guitar.frequency.value = 196; // G3 - surf rock key

        guitar2.type = 'sawtooth';
        guitar2.frequency.value = 293.66; // D4 - fifth harmony

        // Warm filter for guitar tone
        guitarFilter.type = 'lowpass';
        guitarFilter.frequency.value = 2000;
        guitarFilter.Q.value = 1;

        // Tremolo effect (signature surf sound)
        tremolo.type = 'sine';
        tremolo.frequency.value = 6; // Fast tremolo
        tremoloGain.gain.value = 0.4;

        guitarGain.gain.value = 0.08;

        // Routing
        guitar.connect(guitarFilter);
        guitar2.connect(guitarFilter);
        guitarFilter.connect(guitarGain);

        // Tremolo modulation
        tremolo.connect(tremoloGain);
        tremoloGain.connect(guitarGain.gain);

        guitarGain.connect(this.ambientGain);

        guitar.start();
        guitar2.start();
        tremolo.start();

        // Slow pitch modulation for movement
        const vibrato = this.audioContext.createOscillator();
        const vibratoGain = this.audioContext.createGain();
        vibrato.frequency.value = 0.3;
        vibrato.type = 'sine';
        vibratoGain.gain.value = 3;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(guitar.frequency);
        vibrato.start();

        this.oscillators.push(guitar, guitar2, tremolo, vibrato);
        this.ambientNodes.push(guitarFilter, guitarGain, tremoloGain, vibratoGain);
    }

    createTremoloBass() {
        // Deep surf bass with tremolo
        const bass = this.audioContext.createOscillator();
        const bassFilter = this.audioContext.createBiquadFilter();
        const bassGain = this.audioContext.createGain();
        const bassTremolo = this.audioContext.createOscillator();
        const bassTremoloGain = this.audioContext.createGain();

        bass.type = 'sine';
        bass.frequency.value = 98; // G2 bass note

        bassFilter.type = 'lowpass';
        bassFilter.frequency.value = 300;

        // Slower tremolo for bass
        bassTremolo.type = 'sine';
        bassTremolo.frequency.value = 0.8;
        bassTremoloGain.gain.value = 0.05;

        bassGain.gain.value = 0.12;

        bass.connect(bassFilter);
        bassFilter.connect(bassGain);

        bassTremolo.connect(bassTremoloGain);
        bassTremoloGain.connect(bassGain.gain);

        bassGain.connect(this.ambientGain);

        bass.start();
        bassTremolo.start();

        this.oscillators.push(bass, bassTremolo);
        this.ambientNodes.push(bassFilter, bassGain, bassTremoloGain);
    }

    createDrumPattern() {
        // Surf rock drum pattern using noise bursts
        const playDrumHit = (type) => {
            if (!this.isPlaying) return;

            const noise = this.audioContext.createBufferSource();
            const noiseBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
            const data = noiseBuffer.getChannelData(0);

            for (let i = 0; i < data.length; i++) {
                data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
            }
            noise.buffer = noiseBuffer;

            const filter = this.audioContext.createBiquadFilter();
            const gain = this.audioContext.createGain();

            if (type === 'kick') {
                filter.type = 'lowpass';
                filter.frequency.value = 150;
                gain.gain.value = 0.15;
            } else if (type === 'snare') {
                filter.type = 'bandpass';
                filter.frequency.value = 2000;
                filter.Q.value = 1;
                gain.gain.value = 0.08;
            } else { // hi-hat
                filter.type = 'highpass';
                filter.frequency.value = 5000;
                gain.gain.value = 0.04;
            }

            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ambientGain);
            noise.start();
        };

        // Schedule drum pattern
        const bpm = 140;
        const beatTime = 60000 / bpm;
        let beat = 0;

        const drumLoop = () => {
            if (!this.isPlaying) return;

            const pattern = beat % 8;

            // Kick on 1 and 5
            if (pattern === 0 || pattern === 4) {
                playDrumHit('kick');
            }
            // Snare on 3 and 7
            if (pattern === 2 || pattern === 6) {
                playDrumHit('snare');
            }
            // Hi-hat on every beat
            playDrumHit('hihat');

            beat++;
            setTimeout(drumLoop, beatTime / 2);
        };

        drumLoop();
    }

    createReverbWash() {
        // Spring reverb simulation using filtered noise
        const bufferSize = this.audioContext.sampleRate * 4;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Create reverb-like noise
        let accumulator = 0;
        for (let i = 0; i < bufferSize; i++) {
            accumulator = accumulator * 0.999 + (Math.random() * 2 - 1) * 0.001;
            data[i] = accumulator;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Bandpass for metallic spring reverb character
        const reverbFilter = this.audioContext.createBiquadFilter();
        reverbFilter.type = 'bandpass';
        reverbFilter.frequency.value = 1500;
        reverbFilter.Q.value = 2;

        // Modulate filter for wobble
        const filterLfo = this.audioContext.createOscillator();
        const filterLfoGain = this.audioContext.createGain();
        filterLfo.frequency.value = 0.2;
        filterLfo.type = 'sine';
        filterLfoGain.gain.value = 500;
        filterLfo.connect(filterLfoGain);
        filterLfoGain.connect(reverbFilter.frequency);

        const gain = this.audioContext.createGain();
        gain.gain.value = 0.06;

        noise.connect(reverbFilter);
        reverbFilter.connect(gain);
        gain.connect(this.ambientGain);

        noise.start();
        filterLfo.start();

        this.oscillators.push(filterLfo);
        this.ambientNodes.push(noise, reverbFilter, gain, filterLfoGain);
    }

    createRadioAmbience() {
        // Vinyl crackle and radio static
        const bufferSize = this.audioContext.sampleRate * 5;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate crackle
        for (let i = 0; i < bufferSize; i++) {
            // Mostly silence with occasional pops
            if (Math.random() < 0.002) {
                data[i] = (Math.random() - 0.5) * 0.5;
            } else {
                data[i] = (Math.random() - 0.5) * 0.02;
            }
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Radio EQ
        const radioFilter = this.audioContext.createBiquadFilter();
        radioFilter.type = 'bandpass';
        radioFilter.frequency.value = 1000;
        radioFilter.Q.value = 0.5;

        const gain = this.audioContext.createGain();
        gain.gain.value = 0.15;

        noise.connect(radioFilter);
        radioFilter.connect(gain);
        gain.connect(this.ambientGain);

        noise.start();

        this.ambientNodes.push(noise, radioFilter, gain);
    }

    createOceanWaves() {
        // Ocean wave ambience
        const bufferSize = this.audioContext.sampleRate * 8;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate wave-like noise
        for (let i = 0; i < bufferSize; i++) {
            const waveEnvelope = Math.sin((i / bufferSize) * Math.PI * 2) * 0.5 + 0.5;
            data[i] = (Math.random() * 2 - 1) * waveEnvelope * 0.1;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Low filter for deep ocean sound
        const waveFilter = this.audioContext.createBiquadFilter();
        waveFilter.type = 'lowpass';
        waveFilter.frequency.value = 500;

        // Modulate for wave rhythm
        const waveLfo = this.audioContext.createOscillator();
        const waveLfoGain = this.audioContext.createGain();
        waveLfo.frequency.value = 0.08;
        waveLfo.type = 'sine';
        waveLfoGain.gain.value = 200;
        waveLfo.connect(waveLfoGain);
        waveLfoGain.connect(waveFilter.frequency);

        const gain = this.audioContext.createGain();
        gain.gain.value = 0.1;

        noise.connect(waveFilter);
        waveFilter.connect(gain);
        gain.connect(this.ambientGain);

        noise.start();
        waveLfo.start();

        this.oscillators.push(waveLfo);
        this.ambientNodes.push(noise, waveFilter, gain, waveLfoGain);
    }

    stopAmbient() {
        this.isPlaying = false;

        if (this.mediaAmbientElement) {
            this.mediaAmbientElement.pause();
            this.mediaAmbientElement.currentTime = 0;
        }

        this.stopGeneratedAmbient();
    }

    stopGeneratedAmbient() {
        this.oscillators.forEach(osc => {
            try { osc.stop(); } catch (e) { }
        });

        this.oscillators = [];
        this.ambientNodes = [];
    }

    // ============================================
    // UI SOUND EFFECTS
    // ============================================

    playTheaterTuning() {
        if (!this.canPlayAudio()) return;

        const now = this.audioContext.currentTime;
        this.playRadioTuning(now, 1.2);
        this.playTransmissionBeeps(now + 0.9);
    }

    playTheaterSting() {
        if (!this.canPlayAudio()) return;

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

    playHover() {
        if (!this.canPlayAudio()) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 1200;
        osc.frequency.exponentialRampToValueAtTime(1800, this.audioContext.currentTime + 0.05);

        gain.gain.value = 0.08;
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.uiGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    playClick() {
        if (!this.canPlayAudio()) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.value = 600;
        osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.08);

        gain.gain.value = 0.12;
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.uiGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.15);
    }

    playNavigation() {
        if (!this.canPlayAudio()) return;

        const noise = this.createNoise(0.3);
        const filter = this.audioContext.createBiquadFilter();
        const gain = this.audioContext.createGain();

        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.frequency.exponentialRampToValueAtTime(2000, this.audioContext.currentTime + 0.2);
        filter.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.5);
        filter.Q.value = 2;

        gain.gain.value = 0.15;
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.uiGain);

        noise.start();
        noise.stop(this.audioContext.currentTime + 0.5);
    }

    playMarkerSelect() {
        if (!this.canPlayAudio()) return;

        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc1.type = 'sine';
        osc1.frequency.value = 400;
        osc1.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
        osc1.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.15);

        osc2.type = 'sine';
        osc2.frequency.value = 600;
        osc2.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
        osc2.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.15);

        gain.gain.value = 0.1;
        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.uiGain);

        osc1.start();
        osc2.start();
        osc1.stop(this.audioContext.currentTime + 0.4);
        osc2.stop(this.audioContext.currentTime + 0.4);
    }

    playPanelOpen() {
        if (!this.canPlayAudio()) return;

        const osc = this.audioContext.createOscillator();
        const noise = this.createNoise(0.4);
        const filter = this.audioContext.createBiquadFilter();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 150;
        osc.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.3);

        filter.type = 'lowpass';
        filter.frequency.value = 500;

        gain.gain.value = 0.15;
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);

        osc.connect(filter);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.uiGain);

        osc.start();
        noise.start();
        osc.stop(this.audioContext.currentTime + 0.4);
        noise.stop(this.audioContext.currentTime + 0.4);
    }

    playPanelClose() {
        if (!this.canPlayAudio()) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 80;
        osc.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.2);

        gain.gain.value = 0.12;
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(this.uiGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.25);
    }

    playRadarPing() {
        if (!this.canPlayAudio()) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 1000;

        gain.gain.value = 0.08;
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(this.uiGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.8);
    }

    playWarning() {
        if (!this.canPlayAudio()) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.value = 440;

        // Pulsing
        for (let i = 0; i < 3; i++) {
            gain.gain.setValueAtTime(0.15, this.audioContext.currentTime + i * 0.2);
            gain.gain.setValueAtTime(0, this.audioContext.currentTime + i * 0.2 + 0.1);
        }

        osc.connect(gain);
        gain.connect(this.uiGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.6);
    }

    // ============================================
    // UTILITY
    // ============================================

    createNoise(duration) {
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        return noise;
    }

    setMasterVolume(value) {
        this.settings.masterVolume = value;
        if (this.masterGain) {
            this.masterGain.gain.value = value;
        }
    }

    setAmbientVolume(value) {
        this.settings.ambientVolume = value;
        if (this.ambientGain) {
            this.ambientGain.gain.value = value;
        }
    }

    setMediaAmbientVolume(value) {
        this.settings.mediaAmbientVolume = value;
        if (this.mediaAmbientElement) {
            this.mediaAmbientElement.volume = this.getMediaAmbientVolume();
        }
    }

    mute() {
        if (this.masterGain) {
            this.masterGain.gain.value = 0;
        }
        if (this.mediaAmbientElement) {
            this.mediaAmbientElement.muted = true;
        }
    }

    unmute() {
        if (this.masterGain) {
            this.masterGain.gain.value = this.settings.masterVolume;
        }
        if (this.mediaAmbientElement) {
            this.mediaAmbientElement.muted = false;
            this.mediaAmbientElement.volume = this.getMediaAmbientVolume();
        }
    }

    destroy() {
        this.stopAmbient();
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Global audio instance
const alienAudio = new AlienAudioSystem();
if (typeof window !== 'undefined') {
    window.alienAudio = alienAudio;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AlienAudioSystem, alienAudio };
}
