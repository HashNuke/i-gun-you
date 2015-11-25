class World {

  constructor(game) {
    this.game = game;
    this.setupCamera();
    this.setupRenderer();
    this.setupScene();

    this.camera.position.z = 50;

    this.animate();
  }


  setupScene() {
    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( geometry, material );

    this.scene.add( this.cube );
    console.log(this.cube.position);
  }


  setupCamera() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  }


  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }


  animate() {
    //TODO update all objects here
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;

    // TODO do only if player not dead
    this.game.player.update();
    this.camera.position.set(0,100,0); this.camera.lookAt(this.scene.position);
  }


  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default World;