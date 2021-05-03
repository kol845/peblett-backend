const dbUtils = require('../utils/dbUtils');
const errorCodes = require('../constant/errorCodes')


module.exports = {
    getUser: async (uname, passwd) => {
      return new Promise((resolve, reject)=>{
        let db = dbUtils.getDB();
        let sql = `
        SELECT * FROM user WHERE uname =?;
        `
        db.query(sql, [uname], (err, result) =>{
          if(err) {
            throw err;
          }
          if(result.length>0){
            resolve(result[0])
          }else{
            reject(errorCodes.UNSUCCESSFUL_LOGIN.code)
          }
        })
        })
      
    },
    registerUser: async (uname, email, passwd) => {
      return new Promise((resolve, reject)=>{
      let db = dbUtils.getDB();
      let sql = `
      SELECT * FROM user WHERE uname =?;
      `
      db.query(sql, [uname], (err, result) =>{
        if(err) {
          throw err;
        }
        if(result.length>0){// Duplicate username error
          reject(errorCodes.DUPLICATE_USER_ERROR.code)
        }else{
          
          sql = `
          INSERT INTO user(uname,email,passwd) VALUES (?,?,?);
          `
          db.query(sql, [uname, email, passwd], (err, result) =>{
            if(err) {
              if(err.errno === 1062){ // Duplicate email error
                reject(errorCodes.DUPLICATE_EMAIL_ERROR.code)
              }
            }
            resolve(200)
          })
        }
      })
      })



    },
  }


//   if (err) {
//     if (err.code === '23505') {
//         reject(new Error(dbError.errorCodes.DUPLICATE_USER_ERROR.code))
//     }
// }
// if (notVaildResponse(res)) {
//     client.end()
//     reject(new Error(dbError.errorCodes.INSERTING_USER_ERROR.code))
// } else if (res.rows[0].username == user.username) {
//     client.end()
//     resolve(200)
// }