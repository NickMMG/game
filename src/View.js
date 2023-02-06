// Сделаем отдельный класс для отображения игры в консоли.
// const game = require('../run');
const { EOL } = require('os');
const Game = require('./Game');

class View {
  render(track, score, name, health) {
    const yourTeamName = 'BoomTeam';

    // Тут всё рисуем.
    console.clear();
    const a = '🌲';
    console.log(`${a.repeat(21)}`);
    console.log(track.map((el) => el.join('')).join(EOL));
    console.log(`${a.repeat(21)}`);
    if (health.length > 0) {
      console.log(`Goog luck ${name}! Your score is ${score}`);
      if (score >= 1000) {
        console.log(`BOSS health: ${health}`);
      }
    }
  }
}

module.exports = View;
