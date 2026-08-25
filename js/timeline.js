class TimeCorridor {
    constructor(canvasContainer, cases, onCaseSelect) {
        this.container = canvasContainer;
        this.allCases = cases;
        this.onCaseSelect = onCaseSelect;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.tunnelGroup = null;
        this.isAnimating = false;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Calculate min/max years from actual case data
        const years = cases.map(c => this.parseYear(c.date)).filter(y => !isNaN(y));
        this.minYear = Math.min(...years);
        this.maxYear = Math.max(...years);

        // Ensure reasonable range
        if (this.minYear > 0) this.minYear = Math.floor(this.minYear / 10) * 10; // Round down to nearest decade
        if (this.maxYear > 0) this.maxYear = Math.ceil(this.maxYear / 10) * 10;  // Round up to nearest decade

        this.currentYear = 1947;
        this.targetYear = 1947;

        // Configuration
        this.tunnelLengthPerYear = 100; // Unity units per year
        this.startZ = 0;

        console.log(`Timeline range: ${this.minYear} to ${this.maxYear}`);

        this.init();
    }

    parseYear(dateString) {
        // Handle BC dates (negative years like "-593-07-01")
        // Handle AD dates (regular like "1947-06-24" or "0619-05-01")
        if (!dateString) return NaN;

        const match = dateString.match(/^(-?\d+)-/);
        if (match) {
            return parseInt(match[1]);
        }

        // Fallback to extracting any 4-digit year
        const yearMatch = dateString.match(/\d{4}/);
        return yearMatch ? parseInt(yearMatch[0]) : NaN;
    }

    init() {
        // Setup Three.js scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.0015);

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 2000);
        this.camera.position.z = this.getZForYear(1947);
        this.camera.position.y = 0;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.domElement.id = 'timeline-canvas';
        this.container.appendChild(this.renderer.domElement);

        // Build Tunnel
        this.buildTunnel();

        // Add Cases
        this.addCaseMarkers();

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const tunnelLight = new THREE.PointLight(0x00ffd4, 1, 500);
        tunnelLight.position.set(0, 0, this.camera.position.z - 50);
        this.scene.add(tunnelLight);
        this.tunnelLight = tunnelLight;

        // Listeners
        window.addEventListener('resize', () => this.onResize());
        this.renderer.domElement.addEventListener('click', (e) => this.onClick(e));
        this.renderer.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.renderer.domElement.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

        // Update slider with dynamic range
        this.updateSliderRange();
    }

    updateSliderRange() {
        const slider = document.getElementById('timelineSlider');
        if (slider) {
            slider.min = this.minYear;
            slider.max = this.maxYear;
            slider.value = 1947;

            // Add slider event listener
            slider.addEventListener('input', (e) => {
                const year = parseInt(e.target.value);
                this.setYear(year);
            });

            console.log(`Timeline slider updated: ${this.minYear} to ${this.maxYear}`);
        }

        // Initialize era label
        this.updateEraLabel(1947);
    }

    buildTunnel() {
        this.tunnelGroup = new THREE.Group();
        this.scene.add(this.tunnelGroup);

        const material = new THREE.LineBasicMaterial({
            color: 0x00ffd4,
            transparent: true,
            opacity: 0.15
        });

        const majorMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffd4,
            transparent: true,
            opacity: 0.6
        });

        // Create rings for each year
        for (let year = this.minYear; year <= this.maxYear; year++) {
            const z = this.getZForYear(year);
            const isDecade = year % 10 === 0;

            // Ring with RingGeometry for modern Three.js
            const geometry = new THREE.RingGeometry(18, 20, isDecade ? 12 : 6);
            const edges = new THREE.EdgesGeometry(geometry);
            const ring = new THREE.LineSegments(edges, isDecade ? majorMaterial : material);

            ring.position.z = z;
            ring.rotation.z = Math.random() * Math.PI; // Random rotation variation

            this.tunnelGroup.add(ring);

            // Connecting lines for speed effect
            if (year < this.maxYear) {
                // ... logic for connecting lines could go here
            }
        }
    }

    addCaseMarkers() {
        // Group cases by year
        this.allCases.forEach(caseData => {
            const year = this.parseYear(caseData.date);
            if (!isNaN(year) && year >= this.minYear && year <= this.maxYear) {
                this.createCaseMarker(caseData, year);
            }
        });
    }

    createCaseMarker(caseData, year) {
        const z = this.getZForYear(year);

        // Random position on the tunnel wall
        const angle = Math.random() * Math.PI * 2;
        const radius = 18; // Slightly inside the tunnel wrapper
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Visual
        const geometry = new THREE.SphereGeometry(0.5, 8, 8);
        let color = 0x00ffd4; // Default cyan

        if (caseData.tier === 1) color = 0xff3366; // Red for encounters
        if (caseData.tier === 2) color = 0xffaa00; // Gold for anomalies

        const material = new THREE.MeshBasicMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.userData = { case: caseData };

        this.tunnelGroup.add(mesh);
    }

    getZForYear(year) {
        return (year - this.minYear) * this.tunnelLengthPerYear * -1;
    }

    onClick(event) {
        // Calculate mouse position
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Raycast
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.tunnelGroup.children);

        if (intersects.length > 0) {
            // Check for valid case data
            const target = intersects.find(hit => hit.object.userData && hit.object.userData.case);
            if (target) {
                if (this.onCaseSelect) {
                    this.onCaseSelect(target.object.userData.case);
                }
            }
        }
    }

    onMouseMove(event) {
        // Just for cursor change or hover effect (optional)
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.tunnelGroup.children);
        const target = intersects.find(hit => hit.object.userData && hit.object.userData.case);

        this.renderer.domElement.style.cursor = target ? 'pointer' : 'default';
    }

    onWheel(event) {
        event.preventDefault(); // Prevent page scroll

        // Calculate year change based on wheel delta
        // Positive deltaY = scroll down = go forward in time
        // Negative deltaY = scroll up = go backward in time
        const yearChange = Math.sign(event.deltaY) * 5; // Move 5 years per scroll

        const newYear = Math.max(this.minYear, Math.min(this.maxYear, this.targetYear + yearChange));

        if (newYear !== this.targetYear) {
            this.setYear(newYear);

            // Update slider to match
            const slider = document.getElementById('timelineSlider');
            if (slider) {
                slider.value = newYear;
            }
        }
    }

    play() {
        this.isAnimating = true;
        this.animate();
    }

    pause() {
        this.isAnimating = false;
    }

    animate() {
        if (!this.isAnimating) return;
        requestAnimationFrame(() => this.animate());

        // Smooth camera movement
        const targetZ = this.getZForYear(this.targetYear);
        this.camera.position.z += (targetZ - this.camera.position.z) * 0.05;

        // Move light with camera
        this.tunnelLight.position.z = this.camera.position.z - 20;

        // Rotate rings slowly
        this.tunnelGroup.children.forEach((child, i) => {
            child.rotation.z += 0.001 * (i % 2 === 0 ? 1 : -1);
        });

        this.renderer.render(this.scene, this.camera);
    }

    setYear(year) {
        this.targetYear = Math.max(this.minYear, Math.min(this.maxYear, year));
        this.updateEraLabel(this.targetYear);
    }

    updateEraLabel(year) {
        const label = document.getElementById('timelineEraLabel');
        const display = document.getElementById('timelineYearDisplay');

        // Handle BC dates display
        if (display) {
            if (year < 0) {
                display.textContent = `${Math.abs(Math.round(year))} BC`;
            } else {
                display.textContent = Math.round(year);
            }
        }

        if (!label) return;

        let eraText = "UNKNOWN ERA";
        if (year < 0) eraText = "ANCIENT ERA";
        else if (year < 1000) eraText = "EARLY MEDIEVAL";
        else if (year < 1500) eraText = "MEDIEVAL ERA";
        else if (year < 1800) eraText = "EARLY MODERN";
        else if (year < 1900) eraText = "INDUSTRIAL ERA";
        else if (year < 1947) eraText = "PRE-ROSWELL";
        else if (year < 1969) eraText = "THE GOLDEN AGE (BLUE BOOK)";
        else if (year < 1990) eraText = "THE SILENT ERA";
        else if (year < 2017) eraText = "MODERN ENCOUNTERS";
        else eraText = "DISCLOSURE ERA";

        label.textContent = eraText;
    }

    onResize() {
        if (!this.container || !this.camera) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    destroy() {
        // Cleanup WebGL context
        this.pause();
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
    }
}
