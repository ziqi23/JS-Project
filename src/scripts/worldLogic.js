import * as THREE from 'three';
const Data = require('./data.js')
const CreateGraph = require('./createGraph.js');

class WorldLogic {
    constructor(world) {
        this.scene = world.scene
        this.camera = world.camera
        this.renderer = world.renderer
        this.plane = world.plane
    }

    run() {
        // Fetch objects to be handled by logic below.
        let scene = this.scene;
        let plane = this.plane;
        let camera = this.camera;
        let renderer = this.renderer;
        let objects = {
            cylinder2: undefined, 
            cylinder3: undefined, 
            cylinder4: undefined, 
            cylinder5: undefined, 
            box6: undefined, 
        }
        scene.children.forEach((child) => {
            if (Object.keys(objects).includes(child.name)) {
                objects[child.name] = child
            }
        })

        // Camera Angle Logic - Allow mouse dragging in multiple directions
        let down;
        window.addEventListener('mousedown', () => down = true)
        window.addEventListener('mouseup', () => down = false)
        window.addEventListener('mousemove', handleMouseMove)

        // NEED TO FIX: Don't want to go an absolute distance, but instead circle around the scene
        let oldXPos = 0;
        let oldYPos = 0;
        function handleMouseMove(e) {  
            if (down === true && e.screenY > oldYPos) {
                // camera should go up
                camera.position.y += 0.02;
            } else if (down === true && e.screenY < oldYPos) {
                // camera should go down
                camera.position.y += -0.02;
            } else if (down === true && e.screenX > oldXPos) {
                // camera should go left
                camera.position.x += -0.02;
            } else if (down === true && e.screenX < oldXPos) {
                // camera should go right
                camera.position.x += 0.02;
            }        
            oldXPos = e.screenX;
            oldYPos = e.screenY;
        }
        
        // Add Movement Logic - Allow center piece to move.
        window.addEventListener('keydown', handleMovement)
        window.addEventListener('keyup', handleMovement)
        const movementState = {}
        function handleMovement(e) {
            if (e.type === "keydown") {
                switch(e.code) {
                    case 'KeyA':
                        movementState.a = true
                        break
                    case 'KeyD':
                        movementState.d = true
                        break
                    case 'KeyW':
                        movementState.w = true
                        break
                    case 'KeyS':
                        movementState.s = true
                        break
                    case 'Space':
                        movementState.jump = true
                }
            } else if (e.type === "keyup") {
                switch(e.code) {
                    case 'KeyA':
                        movementState.a = false
                        break
                    case 'KeyD':
                        movementState.d = false
                        break
                    case 'KeyW':
                        movementState.w = false
                        break
                    case 'KeyS':
                        movementState.s = false
                        break
                }
            }
        }
        
        // Handle data visualization pop up upon user interaction (clicking "enter")
        function handleShowGraph(e) {
            if (e.code === "Enter") {
                const popUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                popUp.setAttribute("id", "eci-graph")
                const body = document.getElementsByTagName("body")
                body[0].appendChild(popUp)

                async function createEciGraph(startYear, endYear, type="general") {
                    let d = new Data();
                    let g = new CreateGraph();
                    let dataset;
                    if (type === "general") {
                        dataset = await d.fetchRegularEciData(startYear, endYear);
                    } else {
                        dataset = await d.fetchEciDataByIndustry(type, startYear, endYear)
                    }
                    g.createEciGraph(dataset, startYear, endYear)
                }

                async function createCpiGraph(startYear, endYear) {
                    let d = new Data();
                    let g = new CreateGraph();
                    let dataset = await d.fetchCpiData(startYear, endYear);
                    
                    g.createCpiGraph(dataset, startYear, endYear)
                }

                // createCpiGraph(2015, 2023);
                createEciGraph(2012, 2022, "professionalServices"); // For now, specific graph to show
            }
        }

        // Main loop to update each frame
        function update() {
            requestAnimationFrame(update)

            // Simulate collision by stopping objects when y-coordinate coincides with ground plane
            // NEED TO FIX - hard coded values based on object height, need a way to get dimension data
            // NEED TO FIX - velocity needs to increase to simulate gravity
            if (objects.cylinder2.position.y - 1.5 > plane.position.y) {
                objects.cylinder2.position.y += -0.05;
                objects.cylinder3.position.y += -0.05;
                objects.cylinder4.position.y += -0.05;
                objects.cylinder5.position.y += -0.05;
            }

            if (objects.box6.position.y - 0.5 > plane.position.y) {
                objects.box6.position.y += -0.05;
            }
            
            // Simulate movement & jump (camera follows center piece)
            if (movementState.a) {
                objects.box6.position.x += -0.2
                camera.position.x += -0.2
            }
            
            if (movementState.d) {
                objects.box6.position.x += 0.2
                camera.position.x += 0.2
            }
        
            if (movementState.w) {
                objects.box6.position.z += -0.2
                camera.position.z += -0.2
            }
        
            if (movementState.s) {
                objects.box6.position.z += 0.2
                camera.position.z += 0.2
            }

            if (movementState.jump && Math.floor(objects.box6.position.y) === 0) {
                objects.box6.position.y += 3
                movementState.jump = false;
            }
        
            // Callback to show graph if "enter" key pressed near pillars
            if (objects.box6.position.x > 7 && objects.box6.position.x < 9 && objects.box6.position.z > 7 && objects.box6.position.z < 9) {
                window.addEventListener('keydown', handleShowGraph)
            }
            if (objects.box6.position.x < -7 && objects.box6.position.x > -9 && objects.box6.position.z > 7 && objects.box6.position.z < 9) {
                window.addEventListener('keydown', handleShowGraph)
            }
            if (objects.box6.position.x > 7 && objects.box6.position.x < 9 && objects.box6.position.z < -7 && objects.box6.position.z > -9) {
                window.addEventListener('keydown', handleShowGraph)
            }
            if (objects.box6.position.x < -7 && objects.box6.position.x > -9 && objects.box6.position.z < -7 && objects.box6.position.z > -9) {
                window.addEventListener('keydown', handleShowGraph)
            }
            camera.lookAt(objects.box6.position);
            renderer.render(scene, camera)
        }
        
        update();
    }
}

export default WorldLogic;
