// import * as THREE from 'three';
// const Data = require('./scripts/data.js')
// const CreateGraph = require('./scripts/createGraph.js');
import World from './scripts/world.js';
import WorldObjects from './scripts/worldObjects.js';
import WorldLogic from './scripts/worldLogic.js';
import Ui from './scripts/ui.js';

const cpiGraph = document.getElementById("svg-graph");
const eciGraph = document.getElementById("eci-graph");


let w = new World();
let objects = new WorldObjects(w);
objects.constructRocks.apply(objects);
let ui = new Ui()
let numLoads = 0;


export function start() {
    numLoads += 1;
    if (numLoads === 5) {
        let logic = new WorldLogic(w, objects, ui);
        logic.run();
    }
}