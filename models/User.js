// User model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define User model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true, // Unique value support
    lowercase: true // Save lower case value
  },
  password: String
});

userSchema.pre('save', function (next) {
  // получаем достуа к модели User
  const user = this;

  // генерируем модификатор
  bcrypt.genSalt(10, (err, salt) => {

    if (err) {
      return next(err);
    }

    // на основе модификатора и текстового пароля генерируем хеш
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      // меняем текстовый пароль на зашифрованный
      user.password = hash;
      next();
    })

  })
});

// 2. LOCAL STRATEGY.
// 2.2. Реализация метода сравнения для паролей
userSchema.methods.comparePassword = function (candidatePassword, callback) {

  // 2.3. Сравнениваем пароли с помощью bcrypt
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    // 2.4. Возвращаем true|false
    callback(null, isMatch);
  });
};

// Create User class
const User = mongoose.model('user', userSchema);

module.exports = User;
