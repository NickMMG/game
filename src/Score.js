const player = require("play-sound")((opts = {}));
class Score {
  constructor(name) {
    this.name = name;
    this.scoreNumber = 0;
    this.enemyKilled = 0;
  }

  plusScore() {
    this.scoreNumber += 1;
  }

  plusKilled() {
    this.enemyKilled += 1;
  }
}
switch (this.scoreNumber) {
  case 3:
    alert(
      player.play('./sounds/dominat.mp3', function (err) {
        if (err) console.log(err);
      })
    );
    break;
  case 4:
    alert(
      player.play("./sounds/dominat.mp3", function (err) {
        if (err) console.log(err);
      })
    );
    break;
  case 5:
    alert(
      player.play("./sounds/dominat.mp3", function (err) {
        if (err) console.log(err);
      })
    );
    break;
  default:
    alert("Нет таких значений");
}
