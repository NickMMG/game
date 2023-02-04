// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const readBD = require('../game/src/game-models/readDB');
// Инициализация игры с настройками.
// let nick = process.argv[2];
const game = new Game({
  trackLength: 40,
  name: process.argv[2]
});

// Запуск игры.
// runInteractiveConsole();

game.play(game);

