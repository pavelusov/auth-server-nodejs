const passport = require('passport');
const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');


const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res, next) => {
    res.send('Home page');
  })

  app.post('/signup', Authentication.signup);
};
