import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ==========================================
// 1. SCENE SETUP
// ==========================================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.FogExp2(0x050505, 0.05);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5.5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.55;

// ==========================================
// 2. LIGHTING
// ==========================================
const LAMP_POS = new THREE.Vector3(0, 3, -1);

const lampLight = new THREE.SpotLight(0xffcc88, 0);
lampLight.position.copy(LAMP_POS);
lampLight.angle = Math.PI / 3;
lampLight.penumbra = 0.8;
lampLight.castShadow = true;
lampLight.distance = 12;
lampLight.decay = 2.2;
scene.add(lampLight);

const lampTarget = new THREE.Object3D();
lampTarget.position.set(0, 0, -1);
scene.add(lampTarget);
lampLight.target = lampTarget;

// HDR bulb color for bloom (bright enough to bloom at threshold 1.2)
const HDR_BULB = new THREE.Color().setRGB(3, 2.4, 1.4, THREE.LinearSRGBColorSpace);

const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.1),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
);
bulb.position.copy(LAMP_POS);
bulb.scale.setScalar(1.4);
scene.add(bulb);

scene.add(new THREE.AmbientLight(0x110800, 0.08));

const rimCool = new THREE.DirectionalLight(0x88aaff, 0.35);
rimCool.position.set(-4, 1.5, -5);
scene.add(rimCool);

const rimWarm = new THREE.DirectionalLight(0xff9955, 0.28);
rimWarm.position.set(4, 2, -4);
scene.add(rimWarm);

const frontFill = new THREE.DirectionalLight(0xffd5a0, 0.12);
frontFill.position.set(0, 2.5, 5);
scene.add(frontFill);

// ==========================================
// 2b. LAMP MODEL
// ==========================================
const lampGroup = new THREE.Group();
lampGroup.position.copy(LAMP_POS);
scene.add(lampGroup);

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

const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9a7a3a,
    metalness: 0.95,
    roughness: 0.32
});
const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 10, 24), brassMat);
ring.position.y = 0.24;
ring.rotation.x = Math.PI / 2;
lampGroup.add(ring);

const cordLen = 4;
const cord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, cordLen, 8),
    brassMat
);
cord.position.y = 0.24 + cordLen / 2;
lampGroup.add(cord);

// ==========================================
// 2c. CURSOR FLASHLIGHT
// ==========================================
// Small warm spot that follows the mouse, aimed at the binder plane.
// Only active in table mode — fades in when shelf is ready, fades out otherwise.

const cursorLight = new THREE.SpotLight(0xffe8c8, 0);
cursorLight.position.copy(camera.position);
cursorLight.angle = 0.18;
cursorLight.penumbra = 0.9;
cursorLight.distance = 8;
cursorLight.decay = 1.2;
cursorLight.castShadow = false;
scene.add(cursorLight);

const cursorLightTarget = new THREE.Object3D();
cursorLightTarget.position.set(0, 0.9, -1);
scene.add(cursorLightTarget);
cursorLight.target = cursorLightTarget;

// Reusable raycast helpers for the flashlight (NOT the click raycaster)
const cursorRay = new THREE.Raycaster();
const cursorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 1); // z = -1 (binder plane)
const cursorHitPoint = new THREE.Vector3();

// ==========================================
// 3. PROPS (Desk & Eyes)
// ==========================================
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

const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
const eyeGeo = new THREE.SphereGeometry(0.04, 16, 16);
const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.15, 1.5, -4);
rightEye.position.set(0.15, 1.5, -4);
scene.add(leftEye, rightEye);

// ==========================================
// 3b. VOLUMETRIC LAMP CONE
// ==========================================
const coneHeight = LAMP_POS.distanceTo(lampTarget.position);
const coneGeo = new THREE.CylinderGeometry(0.35, 1.1, coneHeight, 32, 1, true);

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
    side: THREE.FrontSide,
    fog: false
});

const lampCone = new THREE.Mesh(coneGeo, coneMat);
lampCone.raycast = () => {};
{
    const mid = LAMP_POS.clone().add(lampTarget.position).multiplyScalar(0.5);
    const dir = lampTarget.position.clone().sub(LAMP_POS).normalize();
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
        opacity: 0.7,
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
    0.35, 0.3, 1.2
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
// 5. CAMERA
// ==========================================
let targetCameraPos = new THREE.Vector3(0, 2, 5.5);
let targetLookAt = new THREE.Vector3(0, 1.2, -1.5);
const currentLookAt = new THREE.Vector3(0, 1.2, -1.5);

let isTableMode = false;
let isCameraAtTable = false;

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
    INTRO_LIGHT:  { pos: new THREE.Vector3(0, 2, 5.5),   look: new THREE.Vector3(0, 1.2, -1.5) },
    INTRO_DOWN:   { pos: new THREE.Vector3(0, 3.5, 3),   look: new THREE.Vector3(0, 0.5, -1)   },
    INTRO_UP:     { pos: new THREE.Vector3(0, 2, 4.5),   look: new THREE.Vector3(0, 1.5, -4)   },
    TABLE_SELECT: { pos: new THREE.Vector3(0, 1.5, 2.5), look: new THREE.Vector3(0, 0.9, -1)   }
};

function setCameraState(stateName) {
    const state = CAM_STATES[stateName];
    if (state) {
        targetCameraPos.copy(state.pos);
        targetLookAt.copy(state.look);
        isTableMode = (stateName === 'TABLE_SELECT');
    }
}

// ==========================================
// 6. BINDER SYSTEM
// ==========================================
const foldersGroup = new THREE.Group();
scene.add(foldersGroup);
let currentFolders = [];
let currentBox = null;
let activeFolder = null;
let hoveredBinder = null;

const BINDER_THICKNESS = 0.12;
const BINDER_HEIGHT    = 1.0;
const BINDER_WIDTH     = 0.85;
const BOX_BASE_Y       = 0.0;
const BINDER_BASE_Y    = 0.03 + BINDER_HEIGHT / 2;

const PRESENT_POS = new THREE.Vector3(0.2, 1.0, 0.5);
const PRESENT_ROT_Y = 0;
const SHELF_ROT_Y   = Math.PI / 2;

function createSpineTexture(name) {
    const c = document.createElement('canvas');
    c.width = 96; c.height = 512;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#3a2518';
    ctx.fillRect(0, 0, 96, 512);
    for (let i = 0; i < 260; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.18})`;
        ctx.fillRect(Math.random() * 96, 0, 1, 512);
    }
    ctx.strokeStyle = 'rgba(200, 170, 100, 0.65)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, 84, 500);
    ctx.strokeRect(10, 10, 76, 492);

    ctx.save();
    ctx.translate(48, 256);
    ctx.rotate(-Math.PI / 2);
    let fontSize = 32;
    ctx.font = `bold ${fontSize}px "Special Elite", serif`;
    while (ctx.measureText(name).width > 440 && fontSize > 11) {
        fontSize -= 1;
        ctx.font = `bold ${fontSize}px "Special Elite", serif`;
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e0c890';
    ctx.fillText(name, 0, 0);
    ctx.restore();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
}

function createCoverTexture(name) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 600;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#3a2818';
    ctx.fillRect(0, 0, 512, 600);
    const img = ctx.getImageData(0, 0, 512, 600);
    for (let i = 0; i < img.data.length; i += 4) {
        const n = (Math.random() - 0.5) * 15;
        img.data[i]   += n;
        img.data[i+1] += n * 0.85;
        img.data[i+2] += n * 0.65;
    }
    ctx.putImageData(img, 0, 0);

    ctx.fillStyle = '#f0e8d0';
    ctx.fillRect(60, 100, 392, 400);
    ctx.strokeStyle = 'rgba(80, 50, 20, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 100, 392, 400);

    ctx.fillStyle = '#1a1008';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = name.split(' ');
    let fontSize = 38;
    ctx.font = `bold ${fontSize}px "Special Elite", serif`;

    const maxWidth = 360;
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        const test = currentLine ? currentLine + ' ' + word : word;
        if (ctx.measureText(test).width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = test;
        }
    }
    if (currentLine) lines.push(currentLine);

    let lineHeight = fontSize * 1.3;
    while (lines.length * lineHeight > 340 && fontSize > 14) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px "Special Elite", serif`;
        lineHeight = fontSize * 1.3;
    }

    const startY = 300 - (lines.length - 1) * lineHeight / 2;
    lines.forEach((line, i) => {
        ctx.fillText(line, 256, startY + i * lineHeight);
    });

    ctx.save();
    ctx.translate(256, 545);
    ctx.rotate(-0.08);
    ctx.strokeStyle = 'rgba(180, 30, 30, 0.75)';
    ctx.lineWidth = 4;
    ctx.strokeRect(-100, -25, 200, 50);
    ctx.fillStyle = 'rgba(180, 30, 30, 0.75)';
    ctx.font = 'bold 24px "Special Elite", serif';
    ctx.fillText('TOP SECRET', 0, 0);
    ctx.restore();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
}

function createBinder(charData, x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = SHELF_ROT_Y;
    group.userData = charData;
    group.userData.shelfPosition = new THREE.Vector3(x, y, z);
    group.userData.isOpen = false;
    group.userData.pullOut = 0;

    const pages = new THREE.Mesh(
        new RoundedBoxGeometry(BINDER_WIDTH - 0.06, BINDER_HEIGHT - 0.06, 0.08, 3, 0.005),
        new THREE.MeshStandardMaterial({ color: 0xd4cbb0, roughness: 0.92 })
    );
    pages.castShadow = true;
    pages.receiveShadow = true;
    pages.userData.isFolderFront = true;
    pages.userData.parentGroup = group;
    group.add(pages);

    const back = new THREE.Mesh(
        new RoundedBoxGeometry(BINDER_WIDTH, BINDER_HEIGHT, 0.02, 3, 0.006),
        new THREE.MeshStandardMaterial({ color: 0x8a6f4a, roughness: 0.85 })
    );
    back.position.z = -0.055;
    back.castShadow = true;
    back.receiveShadow = true;
    group.add(back);

    const spine = new THREE.Mesh(
        new RoundedBoxGeometry(0.025, BINDER_HEIGHT, 0.12, 3, 0.006),
        new THREE.MeshStandardMaterial({ map: createSpineTexture(charData.name), roughness: 0.82 })
    );
    spine.position.set(-BINDER_WIDTH / 2 + 0.0125, 0, 0);
    spine.castShadow = true;
    spine.userData.isFolderFront = true;
    spine.userData.parentGroup = group;
    group.add(spine);

    const frontGroup = new THREE.Group();
    frontGroup.position.set(-BINDER_WIDTH / 2, 0, 0.055);
    group.add(frontGroup);

    const front = new THREE.Mesh(
        new RoundedBoxGeometry(BINDER_WIDTH, BINDER_HEIGHT, 0.02, 3, 0.006),
        new THREE.MeshStandardMaterial({ map: createCoverTexture(charData.name), roughness: 0.82 })
    );
    front.position.set(BINDER_WIDTH / 2, 0, 0);
    front.castShadow = true;
    front.receiveShadow = true;
    front.userData.isFolderFront = true;
    front.userData.parentGroup = group;
    frontGroup.add(front);

    group.userData.frontGroup = frontGroup;
    return group;
}

function createBinderBox(centerX, centerZ, boxWidth) {
    const boxGroup = new THREE.Group();
    boxGroup.position.set(centerX, BOX_BASE_Y, centerZ);
    boxGroup.raycast = () => {};

    const boxMat = new THREE.MeshStandardMaterial({
        color: 0x140a04,
        roughness: 0.85,
        metalness: 0.03
    });

    const boxHeight = 0.3;
    const boxDepth = 1.0;

    const bottom = new THREE.Mesh(new RoundedBoxGeometry(boxWidth, 0.03, boxDepth, 3, 0.008), boxMat);
    bottom.position.y = 0.015;
    bottom.receiveShadow = true;
    boxGroup.add(bottom);

    const leftWall = new THREE.Mesh(new RoundedBoxGeometry(0.03, boxHeight, boxDepth, 3, 0.008), boxMat);
    leftWall.position.set(-boxWidth / 2 + 0.015, boxHeight / 2, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    boxGroup.add(leftWall);

    const rightWall = leftWall.clone();
    rightWall.position.x = boxWidth / 2 - 0.015;
    boxGroup.add(rightWall);

    const frontWall = new THREE.Mesh(new RoundedBoxGeometry(boxWidth, boxHeight * 0.55, 0.03, 3, 0.008), boxMat);
    frontWall.position.set(0, boxHeight * 0.275, boxDepth / 2 - 0.015);
    frontWall.castShadow = true;
    boxGroup.add(frontWall);

    const backWall = new THREE.Mesh(new RoundedBoxGeometry(boxWidth, boxHeight, 0.03, 3, 0.008), boxMat);
    backWall.position.set(0, boxHeight / 2, -boxDepth / 2 + 0.015);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    boxGroup.add(backWall);

    return boxGroup;
}

window.spawn3DFolders = (charactersList) => {
    currentFolders.forEach(f => foldersGroup.remove(f));
    currentFolders = [];
    activeFolder = null;
    hoveredBinder = null;
    if (currentBox) { foldersGroup.remove(currentBox); currentBox = null; }

    const n = charactersList.length;
    const spacing = 0.16;
    const boxWidth = Math.max(0.6, n * spacing + 0.2);
    const boxCenterZ = -1.0;

    currentBox = createBinderBox(0, boxCenterZ, boxWidth);
    foldersGroup.add(currentBox);

    const startX = -((n - 1) * spacing) / 2;

    charactersList.forEach((char, i) => {
        const x = startX + i * spacing;
        const binder = createBinder(char, x, BINDER_BASE_Y, boxCenterZ);
        foldersGroup.add(binder);
        currentFolders.push(binder);
    });

    setCameraState('TABLE_SELECT');
    document.getElementById('switchSideBtn').style.display = 'block';
};

window.closeActiveFolder = () => {
    if (!activeFolder) return;
    const binder = activeFolder;
    const fg = binder.userData.frontGroup;

    const startRot = fg.rotation.y;
    let t = 0;
    const closeCover = () => {
        t += 0.06;
        if (t <= 1) {
            const ease = t * t * (3 - 2 * t);
            fg.rotation.y = startRot * (1 - ease);
            requestAnimationFrame(closeCover);
        } else {
            fg.rotation.y = 0;
            floatBackToShelf(binder);
        }
    };
    closeCover();
};

function floatBackToShelf(binder) {
    const startPos = binder.position.clone();
    const startRotY = binder.rotation.y;
    const endPos = binder.userData.shelfPosition.clone();
    const endRotY = SHELF_ROT_Y;

    let t = 0;
    const animate = () => {
        t += 0.04;
        if (t <= 1) {
            const ease = t * t * (3 - 2 * t);
            binder.position.lerpVectors(startPos, endPos, ease);
            binder.rotation.y = startRotY + (endRotY - startRotY) * ease;
            requestAnimationFrame(animate);
        } else {
            binder.position.copy(endPos);
            binder.rotation.y = endRotY;
            binder.userData.pullOut = 0;
            binder.userData.isOpen = false;
            activeFolder = null;
            isTableMode = true;
        }
    };
    animate();
}

function presentBinder(binder) {
    const startPos = binder.position.clone();
    const startRotY = binder.rotation.y;
    const floatDuration = 0.9;
    const t0 = performance.now();

    function step() {
        const elapsed = (performance.now() - t0) / 1000;
        const t = Math.min(elapsed / floatDuration, 1);
        const ease = t * t * (3 - 2 * t);

        binder.position.lerpVectors(startPos, PRESENT_POS, ease);
        binder.rotation.y = startRotY + (PRESENT_ROT_Y - startRotY) * ease;

        if (t >= 1) {
            binder.position.copy(PRESENT_POS);
            binder.rotation.y = PRESENT_ROT_Y;
            setTimeout(() => openBinder(binder), 120);
        } else {
            requestAnimationFrame(step);
        }
    }
    step();
}

function openBinder(binder) {
    const fg = binder.userData.frontGroup;
    let progress = 0;
    const animate = () => {
        progress += 0.045;
        if (progress <= 1) {
            const ease = progress * progress * (3 - 2 * progress);
            fg.rotation.y = -Math.PI * ease;
            requestAnimationFrame(animate);
        } else {
            fg.rotation.y = -Math.PI;
            if (window.openDossierFrom3D) window.openDossierFrom3D(binder.userData);
        }
    };
    animate();
}

// ==========================================
// 7. INTERACTION
// ==========================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function raycastBinder(clientX, clientY) {
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(currentFolders, true);
    if (hits.length === 0) return null;
    let hit = hits[0].object;
    while (hit && !hit.userData.isFolderFront && hit.parent) hit = hit.parent;
    if (hit && hit.userData.isFolderFront) return hit.userData.parentGroup;
    return null;
}

window.addEventListener('mousemove', (e) => {
    if (!isCameraAtTable || activeFolder) {
        hoveredBinder = null;
        canvas.style.cursor = 'default';
        return;
    }
    const b = raycastBinder(e.clientX, e.clientY);
    hoveredBinder = (b && !b.userData.isOpen) ? b : null;
    canvas.style.cursor = hoveredBinder ? 'pointer' : 'default';
});

window.addEventListener('click', (event) => {
    if (!isCameraAtTable || activeFolder) return;
    if (document.getElementById('filePanel').classList.contains('active') ||
        document.getElementById('dialogueOverlay').classList.contains('active')) return;

    const b = raycastBinder(event.clientX, event.clientY);
    if (b && !b.userData.isOpen) {
        activeFolder = b;
        b.userData.isOpen = true;
        isTableMode = false;
        hoveredBinder = null;
        canvas.style.cursor = 'default';
        presentBinder(b);
    }
});

// ==========================================
// 8. ANIMATION LOOP
// ==========================================
let time = 0;
const clock = new THREE.Clock();

function updateHoverPullout() {
    for (const binder of currentFolders) {
        if (binder === activeFolder) continue;
        if (binder.userData.isOpen) continue;

        const isHovered = binder === hoveredBinder && !activeFolder && isCameraAtTable;
        const targetOut = isHovered ? 0.15 : 0;
        binder.userData.pullOut += (targetOut - binder.userData.pullOut) * 0.15;

        binder.position.z = binder.userData.shelfPosition.z + binder.userData.pullOut;
    }
}

function animate() {
    requestAnimationFrame(animate);
    time += 0.05;

    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    springStep(camera.position, targetCameraPos, cameraVelocity, dt);
    springStep(currentLookAt, targetLookAt, lookVelocity, dt);
    camera.lookAt(currentLookAt);

    isCameraAtTable = isTableMode && camera.position.distanceTo(targetCameraPos) < 0.15;

    // Cursor flashlight — fade in/out + track mouse ray
    const cursorTargetIntensity = (isTableMode && isCameraAtTable) ? 2.0 : 0;
    cursorLight.intensity += (cursorTargetIntensity - cursorLight.intensity) * 0.08;

    if (cursorLight.intensity > 0.01) {
        cursorLight.position.copy(camera.position);
        cursorRay.setFromCamera(mouse, camera);
        if (cursorRay.ray.intersectPlane(cursorPlane, cursorHitPoint)) {
            cursorLightTarget.position.copy(cursorHitPoint);
        }
    }

    updateHoverPullout();

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
            lampLight.intensity = 2.0;
            bulb.material.color.copy(HDR_BULB);
            coneMat.uniforms.uOpacity.value = 0.025;

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
        lampLight.intensity = Math.random() > 0.4 ? 2.0 : 0;
        if (lampLight.intensity > 0) {
            bulb.material.color.copy(HDR_BULB);
        } else {
            bulb.material.color.setHex(0x000000);
        }
        coneMat.uniforms.uOpacity.value = lampLight.intensity > 0 ? 0.025 : 0.0;
        flickers++;
    }, 100);
}, 500);
