const Authentication = require('./controllers/authentication');

module.exports = (app) => {
  app.post('/signup', Authentication.signup);

  app.get('/', (req, res, next) => {
    res.send('Home page');
  })
};
