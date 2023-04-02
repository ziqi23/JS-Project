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
        const geometry = new THREE.BoxGeometry( 500, 500, 0 );
        const material = new THREE.MeshStandardMaterial({color: 0x80D65D});
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI / 2;
        plane.receiveShadow = true;
        scene.add( plane );

        // Initialize mock sky (Currently only in one direction)
        const skyGeometry = new THREE.BoxGeometry( 2000, 2000, 0.1 );
        const skyMaterial = new THREE.MeshStandardMaterial({color: 0xA9D8EB});
        const skyPlane = new THREE.Mesh( skyGeometry, skyMaterial );
        skyPlane.rotation.x = -0.1;
        skyPlane.position.z += -500;
        scene.add( skyPlane );

        // Create dummy object at (0, 0, 0), set camera location and point to dummy object
        const pivot = new THREE.Object3D();
        scene.add(pivot);
        camera.position.set(0, 10, 30); // Place the camera at x: 0, y: 250, z: 500
        camera.lookAt(pivot.position); // Point camera towards the pivot

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