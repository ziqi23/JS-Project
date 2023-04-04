import * as THREE from 'three';


class World {
    constructor() {
        // Initialize scene, camera and light
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000)
        const light = new THREE.DirectionalLight()
        light.position.x = 0;
        light.position.z = 50;
        light.position.y = 50;
        // NEED TO FIX - Shadows
        light.castShadow = true;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        scene.add(light);
        
        // Initialize 500x500 green playground
        const rockTexture = new THREE.TextureLoader().load('./assets/rocktexture.jpg');
        const geometry = new THREE.BoxGeometry( 500, 500, 0 );
        const material = new THREE.MeshStandardMaterial({map: rockTexture});
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI / 2;
        plane.receiveShadow = true;
        plane.name = "plane";
        scene.add( plane );

        // Initialize mock sky (Currently only in one direction)
        const skyGeometry = new THREE.BoxGeometry( 2000, 2000, 0.1 );
        const skyMaterial = new THREE.MeshStandardMaterial({color: 0xA9D8EB});
        const skyPlane = new THREE.Mesh( skyGeometry, skyMaterial );
        skyPlane.rotation.x = -0.1;
        skyPlane.position.z += -500;
        skyPlane.name = "sky";
        scene.add( skyPlane );

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

        // NEED TO FIX: Don't want to go an absolute distance, but instead circle around the scene
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
                xTracker += 0.01;
                zTracker += 0.01;
                camera.position.x += Math.cos(xTracker) * radius * -0.01;
                camera.position.z += Math.sin(zTracker) * radius * -0.01;
            } else if (down === 2 && e.screenX < oldXPos) {
                // camera should go right
                xTracker -= 0.01;
                zTracker -= 0.01;
                // console.log(xTracker, zTracker)
                camera.position.x += Math.cos(xTracker) * radius * 0.01;
                camera.position.z += Math.sin(zTracker) * radius * 0.01;
            }        
            oldXPos = e.screenX;
            oldYPos = e.screenY;
            // console.log(camera.position.x, camera.position.z)

        }

        // Render everything above
        const renderer = new THREE.WebGLRenderer();
        renderer.shadowMap.enabled = true;
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