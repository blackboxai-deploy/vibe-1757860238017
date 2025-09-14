import * as THREE from 'three';

export const createParticleGeometry = (count: number = 5000) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  const color1 = new THREE.Color(0x00ff41); // Matrix green
  const color2 = new THREE.Color(0x00d4ff); // Electric blue
  const color3 = new THREE.Color(0x8b5cf6); // Purple accent
  
  for (let i = 0; i < count; i++) {
    // Position particles in a large sphere
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    
    // Randomize colors between cyberpunk palette
    const colorChoice = Math.random();
    let color: THREE.Color;
    
    if (colorChoice < 0.33) {
      color = color1;
    } else if (colorChoice < 0.66) {
      color = color2;
    } else {
      color = color3;
    }
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  return geometry;
};

export const createMatrixRainGeometry = (width: number = 20, height: number = 50) => {
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];
  
  const matrixGreen = new THREE.Color(0x00ff41);
  const darkGreen = new THREE.Color(0x003d10);
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      positions.push((x - width / 2) * 2);
      positions.push((y - height / 2) * 2);
      positions.push(Math.random() * 10 - 5);
      
      // Gradient effect from bright to dark
      const intensity = Math.random();
      const color = matrixGreen.clone().lerp(darkGreen, 1 - intensity);
      colors.push(color.r, color.g, color.b);
      
      sizes.push(Math.random() * 2 + 1);
    }
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(new Float32Array(sizes), 1));
  
  return geometry;
};

export const createGlowMaterial = (color: number = 0x00ff41, intensity: number = 1) => {
  return new THREE.PointsMaterial({
    color: color,
    size: 2,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
};

export const createHolographicMaterial = (color: number = 0x00d4ff) => {
  return new THREE.MeshPhongMaterial({
    color: color,
    transparent: true,
    opacity: 0.6,
    shininess: 100,
    specular: new THREE.Color(0xffffff),
    emissive: new THREE.Color(color).multiplyScalar(0.2),
  });
};

export const animateParticles = (
  particles: THREE.Points,
  time: number,
  speed: number = 0.001
) => {
  const positions = particles.geometry.attributes.position.array as Float32Array;
  
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] += Math.sin(time * speed + positions[i]) * 0.1;
    positions[i + 2] += Math.cos(time * speed + positions[i + 1]) * 0.1;
  }
  
  particles.geometry.attributes.position.needsUpdate = true;
};

export const createFloatingGeometry = (type: 'cube' | 'sphere' | 'torus' = 'cube') => {
  let geometry: THREE.BufferGeometry;
  
  switch (type) {
    case 'sphere':
      geometry = new THREE.SphereGeometry(1, 32, 32);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
      break;
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }
  
  return geometry;
};

export const cyberpunkColors = {
  matrixGreen: 0x00ff41,
  electricBlue: 0x00d4ff,
  neonPurple: 0x8b5cf6,
  darkBackground: 0x0a0a0a,
  brightWhite: 0xffffff,
  redAlert: 0xff0040,
  orangeAccent: 0xff6b00,
  darkGray: 0x1a1a1a,
} as const;