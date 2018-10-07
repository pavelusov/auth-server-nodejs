const passport = require('passport');

// JWT strategy
const StrategyJwt = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// LOCAL strategy
const StrategyLocal = require('passport-local');

const secret = require('../config/secret');
const User = require('../models/User');

// Локальная стратегия
// Опции для local strategy
const localStartegy = {
  usernameField: 'email'
};
// Создаем local strategy
const localLogin = new StrategyLocal(localStartegy, (email, password, done) => {
  // 2. LOCAL STRATEGY.
  // 2.1. Ищем пользователя в БД.
  User.findOne({email}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    // Мы должны сравнить текстовый пароль от пользователя из запроса
    // с паролем который в БД (там он зашифрованный)
    // Реализация метода в файле /models/User.js пункт 2.2.
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      // 2.5. Возвращаем true|false
      return done(null, isMatch);
    });
  });
});

// JWT стратегия
// Опций для JWT стратегии
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  secretOrKey: secret.forJwt
};

// Создаем JWT стратегию
const jwtLogin = new StrategyJwt(jwtOptions, (payload, done) => {
  // 1. JWT STRATEGY. Ищем пользователя в БД.
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);

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
// 1. JWT STRATEGY.
passport.use(jwtLogin);

// 2. LOCAL STRATEGY.
// 2.6. Используем локальную стратегию
passport.use(localLogin);
