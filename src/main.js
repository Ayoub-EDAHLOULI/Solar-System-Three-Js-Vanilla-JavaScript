import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createStarField } from "./stars.js";
import { createPlanetTrajectories } from "./trajectories.js";

// Initialize scene, camera, renderer
const scene = new THREE.Scene();
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 20;
camera.position.y = 5;
const renderer = new THREE.WebGLRenderer();

// Set renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append renderer to container
const container = document.getElementById("solar-system");
container.appendChild(renderer.domElement);

// Add star field to scene
const starField = createStarField();
scene.add(starField);

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
sun.scale.setScalar(2); // Scale Sun

// Add Sun to scene
scene.add(sun);

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
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

// Create an array of planets and their properties (name, radius, distance from sun, speed of rotation, number of moons and their properties)
const planets = [
  {
    name: "Mercury",
    radius: 0.1,
    distance: 3,
    speed: 0.017,
    material: mercuryMaterial,
    moons: 0,
  },
  {
    name: "Venus",
    radius: 0.3,
    distance: 5,
    speed: 0.007,
    material: venusMaterial,
    moons: 0,
  },
  {
    name: "Earth",
    radius: 0.4,
    distance: 8,
    speed: 0.01,
    material: earthMaterial,
    moons: 1,
    moon: {
      name: "Moon",
      radius: 0.09,
      distance: 0.8,
      speed: 0.01,
    },
  },
  {
    name: "Mars",
    radius: 0.35,
    distance: 12,
    speed: 0.009,
    material: marsMaterial,
    moons: 2,
    moon: [
      {
        name: "Phobos",
        radius: 0.09,
        distance: 0.8,
        speed: 0.02,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 0.8,
    distance: 16,
    speed: 0.004,
    material: jupiterMaterial,
    moons: 0,
  },
  {
    name: "Saturn",
    radius: 0.7,
    distance: 20,
    speed: 0.003,
    material: saturnMaterial,
    moons: 0,
  },
  {
    name: "Uranus",
    radius: 0.6,
    distance: 24,
    speed: 0.002,
    material: uranusMaterial,
    moons: 0,
  },
  {
    name: "Neptune",
    radius: 0.55,
    distance: 28,
    speed: 0.001,
    material: neptuneMaterial,
    moons: 0,
  },
];

// Create a function to create planets and moons
function createPlanets() {
  planets.forEach((planet) => {
    const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
    const planetMesh = new THREE.Mesh(planetGeometry, planet.material);
    planetMesh.position.x = planet.distance;
    scene.add(planetMesh);

    // Store planet's mesh in planet object for easy access in animation loop
    planet.mesh = planetMesh;

    if (planet.moons > 0) {
      // Ensure planet.moon is an array
      const moons = Array.isArray(planet.moon) ? planet.moon : [planet.moon];

      // Iterate over each moon for the planet
      moons.forEach((moonData) => {
        const moonGeometry = new THREE.SphereGeometry(moonData.radius, 32, 32);
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.x = moonData.distance; // Set moon distance from planet
        planetMesh.add(moonMesh); // Attach moon to planet
      });
    }
  });
}

// Call createPlanets function
createPlanets();

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 800);
scene.add(pointLight);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.maxDistance = 200;
controls.minDistance = 5;

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add planet trajectories
createPlanetTrajectories(planets, scene);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the Sun around its axis
  sun.rotation.y += 0.0005;

  // Rotate each planet around the Sun based on its distance and speed
  planets.forEach((planet) => {
    if (planet.mesh) {
      planet.mesh.rotation.y += planet.speed;
      planet.mesh.position.x =
        planet.distance * Math.cos(planet.mesh.rotation.y);
      planet.mesh.position.z =
        planet.distance * Math.sin(planet.mesh.rotation.y);
    }
  });

  // Update controls for smooth damping
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

animate();
