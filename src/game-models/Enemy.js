// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 40;
    this.vertical = Math.floor(Math.random() * 3); 
  }

  generateSkin() {
    const skins = ['👾', '🧌', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    // const skins = ['🚶‍♀️', '🏃‍♀️', '🧑‍🦯', '🧑‍🦽', '🫃', '🏃', '👵', '👴', '👶', '🎅', '👩‍🦼', '🙋‍♂️'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = -7;
  }
}

module.exports = Enemy;
