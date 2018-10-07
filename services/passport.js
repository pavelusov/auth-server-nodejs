const passport = require('passport');
const StrategyJwt = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const secret = require('../config/secret');
const User = require('../models/User');

// Опций для JWT стратегии
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  secretOrKey: secret.forJwt
};

// Создаем JWT стратегию
const jwtLogin = new StrategyJwt(jwtOptions, (payload, done) => {
  // 1. Ищем пользователя в БД.
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    // 1.1. Если такой пользователь есть
    if (user) {
      done(null, user);
    } else {
      // 1.1. Если такого пользователя нет
      done(null, false);
    }
  });
});

// Используем стратегию
passport.use(jwtLogin);