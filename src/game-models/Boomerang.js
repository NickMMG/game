// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!
// const Enemy = require('./Enemy');
const Hero = require('./Hero');

class Boomerang {
  constructor(position, vertical) {
    this.skin = '🤜';
    this.position = position;
    this.vertical = vertical;
  }

  // fly(position) {
    // this.moveRight(position);
    // this.moveLeft(position);
  // }

  moveLeft(position) {
    const left = setInterval(() => {
      this.position -= 1;
      if (this.position === position) {
        clearInterval(left);
        this.skin = ' ';
      }
    }, 50);
  }

  moveRight(hero) {
    let counter = 0
    this.position = hero.position + 1;
    const right = setInterval(() => {
      this.position += 1;
      counter += 1
      if (counter > 6) {
        clearInterval(right)
        this.moveLeft(hero.position);
        counter = 0
      }
    }, 50);
  }
}

module.exports = Boomerang;
