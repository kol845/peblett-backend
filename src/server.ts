import express, { Application } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import pack from '../package.json';
import path from 'path';
import dbHandler from './database/dbHandler';

const app:Application = express();

// if NODE_ENV value not define then dev value will be assign 
const mode:string = process.env.NODE_ENV || 'dev';

// mode can be access anywhere in the project
// const config = require('config').get(mode);

app.use(cors());


// use only when you want to see the metric related to express app
// app.use(require('express-status-monitor')());

require('./routes')(app);
const dir = path.join(__dirname, 'assets');
app.use('/upload', express.static(dir));

app.use(express.json())

// const port = process.env.PORT || config.port
const port = process.env.PORT || 4100
const start = () => (
  app.listen(port, () => {
    console.log(chalk.yellow('.......................................'));
    // console.log(chalk.green(config.name));
    console.log(chalk.green(`Port:\t\t${port}`));
    // console.log(chalk.green(`Mode:\t\t${config.mode}`));
    console.log(chalk.green(`App version:\t${pack.version}`));
    console.log(chalk.green("database connection is established"));
    console.log(chalk.yellow('.......................................'));
  })
);

// Sequelize code
const main = async () =>{
  await dbHandler.authenticate()
  start()
}




main()



