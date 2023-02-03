// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!
// const Enemy = require('./Enemy');
// const Hero = require('./Hero');

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = 1;
  }

  fly() {
    // this.moveRight();
    // this.moveLeft();
  }

  moveLeft() {
  this.position -= 1;
  }

  moveRight() {
    this.position += 1;  
  }
}

module.exports = Boomerang;

