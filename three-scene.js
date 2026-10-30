import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// ==========================================
// 1. SCENE SETUP
// ==========================================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.FogExp2(0x050505, 0.05);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// ==========================================
// 2. LIGHTING
// ==========================================
const lampLight = new THREE.SpotLight(0xffcc88, 0); // Starts off for flicker
lampLight.position.set(0, 4, 1);
lampLight.angle = Math.PI / 3;
lampLight.penumbra = 0.8;
lampLight.castShadow = true;
scene.add(lampLight);

const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0x000000 }));
bulb.position.copy(lampLight.position);
scene.add(bulb);

scene.add(new THREE.AmbientLight(0x221100, 0.1));

// Rim fills — make folders pop off the wood without blowing out the mood
const rimCool = new THREE.DirectionalLight(0x88aaff, 0.35);
rimCool.position.set(-4, 1.5, -5);
scene.add(rimCool);

const rimWarm = new THREE.DirectionalLight(0xff9955, 0.28);
rimWarm.position.set(4, 2, -4);
scene.add(rimWarm);

// ==========================================
// 3. PROPS (Desk & Eyes)
// ==========================================
// Procedural Wood Desk
const canvasWood = document.createElement('canvas');
canvasWood.width = 512; canvasWood.height = 512;
const ctx = canvasWood.getContext('2d');
ctx.fillStyle = '#2a1a10'; ctx.fillRect(0, 0, 512, 512);
for(let i=0; i<1000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
    ctx.fillRect(Math.random() * 512, 0, Math.random() * 4, 512);
}
const desk = new THREE.Mesh(
    new THREE.BoxGeometry(12, 0.2, 10),
    new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(canvasWood), roughness: 0.7 })
);
desk.position.y = -0.1;
desk.receiveShadow = true;
scene.add(desk);

// The Archivist's Eyes
const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
const eyeGeo = new THREE.SphereGeometry(0.04, 16, 16);
const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.15, 1.5, -4);
rightEye.position.set(0.15, 1.5, -4);
scene.add(leftEye, rightEye);

// ==========================================
// 3b. VOLUMETRIC LAMP CONE  (purely cosmetic)
// ==========================================
const lampPos = new THREE.Vector3(0, 4, 1);
const lightTarget = new THREE.Vector3(0, 0, 0);
const coneHeight = lampPos.distanceTo(lightTarget);
const coneGeo = new THREE.CylinderGeometry(0.08, 2.2, coneHeight, 32, 1, true);

const coneMat = new THREE.ShaderMaterial({
    uniforms: {
        uColor:    { value: new THREE.Color(0xffcc88) },
        uOpacity:  { value: 0.0 },         // ramped up by the flicker sequence
        uTime:     { value: 0.0 }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
            vUv = uv;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
        }
    `,
    fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
            // vertical fade: brighter near lamp (uv.y = 1), fades toward desk
            float vertical = smoothstep(0.0, 0.12, vUv.y) * (0.55 + 0.45 * vUv.y);
            // soft silhouette edge
            float rim = 1.0 - abs(dot(vNormal, vViewDir));
            float edge = 1.0 - rim * rim;
            // barely-there shimmer
            float shimmer = 0.92 + 0.08 * sin(uTime * 1.7 + vUv.y * 9.0);
            float a = uOpacity * vertical * edge * shimmer;
            gl_FragColor = vec4(uColor, a);
        }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: false
});

const lampCone = new THREE.Mesh(coneGeo, coneMat);
lampCone.raycast = () => {}; // no-op raycast, cosmetic only
{
    const mid = lampPos.clone().add(lightTarget).multiplyScalar(0.5);
    const dir = lightTarget.clone().sub(lampPos).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().negate()
    );
    lampCone.position.copy(mid);
    lampCone.quaternion.copy(q);
}
scene.add(lampCone);

// ==========================================
// 3c. DUST PARTICLES
// ==========================================
const dust = (() => {
    const COUNT = 380;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const phases    = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 13;
        positions[i * 3 + 1] = Math.random() * 4.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
        phases[i] = Math.random() * Math.PI * 2;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('phase',    new THREE.BufferAttribute(phases, 1));

    // soft radial sprite
    const dc = document.createElement('canvas');
    dc.width = 64; dc.height = 64;
    const dctx = dc.getContext('2d');
    const g = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0.0, 'rgba(255,225,180,1)');
    g.addColorStop(0.4, 'rgba(255,205,150,0.55)');
    g.addColorStop(1.0, 'rgba(255,190,130,0)');
    dctx.fillStyle = g;
    dctx.fillRect(0, 0, 64, 64);
    const dustTex = new THREE.CanvasTexture(dc);

    const mat = new THREE.PointsMaterial({
        size: 0.055,
        map: dustTex,
        color: 0xffd7a0,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        fog: true
    });

    const pts = new THREE.Points(geo, mat);
    pts.raycast = () => {};       // never intercept clicks
    pts.frustumCulled = false;
    scene.add(pts);
    return { pts, geo, phases, COUNT };
})();

function updateDust(t) {
    const arr = dust.geo.attributes.position.array;
    const ph = dust.geo.attributes.phase.array;
    for (let i = 0; i < dust.COUNT; i++) {
        const i3 = i * 3;
        arr[i3 + 0] += Math.sin(t * 0.35 + ph[i]) * 0.0025;
        arr[i3 + 1] += 0.0032 + Math.sin(t * 0.9 + ph[i]) * 0.0006;
        arr[i3 + 2] += Math.cos(t * 0.28 + ph[i]) * 0.0022;
        if (arr[i3 + 1] > 4.8) arr[i3 + 1] = 0.05;
    }
    dust.geo.attributes.position.needsUpdate = true;
}

// ==========================================
// 4. POST-PROCESSING
// ==========================================
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
));

// Film grain + vignette
const GrainVignetteShader = {
    uniforms: {
        tDiffuse:  { value: null },
        uTime:     { value: 0 },
        uGrain:    { value: 0.075 },
        uVignette: { value: 0.75 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uGrain;
        uniform float uVignette;
        varying vec2 vUv;

        float rand(vec2 co) {
            return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            vec4 color = texture2D(tDiffuse, vUv);

            // film grain — luminance-weighted so shadows stay clean
            float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            float grain = rand(vUv * vec2(1920.0, 1080.0) + uTime * 60.0) - 0.5;
            color.rgb += grain * uGrain * (0.35 + lum);

            // vignette
            vec2 uv = vUv - 0.5;
            float d = length(uv * vec2(1.05, 1.0));
            float vig = smoothstep(0.38, 0.85, d);
            color.rgb *= 1.0 - vig * uVignette * 0.65;

            gl_FragColor = color;
        }
    `
};
const grainPass = new ShaderPass(GrainVignetteShader);
composer.addPass(grainPass);

composer.addPass(new OutputPass());

// ==========================================
// 5. CAMERA CHOREOGRAPHY (unchanged targets, new spring physics)
// ==========================================
let targetCameraPos = new THREE.Vector3(0, 2, 6);
let targetLookAt = new THREE.Vector3(0, 1, -4);
const currentLookAt = new THREE.Vector3(0, 1, -4);

let isTableMode = false;
let isCameraAtTable = false;
let panX = 0;
let panZ = 0;
let panBounds = { minX: -2, maxX: 2, minZ: -2, maxZ: 2 };

// --- SPRING STATE ---
const cameraVelocity = new THREE.Vector3();
const lookVelocity   = new THREE.Vector3();
const SPRING_K = 12.0;   // stiffness
const SPRING_C = 6.0;    // damping (~0.87 damping ratio: slight, cinematic overshoot)
const _springDisp = new THREE.Vector3();
const _springAccel = new THREE.Vector3();

function springStep(current, target, velocity, dt) {
    // a = -k*(x - target) - c*v
    _springDisp.copy(current).sub(target);
    _springAccel.copy(_springDisp).multiplyScalar(-SPRING_K).addScaledVector(velocity, -SPRING_C);
    velocity.addScaledVector(_springAccel, dt);
    current.addScaledVector(velocity, dt);
}

const CAM_STATES = {
    INTRO_LIGHT: { pos: new THREE.Vector3(0, 2, 6), look: new THREE.Vector3(0, 0, 0) },
    INTRO_DOWN:  { pos: new THREE.Vector3(0, 4, 3), look: new THREE.Vector3(0, 0, 0) },
    INTRO_UP:    { pos: new THREE.Vector3(0, 2, 5), look: new THREE.Vector3(0, 1.5, -4) },
    TABLE_SELECT:{ pos: new THREE.Vector3(0, 7, 0.1), look: new THREE.Vector3(0, 0, 0) }
};

function setCameraState(stateName) {
    const state = CAM_STATES[stateName];
    if (state) {
        targetCameraPos.copy(state.pos);
        targetLookAt.copy(state.look);
        isTableMode = (stateName === 'TABLE_SELECT');
        if (isTableMode) {
            panX = 0;
            panZ = 0;
        }
    }
}

// ==========================================
// 6. FOLDER GENERATION  (unchanged)
// ==========================================
const foldersGroup = new THREE.Group();
scene.add(foldersGroup);
let currentFolders = [];
let activeFolder = null;

function createFolderTexture(name) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#d4c3a3';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#c4b08a';
    ctx.fillRect(50, 0, 200, 60);

    ctx.fillStyle = '#221100';
    ctx.font = 'bold 36px "Special Elite", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let words = name.split(' ');
    let line = '';
    let y = 200;

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > 400 && n > 0) {
            ctx.fillText(line, 256, y);
            line = words[n] + ' ';
            y += 50;
        } else { line = testLine; }
    }
    ctx.fillText(line, 256, y);

    ctx.fillStyle = 'rgba(200,30,30,0.7)';
    ctx.strokeStyle = 'rgba(200,30,30,0.7)';
    ctx.lineWidth = 6;
    ctx.strokeRect(340, 400, 140, 50);
    ctx.font = 'bold 24px "Special Elite", monospace';
    ctx.fillText("TOP SECRET", 410, 425);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

function create3DFolder(charData, x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0.02, z);
    group.rotation.x = -Math.PI / 2;
    group.userData = charData;

    const back = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.6, 0.02),
        new THREE.MeshStandardMaterial({ color: 0xcbb58d, roughness: 0.9 })
    );
    back.receiveShadow = true; back.castShadow = true;
    group.add(back);

    const paper = new THREE.Mesh(
        new THREE.PlaneGeometry(1.1, 1.5),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
    );
    paper.position.z = 0.011;
    group.add(paper);

    const frontGroup = new THREE.Group();
    frontGroup.position.set(-0.6, 0, 0.02);
    group.add(frontGroup);

    const front = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.6, 0.02),
        new THREE.MeshStandardMaterial({ map: createFolderTexture(charData.name), roughness: 0.9 })
    );
    front.position.x = 0.6;
    front.castShadow = true;
    front.userData.isFolderFront = true;
    front.userData.parentGroup = group;
    frontGroup.add(front);

    group.userData.frontGroup = frontGroup;
    group.userData.isOpen = false;

    return group;
}

window.spawn3DFolders = (charactersList) => {
    currentFolders.forEach(f => foldersGroup.remove(f));
    currentFolders = [];
    activeFolder = null;

    const cols = Math.ceil(Math.sqrt(charactersList.length));
    const spacing = 1.8;
    const startX = -((cols - 1) * spacing) / 2;
    const startZ = -((Math.ceil(charactersList.length / cols) - 1) * spacing) / 2;

    charactersList.forEach((char, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const f = create3DFolder(char, startX + col * spacing, startZ + row * spacing);
        foldersGroup.add(f);
        currentFolders.push(f);
    });

    panBounds = {
        minX: startX - 1,
        maxX: startX + (cols - 1) * spacing + 1,
        minZ: startZ - 1,
        maxZ: startZ + (Math.ceil(charactersList.length / cols) - 1) * spacing + 1
    };

    setCameraState('TABLE_SELECT');
    document.getElementById('switchSideBtn').style.display = 'block';
};

window.closeActiveFolder = () => {
    if (!activeFolder) return;
    let progress = 0;
    const animateClose = () => {
        progress += 0.05;
        if (progress <= 1) {
            activeFolder.userData.frontGroup.rotation.y = -Math.PI * (1 - (progress * progress * (3 - 2 * progress)));
            requestAnimationFrame(animateClose);
        } else {
            activeFolder.userData.isOpen = false;
            activeFolder = null;
        }
    };
    animateClose();
    setCameraState('TABLE_SELECT');
};

// ==========================================
// 7. INTERACTION  (unchanged)
// ==========================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {

    if (!isCameraAtTable || activeFolder) return;
    if (document.getElementById('filePanel').classList.contains('active') || document.getElementById('dialogueOverlay').classList.contains('active')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(currentFolders, true);

    if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit && !hit.userData.isFolderFront && hit.parent) hit = hit.parent;

        if (hit && hit.userData.isFolderFront && !hit.userData.parentGroup.userData.isOpen) {
            activeFolder = hit.userData.parentGroup;
            activeFolder.userData.isOpen = true;
            isTableMode = false;

            const fPos = new THREE.Vector3();
            activeFolder.getWorldPosition(fPos);
            targetCameraPos.set(fPos.x, fPos.y + 2, fPos.z + 2);
            targetLookAt.copy(fPos);

            let progress = 0;
            const animateOpen = () => {
                progress += 0.05;
                if (progress <= 1) {
                    activeFolder.userData.frontGroup.rotation.y = -Math.PI * (progress * progress * (3 - 2 * progress));
                    requestAnimationFrame(animateOpen);
                } else {
                    if (window.openDossierFrom3D) window.openDossierFrom3D(activeFolder.userData);
                }
            };
            setTimeout(animateOpen, 400);
        }
    }
});

window.addEventListener('wheel', (event) => {
    if (!isTableMode) return;
    panZ += event.deltaY * 0.003;
    panX += event.deltaX * 0.003;
    panX = Math.max(panBounds.minX, Math.min(panBounds.maxX, panX));
    panZ = Math.max(panBounds.minZ, Math.min(panBounds.maxZ, panZ));
}, { passive: false });

// ==========================================
// 8. ANIMATION LOOP
// ==========================================
let time = 0;
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    time += 0.05;

    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    if (isTableMode) {
        targetCameraPos.x = panX;
        targetCameraPos.z = 0.1 + panZ;
        targetLookAt.x = panX;
        targetLookAt.z = panZ;
    }

    // Spring-weighted camera — replaces the frame-rate-dependent lerp
    springStep(camera.position, targetCameraPos, cameraVelocity, dt);
    springStep(currentLookAt, targetLookAt, lookVelocity, dt);
    camera.lookAt(currentLookAt);

    isCameraAtTable = isTableMode && camera.position.distanceTo(targetCameraPos) < 0.15;

    // Blink
    const blink = Math.sin(time * 0.5) > 0.98 ? 0.1 : 1;
    leftEye.scale.y = blink; rightEye.scale.y = blink;

    // Dust drift
    updateDust(elapsed);

    // Cone shimmer
    coneMat.uniforms.uTime.value = elapsed;

    // Grain time
    grainPass.uniforms.uTime.value = elapsed;

    composer.render();
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// 9. INTRO SEQUENCE
// ==========================================
setTimeout(() => {
    setCameraState('INTRO_LIGHT');
    let flickers = 0;

    const flicker = setInterval(() => {
        if (flickers > 12) {
            clearInterval(flicker);
            lampLight.intensity = 100;
            bulb.material.color.setHex(0xffcc88);
            // fade the volumetric cone in alongside the bulb
            coneMat.uniforms.uOpacity.value = 0.09;

            setTimeout(() => {
                setCameraState('INTRO_DOWN');
                setTimeout(() => {
                    setCameraState('INTRO_UP');
                    setTimeout(() => {
                        if (window.startIntroDialogue) window.startIntroDialogue();
                    }, 1200);
                }, 1500);
            }, 500);
            return;
        }
        lampLight.intensity = Math.random() > 0.4 ? 100 : 0;
        bulb.material.color.setHex(lampLight.intensity > 0 ? 0xffcc88 : 0x000000);
        // cone flickers in sync
        coneMat.uniforms.uOpacity.value = lampLight.intensity > 0 ? 0.09 : 0.0;
        flickers++;
    }, 100);
}, 500);
