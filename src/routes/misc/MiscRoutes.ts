const MiscController = require('./MiscController');

import {Application, Request, Response} from 'express';



module.exports = (app:Application) => {
    app.use(function(req:Request, res:Response){
        MiscController.defaultResponse(req, res)
    });
};