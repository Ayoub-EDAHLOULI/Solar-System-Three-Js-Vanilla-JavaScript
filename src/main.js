import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Initialize scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

// Set renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append renderer to container
const container = document.getElementById("solar-system");
container.appendChild(renderer.domElement);

// Inisialize Geometry, Material, Mesh
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial();

// Create Sun Material and Add Texture to Sphere
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
sphereMaterial.map = sunTexture;
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
  emissive: 0xffff00,
});
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);

// Load Planets Texture
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
const jupiterTexture = textureLoader.load("/textures/2k_jupiter.jpg");
const saturnTexture = textureLoader.load("/textures/2k_saturn.jpg");
const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");

// Create Planets Material
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });

// Add Sun to scene
scene.add(sun);

// Set camera position
camera.position.z = 5;

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update controls for smooth damping
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

animate();
