import { Router ,  Application} from 'express'

const UserProfileController = require('./UserProfileController');
const RouteConstant = require('../../constants/Routes');
import { checkToken } from '../../utils/middleware'
const Validation = require('../../validation/UserValidation')

const router = Router();

module.exports = (app:Application) => {
  router.route('/create-wallet').post(
    checkToken,
    Validation.createWallet(),
    UserProfileController.createWallet
  );
  router.route('/get-wallet').post(
    checkToken,
    UserProfileController.getWallet
  );
  app.use(
    RouteConstant.USER,
    router
  );
};