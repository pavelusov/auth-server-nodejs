const jwt = require('jsonwebtoken');

const User = require('../models/User');
const secret = require('../config').secret;

const getToken = (user) => {
  return jwt.sign({
    sub: user.id,
    iat: new Date().getTime()
  }, secret.forJwt);
};

// 2. LOCAL STRATEGY.
// 2.9. создаем маршрут /signin
exports.signin = (req, res, next) => {
  // 2.10. В ответ на правильную пару логин/пароль отдаем токен
  res.send({token: getToken(req.user)})
};

exports.signup = (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  // Регистрация
  // Проверяем есть ли пользователь с таким же логином(email)
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (!email || !password) {
      return res.status(422).send({error: 'Вы должны указать email и пароль'})
    }

    // Если пользователь с таким email существует, вернуть ошибку
    if (existingUser) {
      return res.status(422).send({error: 'Email уже используется'});
    }

    // Если пользователя с таким email НЕ существует, то создать User и сохранить
    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
      const token = getToken(user);
      // Вернуть пользователю токен
      res.status(201).json({token});
    });
  })
};
