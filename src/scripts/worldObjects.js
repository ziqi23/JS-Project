import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

class WorldObjects {
    constructor(world) {
        this.scene = world.scene;
        this.camera = world.camera;

        // Construct Cylinder 1
        const geometry2 = new THREE.CylinderGeometry( 1, 1, 3, 20);
        const material2 = new THREE.MeshStandardMaterial({color: 0xffffff});
        const cylinder2 = new THREE.Mesh( geometry2, material2 );
        cylinder2.castShadow = true;
        cylinder2.receiveShadow = true;
        cylinder2.position.x = -8;
        cylinder2.position.z = -8;
        cylinder2.position.y = 5;
        cylinder2.name = "cylinder2"
        world.scene.add( cylinder2 );

        // Construct Cylinder 2
        const geometry3 = new THREE.CylinderGeometry( 1, 1, 3, 20);
        const material3 = new THREE.MeshStandardMaterial({color: 0xffffff});
        const cylinder3 = new THREE.Mesh( geometry3, material3 );
        cylinder3.castShadow = true;
        cylinder3.receiveShadow = true;
        cylinder3.position.x = -8;
        cylinder3.position.z = 8;
        cylinder3.position.y = 5;
        cylinder3.name = "cylinder3"
        world.scene.add( cylinder3 );
        
        // Construct Cylinder 3
        const geometry4 = new THREE.CylinderGeometry( 1, 1, 3, 20);
        const material4 = new THREE.MeshStandardMaterial({color: 0xffffff});
        const cylinder4 = new THREE.Mesh( geometry4, material4 );
        cylinder4.castShadow = true;
        cylinder4.receiveShadow = true;
        cylinder4.position.x = 8;
        cylinder4.position.z = 8;
        cylinder4.position.y = 5;
        cylinder4.name = "cylinder4"
        world.scene.add( cylinder4 );
        

        // Construct Cylinder 4
        const geometry5 = new THREE.CylinderGeometry( 1, 1, 3, 20);
        const material5 = new THREE.MeshStandardMaterial({color: 0xffffff});
        const cylinder5 = new THREE.Mesh( geometry5, material5 );
        cylinder5.castShadow = true;
        cylinder5.receiveShadow = true;
        cylinder5.position.x = 8;
        cylinder5.position.z = -8;
        cylinder5.position.y = 5;
        cylinder5.name = "cylinder5"
        world.scene.add( cylinder5 );

        // Construct center movable object 
        // let box6;       
        // const loader = new FBXLoader();
        // loader.load('./assets/modelfbx.fbx', 

        // function(object) {
        //     console.log(object)
        //     object.scale.x = 0.02;
        //     object.scale.y = 0.02;
        //     object.scale.z = 0.02;
        //     object.children.forEach((child) => {
        //         child.rotation.z = Math.PI;
        //         // child.material = new MeshStandardMaterial();
        //     })
        //     world.scene.add(object);
        //     box6 = object;
        //     object.name = "box6"
        // },

        // function(xhr) {
        //     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        // },
        
        // function(error) {
        //     console.log('An error happened');
        // })

        // this.box6 = box6;

        const geometry6 = new THREE.BoxGeometry( 1, 1, 1 )
        const material6 = new THREE.MeshStandardMaterial({color: 0xEE6637});
        const box6 = new THREE.Mesh( geometry6, material6 );
        box6.castShadow = true;
        box6.receiveShadow = true;
        box6.position.x = 0;
        box6.position.z = 0;
        box6.position.y = 5;
        box6.name = "box6"
        world.scene.add( box6 );
        this.box6 = box6;

        // Add Movement Logic - Allow center piece to move.
        window.addEventListener('keydown', handleMovement.bind(this))
        window.addEventListener('keyup', handleMovement.bind(this))
        this.movementState = {}
        function handleMovement(e) {
            if (e.type === "keydown") {
                switch(e.code) {
                    case 'KeyA':
                        this.movementState.a = true
                        break
                    case 'KeyD':
                        this.movementState.d = true
                        break
                    case 'KeyW':
                        this.movementState.w = true
                        break
                    case 'KeyS':
                        this.movementState.s = true
                        break
                    case 'Space':
                        this.movementState.jump = true
                }
            } else if (e.type === "keyup") {
                switch(e.code) {
                    case 'KeyA':
                        this.movementState.a = false
                        break
                    case 'KeyD':
                        this.movementState.d = false
                        break
                    case 'KeyW':
                        this.movementState.w = false
                        break
                    case 'KeyS':
                        this.movementState.s = false
                        break
                }
            }
        }

        
        // Render objects
        world.renderer.render(world.scene, world.camera);
    }
    
    move() {
        //Handle collision between projectiles and enemies - Map each object to its bounding box
        this.objectsBoundingBox = {}
        this.scene.children.forEach((object) => {
            if (this.objectsBoundingBox[object.uuid] === undefined) {
                // console.log("a")
                if (object.geometry) {
                    this.objectsBoundingBox[object.uuid] = new THREE.Box3().setFromObject(object);
                }
            }
        })
        // Simulate movement & jump (camera follows center piece)
        if (this.movementState.a) {
            this.box6.position.x += -0.2
            this.camera.position.x += -0.2
            //if bounding box collides, revert operation
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== this.box6.uuid && this.objectsBoundingBox[this.box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    this.box6.position.x += 0.4
                    this.camera.position.x += 0.4
                }
            })
        }
        
        if (this.movementState.d) {
            this.box6.position.x += 0.2
            this.camera.position.x += 0.2
            //if bounding box collides, revert operation
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== this.box6.uuid && this.objectsBoundingBox[this.box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    this.box6.position.x += -0.4
                    this.camera.position.x += -0.4
                }
            })
        }
    
        if (this.movementState.w) {
            this.box6.position.z += -0.2
            this.camera.position.z += -0.2
            //if bounding box collides, revert operation
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== this.box6.uuid && this.objectsBoundingBox[this.box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    this.box6.position.z += 0.4
                    this.camera.position.z += 0.4
                }
            })
        }
    
        if (this.movementState.s) {
            this.box6.position.z += 0.2
            this.camera.position.z += 0.2
            //if bounding box collides, revert operation
            this.scene.children.forEach((ele) => {
                if (ele.name !== "plane" && this.objectsBoundingBox[ele.uuid] && ele.uuid !== this.box6.uuid && this.objectsBoundingBox[this.box6.uuid].intersectsBox(this.objectsBoundingBox[ele.uuid])) {
                    this.box6.position.z += -0.4
                    this.camera.position.z += -0.4
                }
            })
        }
    

        if (this.movementState.jump && Math.floor(this.box6.position.y) === 0) {
            this.box6.position.y += 3
            this.movementState.jump = false;
        }
    }
}

export default WorldObjects;

