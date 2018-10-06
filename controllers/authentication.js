const User = require('../models/User');

exports.signup = (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  // Регистрация
  // Проверяем есть ли пользователь с таким же логином(email)
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
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
      // Вернуть сообщение что пользователь создан
      res.status(201).json({message: "Пользователь создан"});
    });
  })
};
