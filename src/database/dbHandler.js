const errorCodes = require('../constants/errorCodes')

const { sequelize, User, Wallet } = require('./models')

module.exports = {
  alterTables: async () =>{ // Alters tables according to migrations
    await sequelize.sync({ alter: true })
  },
  authenticate: async () =>{ // Tests db connection
    await sequelize.authenticate()
  },
  getUser: async (userId) => {
    return new Promise( async (resolve, reject)=>{
      try{
        const user = await User.findOne({
          where: { id:userId },
          include: 'wallets',
        })
        resolve(user)
      }catch(err){
        reject(errorCodes.USER_NOT_FOUND.code)
      }
      })
  },
  getUserWithUname: async (uname) => {
    return new Promise( async (resolve, reject)=>{
      try{
        const user = await User.findOne({
          where: { uname:uname },
          include: 'wallets',
        })
        resolve(user)
      }catch(err){
        reject(errorCodes.USER_NOT_FOUND.code)
      }
    })

  },
  registerUser: async (uname, email, passwd) => {
    return new Promise( async (resolve, reject)=>{
        try{
          await User.create({ uname, email, passwd })
          resolve(200)
        }catch(err){
          if(err.original.code=="ER_DUP_ENTRY"){
            if(err.fields["user.uname"]) reject(errorCodes.DUPLICATE_USER_ERROR.code)
            else if(err.fields["user.email"])reject(errorCodes.DUPLICATE_EMAIL_ERROR.code)
            else{
              reject(errorCodes.UNKNOWN_ERROR.code)
            }
          }
        }
    })
  },
}
