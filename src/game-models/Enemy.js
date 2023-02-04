// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 30;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  // st() {
  //   this.generateSkin();
  //   this.position = 30;
  // }

  die() {
    this.position = -1;
    this.generateSkin()
    this.position = 30;
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
