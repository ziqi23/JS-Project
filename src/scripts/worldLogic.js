import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import delay from 'delay';

class WorldLogic {
    constructor(world, worldObjects, ui, muted) {
        this.scene = world.scene;
        this.camera = world.camera;
        this.renderer = world.renderer;
        this.plane = world.plane;
        this.worldObjects = worldObjects;
        this.ui = ui;
        this.muted = muted;
    }
    
    // Main function to initiate all game logic
    run() {
        // Assign variables to be handled by logic below.
        let worldObjects = this.worldObjects;
        let scene = this.scene;
        let plane = this.plane;
        let camera = this.camera;
        let renderer = this.renderer;
        let ui = this.ui;
        let muted = this.muted;
        let shotCount = 0;
        let hitCount = 0;
        let enemyAttacks = [];
        let that = this;
        let popUp;
        let playTimeClock = new THREE.Clock();
        let playerHitClock = new THREE.Clock();
        let popUpClock = new THREE.Clock();
        let objects = {
            cylinder2: undefined, 
            cylinder3: undefined, 
            cylinder4: undefined, 
            cylinder5: undefined, 
            player: undefined,
            enemySpaceship: undefined,
            cannonAttack: undefined
        };

        document.addEventListener('keydown', handleMute)
        function handleMute(e) {
            if (e.code === "KeyM") {
                muted = !muted;
            }
            if (muted) {
                document.getElementById('background-music').muted = true;
            } else {
                document.getElementById('background-music').muted = false;
            }
        }

        scene.children.forEach((child) => {
            if (Object.keys(objects).includes(child.name)) {
                objects[child.name] = child;
            }
        })   
        
        // Handle skill selection - toggle using keys '1' and '2'
        window.addEventListener("keydown", handleSkillToggle);
        let currentSkill = 1;
        function handleSkillToggle(e) {
            if (e.key === '1') {
                document.getElementById('skill-one').style.border = "3px solid gold";
                document.getElementById('skill-two').style.border = "3px solid black";
                currentSkill = 1;
            } else if (e.key === '2') {
                document.getElementById('skill-two').style.border = "3px solid gold";
                document.getElementById('skill-one').style.border = "3px solid black";
                currentSkill = 2;
            }
        }

        // Handle 'tab' to select enemies
        let selectedEnemyIdx = -1;
        let selectedEnemy;
        let selectedEnemyMesh;
        window.addEventListener('keydown', handleTab)
        function handleTab(e) {
            e.preventDefault()
            if (selectedEnemyMesh) {
                scene.remove(selectedEnemyMesh)
            }
            if (e.key === 'Tab') {
                selectedEnemyIdx += 1
                selectedEnemy = enemies[selectedEnemyIdx % enemies.length]
            }
            const boundingBox = new THREE.Box3().setFromObject(selectedEnemy);
            const selectedEnemyGeometry = new THREE.RingGeometry(5, 6, 8);
            const selectedEnemyMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});

            selectedEnemyMesh = new THREE.Mesh(selectedEnemyGeometry, selectedEnemyMaterial);
            selectedEnemyMesh.rotation.x = Math.PI / 2;
            selectedEnemyMesh.position.x = (boundingBox.max.x + boundingBox.min.x) / 2;
            selectedEnemyMesh.position.y = 0.1;
            selectedEnemyMesh.position.z = (boundingBox.max.z + boundingBox.min.z) / 2;
            scene.add(selectedEnemyMesh)
        }

        // Define enemy spawn logic
        let round = 1;
        let enemies = [];
        const metalTexture = new THREE.TextureLoader().load('./assets/metal.jpeg');
        const enemyAttackTexture = new THREE.TextureLoader().load('./assets/enemy-proj.png');

        async function gameStart() {
            selectedEnemyIdx = 0;
            for (let i = 0; i < 5 + 2 * (round - 1); i++) {
                const loader = new OBJLoader();
                await loader.load("./assets/ufoobj.obj", function(obj) {
                    obj.children[0].material = new THREE.MeshStandardMaterial({map: metalTexture});
                    obj.children[1].material = new THREE.MeshStandardMaterial({map: metalTexture});
                    obj.scale.x = 0.08;
                    obj.scale.y = 0.08;
                    obj.scale.z = 0.08;
                    obj.position.x = (Math.random() - 0.5) * 70;
                    obj.position.z = Math.random() * -100 - 25;
                    obj.name = "enemy"
                    // Each enemy has an internal timer to space attacks between
                    obj.clock = new THREE.Clock();
                    scene.add(obj);
                    enemies.push(obj);
                    enemies.sort(sortEnemies)
                })
            }

            function sortEnemies(a, b) {
                const playerLocation = objects.player.position;
                const distanceFromA = Math.sqrt((a.position.x - playerLocation.x) ** 2 + 
                (a.position.y - playerLocation.y) ** 2 + 
                (a.position.z - playerLocation.z) ** 2)
                const distanceFromB = Math.sqrt((b.position.x - playerLocation.x) ** 2 + 
                (b.position.y - playerLocation.y) ** 2 + 
                (b.position.z - playerLocation.z) ** 2)
                if (distanceFromA < distanceFromB) return -1
                if (distanceFromA > distanceFromB) return 1
                return 0;
            }

            round += 1;
        }

        // Utilize three.js raycaster to determine the coordinates at which cursor is pointed to
        const raycaster = new THREE.Raycaster();
        const mousePos = new THREE.Vector2();
        window.addEventListener('mousemove', handleMouseMoveForRaycaster);
        let pointingTo = {x: undefined, z: undefined};
        let canvasWidth = document.getElementsByTagName("canvas")[0].width;
        let canvasHeight = document.getElementsByTagName("canvas")[0].height;

        function handleMouseMoveForRaycaster(e) {
            mousePos.x = (e.clientX / canvasWidth) * 2 - 1;
            mousePos.y = - ((e.clientY / canvasHeight) * 2 - 1);
            raycaster.setFromCamera(mousePos, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects[0]) {
                // Save coordinates to pointingTo object
                pointingTo.x = intersects[0].point.x;
                pointingTo.z = intersects[0].point.z;
            }
        }

        // Listen for click and use pointingTo to determine the direction to fire object
        document.addEventListener("mousedown", handleShoot)
        let shotObjects = [];
        const skillOneTexture = new THREE.TextureLoader().load('./assets/energy-orb2.png');
        
        function handleShoot(e) {
            // Determine skill to cast and execute associated logic
            if (e.buttons === 1 && currentSkill === 1 && ui.mana >= 1) {
                const ballGeometry = new THREE.SphereGeometry(0.2, 64, 64);
                const ballMaterial = new THREE.MeshToonMaterial({map: skillOneTexture});
                const ball = new THREE.Mesh(ballGeometry, ballMaterial);
                ball.position.x = objects.player.position.x;
                ball.position.z = objects.player.position.z;
                ball.position.y = objects.player.position.y;
                ball.name = "ball";
                let audio = new Audio("./assets/laser-gun-shot.wav");
                if (!muted) audio.play();
                scene.add(ball);
                shotCount += 1;
                ui.mana -= 1;
                shotObjects.push([ball, pointingTo.x, pointingTo.z]);
            } else if (e.buttons === 1 && currentSkill === 2 && ui.mana >= 3) {
                const coneGeometry = new THREE.ConeGeometry(2, 50, 10);
                const coneMaterial = new THREE.MeshToonMaterial({map: skillOneTexture});
                const cone = new THREE.Mesh(coneGeometry, coneMaterial);
                cone.rotation.x = Math.PI;
                cone.position.x = pointingTo.x;
                cone.position.y = 50;
                cone.position.z = pointingTo.z;
                cone.name = "thunder";
                let audio = new Audio("./assets/shock-spell.mp3");
                if (!muted) audio.play();
                scene.add(cone);
                shotCount += 1;
                ui.mana -= 3;
                shotObjects.push([cone, pointingTo.x, pointingTo.z]);
            }
        }


        // Once all logic established above, run update() which handles frame by frame rendering
        function update() {
            requestAnimationFrame(update);

            // Call WorldObjects#Move method to handle movement
            worldObjects.move();

            // Move player projectiles in their PointingTo position. Remove projectiles too far out
            shotObjects.forEach((ballArray) => {
                if (ballArray[0].name === "ball") {
                    let distance = Math.sqrt((objects.player.position.x - ballArray[1]) ** 2 + (objects.player.position.z - ballArray[2]) ** 2);
                    ballArray[0].position.x += -(objects.player.position.x - ballArray[1]) / distance;
                    ballArray[0].position.z += -(objects.player.position.z - ballArray[2]) / distance;
                    if (Math.sqrt(ballArray[0].position.x ** 2 + ballArray[0].position.z ** 2) > 200) {
                        scene.remove(ballArray[0]);
                    }
                } else if (ballArray[0].name === "thunder") {
                    ballArray[0].position.y += -1;
                }
            })

            // Find objects in the scene and handle collision
            shotObjects.forEach((object) => {
                scene.children.forEach((object2) => {
                    if (object[0].uuid !== object2.uuid && that.worldObjects.objectsBoundingBox[object2.uuid] && (object2.name.includes("cylinder") || object2.name === "enemy")) {
                        if (that.worldObjects.objectsBoundingBox[object[0].uuid]?.intersectsBox(that.worldObjects.objectsBoundingBox[object2.uuid])) { 
                            let audio = new Audio("./assets/enemy-hit.mp3");
                            if (!muted) audio.play();
                            object2.collided = true;
                            scene.remove(object[0]);
                        }
                    }
                })
            })
            // Show enemy banner if selected
            if (selectedEnemy && !document.getElementById('enemy-banner')) {
                const banner = document.createElement('div');
                banner.id = 'enemy-banner';
                document.getElementById('body').appendChild(banner);
                banner.innerHTML = selectedEnemy.name
            }
            else if (!selectedEnemy) {
                document.getElementById('enemy-banner')?.remove();
            }

            // Game start condition
            if (objects.cylinder2.collided === true) {
                scene.remove(objects.cylinder2);
            }
            if (objects.cylinder3.collided === true) {
                scene.remove(objects.cylinder3);
            }
            if (objects.cylinder4.collided === true) {
                scene.remove(objects.cylinder4);
            }
            if (objects.cylinder5.collided === true) {
                scene.remove(objects.cylinder5);
            }

            let spaceship = objects.enemySpaceship;
            let cannon = objects.cannonAttack;
            if (objects.cylinder2.collided === true && objects.cylinder3.collided === true && objects.cylinder4.collided === true && objects.cylinder5.collided === true) {
                // Cannon attack moves towards enemy spaceship
                const xMovement = spaceship.position.x - cannon.position.x;
                const yMovement = spaceship.position.y - cannon.position.y;
                const zMovement = spaceship.position.z - cannon.position.z;
                cannon.position.x += xMovement * 0.05;
                cannon.position.y += yMovement * 0.05;
                cannon.position.z += zMovement * 0.05;
            }
            
            if (that.worldObjects.objectsBoundingBox[cannon.uuid]?.intersectsBox(that.worldObjects.objectsBoundingBox[spaceship.uuid])) {
                spaceship.health -= 1;
                ui.enemyHealth -= 1;
                const task = document.getElementById('task')
                task.children[1]?.remove();
                const newTask = document.createElement('h2');
                newTask.innerHTML = 'Eliminate enemies';
                task.appendChild(newTask);
                let audio = new Audio("./assets/metal-hit.wav");
                if (!muted) audio.play();
                cannon.position.x = 23;
                cannon.position.y = 10;
                cannon.position.z = 56;
                objects.cylinder2.collided = false;
                objects.cylinder3.collided = false;
                objects.cylinder4.collided = false;
                objects.cylinder5.collided = false;
                let gameStartAudio = new Audio("./assets/alien-hum.wav");
                if (!muted) gameStartAudio.play();
                gameStart();
            }

            // Handle enemies hit by player projectiles
            enemies.forEach((enemy) => {
                if (enemy.collided) {
                    scene.remove(enemy);
                    hitCount += 1;
                    ui.exp += 3;
                    if (enemies.indexOf(enemy) === selectedEnemyIdx) {
                        selectedEnemyIdx = -1;
                        selectedEnemy = null;
                        scene.remove(selectedEnemyMesh)
                        selectedEnemyMesh = null;
                    }
                    enemies.splice(enemies.indexOf(enemy), 1);
                } else {
                    if (Math.floor(enemy.clock.getElapsedTime()) > 1) {
                        enemy.clock.start();
                        const beamGeometry = new THREE.SphereGeometry(1, 32, 32);
                        const beamMaterial = new THREE.MeshToonMaterial({map: enemyAttackTexture});
                        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
                        beam.rotation.z = -Math.PI / 2;
                        beam.rotation.y = Math.PI / 2;
                        beam.rotation.x = (Math.random() * 2 - 1);
                        beam.position.x = enemy.position.x;
                        beam.position.y = enemy.position.y + 1;
                        beam.position.z = enemy.position.z;
                        beam.name = "enemyAttack";
                        enemyAttacks.push(beam);
                        scene.add(beam);
                    }
                }
                if (enemies.length === 0) {
                    scene.add(objects.cylinder2);
                    scene.add(objects.cylinder3);
                    scene.add(objects.cylinder4);
                    scene.add(objects.cylinder5);
                    const task = document.getElementById('task');
                    task.children[1].remove();
                    const newTask = document.createElement('h2');
                    newTask.innerHTML = 'Destroy the space rocks to establish a clear line of sight between your cannon and the target!'
                    task.appendChild(newTask)
                
                }
            })

            // Move each enemy attack closer to center and handle collision
            enemyAttacks.forEach((beam) => {
                beam.position.x -= beam.rotation.x * 0.5;
                beam.position.z -= beam.rotation.z;
                if (that.worldObjects.objectsBoundingBox[beam.uuid] && that.worldObjects.objectsBoundingBox[beam.uuid].intersectsBox(that.worldObjects.objectsBoundingBox[objects.player.uuid])) {
                    objects.player.collided = true;
                }
                // Remove enemy attacks too far out
                let distance = Math.sqrt((beam.position.x - objects.player.position.x) ** 2 + (beam.position.z - objects.player.position.z) ** 2);
                if (distance > 300) {
                    scene.remove(beam);
                }
            })

            // Handle player hit by enemy projectile, one second timeout between hits registering
            if (objects.player.collided === true && playerHitClock.getElapsedTime() > 1) {
                if (!popUp) {
                    let audio = new Audio("./assets/player-hit.wav");
                    if (!muted) audio.play();
                    // Show pop up damage inflicted
                    popUp = document.createElement("h1");
                    popUp.innerHTML = `-10`
                    popUp.style.position = 'absolute';
                    popUp.style.top = '30vh'
                    popUp.style.right = '50vw';
                    popUp.style.color = 'Red';
                    popUp.setAttribute("id", "pop-up")
                    document.getElementById("ui").appendChild(popUp);
                    popUpClock.start();
                    playerHitClock.start();
                    if (ui.health >= 10) {
                        ui.health -= 10;
                    } else {
                        ui.health = 0;
                    }
                }
            }
            // Remove pop up damage inflicted after 0.5 seconds
            if (popUpClock.getElapsedTime() > 0.5 && popUp) {
                let el = document.getElementById("pop-up");
                el.remove();
                popUp = undefined;
            }

            objects.player.collided = false;

            // Call Ui#BuildUi to render most updated player attributes
            ui.buildUi();

            // Simulate gravity by stopping objects when y-coordinate coincides with ground plane
            if (objects.cylinder2.position.y - 10 > plane.position.y) {
                objects.cylinder2.position.x += objects.cylinder2.direction.x
                objects.cylinder2.position.y += -0.6;
                objects.cylinder2.position.z += objects.cylinder2.direction.z

                objects.cylinder3.position.x += objects.cylinder3.direction.x
                objects.cylinder3.position.y += -0.6;
                objects.cylinder3.position.z += objects.cylinder3.direction.z

                objects.cylinder4.position.x += objects.cylinder4.direction.x
                objects.cylinder4.position.y += -0.6;
                objects.cylinder4.position.z += objects.cylinder4.direction.z

                objects.cylinder5.position.x += objects.cylinder5.direction.x
                objects.cylinder5.position.y += -0.6;
                objects.cylinder5.position.z += objects.cylinder5.direction.z
            }
            
            // Camera always follows player
            camera.lookAt(objects.player.position);

            // Render everything above
            renderer.render(scene, camera);
            
            // Game over logic - reset all objects and display end game graph
            if (ui.health <= 0 || spaceship.health <= 0) {
                if (selectedEnemyMesh) {
                    selectedEnemy = null;
                    selectedEnemyIdx = -1;
                    scene.remove(selectedEnemyMesh);
                    selectedEnemyMesh = null;
                }
                shotObjects.forEach(object => scene.remove(object));
                enemies.forEach(enemy => scene.remove(enemy));
                enemies = [];
                enemyAttacks.forEach(attack => scene.remove(attack));
                objects.player.position.x = 0;
                objects.player.position.y = 1.5;
                objects.player.position.z = 0;
                spaceship.health = 10;
                ui.health = 100;
                ui.mana = 100;
                ui.potions = 3;
                ui.manaPotions = 3;
                round = 1;
                scene.add(objects.cylinder2);
                scene.add(objects.cylinder3);
                scene.add(objects.cylinder4);
                scene.add(objects.cylinder5);
                camera.position.set(0, 10, 50);

                let gameOver = document.getElementById("endgame-stats");
                gameOver.style.visibility = "visible";
                let score = shotCount? Math.floor(hitCount ** 2 / shotCount * playTimeClock.getElapsedTime()) : 0;
                let rating;
                switch (true) {
                    case (score < 99):
                        rating = "D";
                        break;
                    case (score >= 100 && score < 999):
                        rating = "C";
                        break;
                    case (score >= 1000 && score < 9999):
                        rating = "B";
                        break;
                    case (score >= 10000 && score < 99999):
                        rating = "A";
                        break;
                    case (score >= 100000):
                        rating = "S";
                        break;
                }
                let stats = document.getElementById("stats");
                stats.innerHTML = `Total number of shots: ${shotCount}<br>
                Total hits: ${hitCount}<br>
                Accuracy: ${shotCount ? Math.floor(hitCount / shotCount * 100) : 0}%<br>
                Total time survived: ${Math.floor(playTimeClock.getElapsedTime())} seconds<br>
                Rating: ${rating}<br><br>
                Press 'enter' to play again!`
            }
        }
        update();
    }
}

export default WorldLogic;
