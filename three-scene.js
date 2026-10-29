import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

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

// --- LIGHTING ---
const lampLight = new THREE.SpotLight(0xffcc88, 0); // Starts at 0 for flicker effect
lampLight.position.set(0, 4, 1);
lampLight.angle = Math.PI / 3;
lampLight.penumbra = 0.8;
lampLight.castShadow = true;
scene.add(lampLight);

const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0xffcc88 }));
bulb.position.copy(lampLight.position);
scene.add(bulb);

scene.add(new THREE.AmbientLight(0x221100, 0.1));

// --- WOOD DESK ---
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

// --- THE EYES ---
const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
const eyeGeo = new THREE.SphereGeometry(0.04, 16, 16);
const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.15, 1.5, -4);
rightEye.position.set(0.15, 1.5, -4);
scene.add(leftEye, rightEye);

// --- POST PROCESSING ---
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85));

// --- CAMERA CHOREOGRAPHY ---
let targetCameraPos = new THREE.Vector3(0, 2, 6);
let targetLookAt = new THREE.Vector3(0, 1, -4);
const currentLookAt = new THREE.Vector3(0, 1, -4);

const CAM_STATES = {
    INTRO_LIGHT: { pos: new THREE.Vector3(0, 2, 6), look: new THREE.Vector3(0, 0, 0) },
    INTRO_DOWN: { pos: new THREE.Vector3(0, 4, 3), look: new THREE.Vector3(0, 0, 0) },
    INTRO_UP: { pos: new THREE.Vector3(0, 2, 5), look: new THREE.Vector3(0, 1.5, -4) },
    TABLE_SELECT: { pos: new THREE.Vector3(0, 7, 0.1), look: new THREE.Vector3(0, 0, 0) }
};

function setCameraState(stateName) {
    const state = CAM_STATES[stateName];
    if (state) {
        targetCameraPos.copy(state.pos);
        targetLookAt.copy(state.look);
    }
}

// --- FOLDER GENERATION ---
const foldersGroup = new THREE.Group();
scene.add(foldersGroup);
let currentFolders = [];
let activeFolder = null;

function createFolderTexture(name) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    const ctx = c.getContext('2d');
    
    ctx.fillStyle = '#d4c3a3'; // Manila color
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#c4b08a'; // Tab color
    ctx.fillRect(50, 0, 200, 60);

    // Text wrapping logic
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

    // Stamp
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
    group.userData = charData;

    const back = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 0.02), new THREE.MeshStandardMaterial({ color: 0xcbb58d, roughness: 0.9 }));
    back.receiveShadow = true; back.castShadow = true;
    group.add(back);

    const paper = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.5), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }));
    paper.position.z = 0.011;
    group.add(paper);

    const frontGroup = new THREE.Group();
    frontGroup.position.set(-0.6, 0, 0.02); 
    group.add(frontGroup);

    const front = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 0.02), new THREE.MeshStandardMaterial({ map: createFolderTexture(charData.name), roughness: 0.9 }));
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
    
    // Arrange in a grid on the table
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

// --- INTERACTION ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
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
            
            // Zoom camera to this specific folder
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
            setTimeout(animateOpen, 300); // Let camera move a bit first
        }
    }
});

// --- ANIMATION LOOP ---
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.05;

    camera.position.lerp(targetCameraPos, 0.05);
    currentLookAt.lerp(targetLookAt, 0.05);
    camera.lookAt(currentLookAt);

    const blink = Math.sin(time * 0.5) > 0.98 ? 0.1 : 1;
    leftEye.scale.y = blink; rightEye.scale.y = blink;

    composer.render();
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// --- INTRO SEQUENCE ---
setTimeout(() => {
    setCameraState('INTRO_LIGHT');
    let flickers = 0;
    
    // Light Flicker
    const flicker = setInterval(() => {
        if (flickers > 12) {
            clearInterval(flicker);
            lampLight.intensity = 100;
            bulb.material.color.setHex(0xffcc88);
            
            // Look down at table
            setTimeout(() => {
                setCameraState('INTRO_DOWN');
                // Look back up at eyes
                setTimeout(() => {
                    setCameraState('INTRO_UP');
                    // Trigger dialogue
                    setTimeout(() => {
                        if (window.startIntroDialogue) window.startIntroDialogue();
                    }, 1200);
                }, 1500);
            }, 500);
            return;
        }
        lampLight.intensity = Math.random() > 0.4 ? 100 : 0;
        bulb.material.color.setHex(lampLight.intensity > 0 ? 0xffcc88 : 0x000000);
        flickers++;
    }, 100);
}, 500);
