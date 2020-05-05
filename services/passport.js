const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require('../models');
const { SECRET_KEY } = require('../config/passport.config');

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(
  'jwt-authentication',
  new JWTStrategy(options, async (payload, done) => {
    const user = await User.findOne({
      where: {
        id: payload.id,
        name: user.name
      }
    });

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
);
