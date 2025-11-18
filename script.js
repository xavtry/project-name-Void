// Custom cursor
document.addEventListener('mousemove', e => {
  document.querySelector('.cursor').style.transform = `translate(${e.clientX-10}px, ${e.clientY-10}px)`;
});

// Typing effect
gsap.to(".typing", {text: "I build things that shouldn't be possible in a browser.", duration: 4, repeat: -1, ease: "none"});

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Three.js 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight*0.8);
document.getElementById('three-container').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 16);
const material = new THREE.ShaderMaterial({
  vertexShader: `varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader: `varying vec2 vUv; void main(){ gl_FragColor=vec4(sin(vUv.x*10.0), cos(vUv.y*10.0), 1.0, 1.0); }`,
  wireframe: true
});
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);
camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.01;
  knot.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
