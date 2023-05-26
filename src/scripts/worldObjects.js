import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { load } from '..';

class WorldObjects {
    constructor(world) {
        this.scene = world.scene;
        this.camera = world.camera;
        this.controls = world.controls;

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
        this.constructRocks();
    }
    
    // Construct center pillars and wait for models to load
    async constructRocks() {
        let that = this;
        // Construct Cylinder 1
        const loader = new OBJLoader();
        const rockTexture = new THREE.TextureLoader().load('./assets/rocktexture.jpg');
        await loader.load("./assets/asteroid.obj", function(obj) {
            obj.scale.x = 15;
            obj.scale.y = 15;
            obj.scale.z = 15;
            obj.position.x = (Math.random() * 100) - 50;
            obj.position.y = 30;
            obj.position.z = -((Math.random() * 100) + 50);
            obj.rotation.z = Math.random() * Math.PI;
            obj.direction = {x: Math.random() - 0.5, z: Math.random() - 0.5}
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder2";
            that.scene.add(obj);
            load();
        })

        // Construct Cylinder 2
        await loader.load("./assets/asteroid.obj", function(obj) {
            obj.scale.x = 15;
            obj.scale.y = 15;
            obj.scale.z = 15;
            obj.position.x = (Math.random() * 100) - 50;
            obj.position.y = 30;
            obj.position.z = -((Math.random() * 100) + 50);
            obj.rotation.z = Math.random() * Math.PI;
            obj.direction = {x: Math.random() - 0.5, z: Math.random() - 0.5}
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder3";
            that.scene.add(obj);
            load();
        })

        // Construct Cylinder 3
        await loader.load("./assets/asteroid.obj", function(obj) {
            obj.scale.x = 15;
            obj.scale.y = 15;
            obj.scale.z = 15;
            obj.position.x = (Math.random() * 100) - 50;
            obj.position.y = 30;
            obj.position.z = -((Math.random() * 100) + 50);
            obj.rotation.z = Math.random() * Math.PI;
            obj.direction = {x: Math.random() - 0.5, z: Math.random() - 0.5}
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder4";
            that.scene.add(obj);
            load();
        })
        
        // Construct Cylinder 4
        await loader.load("./assets/asteroid.obj", function(obj) {
            obj.scale.x = 15;
            obj.scale.y = 15;
            obj.scale.z = 15;
            obj.position.x = (Math.random() * 100) - 50;
            obj.position.y = 30;
            obj.position.z = -((Math.random() * 100) + 50);
            obj.rotation.z = Math.random() * Math.PI;
            obj.direction = {x: Math.random() - 0.5, z: Math.random() - 0.5}
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "cylinder5";
            that.scene.add(obj);
            load();
        })

        await loader.load("./assets/enemy-spaceship.obj", function(obj) {
            obj.scale.x = 12;
            obj.scale.y = 12;
            obj.scale.z = 12;
            obj.rotation.x = Math.PI / 16;
            obj.position.y = 20;
            obj.position.z = -250;
            const texture = new THREE.TextureLoader().load('./assets/dark-metal-grid-1.jpg');
            obj.material = new THREE.MeshStandardMaterial({map: texture});
            obj.children.forEach(child => {
                child.material = new THREE.MeshStandardMaterial({map: texture});
            })
            obj.name = 'enemySpaceship'
            obj.health = 10;
            obj.clock = new THREE.Clock();
            that.scene.add(obj);
            load()
        })

        // Construct player spaceship
        const gltfLoader = new GLTFLoader();
        await gltfLoader.load('./assets/center.glb', function(gltf) {
            gltf.scene.scale.x = 0.3;
            gltf.scene.scale.y = 0.3;
            gltf.scene.scale.z = 0.3;
            gltf.scene.position.y = 1.5;
            gltf.scene.rotation.y = Math.PI / 2;
            gltf.scene.name = "player";
            that.scene.add(gltf.scene);
            load();
        })
    }
    
    move() {
        //Handle collision between projectiles and enemies - Map each object to its bounding box
        let player;
        let enemySpaceship;
        this.objectsBoundingBox = {}
        this.scene.children.forEach((object) => {
            if (object.name === "player") {
                player = object;
                this.player = player;
            }
            if (object.name === "enemySpaceship") {
                enemySpaceship = object;
                this.objectsBoundingBox[object.uuid] = new THREE.Box3().setFromObject(object);
            }
            if (object.name === "cannonAttack") {
                this.objectsBoundingBox[object.uuid] = new THREE.Box3().setFromObject(object);
            }
            if (object.geometry || object.clock || object.name.includes("cylinder") || object.name === "player") {
                this.objectsBoundingBox[object.uuid] = new THREE.Box3().setFromObject(object);
            }
        })

        // Handle enemy spaceship movement
        enemySpaceship.position.x += Math.cos(enemySpaceship.clock.getElapsedTime()) / 4;
        enemySpaceship.position.z += Math.sin(enemySpaceship.clock.getElapsedTime()) / 4;
        enemySpaceship.rotation.z = Math.sin((enemySpaceship.clock.getElapsedTime())) / 4;


        // Simulate movement (camera follows center piece)
        if (this.movementState.a && this.legalMove("left")) {
            player.position.x += -0.2;
            this.camera.position.x += -0.2;
        }
        
        if (this.movementState.d && this.legalMove("right")) {
            player.position.x += 0.2;
            this.camera.position.x += 0.2;
        }
    
        if (this.movementState.w && this.legalMove("forwards")) {
            player.position.z += -0.2;
            this.camera.position.z += -0.2;
        }
    
        if (this.movementState.s && this.legalMove("backwards")) {
            player.position.z += 0.2;
            this.camera.position.z += 0.2;
        }
        // player.rotation.y += 0.1;
        // const cameraOffset = new THREE.Vector3(0, 20, 50)
        // this.camera.position.copy(player.position).add(cameraOffset);
        this.controls.update();
    }

    legalMove(direction) {
        let legalMove = true;
        let playerCurrentPosition = this.objectsBoundingBox[this.player.uuid];
        let playerIntendedPosition = playerCurrentPosition;
        switch (direction) {
            case "forward":
                playerIntendedPosition.max.z -= 0.2;
                playerIntendedPosition.min.z -= 0.2;
                break;
            case "backwards":
                playerIntendedPosition.max.z += 0.2;
                playerIntendedPosition.min.z += 0.2;
                break;
            case "left":
                playerIntendedPosition.max.x -= 0.2;
                playerIntendedPosition.min.x -= 0.2;
                break;
            case "right":
                playerIntendedPosition.max.x += 0.2;
                playerIntendedPosition.min.x += 0.2;
                break;
            default:
                break;
        }

        this.scene.children.forEach(object => {
            let objectPosition = this.objectsBoundingBox[object.uuid];
            if (objectPosition && object.name !== "player" && object.name !== "plane" 
            && object.name !== "ball" && playerIntendedPosition.intersectsBox(objectPosition)) {
                legalMove = false
            }
        })

        return legalMove;
    }
}

export default WorldObjects;