// Сделаем отдельный класс для отображения игры в консоли.
// const game = require('../run');
const { EOL } = require('os');
const Game = require('./Game');

class View {
  render(track, score, name) {
    const yourTeamName = 'BoomTeam';

    // Тут всё рисуем.
    console.clear();
    const a = '🌲'
    console.log(`${a.repeat(21)}`)
    console.log(track.map((el) => el.join('')).join(EOL));
    console.log(`${a.repeat(21)}`)
    console.log(`Good luck ${name}! Your score is ${score}`)
    console.log(EOL);
    console.log(`${EOL}Created by "${yourTeamName}"`);
  }
}

module.exports = View;
