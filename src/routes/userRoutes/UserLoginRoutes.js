const router = require('express').Router();
const UserProfileController = require('./UserProfileController');
const RouteConstant = require('../../constant/Routes');
const Validation = require('../../validation/UserValidation')



module.exports = (app) => {
  router.route('/login').post(
      Validation.login(),
      UserProfileController.login
  );
  router.route('/register').post(
    Validation.register(),
    UserProfileController.register
  );
  app.use(
    RouteConstant.USER,
    router
  );
};