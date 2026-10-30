import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ==========================================
// SHARED FOLDER MATERIALS (generated once)
// ==========================================
const folderMaterials = (() => {
    // Shared paper-grain canvas for the covers (per-folder, but procedural base)
    function makeGrainCanvas(baseHex, grainStrength, foldLineY) {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 512;
        const ctx = c.getContext('2d');
        ctx.fillStyle = baseHex;
        ctx.fillRect(0, 0, 512, 512);

        // Fine fiber noise
        const img = ctx.getImageData(0, 0, 512, 512);
        for (let i = 0; i < img.data.length; i += 4) {
            const n = (Math.random() - 0.5) * grainStrength;
            img.data[i]   = Math.max(0, Math.min(255, img.data[i]   + n));
            img.data[i+1] = Math.max(0, Math.min(255, img.data[i+1] + n * 0.85));
            img.data[i+2] = Math.max(0, Math.min(255, img.data[i+2] + n * 0.6));
        }
        ctx.putImageData(img, 0, 0);

        // Horizontal fold line (very faint)
        if (foldLineY !== null) {
            ctx.strokeStyle = 'rgba(120, 90, 50, 0.06)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, foldLineY);
            ctx.lineTo(512, foldLineY);
            ctx.stroke();
        }
        return c;
    }

    const backGrainCanvas  = makeGrainCanvas('#cbb58d', 12, null);
    const frontGrainCanvas = makeGrainCanvas('#d4c3a3', 12, 340);

    const backTex  = new THREE.CanvasTexture(backGrainCanvas);
    const frontTex = new THREE.CanvasTexture(frontGrainCanvas);
    backTex.colorSpace  = THREE.SRGBColorSpace;
    frontTex.colorSpace = THREE.SRGBColorSpace;
    [backTex, frontTex].forEach(t => {
        t.anisotropy = 4;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
    });

    // Paper stack materials — 4 slightly varied cream tones
    const sheetColors = [0xf6f1e1, 0xefe6ce, 0xf2ead6, 0xe9dfc6];
    const sheetMats = sheetColors.map(col => new THREE.MeshPhysicalMaterial({
        color: col,
        roughness: 0.92,
        metalness: 0.0,
        transmission: 0.02,   // barely there, only meaningful once env map is added
        thickness: 0.3,
        clearcoat: 0.0,
        sheen: 0.15,
        sheenColor: new THREE.Color(0xfff4dd)
    }));

    const backMat = new THREE.MeshStandardMaterial({
        map: backTex,
        roughness: 0.88,
        metalness: 0.0
    });

    const tabMat = new THREE.MeshStandardMaterial({
        color: 0xc9b791,
        roughness: 0.9,
        metalness: 0.0
    });

    return { frontGrainCanvas, backMat, tabMat, sheetMats };
})();

// ==========================================
// 1. SCENE SETUP
// ==========================================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.FogExp2(0x050505, 0.05);

// Wider cinematic lens — the lamp would otherwise sit outside all camera frusta
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
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
const LAMP_POS = new THREE.Vector3(0, 3, -2.5);

const lampLight = new THREE.SpotLight(0xffcc88, 0); // Starts off for flicker
lampLight.position.copy(LAMP_POS);
lampLight.angle = Math.PI / 3;
lampLight.penumbra = 0.8;
lampLight.castShadow = true;
scene.add(lampLight);

const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0x000000 }));
bulb.position.copy(LAMP_POS);
bulb.scale.setScalar(1.4);
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
// 2b. LAMP MODEL — shade, brass cord, brass ring
// ==========================================
const lampGroup = new THREE.Group();
lampGroup.position.copy(LAMP_POS);
scene.add(lampGroup);

// Dark metal exterior + inner glow via DoubleSide
const shadeHeight = 0.55;
const shadeGeo = new THREE.CylinderGeometry(0.08, 0.55, shadeHeight, 40, 1, true);
const shadeMat = new THREE.MeshStandardMaterial({
    color: 0x1a1512,
    metalness: 0.85,
    roughness: 0.45,
    side: THREE.DoubleSide,
    envMapIntensity: 1.2
});
const shade = new THREE.Mesh(shadeGeo, shadeMat);
shade.position.y = -0.05;
shade.castShadow = true;
lampGroup.add(shade);

// Brass ring (decorative collar on top of the shade)
const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9a7a3a,
    metalness: 0.95,
    roughness: 0.32
});
const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 10, 24), brassMat);
ring.position.y = 0.24;
ring.rotation.x = Math.PI / 2;
lampGroup.add(ring);

// Brass cord / suspension rod — hangs upward into darkness
const cordLen = 4;
const cord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, cordLen, 8),
    brassMat
);
cord.position.y = 0.24 + cordLen / 2;
lampGroup.add(cord);

// ==========================================
// 3. PROPS (Desk & Eyes)
// ==========================================
// Procedural Wood Desk — now with beveled edges
const canvasWood = document.createElement('canvas');
canvasWood.width = 512; canvasWood.height = 512;
const ctx = canvasWood.getContext('2d');
ctx.fillStyle = '#2a1a10'; ctx.fillRect(0, 0, 512, 512);
for(let i=0; i<1000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
    ctx.fillRect(Math.random() * 512, 0, Math.random() * 4, 512);
}
const desk = new THREE.Mesh(
    new RoundedBoxGeometry(12, 0.2, 10, 4, 0.03),
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
const lightTarget = new THREE.Vector3(0, 0, 0);
const coneHeight = LAMP_POS.distanceTo(lightTarget);
const coneGeo = new THREE.CylinderGeometry(0.45, 2.2, coneHeight, 32, 1, true);

const coneMat = new THREE.ShaderMaterial({
    uniforms: {
        uColor:    { value: new THREE.Color(0xffcc88) },
        uOpacity:  { value: 0.0 },
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
            float vertical = smoothstep(0.0, 0.12, vUv.y) * (0.55 + 0.45 * vUv.y);
            float rim = 1.0 - abs(dot(vNormal, vViewDir));
            float edge = 1.0 - rim * rim;
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
lampCone.raycast = () => {};
{
    const mid = LAMP_POS.clone().add(lightTarget).multiplyScalar(0.5);
    const dir = lightTarget.clone().sub(LAMP_POS).normalize();
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
    pts.raycast = () => {};
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
            float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            float grain = rand(vUv * vec2(1920.0, 1080.0) + uTime * 60.0) - 0.5;
            color.rgb += grain * uGrain * (0.35 + lum);
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
// 5. CAMERA CHOREOGRAPHY (unchanged targets, spring physics)
// ==========================================
let targetCameraPos = new THREE.Vector3(0, 2, 6);
let targetLookAt = new THREE.Vector3(0, 1, -4);
const currentLookAt = new THREE.Vector3(0, 1, -4);

let isTableMode = false;
let isCameraAtTable = false;
let panX = 0;
let panZ = 0;
let panBounds = { minX: -2, maxX: 2, minZ: -2, maxZ: 2 };

const cameraVelocity = new THREE.Vector3();
const lookVelocity   = new THREE.Vector3();
const SPRING_K = 12.0;
const SPRING_C = 6.0;
const _springDisp = new THREE.Vector3();
const _springAccel = new THREE.Vector3();

function springStep(current, target, velocity, dt) {
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
        if (isTableMode) { panX = 0; panZ = 0; }
    }
}

// ==========================================
// 6. FOLDER GENERATION
// ==========================================
const foldersGroup = new THREE.Group();
scene.add(foldersGroup);
let currentFolders = [];
let activeFolder = null;

function createFolderTexture(name) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    const ctx = c.getContext('2d');

    // Start from the shared grain canvas (copy it in)
    ctx.drawImage(folderMaterials.frontGrainCanvas, 0, 0);

    // Name (wrapped)
    ctx.fillStyle = '#221100';
    ctx.font = 'bold 36px "Special Elite", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let words = name.split(' ');
    let line = '';
    let y = 230;

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > 400 && n > 0) {
            ctx.fillText(line, 256, y);
            line = words[n] + ' ';
            y += 50;
        } else { line = testLine; }
    }
    ctx.fillText(line, 256, y);

    // TOP SECRET stamp
    ctx.fillStyle = 'rgba(200,30,30,0.7)';
    ctx.strokeStyle = 'rgba(200,30,30,0.7)';
    ctx.lineWidth = 6;
    ctx.strokeRect(340, 400, 140, 50);
    ctx.font = 'bold 24px "Special Elite", monospace';
    ctx.fillText("TOP SECRET", 410, 425);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
}

function create3DFolder(charData, x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0.02, z);
    group.rotation.x = -Math.PI / 2;
    group.userData = charData;

    // ---------- BACK COVER ----------
    const back = new THREE.Mesh(
        new RoundedBoxGeometry(1.2, 1.6, 0.025, 4, 0.008),
        folderMaterials.backMat
    );
    back.receiveShadow = true;
    back.castShadow = true;
    group.add(back);

    // ---------- PAPER STACK (4 sheets, visible edges) ----------
    // Sits between back top (z ≈ 0.0125) and front bottom (z ≈ 0.03)
    for (let i = 0; i < 4; i++) {
        const sheet = new THREE.Mesh(
            new RoundedBoxGeometry(1.08, 1.48, 0.003, 2, 0.002),
            folderMaterials.sheetMats[i]
        );
        sheet.position.set(
            (Math.random() - 0.5) * 0.018,
            (Math.random() - 0.5) * 0.018,
            0.014 + i * 0.0045
        );
        sheet.rotation.z = (Math.random() - 0.5) * 0.018;
        sheet.castShadow = true;
        sheet.receiveShadow = true;
        group.add(sheet);
    }

    // ---------- FRONT COVER (hinged) ----------
    const frontGroup = new THREE.Group();
    frontGroup.position.set(-0.6, 0, 0.0425); // lift so sheets fit underneath
    group.add(frontGroup);

    const frontGeo = new RoundedBoxGeometry(1.2, 1.6, 0.025, 6, 0.008);
    {
        // Subtle bend along Y (top-to-bottom) — stronger than Pass 1, still safe
        const pos = frontGeo.attributes.position;
        const bendAmount = 0.022;
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const t = y / 0.8;
            pos.setZ(i, z + (1 - t * t) * bendAmount);
        }
        frontGeo.computeVertexNormals();
    }

    const front = new THREE.Mesh(
        frontGeo,
        new THREE.MeshStandardMaterial({
            map: createFolderTexture(charData.name),
            roughness: 0.85,
            metalness: 0.0
        })
    );
    front.position.set(0.6, 0, 0);
    front.castShadow = true;
    front.userData.isFolderFront = true;
    front.userData.parentGroup = group;
    frontGroup.add(front);

    // ---------- TAB (real protruding tab with label) ----------
    const tab = new THREE.Mesh(
        new RoundedBoxGeometry(0.52, 0.18, 0.03, 3, 0.012),
        folderMaterials.tabMat
    );
    tab.position.set(-0.28, 0.86, 0); // half in the cover, half protruding above edge
    tab.castShadow = true;
    front.add(tab);

    // Tab label — short abbreviated name
    const shortLabel = charData.name.split(' ')[0].slice(0, 10);
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256; labelCanvas.height = 96;
    const lctx = labelCanvas.getContext('2d');
    lctx.fillStyle = '#c9b791';
    lctx.fillRect(0, 0, 256, 96);
    lctx.fillStyle = '#221100';
    lctx.font = 'bold 40px "Special Elite", monospace';
    lctx.textAlign = 'center';
    lctx.textBaseline = 'middle';
    lctx.fillText(shortLabel, 128, 48);
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;

    const tabLabel = new THREE.Mesh(
        new THREE.PlaneGeometry(0.46, 0.14),
        new THREE.MeshBasicMaterial({ map: labelTex })
    );
    tabLabel.position.set(0, 0, 0.016); // just above tab top face
    tab.add(tabLabel);

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
// 7. INTERACTION (unchanged)
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

    springStep(camera.position, targetCameraPos, cameraVelocity, dt);
    springStep(currentLookAt, targetLookAt, lookVelocity, dt);
    camera.lookAt(currentLookAt);

    isCameraAtTable = isTableMode && camera.position.distanceTo(targetCameraPos) < 0.15;

    const blink = Math.sin(time * 0.5) > 0.98 ? 0.1 : 1;
    leftEye.scale.y = blink; rightEye.scale.y = blink;

    updateDust(elapsed);

    coneMat.uniforms.uTime.value = elapsed;
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
        coneMat.uniforms.uOpacity.value = lampLight.intensity > 0 ? 0.09 : 0.0;
        flickers++;
    }, 100);
}, 500);
