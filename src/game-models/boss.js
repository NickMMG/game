const readBD = require('./readDB');
const { EOL } = require ('os');

class Boss {
  constructor() {
    this.skinT = '  🥶  ';
    this.skinM = '🦾🩻 🤳';
    this.skinB = ' 🦿🔧 ';
    this.position = -10;
    this.health = ['🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍'];
  }

  moveLeft() {
    // Идём влево.
    const bossMove = setInterval(() => {
      this.position -= 1;
      if (this.health.length < 1) {
        clearInterval(bossMove);
      }
    }, 400);
  }

  async die(score, name) {
    this.skinT = '  🥶 NOOOOOO!!!';
    this.skinM = '💥💥💥';
    this.skinB = '💥💥💥';
    await readBD(name, score);
    console.log(`${EOL} ${EOL} Wow wow, polegche, ${name}!! ${EOL} ${EOL} Grab your score: ${score} and don't kill us, please!${EOL} ${EOL}`)
    process.exit();
  }
}

module.exports = Boss;
