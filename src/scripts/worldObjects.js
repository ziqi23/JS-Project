import * as THREE from 'three';

class WorldObjects {
    constructor(world) {
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

        // Render objects
        world.renderer.render(world.scene, world.camera);
    }
}

export default WorldObjects;

