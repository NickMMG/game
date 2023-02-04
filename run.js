// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const readBD = require('./src/game-models/readDB');
const Score = require('./src/Score');
// Инициализация игры с настройками.
// let nick = process.argv[2];
const game = new Game({
  trackLength: 40,
  name: process.argv[2],
});

// Запуск игры.
// runInteractiveConsole();

game.play();
// setTimeout(async () => { await readBD(game.score.name, game.score.scoreNumber); }, 200);
