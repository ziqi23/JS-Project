class Ui {
    constructor() {
        this.health = 100;
        this.mana = 100;
        this.exp = 0;
        this.level = 1;
        this.potions = 3;

        document.addEventListener("keydown", (e) => {
            if (e.code === "KeyQ") {
                if (this.potions >= 1) {
                    this.potions -= 1;
                    this.health = 100;
                }
            }
        })
    }

    buildUi() {
        // console.log("here", this.health)
        let health = document.getElementById("hp-img");
        // console.log(health)
        health.style.height = `${this.health / 100 * 215}px`

        let mana = document.getElementById("mp-img");
        // console.log(health)
        mana.style.height = `${this.mana / 100 * 215}px`
    }
}

export default Ui;