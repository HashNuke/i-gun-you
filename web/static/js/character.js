class Character {

  constructor(skinUrl, scale=1) {
    this.skinUrl = skinUrl;
    this.scale = scale;

    this.setDefaults();

    this.model = new THREE.Object3D()
    this.createParts();

    return this.model;
  }


  setDefaults () {
    this.sizes = {
      headWidth: 8, headHeight: 8, headDepth: 8,
      bodyWidth: 8, bodyHeight: 12, bodyDepth: 4,
      armWidth: 4, armHeight: 12, armDepth: 4
    };
  }


  createParts() {
    this.model.parts = {}
    var material = this.createMaterial();

    var head = this.createHead()
    this.model.parts.head = head
    this.model.add(head)

    var torso = this.createBody()
    this.model.parts.torso = torso
    this.model.add(torso)

    var leftHand = this.createLeftHand()
    this.model.parts.leftHand = leftHand
    this.model.add(leftHand)

    var rightHand = this.createRightHand()
    this.model.parts.rightHand = rightHand
    this.model.add(rightHand)

    var leftLeg = this.createLeftLeg()
    this.model.parts.leftLeg = leftLeg
    this.model.add(leftLeg)

    var rightLeg = this.createRightLeg()
    this.model.parts.rightLeg = rightLeg
    this.model.add(rightLeg)

    var gunBarrel = this.createGunBarrel()
    this.model.parts.gunBarrel = gunBarrel
    this.model.add(gunBarrel)

    var gunHandle = this.createGunHandle()
    this.model.parts.gunHandle = gunHandle
    this.model.add(gunHandle)

    this.model.parts.rightHand.rotation.x = 4.8
    this.model.name = "character"
  }


  createMaterial() {
    var texture = THREE.ImageUtils.loadTexture(this.skinUrl)
    texture.magFilter  = THREE.NearestFilter
    texture.minFilter  = THREE.NearestFilter

    var material = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide
    })

    return material;
  }


  update(now) {
    var angle = (1/2) * now*Math.PI*2

    // move the left arm
    this.model.parts.leftHand.rotation.x = 1 * Math.cos(angle)

    // move the legs
    this.model.parts.rightLeg.rotation.x = 1 * Math.cos(angle)
    this.model.parts.leftLeg.rotation.x = 1 * Math.cos(angle + Math.PI)
  }


  createCube(width, height, depth) {
    var geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1)
    return(new THREE.Mesh(geometry, this.material));
  }


  createHead() {
    var obj = this.createCube(
      this.sizes.headWidth  * this.scale,
      this.sizes.headHeight * this.scale,
      this.sizes.headDepth  * this.scale
    )

    obj.position = this.headPosition()

    this.mapUv(obj, 0, 16, 24, 24, 16) // left
    this.mapUv(obj, 1,  0, 24,  8, 16) // right
    this.mapUv(obj, 2,  8, 32, 16, 24) // top
    this.mapUv(obj, 3, 16, 32, 24, 24) // bottom
    this.mapUv(obj, 4,  8, 24, 16, 16) // front
    this.mapUv(obj, 5, 24, 24, 32, 16) // back
    return obj;
  }

  createHand() {
    var width  = this.sizes.armWidth * this.scale;
    var height = this.sizes.armHeight * this.scale;
    var depth  = this.sizes.armDepth * this.scale;

    var geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    var translationMatrix = new THREE.Matrix4().makeTranslation(0, -height/2 + width/2, 0);

    geometry.applyMatrix(translationMatrix);

    return(new THREE.Mesh(geometry, material));
  }


  createLeg() {
    var width  = this.sizes.armWidth  * this.scale;
    var height = this.sizes.armHeight * this.scale;
    var depth  = this.sizes.armDepth  * this.scale;

    var geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1)
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, -height/2, 0) )
    return(new THREE.Mesh(geometry, material));
  }


  createRightHand() {
    var obj = this.createHand()
    obj.position = this.leftHandPosition()

    this.mapUv(obj, 0, 44, 12, 40,  0)  // right
    this.mapUv(obj, 1, 52, 12, 48,  0)  // left
    this.mapUv(obj, 2, 44, 16, 48, 12)  // top
    this.mapUv(obj, 3, 48, 16, 52, 12)  // bottom
    this.mapUv(obj, 4, 48, 12, 44,  0)  // front
    this.mapUv(obj, 5, 56, 12, 52,  0)  // back
    return obj;
  }


  createLeftHand() {
    var obj = this.createHand()
    obj.position = this.rightHandPosition()

    this.mapUv(obj, 0, 48, 12, 52,  0)  // right
    this.mapUv(obj, 1, 40, 12, 44,  0)  // left
    this.mapUv(obj, 2, 44, 16, 48, 12)  // top
    this.mapUv(obj, 3, 48, 16, 52, 12)  // bottom
    this.mapUv(obj, 4, 44, 12, 48,  0)  // front
    this.mapUv(obj, 5, 52, 12, 56,  0)  // back
    return obj;
  }


  createRightLeg() {
    obj = this.createLeg()
    obj.position = this.leftLegPosition()

    this.mapUv(obj, 0,  4, 12,  0,  0)  // left
    this.mapUv(obj, 1, 12, 12,  8,  0)  // right
    this.mapUv(obj, 2,  8, 16,  4, 12)  // top
    this.mapUv(obj, 3, 12, 16,  8, 12)  // bottom
    this.mapUv(obj, 4,  8, 12,  4,  0)  // front
    this.mapUv(obj, 5, 16, 12, 12,  0)  // back
    return obj;
  }

  createLeftLeg() {
    var obj = this.createLeg();
    obj.position = this.rightLegPosition();

    this.mapUv(obj, 0,  8, 12, 12,  0)  // right
    this.mapUv(obj, 1,  0, 12,  4,  0)  // left
    this.mapUv(obj, 2,  4, 16,  8, 12)  // top
    this.mapUv(obj, 3,  8, 16, 12, 12)  // bottom
    this.mapUv(obj, 4,  4, 12,  8,  0)  // front
    this.mapUv(obj, 5, 12, 12, 16,  0)  // back
    return obj;
  }


  createGunBarrel() {
    var material = new THREE.MeshBasicMaterial({color: 0x333333});
    var geometry = new THREE.BoxGeometry(
      2 * this.scale,
      2 * this.scale,
      8 * this.scale
    );


    var obj = new THREE.Mesh(geometry, material);
    obj.position = {
      x: -5 * this.scale,
      y: 24 * this.scale,
      z: 12 * this.scale
    };

    return obj;
  }


  createGunHandle(scale) {
    var geometry = new THREE.BoxGeometry(
      2 * this.scale,
      2 * this.scale,
      2 * this.scale
    );

    var material = new THREE.MeshBasicMaterial({color: 0x333333});
    var obj = new THREE.Mesh(geometry, material);

    obj.position = {
      x: -5 * this.scale,
      y: 22 * this.scale,
      z: 10 * this.scale
    }

    return(obj);
  }


  headPosition() {
    var sizes = this.sizes;
    var center = sizes.armHeight + sizes.bodyHeight + (sizes.headHeight/2);

    return({
      x: 0,
      y: center * this.scale,
      z: 0
    });
  }


  bodyPosition() {
    var x = 0,
        y = (this.sizes.bodyHeight/2) + this.sizes.armHeight,
        z = 0;

    return({
      x: x * this.scale,
      y: y * this.scale,
      z: z * this.scale
    });
  }


  leftLegPosition() {
    var x = this.sizes.armWidth/2,
        y = this.sizes.armHeight,
        z = 0

    return({
      x: x * -1 * this.scale,
      y: y * this.scale,
      z: z * this.scale
    })
  }


  rightLegPosition(scale) {
    var x = this.sizes.armWidth/2,
        y = this.sizes.armHeight,
        z = 0

    return({
      x: x * this.scale,
      y: y * this.scale,
      z: z * this.scale
    });
  }


  rightHandPosition() {
    var sizes = this.sizes;
    var x = (sizes.armWidth/2) + (sizes.bodyWidth/2),
        y = sizes.armHeight + sizes.bodyHeight - (sizes.armWidth/2),
        z = 0

    return({
      x: x * this.scale,
      y: y * this.scale,
      z: z * this.scale
    });
  }


  leftHandPosition() {
    var sizes = this.sizes;
    var x = (sizes.armWidth/2) + (sizes.bodyWidth/2),
        y = sizes.armHeight + sizes.bodyHeight - (sizes.armWidth/2)
        z = 0;

    return({
      x: x * -1 * this.scale,
      y: y * this.scale,
      z: z * this.scale
    })
  }


  mapUv(obj, faceIndex, x1, y1, x2, y2) {
    var geometry = obj.geometry;
    var tileUvWeight  = 1/64;
    var tileUvHeight  = 1/32;
    var UVs = geometry.faceVertexUvs[0][faceIndex * 2];

    UVs[0].x = x1 * tileUvWeight;  UVs[0].y = y1 * tileUvHeight;
    UVs[1].x = x1 * tileUvWeight;  UVs[1].y = y2 * tileUvHeight;
    UVs[2].x = x2 * tileUvWeight;  UVs[2].y = y1 * tileUvHeight;

    UVs      = geometry.faceVertexUvs[0][faceIndex * 2 + 1];
    UVs[0].x = x1 * tileUvWeight;  UVs[0].y = y2 * tileUvHeight;
    UVs[1].x = x2 * tileUvWeight;  UVs[1].y = y2 * tileUvHeight;
    UVs[2].x = x2 * tileUvWeight;  UVs[2].y = y1 * tileUvHeight;
  }
}
