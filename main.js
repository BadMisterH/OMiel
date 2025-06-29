import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Conteneur & scène
const container = document.getElementById("miel-3d-container");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfefbf7);

// Caméra
const camera = new THREE.PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(3, 2, 4.5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

// Contrôles caméra
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;
controls.enableZoom = false;
controls.enablePan = false;

// Lumière ambiante douce
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// Lumière directionnelle douce avec ombres légères
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(4, 6, 4);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(512, 512);
directionalLight.shadow.radius = 4;
directionalLight.shadow.bias = -0.0005;
scene.add(directionalLight);

// Chargement du modèle 3D
const loader = new GLTFLoader();
loader.load(
  "Miel.glb",
  (gltf) => {
    const model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Assure une bonne lisibilité des textures
        if (child.material) {
          child.material.toneMapped = false;
          if (child.material.map) {
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
          }
          child.material.color.multiplyScalar(1.1); // boost léger
        }

        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }
      }
    });

    // Centrage et mise à l'échelle
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3()).length();

    model.position.sub(center);
    const scale = 6 / size;
    model.scale.set(scale, scale, scale);

    scene.add(model);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% chargé");
  },
  (error) => {
    console.error("Erreur de chargement du modèle", error);
  }
);

// Animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});



