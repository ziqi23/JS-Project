class Ui {
    constructor() {
        this.health = 100;
        this.mana = 100;
        this.exp = 0;
        this.level = 1;
        this.potions = 3;
        this.manaPotions = 3;

        document.addEventListener("keydown", (e) => {
            if (e.code === "KeyQ") {
                if (this.potions >= 1) {
                    let audio = new Audio("./assets/drink-potion.mp3")
                    audio.play();
                    this.potions -= 1;
                    this.health = 100;
                }
            } else if (e.code === "KeyE") {
                if (this.manaPotions >= 1) {
                    let audio = new Audio("./assets/drink-potion.mp3")
                    audio.play();
                    this.manaPotions -= 1;
                    this.mana = 100;
                }
            }
        })
    }

    buildUi() {
        if (document.getElementById("potion-count")) {
            document.getElementById("potion-count").innerHTML = `${this.potions}`;
        } else {
            let potionCount = document.createElement("h1");
            potionCount.setAttribute("id", "potion-count");
            potionCount.innerHTML = `${this.potions}`
            potionCount.style.position = 'absolute';
            potionCount.style.top = '78vh'
            potionCount.style.left = '17vw';
            potionCount.style.zIndex = "40";
            document.getElementById("ui").appendChild(potionCount);
        }

        if (document.getElementById("mp-potion-count")) {
            document.getElementById("mp-potion-count").innerHTML = `${this.manaPotions}`
        } else {
            let mpPotionCount = document.createElement("h1");
            mpPotionCount.setAttribute("id", "mp-potion-count");
            mpPotionCount.innerHTML = `${this.manaPotions}`
            mpPotionCount.style.position = 'absolute';
            mpPotionCount.style.top = '78vh'
            mpPotionCount.style.left = '27vw';
            mpPotionCount.style.zIndex = "40";
            document.getElementById("ui").appendChild(mpPotionCount);
        }

        // console.log("here", this.health)
        let health = document.getElementById("hp-img");
        // console.log(health)
        health.style.height = `${this.health / 100 * 215}px`

        let mana = document.getElementById("mp-img");
        // console.log(health)
        mana.style.height = `${this.mana / 100 * 215}px`

        if (this.potions === 0) {
            let el = document.getElementById("red")
            el.style.opacity = "20%";
        }

        if (this.manaPotions === 0) {
            let el = document.getElementById("blue")
            el.style.opacity = "20%";
        }
    }
}

export default Ui;