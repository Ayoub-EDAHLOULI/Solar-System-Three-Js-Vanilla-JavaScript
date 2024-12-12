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

// Create an array of planets and their properties (name, radius, distance from sun, speed of rotation, number of moons and their properties)
const planets = [
  {
    name: "Mercury",
    radius: 0.383,
    distance: 0.39,
    speed: 0.017,
    material: mercuryMaterial,
    moons: 0,
  },
  {
    name: "Venus",
    radius: 0.949,
    distance: 0.72,
    speed: 0.007,
    material: venusMaterial,
    moons: 0,
  },
  {
    name: "Earth",
    radius: 1,
    distance: 1,
    speed: 0.01,
    material: earthMaterial,
    moons: 1,
    moon: {
      name: "Moon",
      radius: 0.2724,
      distance: 0.00257,
      speed: 0.01,
    },
  },
  {
    name: "Mars",
    radius: 0.532,
    distance: 1.52,
    speed: 0.009,
    material: marsMaterial,
    moons: 2,
  },
  {
    name: "Jupiter",
    radius: 11.21,
    distance: 5.2,
    speed: 0.004,
    material: jupiterMaterial,
    moons: 79,
  },
  {
    name: "Saturn",
    radius: 9.45,
    distance: 9.58,
    speed: 0.003,
    material: saturnMaterial,
    moons: 82,
  },
  {
    name: "Uranus",
    radius: 4.01,
    distance: 19.22,
    speed: 0.002,
    material: uranusMaterial,
    moons: 27,
  },
  {
    name: "Neptune",
    radius: 3.88,
    distance: 30.05,
    speed: 0.001,
    material: neptuneMaterial,
    moons: 14,
  },
];

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
