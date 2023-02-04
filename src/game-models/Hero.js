// Наш герой.
const Boomerang = require('./Boomerang');
const { EOL } = require ('os');
const readBD = require('./readDB');

class Hero {
  constructor({ position } = {}) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position ?? 0;
    this.boom = new Boomerang(-1);
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
    // this.boom.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    // this.boom.position += 1;
  }

  attack(hero) {
    this.boom = new Boomerang(-1)
    this.boom.moveRight(hero)
    // this.boom.position += 1;
  }

  async die(score, name) {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    if (score > 0){
    console.log(`Not bad ${name}!! Your score: ${score}`)
    } else {
    console.log(`Ha ha sucker!!`)
  }
  await readBD(name, score);
  process.exit();
}
}

module.exports = Hero;

