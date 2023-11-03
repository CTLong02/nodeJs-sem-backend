const bcrypt = require("bcrypt");
const saltRounds = 2;
const hashPw = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const comparePw = (comparativeNeededpassword, hash) => {
  return bcrypt.compareSync(comparativeNeededpassword, hash);
};

module.exports = { hashPw, comparePw };
