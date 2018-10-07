const passport = require('passport');
const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');


const requireAuth = passport.authenticate('jwt', { session: false });

// 2. LOCAL STRATEGY.
// 2.7. Создаем хелпер для локальной стратегии
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res, next) => {
    res.send('Home page');
  });

  // 2. LOCAL STRATEGY.
  // 2.8. Передаем хелпер в миддлеварю для роута /signin
  app.post('/signin', requireSignIn, Authentication.signin);

  app.post('/signup', Authentication.signup);
};
