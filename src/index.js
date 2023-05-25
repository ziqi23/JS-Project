import World from './scripts/world.js';
import WorldObjects from './scripts/worldObjects.js';
import WorldLogic from './scripts/worldLogic.js';
import Ui from './scripts/ui.js';

let world = new World();
let objects = new WorldObjects(world);
let ui = new Ui()
let numLoads = 0;

export async function load() {
    numLoads += 1;
    const delay = require('delay')
    await delay(1000)
    if (numLoads === 6) {
        const loadingPage = document.getElementById('loading-page')
        const loadingAnimation = document.getElementById('loading-animation')
        loadingPage.removeChild(loadingAnimation)
        const enterButton = document.createElement('div')
        enterButton.id = 'enter-button'
        enterButton.innerHTML = 'Enter Game'
        loadingPage.appendChild(enterButton)
        enterButton.addEventListener('click', handleEnterGame)
        function handleEnterGame(e) {
            e.preventDefault()
            document.getElementById('body').removeChild(loadingPage)
            start()
        }

    }
}

export function start() {
    let logic = new WorldLogic(world, objects, ui);
    logic.run();
}