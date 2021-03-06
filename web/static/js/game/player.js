class Player {

  constructor(texture, scale=1, options={}) {
    this.scale = scale;
    this.options = {};

    this.sizes = {
      headWidth: 8, headHeight: 8, headDepth: 8,
      bodyWidth: 8, bodyHeight: 12, bodyDepth: 4,
      armWidth: 4, armHeight: 12, armDepth: 4
    };
    this.gunColor = 0x111111;

    texture.magFilter  = THREE.NearestFilter
    texture.minFilter  = THREE.NearestFilter

    var material = new THREE.MeshLambertMaterial({map: texture});
    this.createModel(material);

    return this;
  }


  createModel(material) {
    this.model = new THREE.Object3D();
    this.model.parts = {};

    let head = this.createHead(material, this.scale);
    head.name = "head";
    this.model.add(head);

    let torso = this.createTorso(material, this.scale);
    torso.name = "torso";
    this.model.add(torso);

    let leftLeg = this.createLeftLeg(material, this.scale);
    leftLeg.name = "leftLeg";
    this.model.add(leftLeg);

    let rightLeg = this.createRightLeg(material, this.scale);
    rightLeg.name = "rightLeg";
    this.model.add(rightLeg);

    let leftHand = this.createLeftHand(material, this.scale);
    leftHand.name = "leftHand";
    this.model.add(leftHand);

    let rightHandWithGun = this.createRightHandWithGun(material, this.scale);
    rightLeg.name = "rightHandWithGun";
    this.model.add(rightHandWithGun);


    let blast = this.createBlast(this.scale);
    blast.name = "blast";
    this.model.add(blast);

    // if (this.options.debug == true) {
      this.model.parts.head = head;
      this.model.parts.leftLeg = leftLeg;
      this.model.parts.torso = torso;
      this.model.parts.rightLeg = rightLeg;
      this.model.parts.leftHand = leftHand;
      this.model.parts.rightHandWithGun = rightHandWithGun;
      this.model.parts.blast = blast;
    // }
    this.model.name = "character";
  };


  update(delta) {
    let now = new Date()
    var angle = 0.001 * now*Math.PI*2

    // move the left arm
    this.model.parts.leftHand.rotation.x = 1 * Math.cos(angle)

    // move the legs
    this.model.parts.rightLeg.rotation.x = 1 * Math.cos(angle)
    this.model.parts.leftLeg.rotation.x = 1 * Math.cos(angle + Math.PI)
  }


  createBlast () {
    let blastSize = 0.3 * this.scale;

    let geometry1 = new THREE.BoxGeometry(blastSize, blastSize * 12, blastSize);
    let geometry2 = new THREE.BoxGeometry(blastSize * 12, blastSize, blastSize);
    geometry1.merge(geometry2);

    let blastMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    let blast = new THREE.Mesh(geometry1, blastMaterial);

    blast.position.set(-2, 24, 14);
    return blast;
  }


  createCube(width, height, depth, material) {
    var geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1)
    return(new THREE.Mesh(geometry, material));
  }


  createHead(material, scale) {
    var obj = this.createCube(
      this.sizes.headWidth  * scale,
      this.sizes.headHeight * scale,
      this.sizes.headDepth  * scale,
      material
    )

    var sizes = this.sizes;
    var center = sizes.armHeight + sizes.bodyHeight + (sizes.headHeight/2);
    obj.position.set(0, center * scale, 0);

    this.mapUv(obj, 0, 16, 24, 24, 16) // left
    this.mapUv(obj, 1,  0, 24,  8, 16) // right
    this.mapUv(obj, 2,  8, 32, 16, 24) // top
    this.mapUv(obj, 3, 16, 32, 24, 24) // bottom
    this.mapUv(obj, 4,  8, 24, 16, 16) // front
    this.mapUv(obj, 5, 24, 24, 32, 16) // back
    return obj;
  }


  createTorso(material, scale) {
    var obj = this.createCube(
      this.sizes.bodyWidth  * scale,
      this.sizes.bodyHeight * scale,
      this.sizes.bodyDepth  * scale,
      material
    );

    var yPos = (this.sizes.bodyHeight/2) + this.sizes.armHeight;
    obj.position.set(0, yPos * scale, 0);

    this.mapUv(obj, 0, 28, 12, 32,  0)  // left
    this.mapUv(obj, 1, 16, 12, 20,  0)  // right
    this.mapUv(obj, 2, 20, 16, 28, 12)  // top
    this.mapUv(obj, 3, 28, 16, 32, 12)  // bottom
    this.mapUv(obj, 4, 20, 12, 28,  0)  // front
    this.mapUv(obj, 5, 32, 12, 40,  0)  // back
    return obj;
  }


  createLeftHand(material, scale) {
    var sizes = this.sizes;
    var obj = this.createHand(material, scale)

    var xPos = (sizes.armWidth/2) + (sizes.bodyWidth/2),
        yPos = sizes.armHeight + sizes.bodyHeight - (sizes.armWidth/2),
        zPos = 0;

    obj.position.set(xPos * scale, yPos * scale, zPos * scale);

    this.mapUv(obj, 0, 44, 12, 40,  0)  // right
    this.mapUv(obj, 1, 52, 12, 48,  0)  // left
    this.mapUv(obj, 2, 44, 16, 48, 12)  // top
    this.mapUv(obj, 3, 48, 16, 52, 12)  // bottom
    this.mapUv(obj, 4, 48, 12, 44,  0)  // front
    this.mapUv(obj, 5, 56, 12, 52,  0)  // back
    return obj;
  }


  createHand(material, scale) {
    var width  = this.sizes.armWidth * scale;
    var height = this.sizes.armHeight * scale;
    var depth  = this.sizes.armDepth * scale;

    var geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    var translationMatrix = new THREE.Matrix4().makeTranslation(0, -height/2 + width/2, 0);

    geometry.applyMatrix(translationMatrix);

    return(new THREE.Mesh(geometry, material));
  }


  createRightLeg(material, scale) {
    var obj = this.createLeg(material, scale)

    var xPos = (this.sizes.armWidth/2) * -1,
        yPos = this.sizes.armHeight,
        zPos = 0

    obj.position.set(xPos * scale, yPos * scale, zPos * scale);


    this.mapUv(obj, 0,  4, 12,  0,  0)  // left
    this.mapUv(obj, 1, 12, 12,  8,  0)  // right
    this.mapUv(obj, 2,  8, 16,  4, 12)  // top
    this.mapUv(obj, 3, 12, 16,  8, 12)  // bottom
    this.mapUv(obj, 4,  8, 12,  4,  0)  // front
    this.mapUv(obj, 5, 16, 12, 12,  0)  // back
    return obj;
  }


  createLeftLeg(material, scale) {
    var obj = this.createLeg(material, scale);

    var xPos = this.sizes.armWidth/2,
        yPos = this.sizes.armHeight,
        zPos = 0
    obj.position.set(xPos * scale, yPos * scale, zPos * scale);


    this.mapUv(obj, 0,  8, 12, 12,  0)  // right
    this.mapUv(obj, 1,  0, 12,  4,  0)  // left
    this.mapUv(obj, 2,  4, 16,  8, 12)  // top
    this.mapUv(obj, 3,  8, 16, 12, 12)  // bottom
    this.mapUv(obj, 4,  4, 12,  8,  0)  // front
    this.mapUv(obj, 5, 12, 12, 16,  0)  // back
    return obj;
  }


  createLeg(material, scale) {
    var width  = this.sizes.armWidth  * scale;
    var height = this.sizes.armHeight * scale;
    var depth  = this.sizes.armDepth  * scale;

    var geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1)
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, -height/2, 0) )
    return(new THREE.Mesh(geometry, material));
  }


  createRightHandWithGun(material, scale) {
    let rightHandWithGun = new THREE.Object3D();

    let rightHand = this.createRightHand(material, scale);
    rightHand.name = "rightHand";
    rightHandWithGun.add(rightHand);

    let gunBarrel = this.createGunBarrel(scale);
    gunBarrel.name = "gunBarrel";
    rightHandWithGun.add(gunBarrel);

    let gunHandle = this.createGunHandle(scale);
    gunHandle.name = "gunHandle";
    rightHandWithGun.add(gunHandle);

    let sizes = this.sizes;
    let xPos = (sizes.armWidth/2) + (sizes.bodyWidth) * -1,
        yPos = sizes.armHeight + sizes.bodyHeight - (sizes.armWidth/2),
        zPos = 0;
    rightHandWithGun.position.set(xPos * scale, yPos * scale, zPos * scale);

    gunBarrel.rotateX(4.6);
    gunBarrel.position.set(0, -10, 3);

    gunHandle.rotateX(4.6);
    gunHandle.position.set(0, -10, 1);

    rightHandWithGun.rotation.x = 4.8;
    rightHandWithGun.rotation.z = 0.3;

    return rightHandWithGun;
  }


  createRightHand(material, scale) {
    var sizes = this.sizes;
    var obj = this.createHand(material, scale);

    this.mapUv(obj, 0, 48, 12, 52,  0);  // right
    this.mapUv(obj, 1, 40, 12, 44,  0);  // left
    this.mapUv(obj, 2, 44, 16, 48, 12);  // top
    this.mapUv(obj, 3, 48, 16, 52, 12);  // bottom
    this.mapUv(obj, 4, 44, 12, 48,  0);  // front
    this.mapUv(obj, 5, 52, 12, 56,  0);  // back
    return obj;
  }


  createGunBarrel(scale) {
    var material = new THREE.MeshBasicMaterial({color: this.gunColor});
    var geometry = new THREE.BoxGeometry(
      2 * scale,
      2 * scale,
      8 * scale
    );

    var obj = new THREE.Mesh(geometry, material);
    return obj;
  }


  createGunHandle(scale) {
    var geometry = new THREE.BoxGeometry(
      2 * scale,
      2 * scale,
      2 * scale
    );

    var material = new THREE.MeshBasicMaterial({color: this.gunColor});
    var obj = new THREE.Mesh(geometry, material);

    return(obj);
  }


  mapUv(obj, faceIndex, x1, y1, x2, y2) {
    var geometry = obj.geometry;
    var tileUvWeight  = 1/64;
    var tileUvHeight  = 1/32;
    var UVs = geometry.faceVertexUvs[0][faceIndex * 2];

    UVs[0].x = x1 * tileUvWeight;  UVs[0].y = y1 * tileUvHeight;
    UVs[1].x = x1 * tileUvWeight;  UVs[1].y = y2 * tileUvHeight;
    UVs[2].x = x2 * tileUvWeight;  UVs[2].y = y1 * tileUvHeight;

    UVs = geometry.faceVertexUvs[0][faceIndex * 2 + 1];
    UVs[0].x = x1 * tileUvWeight;  UVs[0].y = y2 * tileUvHeight;
    UVs[1].x = x2 * tileUvWeight;  UVs[1].y = y2 * tileUvHeight;
    UVs[2].x = x2 * tileUvWeight;  UVs[2].y = y1 * tileUvHeight;
  }
}

export default Player;
