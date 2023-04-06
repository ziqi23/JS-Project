import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { start } from '..';

class WorldObjects {
    constructor(world) {
        this.scene = world.scene;
        this.camera = world.camera;

        // Add Movement Logic - Allow center piece to move.
        window.addEventListener('keydown', handleMovement.bind(this));
        window.addEventListener('keyup', handleMovement.bind(this));
        this.movementState = {}
        function handleMovement(e) {
            if (e.type === "keydown") {
                switch(e.code) {
                    case 'KeyA':
                        this.movementState.a = true;
                        break
                    case 'KeyD':
                        this.movementState.d = true;
                        break
                    case 'KeyW':
                        this.movementState.w = true;
                        break
                    case 'KeyS':
                        this.movementState.s = true;
                        break
                    case 'Space':
                        this.movementState.jump = true;
                }
            } else if (e.type === "keyup") {
                switch(e.code) {
                    case 'KeyA':
                        this.movementState.a = false;
                        break
                    case 'KeyD':
                        this.movementState.d = false;
                        break
                    case 'KeyW':
                        this.movementState.w = false;
                        break
                    case 'KeyS':
                        this.movementState.s = false;
                        break
                }
            }
        }
        
        // Render objects
        world.renderer.render(world.scene, world.camera);
    }
    
    // Construct center pillars and wait for models to load
    async constructRocks() {

        let that = this;

        // Construct Cylinder 1
        const loader = new OBJLoader();
        const rockTexture = new THREE.TextureLoader().load('./assets/rocktexture.jpg');
        await loader.load("./assets/startRock.obj", function(obj) {
            obj.scale.x = 0.13;
            obj.scale.y = 0.13;
            obj.scale.z = 0.13;
            obj.position.x = -8;
            obj.position.z = -8;
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder2";
            that.scene.add(obj);
            start();
        })

        // Construct Cylinder 2
        await loader.load("./assets/startRock.obj", function(obj) {
            obj.scale.x = 0.13;
            obj.scale.y = 0.13;
            obj.scale.z = 0.13;
            obj.position.x = -8;
            obj.position.z = 8;
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder3";
            that.scene.add(obj);
            start();
        })
        
        await loader.load("./assets/startRock.obj", function(obj) {
            console.log(obj)
            obj.scale.x = 0.13;
            obj.scale.y = 0.13;
            obj.scale.z = 0.13;
            obj.position.x = 8;
            obj.position.z = 8;
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder4";
            that.scene.add(obj);
            start();
        })
        
        // Construct Cylinder 4
        await loader.load("./assets/startRock.obj", function(obj) {
            console.log(obj)
            obj.scale.x = 0.13;
            obj.scale.y = 0.13;
            obj.scale.z = 0.13;
            obj.position.x = 8;
            obj.position.z = -8;
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder5";
            that.scene.add(obj);
            start();
        })

        // Construct Center Piece
        const gltfLoader = new GLTFLoader();
        await gltfLoader.load('./assets/center.glb', function(gltf) {
            gltf.scene.scale.x = 0.3;
            gltf.scene.scale.y = 0.3;
            gltf.scene.scale.z = 0.3;
            gltf.scene.position.y = 1.5;
            gltf.scene.rotation.y = Math.PI / 2;
            gltf.scene.name = "box6";
            that.scene.add(gltf.scene);
            start();
        })
    }

    move() {

        //Handle collision between projectiles and enemies - Map each object to its bounding box
        let box6;
        this.objectsBoundingBox = {}
        this.scene.children.forEach((object) => {
            if (object.name === "box6") {
                box6 = object;
            }
            if (this.objectsBoundingBox[object.uuid] === undefined) {
                if (object.geometry || object.clock || object.name === "cylinder2" || object.name === "cylinder3" || object.name === "cylinder4" || object.name === "cylinder5" || object.name === "box6") {
                    this.objectsBoundingBox[object.uuid] = new THREE.Box3().setFromObject(object);
                }
            }
        })

        // Simulate movement & jump (camera follows center piece)
        if (this.movementState.a) {
            box6.position.x += -0.2;
            this.camera.position.x += -0.2;
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && ele.name !== "ball" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== box6.uuid && this.objectsBoundingBox[box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    box6.position.x += 0.4;
                    this.camera.position.x += 0.4;
                }
            })
        }
        
        if (this.movementState.d) {
            box6.position.x += 0.2;
            this.camera.position.x += 0.2;
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && ele.name !== "ball" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== box6.uuid && this.objectsBoundingBox[box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    box6.position.x += -0.4;
                    this.camera.position.x += -0.4;
                }
            })
        }
    
        if (this.movementState.w) {
            box6.position.z += -0.2;
            this.camera.position.z += -0.2;
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && ele.name !== "ball" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== box6.uuid && this.objectsBoundingBox[box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    box6.position.z += 0.4;
                    this.camera.position.z += 0.4;
                }
            })
        }
    
        if (this.movementState.s) {
            box6.position.z += 0.2;
            this.camera.position.z += 0.2;
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && ele.name !== "ball" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== box6.uuid && this.objectsBoundingBox[box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    box6.position.z += -0.4;
                    this.camera.position.z += -0.4;
                }
            })
        }

        if (this.movementState.jump && Math.floor(box6.position.y) === 0) {
            box6.position.y += 3;
            this.movementState.jump = false;
        } else {
            this.movementState.jump = false;
        }
    }
}

export default WorldObjects;