
import { Router,  Application} from 'express'

const UserProfileController = require('./UserProfileController');
const RouteConstant = require('../../constants/Routes');
const Validation = require('../../validation/UserValidation')

const router = Router();

module.exports = (app:Application) => {
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