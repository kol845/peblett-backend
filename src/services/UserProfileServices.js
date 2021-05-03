const db = require('../model/dbHandler')

module.exports = {
  loginUser: async (params) => {
    let result = await db.loginUser(uname=params.uname, passwd=params.password);
    return result;
  },
  registerUser: async (params) => {
    await db.registerUser(uname=params.uname, email=params.email, passwd=params.password).then((result) =>{    
      return result;
    })
  },
}