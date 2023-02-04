const { User } = require('../../db/models');

const readBD = async (n, s) => {
    await User.create({
      name: n,
      score: s,
    })
  };

  module.exports = readBD;