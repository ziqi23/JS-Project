import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class World {
    constructor() {

        // Initialize scene, camera and lights
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
        const light = new THREE.DirectionalLight();
        light.position.x = 0;
        light.position.z = -100;
        light.position.y = 50;
        scene.add(light);

        // NEED TO FIX - Shadows
        // light.castShadow = true;
        // light.shadow.camera.top = 100;
        // light.shadow.camera.bottom = -100;
        // light.shadow.camera.left = 100;
        // light.shadow.camera.right = -100;

        const light2 = new THREE.DirectionalLight();
        light2.position.x = 0;
        light2.position.z = 100;
        light2.position.y = 50;
        scene.add(light2);
        
        // Initialize 500x500 ground at y = 0
        const rockTexture = new THREE.TextureLoader().load('./assets/rocktexture.jpg');
        const geometry = new THREE.BoxGeometry(500, 500, 0);
        const material = new THREE.MeshStandardMaterial({map: rockTexture});
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = Math.PI / 2;
        plane.receiveShadow = true;
        plane.name = "plane";
        scene.add(plane);

        // Initialize base
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('./assets/ISS_stationary.glb', function(gltf) {
            gltf.scene.position.x = 30;
            gltf.scene.position.y = 10;
            gltf.scene.position.z = 40;
            gltf.scene.rotation.z = Math.PI;
            gltf.scene.rotation.y = Math.PI / 4;
            scene.add(gltf.scene);
        })

        // Initialize background
        const globeTexture = new THREE.TextureLoader().load('./assets/globetexture.png');
        const bgGeometry = new THREE.SphereGeometry(200, 64, 64);
        const bgMaterial = new THREE.MeshStandardMaterial({map: globeTexture});
        const bg = new THREE.Mesh(bgGeometry, bgMaterial);
        bg.position.x = 200;
        bg.position.y = -20;
        bg.position.z = -450;
        bg.name = "sky";
        scene.add(bg);

        // Initialize terrain
        const loader = new OBJLoader();
        loader.load("./assets/LargeCaveRock_Obj.obj", function(obj) {
            obj.position.y = 40;
            obj.position.x = 200;
            obj.rotation.y = Math.PI / 2
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "sky"
            scene.add(obj);
        })

        loader.load("./assets/LargeCaveRock_Obj.obj", function(obj) {
            obj.position.y = 40;
            obj.position.z = 200;
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.name = "sky"
            scene.add(obj);
        })

        loader.load("./assets/LargeCaveRock_Obj.obj", function(obj) {
            obj.position.y = 40;
            obj.position.x = -200;
            obj.children[0].material = new THREE.MeshStandardMaterial({map: rockTexture});
            obj.rotation.y = Math.PI / 2
            obj.name = "sky"
            scene.add(obj);
        })

        // Load smaller rocks at random locations
        for(let i = 0; i < 20; i++) {
            loader.load("./assets/rock1.obj", function(obj) {
                for (let i = 0; i < 3; i++) {
                    let randomRock = obj.children[i]
                    randomRock.material = new THREE.MeshStandardMaterial({map: rockTexture});
                    randomRock.scale.x = 2;
                    randomRock.scale.y = 2;
                    randomRock.scale.z = 2;
                    randomRock.position.y = -5;
                    if (Math.random() > 0.5) {
                        randomRock.position.x = (100 + Math.random() * 50)
                    } else {
                        randomRock.position.x = -(100 + Math.random() * 50)
                    }
                    randomRock.position.z = (Math.random() * 2 - 1) * 300 - 100;
                    obj.name = "sky"
                    scene.add(randomRock);
                }
            })
        }

        // Create dummy object at (0, 0, 0), set camera location and point to dummy object
        const pivot = new THREE.Object3D();
        scene.add(pivot);
        camera.position.set(0, 10, 30);
        camera.lookAt(pivot.position);

        // Set listener to adjust camera angle - Allow mouse dragging x and y directions
        let down;
        window.addEventListener('mousedown', (e) => down = e.buttons)
        window.addEventListener('mouseup', (e) => down = 0)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener("contextmenu", (e) => { e.preventDefault() })

        // Handle camera movement upon right mouse click and drag
        let oldXPos = 0;
        let oldYPos = 0;
        let xTracker = 0;
        let zTracker = 0;
        function handleMouseMove(e) {  
            let radius = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2);
            if (down === 2 && e.screenY > oldYPos && camera.position.y < 15) {
                // camera should go up
                camera.position.y += 0.05;
            } else if (down === 2 && e.screenY < oldYPos && camera.position.y > 5) {
                // camera should go down
                camera.position.y += -0.05;
            } else if (down === 2 && e.screenX > oldXPos) {
                // camera should go left
                xTracker += 0.05;
                zTracker += 0.05;
                camera.position.x += Math.cos(xTracker) * radius * -0.05;
                camera.position.z += Math.sin(zTracker) * radius * -0.05;
            } else if (down === 2 && e.screenX < oldXPos) {
                // camera should go right
                xTracker -= 0.05;
                zTracker -= 0.05;
                camera.position.x += Math.cos(xTracker) * radius * 0.05;
                camera.position.z += Math.sin(zTracker) * radius * 0.05;
            }        
            oldXPos = e.screenX;
            oldYPos = e.screenY;
        }

        // Render everything above
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(innerWidth, innerHeight);
        renderer.render(scene, camera);
        document.body.appendChild(renderer.domElement);

        // Pass objects to other classes
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer
        this.plane = plane;
    }
}

export default World;