// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Score = require('./Score');
const Boss = require('./game-models/boss');
const runInteractiveConsole = require('./keyboard');
const readBD = require('./game-models/readDB');
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength, name }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.boss = new Boss();
    this.view = new View();
    this.score = new Score(name);
    this.track = [];
    this.regenerateTrack(this.hero.vertical);
  }

  regenerateTrack(y) {
    // Сборка всего необходимого (герой, враг(и), оружие)
    this.track = [
      new Array(this.trackLength).fill(' '),
      new Array(this.trackLength).fill(' '),
      new Array(this.trackLength).fill(' '),
    ];
    this.track[y][this.hero.position] = this.hero.skin;
    this.track[y][this.hero.boom.position] = this.hero.boom.skin;
    // условия для enemy, чтобы не смещались по массиву при движении и атаке
    if (y === this.enemy.vertical) {
      if ((this.hero.boom.position > this.hero.position
        && this.hero.boom.vertical === this.enemy.vertical) && y === this.enemy.vertical) {
        this.track[this.enemy.vertical][this.enemy.position - 2] = this.enemy.skin;
      } else {
        this.track[this.enemy.vertical][this.enemy.position - 1] = this.enemy.skin;
      }
    } else {
      this.track[this.enemy.vertical][this.enemy.position] = this.enemy.skin;
    }
    // условия для босса, чтобы не смещался по массиву при запуске бумеранга и передвижении героя
    if (y === 0) {
      if (y === 0 && (this.hero.boom.position > this.hero.position
        // && this.hero.boom.position < this.boss.position
        && this.hero.boom.vertical === 0)) {
        this.track[0][this.boss.position - 2] = this.boss.skinT;
      } else {
        this.track[0][this.boss.position - 1] = this.boss.skinT;
      }
    } else {
      this.track[0][this.boss.position] = this.boss.skinT;
    }
    if (y === 1) {
      if (y === 1 && (this.hero.boom.position > this.hero.position
        // && this.hero.boom.position < this.boss.position
        && this.hero.boom.vertical === 1)) {
        this.track[1][this.boss.position - 2] = this.boss.skinM;
      } else {
        this.track[1][this.boss.position - 1] = this.boss.skinM;
      }
    } else {
      this.track[1][this.boss.position] = this.boss.skinM;
    }
    if (y === 2) {
      if (y === 2 && (this.hero.boom.position > this.hero.position
        // && this.hero.boom.position < this.boss.position
        && this.hero.boom.vertical === 2)) {
        this.track[2][this.boss.position - 2] = this.boss.skinB;
      } else {
        this.track[2][this.boss.position - 1] = this.boss.skinB;
      }
    } else {
      this.track[2][this.boss.position] = this.boss.skinB;
    }
    // меняем скин врага при попадании, работает не всегда
    const verticalCheck = this.enemy.vertical === this.hero.vertical;
    if (
      this.hero.boom.position >= this.enemy.position
      && verticalCheck
      && this.enemy.position > this.hero.position
    ) {
      this.enemy.skin = '';
      this.track[this.enemy.vertical][this.enemy.position - 2] = '💥💥💥';
    }
  }

  check() {
    const verticalCheck = this.enemy.vertical === this.hero.vertical;

    // убийство врага
    if (
      this.hero.boom.position >= this.enemy.position
      && verticalCheck
      && this.score.scoreNumber < 1000
    ) {
      this.score.plusScore();
      setTimeout(() => {
        this.enemy.die();
        this.enemy = new Enemy();
      }, 0);
    }
    // убийство БОССА
    if (this.hero.boom.position === this.boss.position) {
      this.boss.health.pop();
      if (this.boss.health.length < 1) {
        this.score.scoreNumber += 10000;
        this.boss.die(this.score.scoreNumber, this.score.name);
      }
    }

    // если враг пробегает мимо
    if (
      this.enemy.position <= 0
      && this.enemy.position >= -5
      && this.score.scoreNumber < 1000
    ) {
      this.enemy = new Enemy();
    }
    // позиция бумеранга по умолчанию
    if (this.hero.position >= this.hero.boom.position) {
      this.hero.boom.position = -1;
    }
    // смерть героя
    if ((this.hero.position === this.enemy.position && verticalCheck)
    || this.hero.position === this.boss.position) {
      // await readBD(this.score.name, this.score.scoreNumber);
      this.hero.die(this.score.scoreNumber, this.score.name);
    }
  }

  play() {
    runInteractiveConsole(this.hero, this.track);
    const enemyInerval = setInterval(() => {
      this.enemy.moveLeft();
      if (this.score.scoreNumber >= 1000) {
        clearInterval(enemyInerval);
        this.enemy.skin = ' ';
        this.boss.position = 40;
        this.boss.moveLeft();
      }
    }, 60);

    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack(this.hero.vertical);
      this.view.render(this.track, this.score.scoreNumber, this.score.name, this.boss.health.join(''));
    }, 30);
    // тут в базу не попадают очки, только 0
    // await readBD(this.score.name, this.score.scoreNumber)
  }
}

module.exports = Game;
