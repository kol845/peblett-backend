let jwt = require('jsonwebtoken');
const reqResponse = require('./responseHandler');
const errorCodes = require("../constant/errorCodes")

module.exports = {
  checkToken,
  provideToken,
  decodeToken
}

let key = process.env.JWT_SECRET || "E{akw=3v9'8Q/dv]7zCb^*gqGiNc6UwCu`j@##hytP"

function provideToken(user){
  var token = jwt.sign({ id: user.id }, key, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
}
async function decodeToken(token){
  try{
    return await jwt.verify(token, key);
  }catch(e){
    reqResponse.errorResponse(res, errorCodes.TOKEN_ERROR.code)
  }
  
}
function checkToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    jwt.verify(token, key, {
      ignoreExpiration: true
    }, (err, decoded) => {
      if (err) {
        return reqResponse.errorResponse(res, errorCodes.TOKEN_ERROR.code);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return reqResponse.errorResponse(res, errorCodes.TOKEN_MISSING.code);
  }

}
