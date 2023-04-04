//Object oriented programming - constructor for each HTML element
import * as THREE from 'three';
const Data = require('./scripts/data.js')
const CreateGraph = require('./scripts/createGraph.js');
import World from './scripts/world.js';
import WorldObjects from './scripts/worldObjects.js';
import WorldLogic from './scripts/worldLogic.js';
import Ui from './scripts/ui.js';

const cpiGraph = document.getElementById("svg-graph");
const eciGraph = document.getElementById("eci-graph");

// async function createEciGraph(startYear, endYear, type="general") {
//     let d = new Data();
//     let g = new CreateGraph();
//     let dataset;
//     if (type === "general") {
//         dataset = await d.fetchRegularEciData(startYear, endYear);
//     } else {
//         dataset = await d.fetchEciDataByIndustry(type, startYear, endYear)
//     }
//     g.createEciGraph(dataset, startYear, endYear)
// }

// // createEciGraph(2012, 2022, "professionalServices");

// async function createCpiGraph(startYear, endYear) {
//     let d = new Data();
//     let g = new CreateGraph();
//     let dataset = await d.fetchCpiData(startYear, endYear);
    
//     g.createCpiGraph(dataset, startYear, endYear)
// }

// createCpiGraph(2015, 2023);

// let toggleButton = document.getElementById("toggle-graph");
// let goodsButton = document.getElementById("goods");
// let servicesButton = document.getElementById("services");

// toggleButton.addEventListener('click', handleClick);

// function handleClick(e) {
//     e.preventDefault();
//     // console.log(el.style.display)
//     if (cpiGraph.getAttribute("visibility") === "visible") {
//         cpiGraph.setAttribute("visibility", "hidden");
//     } else {
//         cpiGraph.setAttribute("visibility", "visible");
//     }
// }

// goodsButton.addEventListener('click', handleGoodsClick);

// function handleGoodsClick(e) {
//     e.preventDefault();
//     let container = document.getElementById("eci-graph")
//     container.remove();

//     let newContainer = document.createElement("svg");
//     newContainer.setAttribute("id", "eci-graph");
//     document.getElementById("eci-holder").appendChild(newContainer);
//     createEciGraph(2015, 2022);
// }

let w = new World();
let objects = new WorldObjects(w);
let ui = new Ui()
let logic = new WorldLogic(w, objects, ui);
logic.run();
// document.body.appendChild(renderer.domElement);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000)
// const renderer = new THREE.WebGLRenderer();
// const light = new THREE.DirectionalLight()
// light.position.z = 20;
// light.position.y = 30;
// scene.add(light);

// const geometry = new THREE.BoxGeometry( 500, 500, 0 );
// // geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
// const material = new THREE.MeshStandardMaterial({color: 0x80D65D});
// const plane = new THREE.Mesh( geometry, material );
// plane.rotation.x = Math.PI / 2;
// scene.add( plane );

// const skyGeometry = new THREE.BoxGeometry( 2000, 2000, 0.1 );
// // geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
// const skyMaterial = new THREE.MeshStandardMaterial({color: 0xA9D8EB});
// const skyPlane = new THREE.Mesh( skyGeometry, skyMaterial );
// skyPlane.rotation.x = -0.1;
// skyPlane.position.z += -500;
// scene.add( skyPlane );

// const geometry2 = new THREE.CylinderGeometry( 1, 1, 3, 20);
// const material2 = new THREE.MeshStandardMaterial({color: 0xffffff});
// const cylinder2 = new THREE.Mesh( geometry2, material2 );
// cylinder2.position.x = -8;
// cylinder2.position.z = -8;
// cylinder2.position.y = 5;
// // cylinder2.rotation.x = 90;
// // cylinder2.rotation.y = 90;
// scene.add( cylinder2 );

// const geometry3 = new THREE.CylinderGeometry( 1, 1, 3, 20);
// const material3 = new THREE.MeshStandardMaterial({color: 0xffffff});
// const cylinder3 = new THREE.Mesh( geometry3, material3 );
// cylinder3.position.x = -8;
// cylinder3.position.z = 8;
// cylinder3.position.y = 5;
// scene.add( cylinder3 );

// const geometry4 = new THREE.CylinderGeometry( 1, 1, 3, 20);
// const material4 = new THREE.MeshStandardMaterial({color: 0xffffff});
// const cylinder4 = new THREE.Mesh( geometry4, material4 );
// cylinder4.position.x = 8;
// cylinder4.position.z = 8;
// cylinder4.position.y = 5;
// scene.add( cylinder4 );

// const geometry5 = new THREE.CylinderGeometry( 1, 1, 3, 20);
// const material5 = new THREE.MeshStandardMaterial({color: 0xffffff});
// const cylinder5 = new THREE.Mesh( geometry5, material5 );
// cylinder5.position.x = 8;
// cylinder5.position.z = -8;
// cylinder5.position.y = 5;
// scene.add( cylinder5 );

// const geometry6 = new THREE.BoxGeometry( 1, 1, 1 )
// const material6 = new THREE.MeshStandardMaterial({color: 0xEE6637});
// const box6 = new THREE.Mesh( geometry6, material6 );
// box6.position.x = 0;
// box6.position.z = 0;
// box6.position.y = 5;
// scene.add( box6 );

// // camera.position.z = 30;

// const pivot = new THREE.Object3D(); // Will be at scene origin by default
// // pivot.add(camera); // Add the camera object to the pivot object (parent-child relationship)
// scene.add(pivot);

// camera.position.set(0, 10, 30); // Place the camera at x: 0, y: 250, z: 500
// camera.lookAt(pivot.position); // Point camera towards the pivot

// renderer.setSize(innerWidth, innerHeight);
// renderer.render(scene, camera);

// // Add Camera angles
// let down;
// window.addEventListener('mousedown', () => down = true)
// window.addEventListener('mouseup', () => down = false)
// window.addEventListener('mousemove', handleMouseMove)

// // function handleMouseDown(e) {
// //     let currentMousePos;
// //     console.log(e)

// // }
// // Consider position immediately before movement
// let oldXPos = 0;
// let oldYPos = 0;

// function handleMouseMove(e) {  //Don't want to go an absolute distance, but instead circle around the scene
//     // console.log(e)
//     if (down === true && e.screenY > oldYPos) {
//         // console.log("camera should go up")
//         camera.position.y += 0.02;
//     } else if (down === true && e.screenY < oldYPos) {
//         // console.log("camera should go down")
//         camera.position.y += -0.02;
//     } else if (down === true && e.screenX > oldXPos) {
//         // console.log("camera should go left")
//         camera.position.x += -0.02;
//     } else if (down === true && e.screenX < oldXPos) {
//         // console.log("camera should go right")
//         camera.position.x += 0.02;
//     }
//     // console.log(oldXPos, oldYPos)

//     oldXPos = e.screenX;
//     oldYPos = e.screenY;
// }
// // Add light


// window.addEventListener('keydown', handleMovement)
// window.addEventListener('keyup', handleMovement)
// const movementState = {}
// function handleMovement(e) {
//     // console.log(e)
//     if (e.type === "keydown") {
//         switch(e.code) {
//             case 'KeyA':
//                 movementState.a = true
//                 break
//             case 'KeyD':
//                 movementState.d = true
//                 break
//             case 'KeyW':
//                 movementState.w = true
//                 break
//             case 'KeyS':
//                 movementState.s = true
//                 break
//             case 'Space':
//                 movementState.jump = true
//         }
//     } else if (e.type === "keyup") {
//         switch(e.code) {
//             case 'KeyA':
//                 movementState.a = false
//                 break
//             case 'KeyD':
//                 movementState.d = false
//                 break
//             case 'KeyW':
//                 movementState.w = false
//                 break
//             case 'KeyS':
//                 movementState.s = false
//                 break
//         }
//     }
// }

// function handleShowGraph(e) {
//     if (e.code === "Enter") {
//         console.log("Show Graph")
//         const popUp2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//         popUp2.setAttribute("id", "eci-graph")
//         // const popUp = document.createElement("h1")
//         // popUp.innerHTML = "Hi"
//         const body = document.getElementsByTagName("body")
//         // body[0].appendChild(popUp)
//         body[0].appendChild(popUp2)
//         createEciGraph(2012, 2022, "professionalServices");
//     }
// }




// function update() {
//     requestAnimationFrame(update)

//     if (cylinder2.position.y - 1.5 > plane.position.y) {
//         cylinder2.position.y += -0.05;
//         cylinder3.position.y += -0.05;
//         cylinder4.position.y += -0.05;
//         cylinder5.position.y += -0.05;
//     }
//     if (box6.position.y - 0.5 > plane.position.y) {
//         box6.position.y += -0.05;
//     }

//     if (movementState.a) {
//         box6.position.x += -0.2
//         camera.position.x += -0.2
//     }
    
//     if (movementState.d) {
//         box6.position.x += 0.2
//         camera.position.x += 0.2
//     }

//     if (movementState.w) {
//         box6.position.z += -0.2
//         camera.position.z += -0.2
//     }

//     if (movementState.s) {
//         box6.position.z += 0.2
//         camera.position.z += 0.2
//     }
//     // console.log(box6.position.y)
//     if (movementState.jump && Math.floor(box6.position.y) === 0) {
//         box6.position.y += 3
//         movementState.jump = false;
//     }

//     //Alert when colliding with cylinders at 7-9 space
//     if (box6.position.x > 7 && box6.position.x < 9 && box6.position.z > 7 && box6.position.z < 9) {
//         window.addEventListener('keydown', handleShowGraph)
//     }
//     if (box6.position.x < -7 && box6.position.x > -9 && box6.position.z > 7 && box6.position.z < 9) {
//         window.addEventListener('keydown', handleShowGraph)
//     }
//     if (box6.position.x > 7 && box6.position.x < 9 && box6.position.z < -7 && box6.position.z > -9) {
//         window.addEventListener('keydown', handleShowGraph)
//     }
//     if (box6.position.x < -7 && box6.position.x > -9 && box6.position.z < -7 && box6.position.z > -9) {
//         window.addEventListener('keydown', handleShowGraph)
//     }

//     // window.removeEventListener('keydown', handleShowGraph)
     
//     // plane.rotation.z += 0.02;
//     // camera.position.x += 0.1;
//     // camera.position.y += 0.1;
//     camera.lookAt(box6.position);
//     // cylinder2.rotation.x += 0.02;
//     // cylinder2.rotation.y += 0.02;
//     // plane.rotation.y += 0.02;
//     renderer.render(scene, camera)
// }

// update();


// document.body.appendChild(renderer.domElement);
















// let cpiData;
// // let salaryData;
// let eciData;


// async function fetchData() {
//     cpiData = await fetch("https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA?start_date=2015-02-28&end_date=2023-02-28&api_key=z4ZhwWk_L5Tp-MszdTFD")
//     .then(async function (response) {
//         // console.log(response)
//         cpiData = await response.json();
//             console.log(cpiData.dataset.data.reverse())
//             createGraph2(cpiData.dataset.data.reverse());

//         // data.dataset.data.forEach((date) => {
//         //     let newEle = document.createElement("div");
//         //     newEle.innerHTML = date;
//         //     el.appendChild(newEle);
//         // })
//         // console.log(newEle);
//     })
//     return cpiData
// }

// fetchData();

// salaryData = fetch("https://api.stlouisfed.org/fred/series/observations?series_id=CEU0500000003&api_key=50c37cf826ff0bb2e15e19cb6d19483f&file_type=json", {headers: {'Access-Control-Allow-Origin': '*'}})
//         .then(async function(res) {
//             console.log(res);
//             salaryData = res.json();
//             console.log(salaryData);
//         })

// fetch("https://api.bls.gov/publicAPI/v2/timeseries/data/CMU2010000000000D?registrationkey=7f547dfafd2b470cbd505daa838b9304&catalog=true&startyear=2015&endyear=2022")
//     .then(async function(response) {
//         // console.log(response);
//         eciData = await response.json();
//         // console.log(eciData.Results.series[0].data);
//         createEciGraph(eciData.Results.series[0].data.reverse());
//     })






