const router = require('express').Router();
const MiscController = require('./MiscController');




module.exports = (app) => {
    app.use(function(req, res){
        MiscController.defaultResponse(req, res)
    });
};