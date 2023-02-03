// Враг.


class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 30;
    this.score = 0;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.generateSkin();
    this.position = 30;
    console.log('Enemy is dead!');
    this.score += 1;
    console.log(this.score);
  }
}

module.exports = Enemy;

