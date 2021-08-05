import request from 'supertest'
import app from "./../app"
import { errorCodes } from '../constants/errorCodes';
import dbHandler from '../database/dbHandler'
// import { Application } from 'express';
// // let app: Application

// // beforeAll(async () => {
// //   app = await runServer()
// // })

let validToken:string;

beforeAll(async () => {
  // Rebuild all tables in 'test' database
  await dbHandler.forceTables()
});

describe('POST /v1/user/register', () => {
    it('should respond with 200 status code', async()=>{
      const response = await request(app).post('/v1/user/register').send({
        uname:"pebo",
        password:"pebo",
        email:"pebo@pebo.pebo"
      })
      expect(response.statusCode).toBe(200)
    })
    it('should respond with 400 - DUPLICATE_USER_ERROR', async()=>{
      const response = await request(app).post('/v1/user/register').send({
        uname:"pebo",
        password:"pebo",
        email:"pebo@pebo.pebo"
      })
      expect(response.body.code).toBe(errorCodes.DUPLICATE_USER_ERROR.code)
      expect(response.statusCode).toBe(400)
    })
    it('should respond with 400 - EMAIL_INVALID', async()=>{
      const response = await request(app).post('/v1/user/register').send({
        uname:"john",
        password:"john",
        email:"invalid-email"
      })
      expect(response.body.code).toBe(errorCodes.EMAIL_INVALID.code)
      expect(response.statusCode).toBe(400)
    })
    it('should respond with 200', async()=>{
      const response = await request(app).post('/v1/user/register').send({
        uname:"john",
        password:"john",
        email:"john@john.john"
      })
      expect(response.statusCode).toBe(200)
    })
})

describe('POST /v1/user/login', () => {
    it('should respond with 200 status code', async()=>{
      const response = await request(app).post('/v1/user/login').send({
        uname:"pebo",
        password:"pebo",
      })
      validToken = response.body.data
      expect(response.statusCode).toBe(200)
      expect(validToken).toBeDefined()
    })
    it('should respond with 200 status code', async()=>{
      const response = await request(app).post('/v1/user/login').send({
        uname:"john",
        password:"john",
      })
      expect(response.statusCode).toBe(200)
    })
    it('should respond with 400 - UNSUCCESSFUL_LOGIN', async()=>{
      const response = await request(app).post('/v1/user/login').send({
        uname:"pebo",
        password:"fake-password",
      })
      expect(response.body.code).toBe(errorCodes.UNSUCCESSFUL_LOGIN.code)
      expect(response.statusCode).toBe(400)
    })
    it('should respond with 400 - PARAMETER_MISSING', async()=>{
      const response = await request(app).post('/v1/user/login').send({
        uname:"pebo",
      })
      expect(response.body.code).toBe(errorCodes.PARAMETER_MISSING.code)
      expect(response.statusCode).toBe(400)
    })
})

describe('POST /v1/user/create-wallet', () => {

  it('should respond with 400 - PASSWORD_INVALID', async()=>{
    const response = await request(app).post('/v1/user/create-wallet').set('x-access-token', validToken).send({
      password:"fake-password"
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe(errorCodes.PASSWORD_INVALID.code)
  })
  it('should respond with 200 status code', async()=>{
    const response = await request(app).post('/v1/user/create-wallet').set('x-access-token', validToken).send({
      password:"pebo"
    })
    expect(response.statusCode).toBe(200)
  })
  it('should respond with 400 - WALLET_ALREADY_EXISTS', async()=>{
    const response = await request(app).post('/v1/user/create-wallet').set('x-access-token', validToken).send({
      password:"pebo"
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe(errorCodes.WALLET_ALREADY_EXISTS.code)
  })
  it('should respond with 400 - TOKEN_ERROR', async()=>{
    const response = await request(app).post('/v1/user/create-wallet').set('x-access-token', "fake-token").send()
    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe(errorCodes.TOKEN_ERROR.code)
  })
  it('should respond with 400 - TOKEN_MISSING', async()=>{
    const response = await request(app).post('/v1/user/create-wallet').send()
    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe(errorCodes.TOKEN_MISSING.code)
  })
})

describe('POST /v1/user/fake-uri', () => {
  it('should respond with 400 - UNKNOWN_RESOURCE_REQUEST', async()=>{
    const response = await request(app).post('/v1/user/fake-uri').send()
    expect(response.statusCode).toBe(400)
    expect(response.body.code).toBe(errorCodes.UNKNOWN_RESOURCE_REQUEST.code)
  })
})