import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// --- SCENE SETUP ---
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505); // Very dark black
scene.fog = new THREE.FogExp2(0x050505, 0.05); // Fades out the background

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Realistic soft shadows

// --- LIGHTING ---
// 1. The Desk Lamp (Warm Spot Light)
const lampLight = new THREE.SpotLight(0xffcc88, 100);
lampLight.position.set(-2, 4, 1);
lampLight.angle = Math.PI / 4;
lampLight.penumbra = 0.8;
lampLight.castShadow = true;
lampLight.shadow.mapSize.width = 1024;
lampLight.shadow.mapSize.height = 1024;
scene.add(lampLight);

// 2. Very dim ambient fill light (so shadows aren't pitch black)
const ambientLight = new THREE.AmbientLight(0x221100, 0.5);
scene.add(ambientLight);

// --- PROCEDURAL WOOD DESK ---
// We generate a wood texture in code so you don't need an image file!
const canvasWood = document.createElement('canvas');
canvasWood.width = 512; canvasWood.height = 512;
const ctx = canvasWood.getContext('2d');
ctx.fillStyle = '#2a1a10'; ctx.fillRect(0, 0, 512, 512);
for(let i=0; i<1000; i++) { // Draw wood grain lines
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
    ctx.fillRect(Math.random() * 512, 0, Math.random() * 4, 512);
}
const woodTexture = new THREE.CanvasTexture(canvasWood);

const deskGeo = new THREE.BoxGeometry(10, 0.2, 8);
const deskMat = new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.7 });
const desk = new THREE.Mesh(deskGeo, deskMat);
desk.position.y = -0.1;
desk.receiveShadow = true;
scene.add(desk);

// --- THE ARCHIVIST'S EYES ---
const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
const eyeGeo = new THREE.SphereGeometry(0.04, 16, 16);
const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.15, 1.5, -3);
rightEye.position.set(0.15, 1.5, -3);
scene.add(leftEye, rightEye);

// --- THE 3D FOLDER ---
const folderGroup = new THREE.Group();
folderGroup.position.set(0, 0.1, 0);

// Back Cover (Stationary)
const backCover = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xcbb58d, roughness: 0.9 })
);
backCover.receiveShadow = true;
backCover.castShadow = true;
folderGroup.add(backCover);

// Paper Inside
const paper = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.9),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
);
paper.position.z = 0.011;
folderGroup.add(paper);

// Front Cover (Hinged)
const frontCoverGroup = new THREE.Group();
frontCoverGroup.position.set(-0.75, 0, 0.02); // Hinge on the left
const frontCover = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xd4c3a3, roughness: 0.9 })
);
frontCover.position.x = 0.75; // Offset so it pivots on the left edge
frontCover.castShadow = true;
frontCoverGroup.add(frontCover);
folderGroup.add(frontCoverGroup);

scene.add(folderGroup);

// --- POST PROCESSING (BLOOM) ---
// This makes the eyes and lamp glow beautifully
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass);

// --- INTERACTION LOGIC ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let folderIsOpen = false;

window.addEventListener('click', (event) => {
    // Only interact if the 3D folder is visible and not already open
    if (folderIsOpen || !folderGroup.visible) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([frontCover, backCover]);

    if (intersects.length > 0) {
        folderIsOpen = true;
        // Animate the folder opening
        let progress = 0;
        const animateOpen = () => {
            progress += 0.05;
            if (progress <= 1) {
                // Smoothstep easing
                const ease = progress * progress * (3 - 2 * progress);
                frontCoverGroup.rotation.y = -Math.PI * ease;
                requestAnimationFrame(animateOpen);
            } else {
                // Folder is fully open. Trigger the dossier!
                if (window.openDossierFrom3D) {
                    window.openDossierFrom3D();
                }
            }
        };
        animateOpen();
    }
});

// --- ANIMATION LOOP ---
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.05;

    // Blinking eyes
    const blink = Math.sin(time * 0.5) > 0.98 ? 0.1 : 1;
    leftEye.scale.y = blink;
    rightEye.scale.y = blink;

    composer.render();
}
animate();

// --- RESIZE HANDLER ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Export functions to communicate with display-characters.js
window.spawn3DFolder = (name) => {
    folderGroup.visible = true;
    folderIsOpen = false;
    frontCoverGroup.rotation.y = 0; // Reset folder
    // You could use a CanvasTexture to render the 'name' onto the front cover here!
};
window.hide3DFolder = () => {
    folderGroup.visible = false;
};
