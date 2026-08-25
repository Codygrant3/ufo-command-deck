// ============================================
// UFO COMMAND DECK - ENHANCED HOLOGRAPHIC GLOBE
// ============================================

class HolographicGlobe {
    constructor(container, cases = []) {
        this.container = container;
        this.cases = cases;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.controls = null;
        this.markers = [];
        this.markerGroup = null;
        this.markerGeometries = null;
        this.markerGlowTexture = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredMarker = null;
        this.selectedMarker = null;
        this.clock = new THREE.Clock();

        // Pointer/Tap State
        this.pointerDownTime = 0;
        this.pointerDownPos = new THREE.Vector2();
        this.touchDownTime = 0;
        this.touchDownPos = new THREE.Vector2();
        this.activePointerId = null;
        this.suppressClickUntil = 0;
        this.touchHitRadius = 38;
        this.isDragging = false;

        // Callbacks
        this.onMarkerHover = null;
        this.onMarkerClick = null;
        this.onMarkerLeave = null;

        // Space animations
        this.shootingStars = [];
        this.meteors = [];
        this.comets = [];
        this.ufos = [];
        this.lastShootingStarTime = 0;
        this.lastMeteorTime = 0;
        this.lastCometTime = 0;
        this.lastUFOTime = 0;

        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 2000);
        this.camera.position.z = 350;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enablePan = false;
        this.controls.minDistance = 150;
        this.controls.maxDistance = 600;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.8;
        this.controls.rotateSpeed = 0.5;
        this.controls.zoomSpeed = 0.8;


        // Create elements
        this.createStarfield();
        this.createGlobe();
        this.createAtmosphere();
        this.createGridOverlay();
        // Radar scanner removed per user request
        this.createMarkers();
        this.createLighting();


        // Events
        window.addEventListener('resize', () => this.onResize());
        this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Mobile browsers do not always emit a synthetic click after OrbitControls handles touch.
        this.container.addEventListener('pointerdown', (e) => this.onPointerDown(e), { passive: true });
        this.container.addEventListener('pointerup', (e) => this.onPointerUp(e), { passive: false });
        this.container.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
        this.container.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: false });
        this.container.addEventListener('click', (e) => this.onClick(e));

        // Start animation
        this.animate();
    }

    createStarfield() {
        const starCount = 8000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const randoms = new Float32Array(starCount); // For random phase offsets

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const radius = 800 + Math.random() * 800;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Slight color variation (white to cyan)
            const colorMix = Math.random();
            colors[i3] = 0.8 + colorMix * 0.2;
            colors[i3 + 1] = 0.9 + colorMix * 0.1;
            colors[i3 + 2] = 1.0;

            sizes[i] = Math.random() * 2;
            randoms[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

        // Shader for twinkling stars
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                scale: { value: window.innerHeight * 0.5 } // Approximate perspective scale
            },
            vertexShader: `
                attribute float size;
                attribute float aRandom;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                uniform float scale;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Twinkle effect: Sine wave based on time + random offset
                    float twinkle = 0.7 + 0.3 * sin(time * 3.0 + aRandom * 100.0);
                    
                    gl_PointSize = size * twinkle * (scale / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    // Circular soft particle
                    vec2 uv = gl_PointCoord - 0.5;
                    float dotProd = dot(uv, uv);
                    if (dotProd > 0.25) discard;
                    
                    // Soft edge
                    float alpha = 1.0 - smoothstep(0.1, 0.25, dotProd);
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.starfield = new THREE.Points(geometry, material);
        this.scene.add(this.starfield);
    }

    createGlobe() {
        const geometry = new THREE.SphereGeometry(100, 64, 64);

        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = 'anonymous';

        const earthDay = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
        const earthBump = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');
        const earthSpecular = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-water.png');

        const material = new THREE.MeshPhongMaterial({
            map: earthDay,
            bumpMap: earthBump,
            bumpScale: 0.05,
            specularMap: earthSpecular,
            specular: new THREE.Color('grey'),
            shininess: 10
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);

        // Wireframe overlay
        const wireframeGeom = new THREE.SphereGeometry(100.2, 64, 64);
        const wireframeMat = new THREE.MeshBasicMaterial({
            color: 0x00ffd4,
            wireframe: true,
            transparent: true,
            opacity: 0.05
        });
        this.wireframe = new THREE.Mesh(wireframeGeom, wireframeMat);
        this.globe.add(this.wireframe);
    }

    createAtmosphere() {
        // Inner glow (High atmosphere)
        const innerGlowGeom = new THREE.SphereGeometry(102, 64, 64);
        const innerGlowMat = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    vec3 color = vec3(0.0, 1.0, 0.9); // Cyan-ish
                    gl_FragColor = vec4(color, intensity * 0.5);
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
            depthWrite: false
        });

        this.innerGlow = new THREE.Mesh(innerGlowGeom, innerGlowMat);
        this.scene.add(this.innerGlow);

        // Outer glow (Space haze)
        const outerGlowGeom = new THREE.SphereGeometry(115, 64, 64);
        const outerGlowMat = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.45 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
                    vec3 color = vec3(0.0, 0.6, 1.0); // Deep Blue
                    gl_FragColor = vec4(color, intensity * 0.3);
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
            depthWrite: false
        });

        this.outerGlow = new THREE.Mesh(outerGlowGeom, outerGlowMat);
        this.scene.add(this.outerGlow);
    }


    createGridOverlay() {
        // Holographic scanning ring
        const ringGeom = new THREE.RingGeometry(106, 108, 128);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00ffd4,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
        });

        this.scanRing = new THREE.Mesh(ringGeom, ringMat);
        this.scanRing.rotation.x = Math.PI / 2;
        this.scene.add(this.scanRing);
    }

    // ============================================
    // SPACE ANIMATIONS
    // ============================================

    createShootingStar() {
        const distance = 500 + Math.random() * 300;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 600;

        const start = new THREE.Vector3(
            Math.cos(angle) * distance,
            height,
            Math.sin(angle) * distance
        );

        const direction = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
        ).normalize();

        // Create shooting star with trail
        const geometry = new THREE.BufferGeometry();
        const trailLength = 20;
        const positions = new Float32Array(trailLength * 3);
        const opacities = new Float32Array(trailLength);

        for (let i = 0; i < trailLength; i++) {
            positions[i * 3] = start.x;
            positions[i * 3 + 1] = start.y;
            positions[i * 3 + 2] = start.z;
            opacities[i] = 1 - (i / trailLength);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        const trail = new THREE.Points(geometry, material);
        this.scene.add(trail);

        this.shootingStars.push({
            trail,
            position: start.clone(),
            direction,
            speed: 3 + Math.random() * 2,
            life: 0,
            maxLife: 1 + Math.random() * 0.5
        });
    }

    createMeteor() {
        // Position
        const distance = 400 + Math.random() * 200;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 400;

        const position = new THREE.Vector3(
            Math.cos(angle) * distance,
            height,
            Math.sin(angle) * distance
        );

        // Direction
        const direction = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            -0.5 - Math.random() * 0.5,
            (Math.random() - 0.5) * 2
        ).normalize();

        // Visuals - Glowing Head (Sprite)
        if (!this.glowTexture) {
            this.glowTexture = this.generateGlowTexture();
        }

        const spriteMaterial = new THREE.SpriteMaterial({
            map: this.glowTexture,
            color: 0xffaa00,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending
        });

        const meteor = new THREE.Sprite(spriteMaterial);
        meteor.scale.set(12, 12, 1); // Larger glow
        meteor.position.copy(position);
        this.scene.add(meteor);

        // Trail - 3D Cone for volume instead of line
        const trailLen = 60;
        const trailGeom = new THREE.ConeGeometry(2, trailLen, 8, 1, true); // Radius, Height, Segments, OpenEnded
        // Pivot adjustment so cone is behind the head
        trailGeom.translate(0, trailLen / 2, 0);
        trailGeom.rotateX(Math.PI / 2); // Point along Z initially

        const trailMat = new THREE.MeshBasicMaterial({
            color: 0xff4400,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const trail = new THREE.Mesh(trailGeom, trailMat);
        trail.position.copy(position);

        // Orient trail to look OPPOSITE to direction
        const lookTarget = position.clone().add(direction);
        trail.lookAt(lookTarget);
        trail.rotateX(Math.PI); // Flip to trail behind

        this.scene.add(trail);

        this.meteors.push({
            mesh: meteor,
            trail: trail,
            direction,
            speed: 3 + Math.random() * 2,
            life: 0,
            maxLife: 2 + Math.random()
        });
    }

    createComet() {
        // Position - orbital trajectory
        const distance = 600 + Math.random() * 200;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 400;

        const position = new THREE.Vector3(
            Math.cos(angle) * distance,
            height,
            Math.sin(angle) * distance
        );

        // Direction
        const direction = new THREE.Vector3(
            (Math.random() - 0.5),
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5)
        ).normalize();

        // 1. Gaseous Glow (Sprite)
        if (!this.glowTexture) {
            this.glowTexture = this.generateGlowTexture();
        }

        const glowMat = new THREE.SpriteMaterial({
            map: this.glowTexture,
            color: 0x00ffff, // Cyan
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const cometGlow = new THREE.Sprite(glowMat);
        cometGlow.scale.set(30, 30, 1);
        cometGlow.position.copy(position);
        this.scene.add(cometGlow);

        // 2. Nucleus (Bright solid core)
        const nucleusGeom = new THREE.SphereGeometry(1.5, 8, 8);
        const nucleusMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
        nucleus.position.copy(position);
        this.scene.add(nucleus);

        // Tail - Particles
        const tailParticleCount = 60;
        const tailGeom = new THREE.BufferGeometry();
        const tailPositions = new Float32Array(tailParticleCount * 3);
        const tailOpacities = new Float32Array(tailParticleCount);
        const tailSizes = new Float32Array(tailParticleCount);

        for (let i = 0; i < tailParticleCount; i++) {
            tailPositions[i * 3] = position.x;
            tailPositions[i * 3 + 1] = position.y;
            tailPositions[i * 3 + 2] = position.z;
            tailOpacities[i] = 0; // Start invisible
            tailSizes[i] = Math.random() * 5;
        }

        tailGeom.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));
        tailGeom.setAttribute('opacity', new THREE.BufferAttribute(tailOpacities, 1));
        tailGeom.setAttribute('size', new THREE.BufferAttribute(tailSizes, 1));

        const tailMat = new THREE.PointsMaterial({
            color: 0xaaddff,
            size: 4,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            map: this.glowTexture,
            depthWrite: false
        });

        const tail = new THREE.Points(tailGeom, tailMat);
        this.scene.add(tail);

        this.comets.push({
            mesh: cometGlow,
            nucleus: nucleus,
            tail: tail,
            direction,
            speed: 1.0 + Math.random() * 0.5,
            life: 0,
            maxLife: 5 + Math.random() * 3,
            history: [] // To track positions for tail
        });
    }

    createUFO() {
        const distance = 250 + Math.random() * 100;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 200;

        const position = new THREE.Vector3(
            Math.cos(angle) * distance,
            height,
            Math.sin(angle) * distance
        );

        const ufo = new THREE.Group();

        // 1. Main Hull - Lathe Geometry for smooth saucer
        const points = [];
        // Define profile of saucer
        points.push(new THREE.Vector2(0, 1.5)); // Top center
        points.push(new THREE.Vector2(3, 1));   // Upper shoulder
        points.push(new THREE.Vector2(8, 0));   // Rim
        points.push(new THREE.Vector2(3, -1.5)); // Lower body
        points.push(new THREE.Vector2(0, -2.5)); // Bottom center

        const geometry = new THREE.LatheGeometry(points, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x888888,
            emissive: 0x222222,
            specular: 0xffffff,
            shininess: 100,
            side: THREE.DoubleSide
        });
        const hull = new THREE.Mesh(geometry, material);
        ufo.add(hull);

        // 2. Cockpit Dome
        const domeGeom = new THREE.SphereGeometry(2.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMat = new THREE.MeshPhongMaterial({
            color: 0x22aaff,
            transparent: true,
            opacity: 0.6,
            shininess: 120
        });
        const dome = new THREE.Mesh(domeGeom, domeMat);
        dome.position.y = 0.5;
        ufo.add(dome);

        // 3. Force Field Shell
        const fieldGeom = new THREE.SphereGeometry(10, 32, 32);
        const fieldMat = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.05,
            wireframe: true
        });
        const forceField = new THREE.Mesh(fieldGeom, fieldMat);
        // Animate field rotation later
        ufo.userData.forceField = forceField;
        ufo.add(forceField);

        // 4. Lights
        const lights = [];
        const lightCount = 8;
        for (let i = 0; i < lightCount; i++) {
            const lightGeom = new THREE.SphereGeometry(0.5, 8, 8);
            const lightMat = new THREE.MeshPhongMaterial({
                color: 0xff0000,
                emissive: 0xff0000,
                emissiveIntensity: 0.5
            });
            const light = new THREE.Mesh(lightGeom, lightMat);
            const lightAngle = (i / lightCount) * Math.PI * 2;
            light.position.set(Math.cos(lightAngle) * 7.5, -0.5, Math.sin(lightAngle) * 7.5);
            ufo.add(light);
            lights.push(lightMat);
        }

        ufo.position.copy(position);

        // Tilt slightly for movement effect
        ufo.rotation.z = 0.1;
        ufo.rotation.x = 0.1;

        this.scene.add(ufo);

        // UFO hovers and moves slowly
        const direction = new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.5
        ).normalize();

        this.ufos.push({
            mesh: ufo,
            direction,
            speed: 0.3 + Math.random() * 0.2,
            life: 0,
            maxLife: 6 + Math.random() * 4,
            hoverOffset: Math.random() * Math.PI * 2,
            lights: lights,
            lightTimer: 0
        });
    }

    updateSpaceAnimations(time) {
        // Spawn shooting stars occasionally
        if (time - this.lastShootingStarTime > 2 + Math.random() * 3) {
            this.createShootingStar();
            this.lastShootingStarTime = time;
        }

        // Spawn meteors less frequently
        if (time - this.lastMeteorTime > 8 + Math.random() * 7) {
            this.createMeteor();
            this.lastMeteorTime = time;
        }

        // Spawn comets rarely
        if (time - this.lastCometTime > 15 + Math.random() * 15) {
            this.createComet();
            this.lastCometTime = time;
        }

        // Spawn UFOs very occasionally
        if (time - this.lastUFOTime > 20 + Math.random() * 20) {
            this.createUFO();
            this.lastUFOTime = time;
        }

        // Update shooting stars
        for (let i = this.shootingStars.length - 1; i >= 0; i--) {
            const star = this.shootingStars[i];
            star.life += 0.016; // Assuming 60fps

            if (star.life >= star.maxLife) {
                this.scene.remove(star.trail);
                star.trail.geometry.dispose();
                star.trail.material.dispose();
                this.shootingStars.splice(i, 1);
                continue;
            }

            // Move star
            star.position.addScaledVector(star.direction, star.speed);

            // Update trail
            const positions = star.trail.geometry.attributes.position.array;
            for (let j = positions.length - 3; j >= 3; j -= 3) {
                positions[j] = positions[j - 3];
                positions[j + 1] = positions[j - 2];
                positions[j + 2] = positions[j - 1];
            }
            positions[0] = star.position.x;
            positions[1] = star.position.y;
            positions[2] = star.position.z;
            star.trail.geometry.attributes.position.needsUpdate = true;

            // Fade out
            star.trail.material.opacity = 0.9 * (1 - star.life / star.maxLife);
        }

        // Update meteors (New 3D Trail logic)
        for (let i = this.meteors.length - 1; i >= 0; i--) {
            const meteor = this.meteors[i];
            meteor.life += 0.016;

            if (meteor.life >= meteor.maxLife) {
                this.scene.remove(meteor.mesh);
                meteor.mesh.material.dispose();

                if (meteor.trail) {
                    this.scene.remove(meteor.trail);
                    meteor.trail.geometry.dispose();
                    meteor.trail.material.dispose();
                }

                this.meteors.splice(i, 1);
                continue;
            }

            // Move Head
            meteor.mesh.position.addScaledVector(meteor.direction, meteor.speed);

            // Move & Rotate Trail
            if (meteor.trail) {
                meteor.trail.position.copy(meteor.mesh.position);
                // Rotate to face opposite direction of flight 
                // Fade out
                meteor.trail.material.opacity = 0.4 * (1 - meteor.life / meteor.maxLife);
                meteor.mesh.material.opacity = 1.0 * (1 - meteor.life / meteor.maxLife);
            }
        }

        // Update comets (Nucleus + Tail)
        for (let i = this.comets.length - 1; i >= 0; i--) {
            const comet = this.comets[i];
            comet.life += 0.016;

            if (comet.life >= comet.maxLife) {
                this.scene.remove(comet.mesh); // Glow
                comet.mesh.material.dispose();

                if (comet.nucleus) {
                    this.scene.remove(comet.nucleus);
                    comet.nucleus.geometry.dispose();
                    comet.nucleus.material.dispose();
                }

                if (comet.tail) {
                    this.scene.remove(comet.tail);
                    comet.tail.geometry.dispose();
                    comet.tail.material.dispose();
                }
                this.comets.splice(i, 1);
                continue;
            }

            // Record history
            comet.history.unshift(comet.mesh.position.clone());
            if (comet.history.length > 30) comet.history.pop();

            // Move Head & Nucleus
            const moveStep = comet.direction.clone().multiplyScalar(comet.speed);
            comet.mesh.position.add(moveStep);
            if (comet.nucleus) comet.nucleus.position.copy(comet.mesh.position);

            // Update Tail Particles
            if (comet.tail) {
                const positions = comet.tail.geometry.attributes.position.array;
                const opacities = comet.tail.geometry.attributes.opacity.array;

                for (let j = 0; j < positions.length / 3; j++) {
                    const idx = j * 3;
                    const historyIdx = Math.floor(j / 2);

                    if (historyIdx < comet.history.length) {
                        const historyPos = comet.history[historyIdx];
                        positions[idx] = historyPos.x + (Math.random() - 0.5) * 3;
                        positions[idx + 1] = historyPos.y + (Math.random() - 0.5) * 3;
                        positions[idx + 2] = historyPos.z + (Math.random() - 0.5) * 3;

                        opacities[j] = Math.max(0, 0.6 - (historyIdx / comet.history.length));
                    } else {
                        opacities[j] = 0;
                    }
                }
                comet.tail.geometry.attributes.position.needsUpdate = true;
                comet.tail.geometry.attributes.opacity.needsUpdate = true;
            }
        }

        // Update UFOs
        for (let i = this.ufos.length - 1; i >= 0; i--) {
            const ufo = this.ufos[i];
            ufo.life += 0.016;

            if (ufo.life >= ufo.maxLife) {
                this.scene.remove(ufo.mesh);
                this.ufos.splice(i, 1);
                continue;
            }

            // Move
            ufo.mesh.position.addScaledVector(ufo.direction, ufo.speed);

            // Bobbing effect
            ufo.mesh.position.y += Math.sin(time * 2 + ufo.hoverOffset) * 0.1;

            // Rotate Entire UFO slowly
            ufo.mesh.rotation.y += 0.02;

            // Scale pulsing for force field
            if (ufo.mesh.userData.forceField) {
                ufo.mesh.userData.forceField.rotation.y -= 0.05; // Counter rotate
                ufo.mesh.userData.forceField.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
            }

            // Lights Animation (Chase)
            if (ufo.lights) {
                ufo.lightTimer += 0.15; // Faster chase
                const activeIndex = Math.floor(ufo.lightTimer) % ufo.lights.length;

                ufo.lights.forEach((mat, idx) => {
                    if (idx === activeIndex) {
                        mat.emissive.setHex(0x00ffff); // Cyan Flash
                        mat.emissiveIntensity = 2;
                    } else {
                        mat.emissive.setHex(0xff0000); // Red dim
                        mat.emissiveIntensity = 0.3;
                    }
                });
            }
        }
    }



    createMarkers() {
        this.markerGroup = new THREE.Group();
        this.globe.add(this.markerGroup); // Attach to globe so they rotate with it

        this.cases.forEach(caseData => {
            this.addMarker(caseData);
        });
    }

    addMarker(caseData) {
        const position = this.latLngToVector3(
            caseData.coordinates.lat,
            caseData.coordinates.lng,
            100.8 // Just above surface
        );
        const normal = position.clone().normalize();
        const palette = this.getMarkerPalette(caseData);
        const geometries = this.getMarkerGeometries();

        const marker = new THREE.Group();
        marker.position.copy(position);
        marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        marker.userData = {
            ...caseData,
            isMarkerRoot: true,
            color: palette.base,
            palette,
            baseScale: this.getMarkerBaseScale(caseData),
            phase: this.getMarkerPhase(caseData),
            normal,
            parts: {}
        };

        const footprint = new THREE.Mesh(
            geometries.footprint,
            this.createMarkerMaterial(palette.base, 0.34)
        );
        footprint.position.z = 0.04;

        const pin = new THREE.Mesh(
            geometries.pin,
            this.createMarkerMaterial(palette.base, 0.56)
        );
        pin.position.z = 1.12;

        const outerRing = new THREE.Mesh(
            geometries.outerRing,
            this.createMarkerMaterial(palette.base, 0.52)
        );
        outerRing.position.z = 1.34;

        const innerRing = new THREE.Mesh(
            geometries.innerRing,
            this.createMarkerMaterial(palette.base, 0.74)
        );
        innerRing.position.z = 1.65;

        const core = new THREE.Mesh(
            geometries.core,
            new THREE.MeshBasicMaterial({
                color: palette.base,
                transparent: true,
                opacity: 0.96,
                depthWrite: false
            })
        );
        core.position.z = 2.12;

        if (!this.markerGlowTexture) {
            this.markerGlowTexture = this.generateGlowTexture();
        }

        const halo = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.markerGlowTexture,
            color: palette.base,
            transparent: true,
            opacity: 0.34,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        }));
        halo.position.z = 2.1;
        halo.scale.set(6.2, 6.2, 1);

        const needle = new THREE.Mesh(
            geometries.needle,
            this.createMarkerMaterial(palette.base, 0.76)
        );
        needle.position.z = 2.86;

        const hitTarget = new THREE.Mesh(
            geometries.hitTarget,
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                depthWrite: false
            })
        );
        hitTarget.position.z = 1.7;

        marker.userData.parts = { footprint, pin, outerRing, innerRing, core, halo, needle, hitTarget };
        [footprint, pin, outerRing, innerRing, core, halo, needle, hitTarget].forEach((part) => {
            part.userData.markerRoot = marker;
            part.userData.caseData = caseData;
            marker.add(part);
        });

        this.markerGroup.add(marker);
        this.markers.push(marker);
    }

    getMarkerPalette(caseData) {
        const year = Number(caseData.year ?? new Date(caseData.date).getFullYear());
        if (Number.isFinite(year) && year < 1940) {
            return { base: 0x00ffd4, selected: 0x44ff88 };
        }

        switch (Number(caseData.tier)) {
            case 1:
                return { base: 0xff33cc, selected: 0x44ff88 };
            case 2:
                return { base: 0xffd84a, selected: 0x44ff88 };
            case 3:
                return { base: 0x21b7ff, selected: 0x44ff88 };
            default:
                return { base: 0x21b7ff, selected: 0x44ff88 };
        }
    }

    getMarkerBaseScale(caseData) {
        const tier = Number(caseData.tier) || 3;
        const credibility = Number(caseData.credibility) || 50;
        const tierScale = tier <= 1 ? 1.2 : tier === 2 ? 1.08 : 0.96;
        const credibilityBoost = Math.max(0, Math.min(0.22, (credibility - 60) / 180));
        return tierScale + credibilityBoost;
    }

    getMarkerPhase(caseData) {
        const id = String(caseData.id || caseData.name || Math.random());
        let hash = 0;
        for (let i = 0; i < id.length; i += 1) {
            hash = ((hash << 5) - hash) + id.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash % 628) / 100;
    }

    getMarkerGeometries() {
        if (this.markerGeometries) return this.markerGeometries;

        const pin = new THREE.CylinderGeometry(0.05, 0.12, 2.1, 8, 1, true);
        pin.rotateX(Math.PI / 2);

        const needle = new THREE.ConeGeometry(0.18, 0.55, 14, 1, true);
        needle.rotateX(Math.PI / 2);

        this.markerGeometries = {
            core: new THREE.SphereGeometry(0.78, 18, 18),
            innerRing: new THREE.TorusGeometry(1.38, 0.035, 8, 48),
            outerRing: new THREE.TorusGeometry(2.08, 0.026, 8, 64),
            footprint: new THREE.RingGeometry(1.45, 2.42, 64),
            pin,
            needle,
            hitTarget: new THREE.SphereGeometry(3.1, 12, 12)
        };
        return this.markerGeometries;
    }

    createMarkerMaterial(color, opacity) {
        return new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
    }

    getMarkerRoot(object) {
        let current = object;
        while (current && !current.userData?.isMarkerRoot) {
            current = current.parent;
        }
        return current || object;
    }

    applyMarkerColor(marker, color) {
        const parts = marker?.userData?.parts;
        if (!parts) return;
        [parts.footprint, parts.pin, parts.outerRing, parts.innerRing, parts.core, parts.halo, parts.needle].forEach((part) => {
            if (part?.material?.color) part.material.color.setHex(color);
        });
    }

    // ============================================
    // MARKER HIGHLIGHTING
    // ============================================

    highlightMarker(marker) {
        if (!marker) return;

        // Reset previous selection first
        this.resetMarkerHighlight();

        // Store reference to selected marker
        this.selectedMarker = marker;

        marker.userData.isSelected = true;
        this.applyMarkerColor(marker, marker.userData.palette.selected);
    }

    resetMarkerHighlight() {
        if (!this.selectedMarker) return;

        const marker = this.selectedMarker;

        marker.userData.isSelected = false;
        this.applyMarkerColor(marker, marker.userData.color);

        this.selectedMarker = null;
    }

    clearSelection() {
        this.resetMarkerHighlight();
    }

    selectMarkerByCase(caseData) {
        // Find marker matching the case ID
        const marker = this.markers.find(m => m.userData.id === caseData.id);
        if (marker) {
            this.highlightMarker(marker);
        }
    }


    latLngToVector3(lat, lng, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    generateGlowTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    createLighting() {
        // Ambient light for overall scene illumination
        const ambient = new THREE.AmbientLight(0x112233, 0.5);
        this.scene.add(ambient);

        // Main sun light
        const directional = new THREE.DirectionalLight(0xffffff, 1.2);
        directional.position.set(200, 100, 150);
        this.scene.add(directional);

        // Hemisphere light for subtle sky/ground color gradient
        const hemiLight = new THREE.HemisphereLight(0x0066ff, 0x004422, 0.2);
        this.scene.add(hemiLight);

        // Rim light for holographic aesthetic
        const rimLight = new THREE.DirectionalLight(0x00ffd4, 0.5);
        rimLight.position.set(-200, 0, -100);
        this.scene.add(rimLight);
    }

    // ============================================
    // INTERACTION
    // ============================================

    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Intersect with markers
        const intersects = this.raycaster.intersectObjects(this.markers, true);

        if (intersects.length > 0) {
            // Pause auto-rotation when hovering
            // this.controls.autoRotate = false;

            const marker = this.getMarkerRoot(intersects[0].object);

            if (this.hoveredMarker !== marker) {
                if (this.hoveredMarker) {
                    this.hoveredMarker.userData.isHovered = false;
                    if (this.onMarkerLeave) this.onMarkerLeave();
                }

                this.hoveredMarker = marker;
                marker.userData.isHovered = true;
                this.container.style.cursor = 'pointer';

                if (this.onMarkerHover) {
                    this.onMarkerHover(marker.userData, event);
                }
            }
        } else {
            // Resume auto-rotation
            // this.controls.autoRotate = true;

            if (this.hoveredMarker) {
                this.hoveredMarker.userData.isHovered = false;
                this.hoveredMarker = null;
                this.container.style.cursor = 'crosshair';
                if (this.onMarkerLeave) this.onMarkerLeave();
            }
        }
    }

    onPointerDown(event) {
        if (event.pointerType === 'mouse' || event.isPrimary === false) return;
        this.pointerDownTime = Date.now();
        this.pointerDownPos.set(event.clientX, event.clientY);
        this.activePointerId = event.pointerId;
        this.isDragging = false;
    }

    onPointerUp(event) {
        if (event.pointerType === 'mouse' || event.isPrimary === false) return;
        if (this.activePointerId !== null && event.pointerId !== this.activePointerId) return;

        this.activePointerId = null;
        const upTime = Date.now();
        const duration = upTime - this.pointerDownTime;

        const dist = Math.sqrt(
            Math.pow(event.clientX - this.pointerDownPos.x, 2) +
            Math.pow(event.clientY - this.pointerDownPos.y, 2)
        );

        const isTap = duration < 500 && dist < 24;

        if (isTap) {
            const handled = this.handleTap(event, { expandedHit: true });
            if (handled) {
                this.suppressClickUntil = Date.now() + 700;
                event.preventDefault();
            }
        }
    }

    onTouchStart(event) {
        if (event.touches.length !== 1) return;
        const touch = event.touches[0];
        this.touchDownTime = Date.now();
        this.touchDownPos.set(touch.clientX, touch.clientY);
    }

    onTouchEnd(event) {
        if (Date.now() < this.suppressClickUntil) return;
        if (!event.changedTouches || event.changedTouches.length !== 1) return;

        const touch = event.changedTouches[0];
        const duration = Date.now() - this.touchDownTime;
        const dist = Math.sqrt(
            Math.pow(touch.clientX - this.touchDownPos.x, 2) +
            Math.pow(touch.clientY - this.touchDownPos.y, 2)
        );

        if (duration < 500 && dist < 24) {
            const handled = this.handleTap(event, { expandedHit: true });
            if (handled) {
                this.suppressClickUntil = Date.now() + 700;
                event.preventDefault();
            }
        }
    }

    getEventClientPoint(event) {
        // Handle touch events or mouse clicks
        let clientX = event.clientX;
        let clientY = event.clientY;

        // If it's a touch event, get coordinates from the first touch
        if (event.changedTouches && event.changedTouches.length > 0) {
            clientX = event.changedTouches[0].clientX;
            clientY = event.changedTouches[0].clientY;
        }

        return { clientX, clientY };
    }

    getMarkerAtClientPoint(clientX, clientY, options = {}) {
        const rect = this.container.getBoundingClientRect();

        this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.markers, true);

        if (intersects.length > 0) {
            return this.getMarkerRoot(intersects[0].object);
        }

        if (options.expandedHit) {
            return this.findNearestMarkerAtClientPoint(clientX, clientY, options.radius || this.touchHitRadius);
        }

        return null;
    }

    findNearestMarkerAtClientPoint(clientX, clientY, radiusPx) {
        if (!this.camera || !this.globe) return null;

        const rect = this.container.getBoundingClientRect();
        const cameraPosition = new THREE.Vector3();
        const globePosition = new THREE.Vector3();
        const markerPosition = new THREE.Vector3();
        const projected = new THREE.Vector3();

        this.camera.getWorldPosition(cameraPosition);
        this.globe.getWorldPosition(globePosition);

        let nearest = null;
        let nearestDistance = radiusPx;

        this.markers.forEach((marker) => {
            if (marker.visible === false) return;

            marker.getWorldPosition(markerPosition);
            const surfaceNormal = markerPosition.clone().sub(globePosition).normalize();
            const towardCamera = cameraPosition.clone().sub(markerPosition).normalize();
            if (surfaceNormal.dot(towardCamera) <= 0.06) return;

            projected.copy(markerPosition).project(this.camera);
            if (projected.z < -1 || projected.z > 1) return;

            const screenX = rect.left + ((projected.x + 1) / 2) * rect.width;
            const screenY = rect.top + ((1 - projected.y) / 2) * rect.height;
            const distance = Math.hypot(screenX - clientX, screenY - clientY);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearest = marker;
            }
        });

        return nearest;
    }

    handleTap(event, options = {}) {
        const { clientX, clientY } = this.getEventClientPoint(event);
        const marker = this.getMarkerAtClientPoint(clientX, clientY, options);
        if (!marker) return false;

        this.handleMarkerClick(marker);
        return true;
    }

    onClick(event) {
        if (Date.now() < this.suppressClickUntil) return;

        // If we have a hovered marker (mouse interaction), use it
        if (this.hoveredMarker) {
            this.handleMarkerClick(this.hoveredMarker);
            return;
        }

        this.handleTap(event, { expandedHit: false });
    }

    handleMarkerClick(marker) {
        marker = this.getMarkerRoot(marker);
        console.log('🔥 handleMarkerClick called with marker:', marker?.userData?.name || marker?.userData?.id);
        // Stop rotation on click to focus
        this.controls.autoRotate = false;

        // Highlight the clicked marker
        this.highlightMarker(marker);
        this.playMarkerAcquisition(marker);

        if (this.onMarkerClick) {
            console.log('🔥 Calling onMarkerClick callback...');
            this.onMarkerClick(marker.userData);
        } else {
            console.warn('⚠️ onMarkerClick callback is not set!');
        }
    }

    playMarkerAcquisition(marker) {
        if (!marker || !this.camera || !this.renderer) return;

        const worldPosition = new THREE.Vector3();
        marker.getWorldPosition(worldPosition);
        const projected = worldPosition.clone().project(this.camera);
        const rect = this.renderer.domElement.getBoundingClientRect();
        const x = rect.left + ((projected.x + 1) / 2) * rect.width;
        const y = rect.top + ((-projected.y + 1) / 2) * rect.height;

        const reticle = document.createElement('div');
        reticle.className = 'figma-acquisition-reticle';
        reticle.style.left = `${x}px`;
        reticle.style.top = `${y}px`;

        const label = document.createElement('div');
        label.className = 'figma-acquisition-label';
        label.textContent = 'TARGET LOCK';
        reticle.appendChild(label);

        document.body.appendChild(reticle);
        window.setTimeout(() => reticle.remove(), 1250);
    }

    // ============================================
    // CONTROLS
    // ============================================

    focusOnLocation(lat, lng, duration = 1500) {
        // With OrbitControls, we rotate the CAMERA to look at the point,
        // or we rotate the globe. 
        // Standard OrbitControls orbits around target (0,0,0).
        // So we need to move the camera to the correct spherical coordinate.

        // Stop auto rotation
        this.controls.autoRotate = false;

        // Calculate camera position
        const radius = 300; // Viewing distance
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        const targetX = -radius * Math.sin(phi) * Math.cos(theta);
        const targetY = radius * Math.cos(phi);
        const targetZ = radius * Math.sin(phi) * Math.sin(theta);

        // Animate camera
        const startPos = this.camera.position.clone();
        const targetPos = new THREE.Vector3(targetX, targetY, targetZ);

        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out

            this.camera.position.lerpVectors(startPos, targetPos, eased);
            this.camera.lookAt(0, 0, 0);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Update controls to match new position so it doesn't snap back
                this.controls.update();
            }
        };

        animate();
    }

    zoomIn() {
        // OrbitControls handles zoom, but we can programmatically dolly in
        const currentDist = this.camera.position.length();
        const targetDist = Math.max(this.controls.minDistance, currentDist - 50);
        const factor = targetDist / currentDist;

        this.camera.position.multiplyScalar(factor);
        this.controls.update();
    }

    zoomOut() {
        const currentDist = this.camera.position.length();
        const targetDist = Math.min(this.controls.maxDistance, currentDist + 50);
        const factor = targetDist / currentDist;

        this.camera.position.multiplyScalar(factor);
        this.controls.update();
    }

    toggleRotation() {
        this.controls.autoRotate = !this.controls.autoRotate;
        return this.controls.autoRotate;
    }

    resetView() {
        this.controls.reset();
        this.controls.autoRotate = true;
    }

    // ============================================
    // ANIMATION
    // ============================================

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();

        this.controls.update();

        // Starfield slow rotation & twinkling
        if (this.starfield) {
            this.starfield.rotation.y += 0.0001;
            this.starfield.rotation.x += 0.00005;

            // Update time uniform for twinkling
            if (this.starfield.material.uniforms) {
                this.starfield.material.uniforms.time.value = time;
            }
        }

        // Scan ring rotation
        if (this.scanRing) {
            this.scanRing.rotation.z += 0.002;
            // Also oscillate opacity
            this.scanRing.material.opacity = 0.15 + Math.sin(time) * 0.05;
        }

        // Update space animations (shooting stars, meteors, comets, UFOs)
        this.updateSpaceAnimations(time);

        // Marker animations - dynamic scaling based on zoom
        const cameraDist = this.camera.position.length();
        // Base scale factor logic:
        // Dist ~400 (far) -> Scale 1.2
        // Dist ~120 (close) -> Scale 0.4
        let distFactor = (cameraDist - 100) / 200;
        distFactor = Math.max(0.3, Math.min(1.2, distFactor)); // Clamp scale

        this.markers.forEach((marker) => {
            if (!marker.visible) return;

            const parts = marker.userData.parts || {};
            const phase = marker.userData.phase || 0;
            const selected = marker === this.selectedMarker;
            const hovered = marker === this.hoveredMarker;
            const signal = (Math.sin(time * 2.6 + phase) + 1) / 2;
            const pulse = 1 + Math.sin(time * 2.1 + phase) * 0.08;
            const stateBoost = selected ? 1.82 : hovered ? 1.38 : pulse;
            marker.scale.setScalar(distFactor * marker.userData.baseScale * stateBoost);

            if (parts.innerRing) parts.innerRing.rotation.z += selected ? 0.045 : 0.018;
            if (parts.outerRing) parts.outerRing.rotation.z -= hovered || selected ? 0.032 : 0.011;

            if (parts.core) {
                parts.core.scale.setScalar(1 + signal * (selected ? 0.22 : 0.1));
                parts.core.material.opacity = selected ? 1 : hovered ? 0.98 : 0.86 + signal * 0.12;
            }

            if (parts.halo) {
                const haloScale = selected ? 9.8 + signal * 2.0 : hovered ? 8.2 + signal * 1.1 : 5.8 + signal * 1.0;
                parts.halo.scale.set(haloScale, haloScale, 1);
                parts.halo.material.opacity = selected ? 0.72 : hovered ? 0.52 : 0.24 + signal * 0.18;
            }

            if (parts.footprint) {
                parts.footprint.material.opacity = selected ? 0.64 : hovered ? 0.48 : 0.2 + signal * 0.12;
            }

            if (parts.innerRing) {
                parts.innerRing.material.opacity = selected ? 0.94 : hovered ? 0.76 : 0.48 + signal * 0.2;
            }

            if (parts.outerRing) {
                parts.outerRing.material.opacity = selected ? 0.82 : hovered ? 0.62 : 0.3 + signal * 0.18;
            }

            if (parts.pin) parts.pin.material.opacity = selected ? 0.78 : hovered ? 0.66 : 0.38 + signal * 0.16;
            if (parts.needle) parts.needle.material.opacity = selected ? 0.92 : hovered ? 0.78 : 0.46 + signal * 0.2;
        });

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // ============================================
    // UTILITY
    // ============================================

    updateCases(cases) {
        // Clear existing markers
        this.markers.forEach(marker => {
            this.markerGroup.remove(marker);
        });
        this.markers = [];

        // Add new markers
        this.cases = cases;
        cases.forEach(caseData => {
            this.addMarker(caseData);
        });
    }

    updateVisibleMarkers(filteredCases) {
        // Create a Set of IDs for O(1) lookup
        const visibleIds = new Set(filteredCases.map(c => c.id));

        this.markers.forEach(marker => {
            // userData.id matches case.id
            marker.visible = visibleIds.has(marker.userData.id);
        });
    }

    destroy() {
        window.removeEventListener('resize', this.onResize);
        this.renderer.dispose();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HolographicGlobe };
}
