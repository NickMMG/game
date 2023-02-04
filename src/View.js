// Сделаем отдельный класс для отображения игры в консоли.
// const game = require('../run');
const Game = require('./Game');

class View {
  render(track, track2) {
    const yourTeamName = 'BoomTeam';

    // Тут всё рисуем.
    console.clear();
    console.log(track.join(''));
    console.log(track2.join(''));
    console.log('\n\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;

