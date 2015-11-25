class @Bambam.Character

  sizes:
    head:
      width:  8
      height: 8
      depth:  8
    body:
      width:  8
      height: 12
      depth:  4
    arm:
      width:  4
      height: 12
      depth:  4


  constructor: (skinUrl="/static/assets/steve.png", scale=1)->
    @model = new THREE.Object3D()
    @model.parts = {}

    texture = THREE.ImageUtils.loadTexture skinUrl
    texture.magFilter  = THREE.NearestFilter
    texture.minFilter  = THREE.NearestFilter
    material = new THREE.MeshLambertMaterial(map: texture, side: THREE.DoubleSide)

    head = @createHead(material, scale)
    @model.parts.head = head
    @model.add(head)

    body = @createBody(material, scale)
    @model.parts.body = body
    @model.add(body)

    leftHand = @createLeftHand(material, scale)
    @model.parts.leftHand = leftHand
    @model.add(leftHand)

    rightHand = @createRightHand(material, scale)
    @model.parts.rightHand = rightHand
    @model.add(rightHand)

    leftLeg = @createLeftLeg(material, scale)
    @model.parts.leftLeg = leftLeg
    @model.add(leftLeg)

    rightLeg = @createRightLeg(material, scale)
    @model.parts.rightLeg = rightLeg
    @model.add(rightLeg)

    gunBarrel = @createGunBarrel(scale)
    @model.parts.gunBarrel = gunBarrel
    @model.add(gunBarrel)

    gunHandle = @createGunHandle(scale)
    @model.parts.gunHandle = gunHandle
    @model.add(gunHandle)

    @model.parts.rightHand.rotation.x = 4.8
    @model.name = "character"
    @model


  update: (now)->
    angle = (1/2) * now*Math.PI*2

    # move the arms
    @model.parts.leftHand.rotation.x = 1 * Math.cos(angle)

    # move the legs
    @model.parts.rightLeg.rotation.x = 1 * Math.cos(angle)
    @model.parts.leftLeg.rotation.x = 1 * Math.cos(angle + Math.PI)


  createCube: (width, height, depth, material)->
    geometry = new THREE.BoxGeometry width, height, depth, 1, 1, 1
    new THREE.Mesh(geometry, material)


  createHead: (material, scale)->
    obj = @createCube(
      @sizes.head.width  * scale,
      @sizes.head.height * scale,
      @sizes.head.depth  * scale,
      material
    )
    obj.position = @headPosition(scale)

    @mapUv(obj, 0, 16, 24, 24, 16) # left
    @mapUv(obj, 1,  0, 24,  8, 16) # right
    @mapUv(obj, 2,  8, 32, 16, 24) # top
    @mapUv(obj, 3, 16, 32, 24, 24) # bottom
    @mapUv(obj, 4,  8, 24, 16, 16) # front
    @mapUv(obj, 5, 24, 24, 32, 16) # back
    obj


  createBody: (material, scale)->
    obj = @createCube(
      @sizes.body.width  * scale,
      @sizes.body.height * scale,
      @sizes.body.depth  * scale,
      material
    )
    obj.position = @bodyPosition(scale)

    @mapUv(obj, 0, 28, 12, 32,  0)  # left
    @mapUv(obj, 1, 16, 12, 20,  0)  # right
    @mapUv(obj, 2, 20, 16, 28, 12)  # top
    @mapUv(obj, 3, 28, 16, 32, 12)  # bottom
    @mapUv(obj, 4, 20, 12, 28,  0)  # front
    @mapUv(obj, 5, 32, 12, 40,  0)  # back
    obj


  createHand: (material, scale)->
    width  = @sizes.arm.width * scale
    height = @sizes.arm.height * scale
    depth  = @sizes.arm.depth * scale

    geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1)
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, -height/2 + width/2, 0) )
    new THREE.Mesh(geometry, material)


  createLeg: (material, scale)->
    width  = @sizes.arm.width * scale
    height = @sizes.arm.height * scale
    depth  = @sizes.arm.depth * scale

    geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1)
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, -height/2, 0) )
    new THREE.Mesh(geometry, material)


  createRightHand: (material, scale)->
    obj = @createHand(material, scale)
    obj.position = @leftHandPosition(scale)

    @mapUv(obj, 0, 44, 12, 40,  0)  # right
    @mapUv(obj, 1, 52, 12, 48,  0)  # left
    @mapUv(obj, 2, 44, 16, 48, 12)  # top
    @mapUv(obj, 3, 48, 16, 52, 12)  # bottom
    @mapUv(obj, 4, 48, 12, 44,  0)  # front
    @mapUv(obj, 5, 56, 12, 52,  0)  # back
    obj


  createLeftHand: (material, scale)->
    obj = @createHand(material, scale)
    obj.position = @rightHandPosition(scale)

    @mapUv(obj, 0, 48, 12, 52,  0)  # right
    @mapUv(obj, 1, 40, 12, 44,  0)  # left
    @mapUv(obj, 2, 44, 16, 48, 12)  # top
    @mapUv(obj, 3, 48, 16, 52, 12)  # bottom
    @mapUv(obj, 4, 44, 12, 48,  0)  # front
    @mapUv(obj, 5, 52, 12, 56,  0)  # back
    obj


  createRightLeg: (material, scale)->
    obj = @createLeg(material, scale)
    obj.position = @leftLegPosition(scale)

    @mapUv(obj, 0,  4, 12,  0,  0)  # left
    @mapUv(obj, 1, 12, 12,  8,  0)  # right
    @mapUv(obj, 2,  8, 16,  4, 12)  # top
    @mapUv(obj, 3, 12, 16,  8, 12)  # bottom
    @mapUv(obj, 4,  8, 12,  4,  0)  # front
    @mapUv(obj, 5, 16, 12, 12,  0)  # back
    obj


  createLeftLeg: (material, scale)->
    obj = @createLeg(material, scale)
    obj.position = @rightLegPosition(scale)

    @mapUv(obj, 0,  8, 12, 12,  0)  # right
    @mapUv(obj, 1,  0, 12,  4,  0)  # left
    @mapUv(obj, 2,  4, 16,  8, 12)  # top
    @mapUv(obj, 3,  8, 16, 12, 12)  # bottom
    @mapUv(obj, 4,  4, 12,  8,  0)  # front
    @mapUv(obj, 5, 12, 12, 16,  0)  # back
    obj


  createGunBarrel: (scale)->
    geometry = new THREE.BoxGeometry(2 * scale, 2 * scale, 8 * scale)
    material = new THREE.MeshBasicMaterial(color: 0x333333)
    obj = new THREE.Mesh( geometry, material )
    obj.position =
      x: -5 * scale
      y: 24 * scale
      z: 12 * scale
    obj


  createGunHandle: (scale)->
    geometry = new THREE.BoxGeometry(2 * scale, 2 * scale, 2 * scale)
    material = new THREE.MeshBasicMaterial(color: 0x333333)
    obj = new THREE.Mesh( geometry, material )
    obj.position =
      x: -5 * scale
      y: 22 * scale
      z: 10 * scale
    obj


  headPosition: (scale)->
    center = @sizes.arm.height + @sizes.body.height + (@sizes.head.height/2)
    {x: 0, y: center * scale, z: 0}


  bodyPosition: (scale)->
    x = 0
    y = (@sizes.body.height/2) + @sizes.arm.height
    z = 0
    {
      x: x * scale,
      y: y * scale,
      z: z * scale
    }


  leftLegPosition: (scale)->
    x = @sizes.arm.width/2
    y = @sizes.arm.height
    z = 0
    {
      x: x * -1 * scale,
      y: y * scale,
      z: z * scale
    }


  rightLegPosition: (scale)->
    x = @sizes.arm.width/2
    y = @sizes.arm.height
    z = 0
    {
      x: x * scale,
      y: y * scale,
      z: z * scale
    }


  rightHandPosition: (scale)->
    x = (@sizes.arm.width/2) + (@sizes.body.width/2)
    y = @sizes.arm.height + @sizes.body.height - (@sizes.arm.width/2)
    z = 0
    {
      x: x * scale,
      y: y * scale,
      z: z * scale
    }


  leftHandPosition: (scale)->
    x = (@sizes.arm.width/2) + (@sizes.body.width/2)
    y = @sizes.arm.height + @sizes.body.height - (@sizes.arm.width/2)
    z = 0
    {
      x: x * -1 * scale,
      y: y * scale,
      z: z * scale
    }


  mapUv: (obj, faceIndex, x1, y1, x2, y2)->
    geometry = obj.geometry
    tileUvWeight  = 1/64
    tileUvHeight  = 1/32
    UVs      = geometry.faceVertexUvs[0][faceIndex * 2]

    UVs[0].x = x1 * tileUvWeight;  UVs[0].y = y1 * tileUvHeight
    UVs[1].x = x1 * tileUvWeight;  UVs[1].y = y2 * tileUvHeight
    UVs[2].x = x2 * tileUvWeight;  UVs[2].y = y1 * tileUvHeight

    UVs      = geometry.faceVertexUvs[0][faceIndex * 2 + 1]
    UVs[0].x = x1 * tileUvWeight;  UVs[0].y = y2 * tileUvHeight
    UVs[1].x = x2 * tileUvWeight;  UVs[1].y = y2 * tileUvHeight
    UVs[2].x = x2 * tileUvWeight;  UVs[2].y = y1 * tileUvHeight
