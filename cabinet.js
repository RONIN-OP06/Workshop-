import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Setup renderer, scene, and camera
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer.setClearColor(0x0000ff);

// Create cupboard geometry
const cupboardGeometry = new THREE.BoxGeometry(2, 2, 1);
const cupboardMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown color for cupboard
const cupboard = new THREE.Mesh(cupboardGeometry, cupboardMaterial);
scene.add(cupboard);

// Create doors
const doorGeometry = new THREE.BoxGeometry(1.9, 2, 0.1);
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 }); // Gold color for doors
const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);

// Position the doors
leftDoor.position.set(-1.05, 0, 0.5); // Left door
rightDoor.position.set(1.05, 0, 0.5); // Right door
cupboard.add(leftDoor);
cupboard.add(rightDoor);

// Lights
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(-30, 50, 0);
scene.add(directionalLight);

// Helpers
scene.add(new THREE.GridHelper(30));
scene.add(new THREE.AxesHelper(3));

// Orbital controls
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 30, 30);
orbit.update();

// Animation setup
let doorsOpen = false;

// Click event to toggle doors with animation
function toggleDoors() {
    if (doorsOpen) {
        leftDoor.rotation.y = 0; // Close left door
        rightDoor.rotation.y = 0; // Close right door
    } else {
        leftDoor.rotation.y = -Math.PI / 2; // Open left door
        rightDoor.rotation.y = Math.PI / 2; // Open right door
    }
    doorsOpen = !doorsOpen;
}

// Add event listener for mouse click
window.addEventListener('click', toggleDoors);

// Animation function
function animate() {
    orbit.update();
    renderer.render(scene, camera);
}

// Render loop
renderer.setAnimationLoop(animate);