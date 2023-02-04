// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Score = require('./Score');
const runInteractiveConsole = require('./keyboard');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength, name }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.score = new Score(name);
    this.track = [];
    this.track2 = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.hero.boom.position] = this.hero.boom.skin;
    this.track2 = (new Array(this.trackLength)).fill(' ');
    this.track2[this.hero.position] = this.hero.skin;
    this.track2[this.enemy.position] = this.enemy.skin;
    this.track2[this.hero.boom.position] = this.hero.boom.skin;
  }

  check() {
    if (this.enemy.position - 1 === this.hero.boom.position ||
      this.enemy.position === this.hero.boom.position || 
      this.enemy.position + 1 === this.hero.boom.position) {
      this.score.plusScore();
      this.enemy.die();
      // this.hero.boom.moveLeft();
    }

    // if (this.hero.position === this.hero.boom.position - 2) {
    //   this.enemy.st();
    // }
    if (this.hero.position === this.hero.boom.position + 1) {
      this.hero.boom.moveLeft();
    }
    if (this.hero.position === this.enemy.position) {
      this.hero.die(this.score.scoreNumber, this.score.name);
    }
  }

  play() {
    runInteractiveConsole(this.hero);
    setInterval(() => {
      // Let's play!
      this.check();
      this.enemy.moveLeft();
      this.regenerateTrack();
      this.view.render(this.track, this.track2);
    }, 150);
  }
}

    // if (this.hero.position <= this.hero.boom.position - 2) {
    //   this.hero.boom.moveLeft();
    // }

    // if (this.enemy.position > this.hero.boom.position) {
    //   this.hero.boom.moveRight();
    // }

module.exports = Game;
