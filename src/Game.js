// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Score = require('./Score');
const runInteractiveConsole = require('./keyboard');
const readBD = require('./game-models/readDB');
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
    // this.track2 = [];
    this.regenerateTrack(this.hero.vertical);
  }

  regenerateTrack(y) {
    // Сборка всего необходимого (герой, враг(и), оружие)
    this.track = [
      new Array(this.trackLength).fill(' '),
      new Array(this.trackLength).fill(' '),
      new Array(this.trackLength).fill(' '),
    ];
    this.track[y].splice(this.hero.position, 3, this.hero.skin);
    this.track[y][this.hero.position] = this.hero.skin;
    this.track[y][this.hero.boom.position] = this.hero.boom.skin;
    this.track[this.enemy.vertical][this.enemy.position] = this.enemy.skin;
    // меняем скин врага при попадании, работает не всегда
    const verticalCheck = this.enemy.vertical === this.hero.vertical;
    if (
      this.hero.boom.position >= this.enemy.position
      && verticalCheck
      && this.enemy.position > this.hero.position
    ) {
      this.track[this.enemy.vertical].splice(this.enemy.position, 3, '💥💥💥');
    }
  }

  check() {
    const verticalCheck = this.enemy.vertical === this.hero.vertical;
    if (this.hero.boom.position >= this.enemy.position && verticalCheck) {
      this.score.plusScore();
      setTimeout(() => {
        this.enemy.die();
        this.enemy = new Enemy();
      }, 20);
    }
    if (this.enemy.position <= 0 && this.enemy.position >= -5) {
      this.enemy = new Enemy();
    }
    if (this.hero.position >= this.hero.boom.position) {
      this.hero.boom.position = -1;
    }
    if (this.hero.position === this.enemy.position && verticalCheck) {
      // await readBD(this.score.name, this.score.scoreNumber);
      this.hero.die(this.score.scoreNumber, this.score.name);
    }
  }

  play() {
    runInteractiveConsole(this.hero);
    setInterval(() => {
      this.enemy.moveLeft();
    }, 80);
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack(this.hero.vertical);
      this.view.render(this.track, this.score.scoreNumber, this.score.name);
    }, 30);
    // тут в базу не попадают очки, только 0
    // await readBD(this.score.name, this.score.scoreNumber)
  }
}

module.exports = Game;
