const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

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

//jwtStrategy  (to put the my token before post of dlt)/ to make sure no one gyess i will put my put my pass
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user);
      // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
