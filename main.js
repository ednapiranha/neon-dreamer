// Borrowed and mangled from http://threejs.org/examples/#canvas_camera_orthographic

(function () {
  var height = window.innerHeight;
  var width = window.innerWidth;

  var glitchPass;

  var container;
  var composer;
  var camera, scene, renderer;

  init();
  animate();

  function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.OrthographicCamera(
      width / - 2,
      width / 6,
      height / 2,
      height / - 2,
      - 500,
      1000
    );

    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 200;

    scene = new THREE.Scene();

    var size = 1300, step = 30;
    var geometry = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry.vertices.push( new THREE.Vector3(- size, 10, i));
      geometry.vertices.push( new THREE.Vector3(size, 10, i));
    }

    var geometry2 = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry2.vertices.push( new THREE.Vector3(i, 160, - size));
      geometry2.vertices.push( new THREE.Vector3(i, 160,   size));
    }

    var material2 = new THREE.LineBasicMaterial({
      color: '#ff00e9',
      opacity: 0.9
    });

    var line2 = new THREE.LineSegments(geometry2, material2);
    scene.add(line2);

    // Cubes - y-axis
    var geometry = new THREE.BoxGeometry(100, 350, 340);
    var material = new THREE.MeshLambertMaterial({
      color: '#ff00e9',
      transparent: true,
      opacity: 0.1
    });

    for (var i = 0; i < 20; i ++) {
      var cube = new THREE.Mesh(geometry, material);

      cube.scale.y = Math.floor(Math.random() * 5 + 1);
      cube.position.x = Math.floor((Math.random() * 500) / 25) * 15 - 312;
      cube.position.y = (cube.scale.y * 50) / 2;
      cube.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 + 312;

      scene.add(cube);
    }

    // Cubes - x-axis
    var geometry3 = new THREE.BoxGeometry(550, 200, 40);
    var material3 = new THREE.MeshLambertMaterial({
      color: '#10dfe9',
      transparent: true,
      opacity: 0.2
    });

    for (var i = 0; i < 40; i ++) {
      var cube3 = new THREE.Mesh(geometry3, material3);

      cube3.scale.x = Math.floor((Math.random() * 500 - 250));
      cube3.position.x = Math.floor((Math.random() * 500 - 250));
      cube3.position.y = Math.floor((Math.random() * 500 - 250));
      cube3.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 + 12;
      cube3.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 50;

      scene.add(cube3);
    }

    var geometry4 = new THREE.BoxGeometry(550, 550, 140);
    var material4 = new THREE.MeshLambertMaterial({
      color: '#10dfe9',
      transparent: true,
      opacity: 0.2
    });

    for (var i = 0; i < 10; i ++) {
      var cube4 = new THREE.Mesh(geometry4, material4);

      cube4.scale.x = Math.floor((Math.random() * 500 - 250));
      cube4.position.x = Math.floor((Math.random() * 500 - 150));
      cube4.position.y = Math.floor((Math.random() * 500 - 250));
      cube4.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 + 12;
      cube4.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 50;

      scene.add(cube4);
    }

    var geometry2 = new THREE.BoxGeometry(120, 450, 400);
    var material2 = new THREE.MeshLambertMaterial({
      color: '#ff00e9',
      transparent: true,
      opacity: 0.1
    });

    for (var i = 0; i < 50; i ++) {
      var cube2 = new THREE.Mesh(geometry2, material2);

      cube2.scale.y = Math.floor(Math.random() * 5 + 1);
      cube2.position.x = Math.floor((Math.random() * 500) / 25) * 25 + 12;
      cube2.position.y = (cube2.scale.y * 60);
      cube2.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 - 112;

      scene.add(cube2);
    }

    // Lights
    var ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight('#fff');
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    var pointLight1 = new THREE.PointLight('#f00', 1.2, 0);
    pointLight1.position.set(10, 50, 10).normalize();
    scene.add(pointLight1);

    var pointLight2 = new THREE.PointLight('#10dfe9', 1.5, 0);
    pointLight2.position.set(50, 50, 50).normalize();
    scene.add(pointLight2);

    renderer = new THREE.WebGLRenderer({
      alpha: true
    });

    renderer.setClearColor('#fff', 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // postprocessing
    /*
    var params = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    };

    var renderTarget = new THREE.WebGLRenderTarget(width, height, params);

    composer = new THREE.EffectComposer(renderer, renderTarget);

    composer.addPass(new THREE.RenderPass(scene, camera));

    glitchPass = new THREE.GlitchPass();
    glitchPass.renderToScreen = true;
    composer.addPass(glitchPass);
    */
    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    var timer = Date.now() * 0.0004;

    camera.position.x = 50;
    camera.position.y = Math.cos(timer) * 500;
    camera.position.z = Math.sin(timer) * 100;
    camera.lookAt(scene.position);
    //composer.render();
    renderer.render(scene, camera);
  }
})();