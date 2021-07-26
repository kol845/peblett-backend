const router = require('express').Router();
const UserProfileController = require('./UserProfileController');
const RouteConstant = require('../../constant/Routes');
const checkToken = require('../../cors/middleware').checkToken;
const Validation = require('../../validation/UserValidation')


module.exports = (app) => {
  router.route('/create-wallet').post(
    checkToken,
    Validation.createWallet(),
    UserProfileController.createWallet
  );
  app.use(
    RouteConstant.USER,
    router
  );
};