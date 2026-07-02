(function () {
  var canvas = document.getElementById('sugar-canvas');
  if (!canvas || !window.THREE) return;
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var material = new THREE.MeshBasicMaterial({ color: 0x2a9d8f, wireframe: true });
  var mutedMaterial = new THREE.MeshBasicMaterial({ color: 0x9a9fa3, wireframe: true });
  var cubes = [];
  for (var i = 0; i < 18; i += 1) {
    var cube = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), i % 4 === 0 ? material : mutedMaterial);
    cube.position.set((Math.random() - 0.5) * 5.6, (Math.random() - 0.5) * 3.2, (Math.random() - 0.5) * 2);
    cube.rotation.set(Math.random(), Math.random(), Math.random());
    scene.add(cube);
    cubes.push(cube);
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  }

  function animate() {
    if (!prefersReduced) {
      cubes.forEach(function (cube, index) {
        cube.rotation.x += 0.003 + index * 0.0001;
        cube.rotation.y += 0.004;
      });
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) resize();
  });
  resize();
  animate();
}());
