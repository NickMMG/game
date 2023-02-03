// Наш герой.
const player = require("play-sound")((opts = {}));
const Boomerang = require("./Boomerang");

class Hero {
  constructor({ position } = {}) {
    this.skin = "🤠"; // можете использовать любые emoji '💃'
    this.position = position ?? 1;
    this.boom = new Boomerang();
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    player.play("./sounds/dominat.mp3", function (err) {
      if (err) console.log(err);
    });
  }

  attack() {
    // Атакуем.
    this.boom.fly();
  }

  die() {
    this.skin = "💀";
    console.log("YOU ARE DEAD!💀");
    process.exit();
  }
}

module.exports = Hero;
