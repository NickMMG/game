class Score {
    constructor(name) {
        this.name = name;
        this.scoreNumber = 0;
        this.enemyKilled = 0;
    }
plusScore() {
    this.scoreNumber += 50;
}
plusKilled() {
    this.enemyKilled += 1;
}
}

module.exports = Score;