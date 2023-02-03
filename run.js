// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const Score = require('./src/Score')
// Инициализация игры с настройками.
// let nick = process.argv[2];
const game = new Game({
  trackLength: 30,
  name: process.argv[2]
});

// Запуск игры.
// runInteractiveConsole();

game.play();