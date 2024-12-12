import * as THREE from "three";

export function createStarField() {
  const starCount = 100000; // Number of stars
  const geometry = new THREE.BufferGeometry(); // Geometry for star positions
  const positions = new Float32Array(starCount * 5);

  // Randomly position stars
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // z
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.5,
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
  });

  const starField = new THREE.Points(geometry, material);

  return starField; // Return the star field to be added to the scene
}
