import * as THREE from "three";

/**
 * Create a trajectory (circular orbit) for a planet.
 * @param {Number} radius - Radius of the orbit.
 * @param {Number} segments - Number of segments for the line.
 * @returns {THREE.Line} - The created trajectory line.
 */
export function createTrajectory(radius, segments = 100) {
  const curve = new THREE.EllipseCurve(
    0,
    0, // x, y center
    radius,
    radius, // xRadius, yRadius
    0,
    2 * Math.PI, // StartAngle, EndAngle
    false, // Clockwise
    0 // Rotation
  );

  const points = curve.getPoints(segments);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const trajectory = new THREE.Line(geometry, material);
  trajectory.rotation.x = Math.PI / 2; // Rotate to match the orbital plane
  trajectory.material.transparent = true;
  trajectory.material.opacity = 0.17;
  return trajectory;
}

/**
 * Create trajectories for all planets in the solar system.
 * @param {Array} planets - Array of planet objects.
 * @param {THREE.Scene} scene - Three.js scene to add the trajectories to.
 */
export function createPlanetTrajectories(planets, scene) {
  planets.forEach((planet) => {
    const trajectory = createTrajectory(planet.distance);
    scene.add(trajectory);
  });
}
