class World {

  constructor() {
    this.setupCamera();
    this.setupRenderer();
    this.setupScene();

    this.camera.position.z = 5;

    this.animate();
  }


  setupScene() {
    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( geometry, material );

    this.scene.add( this.cube );
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
  }


  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default World
