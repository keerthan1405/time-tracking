var express = require('express');
var router = express.Router();
var signUpController = require('../controllers/signUpController');
var loginController = require('../controllers/loginController');
var timerController = require('../controllers/timerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Sign up and login APIs
router.post('/signup', signUpController.create);
router.post('/login', loginController.create);

// timer APIs
router.post('/timer', timerController.create);
router.get('/timer/:user_id/:from_date/:to_date', timerController.index);
router.get('/timer/:user_id/:search_description', timerController.search);
router.delete('/timer/:user_id/:timer_id', timerController.delete);

module.exports = router;
