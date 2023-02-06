// Наш герой.
const Boomerang = require('./Boomerang');
const { EOL } = require ('os');
const readBD = require('./readDB');

class Hero {
  constructor({ position, vertical } = {}) {
    this.skin = '😼';
    this.position = position ?? 0;
    this.boom = new Boomerang();
    this.vertical = vertical ?? 0;
  }
  moveUp() {
   if (this.vertical > 0) {
    this.vertical -= 1;
   }
  }
  moveDown() {
  if (this.vertical < 2) {
    this.vertical += 1;
  }
  }

  moveLeft() {
    // Идём влево.
    if (this.position > 0) {
    this.position -= 1;
    }
  }

  moveRight() {
    // Идём вправо.
    if (this.position < 40)
    this.position += 1;
    // this.boom.position += 1;
  }

  attack(hero) {
    this.boom = new Boomerang(-1, hero.vertical)
    this.boom.moveRight(hero)
    // this.boom.position += 1;
  }

  async die(score, name) {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    await readBD(name, score)
    if (score > 0){
    console.log(`${EOL} ${EOL}Not bad ${name}!! Your score: ${score}${EOL} ${EOL}`)
    } else {
    console.log(`${EOL} ${EOL} Ha ha sucker!!${EOL} ${EOL}`)
    } 
    //сюда вывести консоль лог с таблицей лучших результатов из базы лимитом 5.
    process.exit();
  }
}

module.exports = Hero;

