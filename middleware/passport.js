const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });
    const userAuthentication = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (userAuthentication) return done(null, user);
    else return done(null, false);
  } catch (error) {
    done(error);
  }
});
