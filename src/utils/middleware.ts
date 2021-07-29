let jwt = require('jsonwebtoken');
const reqResponse = require('./responseHandler');

import { errorCodes } from '../constants/errorCodes';

import { User as UserType } from '../constants/types'

import {Request, Response, NextFunction} from 'express';




let key:string = process.env.JWT_SECRET || "E{akw=3v9'8Q/dv]7zCb^*gqGiNc6UwCu`j@##hytP"

function provideToken(user:UserType){
  var token = jwt.sign({ id: user.id }, key, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
}
async function decodeToken(token:string){
  return jwt.verify(token, key);
}
function checkToken(req:Request, res:Response, next:NextFunction) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    jwt.verify(token, key, {
      ignoreExpiration: true
    }, (err:Error, decoded:string) => {
      if (err) {
        return reqResponse.errorResponse(res, errorCodes.TOKEN_ERROR.code);
      } else {
        next()
      }
    });
  } else {
    return reqResponse.errorResponse(res, errorCodes.TOKEN_MISSING.code);
  }

}

export{ provideToken, decodeToken, checkToken }