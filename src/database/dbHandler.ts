import { errorCodes } from '../constants/errorCodes';

import db from './models/'
import {User as UserType } from '../constants/types'

const sync = async () =>{ // Creates tables if they don't exist
  await db.sequelize.sync()
}
const alterTables = async () =>{ // Alters tables according to migrations
  await db.sequelize.sync({ alter: true })
}
const forceTables = async () =>{ // Alters tables according to migrations
  await db.sequelize.sync({ force: true })
}
const checkConnection = async () =>{ // Tests db connection
  await db.sequelize.authenticate()
}

const getUser = async (userId:string) : Promise<UserType> => {
  return new Promise<UserType> ( async (resolve, reject)=>{
    try{
      const user:UserType = await db.User.findOne({
        where: { id:userId },
        // include: 'wallets', // Used to inlude assosiated wallet object in query
      })
      resolve(user)
    }catch(err){
      reject(errorCodes.USER_NOT_FOUND.code)
    }
    })
}
const getUserWithUname = async (uname:string): Promise<UserType> => {
  return new Promise<UserType>( async (resolve, reject)=>{
    try{
      const user:UserType = await db.User.findOne({
        where: { uname:uname },
      })
      resolve(user)
    }catch(err){
      reject(errorCodes.USER_NOT_FOUND.code)
    }
  })

}

const registerUser = async (uname:string, email:string, passwd:string) => {
  return new Promise( async (resolve, reject)=>{
      try{
        await db.User.create({ uname, email, passwd })
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
}
const createWallet = async (user:any, address:string,walletObj:any) => {
  return new Promise( async (resolve, reject)=>{
      try{
        const walletString = JSON.stringify(walletObj)
        const wallet = await db.Wallet.create({ address:address, walletObj:walletString})
        user.setWallet(wallet)
        resolve("Success")
      }catch(err){
        console.log(err)
        reject(errorCodes.UNKNOWN_ERROR.code)
      }
  })
}
const getWallet = async (userId:string) => {
  return new Promise( async (resolve, reject)=>{
      try{
        const user = await db.User.findOne({
          where: {id:userId},
        })
        if(await user.getWallet() == undefined) reject(errorCodes.MISSING_WALLET.code)
        else{
          resolve(await user.getWallet())
        }
      }catch(err){
        console.log(err)
        reject(errorCodes.UNKNOWN_ERROR.code)
      }
  })
}

export default {alterTables, forceTables, sync, checkConnection, getUser, getUserWithUname, registerUser, getWallet, createWallet}
