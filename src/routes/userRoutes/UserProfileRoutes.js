const router = require('express').Router();
const UserProfileController = require('./UserProfileController');
const RouteConstant = require('../../constants/Routes');
const checkToken = require('../../utils/middleware').checkToken;
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