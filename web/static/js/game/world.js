class World {

  constructor(game, options) {
    this.options = options;
    this.game = game;

    // TODO make scale a universal property
    this.scale = this.game.player.scale;

    this.clock = new THREE.Clock();

    this.setupCamera();
    this.setupRenderer();
    this.setupScene();

    this.camera.position.z = -4 * this.scale;
    this.camera.position.y = 28 * this.scale;
    this.game.player.model.rotation.set(0, Math.PI/2, 0);

    this.controls = new THREE.FlyControls(this.game.player.model);
    this.controls.domElement = this.renderer.domElement;
		this.controls.movementSpeed = 10;
		this.controls.rollSpeed = Math.PI / 6;
		this.controls.autoForward = false;
		this.controls.dragToLook = false;

    this.update();
  }


  setupScene() {
    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
    this.scene.add(this.game.player.model);
    this.game.player.model.rotation.set(0, Math.PI, 0);

    if (this.options.debug == true) {
      var axisHelper = new THREE.AxisHelper(100);
      this.scene.add(axisHelper);
    }

    let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
    this.scene.add(light);
  }


  setupCamera() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  }


  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }


  update() {
    //TODO update all objects here
    requestAnimationFrame( this.update.bind(this) );
    let delta = this.clock.getDelta();
    this.render();
    // this.cube.rotation.x += 0.1;
    // this.cube.rotation.y += 0.05;

    this.controls.update(delta);
    let playerRotation = this.game.player.model.rotation
    let playerPos = this.game.player.model.position
    this.camera.rotation.set(playerRotation.x, playerRotation.y, playerRotation.z)
    this.camera.position.set(playerPos.x, playerPos.y + (20 * this.scale), playerPos.z+50)

    // TODO do only if player not dead
    this.game.player.update(delta);
    //this.camera.position.set(0,100,0); this.camera.lookAt(this.scene.position);
  }


  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default World;
