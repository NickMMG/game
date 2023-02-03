// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');
// Инициализация игры с настройками.
let nick = process.argv;
const game = new Game({
  trackLength: 30,
  name: nick
});


// Запуск игры.
// runInteractiveConsole();
game.play();

module.exports = game;