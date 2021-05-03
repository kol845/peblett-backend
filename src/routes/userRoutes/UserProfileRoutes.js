const router = require('express').Router();
const UserProfileController = require('./UserProfileController');
const RouteConstant = require('../../constant/Routes');
const Middleware = require('../../cors/middleware').checkToken;
const Validation = require('../../validation/UserValidation')



module.exports = (app) => {
  router.route('/create-wallet').post(
    UserProfileController.createWallet
  );
  app.use(
    RouteConstant.USER,
    Middleware, // Middleware checks if token exists
    router
  );
};