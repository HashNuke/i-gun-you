class Player {

  constructor(texture, scale=1) {
    texture;
    this.scale = scale;

    this.sizes = {
      headWidth: 8, headHeight: 8, headDepth: 8,
      bodyWidth: 8, bodyHeight: 12, bodyDepth: 4,
      armWidth: 4, armHeight: 12, armDepth: 4
    };

    texture.magFilter  = THREE.NearestFilter
    texture.minFilter  = THREE.NearestFilter

    var material = new THREE.MeshLambertMaterial({
      map: texture
      // side: THREE.DoubleSide
    });

    this.createModel(material);
    return this;
  }


  createModel(material) {
    this.model = new THREE.Object3D();
    this.model.parts = {};

    var head = this.createHead(material, this.scale);
    head.name = "head";
    this.model.parts.head = head
    this.model.add(head);


    var torso = this.createTorso(material, this.scale);
    this.model.parts.torso = torso;
    torso.name = "torso";
    this.model.add(torso);

    var leftHand = this.createLeftHand(material, this.scale)
    leftHand.name = "leftHand";
    this.model.parts.leftHand = leftHand;
    this.model.add(leftHand);

    var rightHand = this.createRightHand(material, this.scale);
    rightHand.name = "rightHand";
    this.model.parts.rightHand = rightHand;
    this.model.add(rightHand);

    var leftLeg = this.createLeftLeg(material, this.scale)
    leftLeg.name = "leftLeg";
    this.model.parts.leftLeg = leftLeg;
    this.model.add(leftLeg);

    var rightLeg = this.createRightLeg(material, this.scale)
    rightLeg.name = "rightLeg";
    this.model.parts.rightLeg = rightLeg;
    this.model.add(rightLeg);

    var gunBarrel = this.createGunBarrel(this.scale)
    gunBarrel.name = "gunBarrel";
    this.model.parts.gunBarrel = gunBarrel;
    this.model.add(gunBarrel);

    var gunHandle = this.createGunHandle(this.scale)
    gunHandle.name = "gunHandle";
    this.model.parts.gunHandle = gunHandle;
    this.model.add(gunHandle);

    this.model.parts.rightHand.rotation.x = 4.8;
    this.model.name = "character";
  };


  update(now) {
    var angle = (1/2) * now*Math.PI*2

    // move the left arm
    this.model.parts.leftHand.rotation.x = 1 * Math.cos(angle)

    // move the legs
    this.model.parts.rightLeg.rotation.x = 1 * Math.cos(angle)
    this.model.parts.leftLeg.rotation.x = 1 * Math.cos(angle + Math.PI)
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


  createRightHand(material, scale) {
    var sizes = this.sizes;
    var obj = this.createHand(material, scale);

    var xPos = (sizes.armWidth/2) + (sizes.bodyWidth) * -1,
        yPos = sizes.armHeight + sizes.bodyHeight - (sizes.armWidth/2),
        zPos = 0;
    obj.position.set(xPos * scale, yPos * scale, zPos * scale);

    this.mapUv(obj, 0, 48, 12, 52,  0);  // right
    this.mapUv(obj, 1, 40, 12, 44,  0);  // left
    this.mapUv(obj, 2, 44, 16, 48, 12);  // top
    this.mapUv(obj, 3, 48, 16, 52, 12);  // bottom
    this.mapUv(obj, 4, 44, 12, 48,  0);  // front
    this.mapUv(obj, 5, 52, 12, 56,  0);  // back
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


  createGunBarrel(scale) {
    var material = new THREE.MeshBasicMaterial({color: 0x333333});
    var geometry = new THREE.BoxGeometry(
      2 * scale,
      2 * scale,
      8 * scale
    );

    var obj = new THREE.Mesh(geometry, material);
    obj.position.set({
      x: -5 * scale,
      y: 24 * scale,
      z: 12 * scale
    });

    return obj;
  }


  createGunHandle(scale) {
    var geometry = new THREE.BoxGeometry(
      2 * scale,
      2 * scale,
      2 * scale
    );

    var material = new THREE.MeshBasicMaterial({color: 0xff0000});
    var obj = new THREE.Mesh(geometry, material);

    obj.position.set({
      x: -5 * scale,
      y: 22 * scale,
      z: 10 * scale
    });

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
