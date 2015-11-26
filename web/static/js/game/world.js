class World {

  constructor(game, options) {
    this.options = options;
    this.game = game;

    this.clock = new THREE.Clock();

    this.setupCamera();
    this.setupRenderer();
    this.setupScene();

    this.camera.position.z = 100;
    this.camera.position.y = 20;

    this.controls = new THREE.FlyControls(this.camera, {centralObject: this.game.player.model});
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

    if (this.options.debug == true) {
      var axisHelper = new THREE.AxisHelper(10);
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

    this.game.player.model.rotation.y += 0.025;

    this.controls.update(delta);

    // TODO do only if player not dead
    this.game.player.update(delta);
    //this.camera.position.set(0,100,0); this.camera.lookAt(this.scene.position);
  }


  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default World;
