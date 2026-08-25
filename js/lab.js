class SpecimenLab {
    constructor(container, specimens) {
        this.container = container;
        this.specimens = specimens;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.specimen = null; // Current 3D object
        this.isAnimating = false;
        this.currentMode = 'visual';
        this.currentSpecimenId = null;

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000a0f);
        this.scene.fog = new THREE.Fog(0x000a0f, 10, 50);

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
        this.camera.position.set(0, 0, 8);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0x00ffd4, 1);
        spotLight.position.set(5, 5, 5);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.3;
        this.scene.add(spotLight);

        const fillLight = new THREE.PointLight(0xff6600, 0.3);
        fillLight.position.set(-5, -5, 5);
        this.scene.add(fillLight);

        // Scanner Grid
        this.createScannerGrid();

        // Event Listeners
        window.addEventListener('resize', () => this.onResize());
    }

    createScannerGrid() {
        // Create a grid plane for visual context
        const gridHelper = new THREE.GridHelper(10, 20, 0x00ffd4, 0x003344);
        gridHelper.position.y = -3;
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
    }

    loadSpecimen(specimenId) {
        this.currentSpecimenId = specimenId;
        const data = this.specimens.find(s => s.id === specimenId);
        if (!data) return;

        // Remove old specimen
        if (this.specimen) {
            this.scene.remove(this.specimen);
        }

        // Create new specimen geometry
        this.specimen = this.createSpecimenMesh(data);
        this.scene.add(this.specimen);

        // Update analysis panel
        this.updateAnalysisPanel(data);
    }

    createSpecimenMesh(data) {
        const group = new THREE.Group();

        // Create irregular geometry (simulating debris)
        const geometry = new THREE.IcosahedronGeometry(2, 1);

        // Distort vertices for irregularity
        const positions = geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = positions.getZ(i);
            positions.setXYZ(
                i,
                x * (1 + Math.random() * 0.3),
                y * (1 + Math.random() * 0.3),
                z * (1 + Math.random() * 0.3)
            );
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();

        // Material
        const material = new THREE.MeshStandardMaterial({
            color: data.color || 0xcccccc,
            metalness: 0.8,
            roughness: 0.3,
            flatShading: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

        group.userData = { originalMaterial: material, data: data };

        return group;
    }

    setScanMode(mode) {
        this.currentMode = mode;
        if (!this.specimen) return;

        const mesh = this.specimen.children[0];
        const data = this.specimen.userData.data;

        // Remove existing materials/effects
        mesh.material.dispose();

        switch (mode) {
            case 'visual':
                mesh.material = new THREE.MeshStandardMaterial({
                    color: data.color || 0xcccccc,
                    metalness: 0.8,
                    roughness: 0.3,
                    flatShading: true
                });
                break;

            case 'xray':
                mesh.material = new THREE.MeshBasicMaterial({
                    color: 0x00ffff,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.6
                });
                break;

            case 'spectro':
                mesh.material = new THREE.MeshStandardMaterial({
                    color: 0xff00ff,
                    emissive: 0xff00ff,
                    emissiveIntensity: 0.3,
                    metalness: 0.5,
                    roughness: 0.5
                });
                break;
        }

        // Update analysis readout
        const specimenData = this.specimens.find(s => s.id === this.currentSpecimenId);
        if (specimenData) {
            this.updateAnalysisPanel(specimenData, mode);
        }
    }

    updateAnalysisPanel(data, mode = 'visual') {
        const panel = document.getElementById('analysisContent');
        if (!panel) return;

        let content = '';

        if (mode === 'visual') {
            content = `
                <p><span class="highlight">SPECIMEN:</span> ${data.name}</p>
                <p><span class="highlight">ORIGIN:</span> ${data.origin}</p>
                <p><span class="highlight">STATUS:</span> ${data.status}</p>
                <p>${data.description}</p>
            `;
        } else if (mode === 'xray') {
            content = `
                <p><span class="highlight">STRUCTURAL ANALYSIS:</span></p>
                <p>Performing X-Ray crystallography...</p>
                <p>Molecular lattice: IRREGULAR</p>
                <p>Density variations detected.</p>
                <p>Atomic structure does not match known terrestrial materials.</p>
            `;
        } else if (mode === 'spectro') {
            content = `
                <p><span class="highlight">SPECTROSCOPIC ANALYSIS:</span></p>
                <p><span class="highlight">COMPOSITION:</span> ${data.composition}</p>
                <p><span class="highlight">PROPERTIES:</span></p>
                <ul>
                    ${data.properties.map(p => `<li>${p}</li>`).join('')}
                </ul>
            `;
        }

        panel.innerHTML = content;
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

        // Rotate specimen
        if (this.specimen) {
            this.specimen.rotation.y += 0.005;
            this.specimen.rotation.x += 0.002;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        if (!this.container || !this.camera) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}
