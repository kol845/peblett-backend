const express = require('express');
const chalk = require('chalk'); // Allows styled console logs
const cors = require('cors');
const app = express();
const pack = require('../package');
const path = require('path');
// if NODE_ENV value not define then dev value will be assign 
mode = process.env.NODE_ENV || 'dev';
// mode can be access anywhere in the project
const config = require('config').get(mode);

const dbUtils = require('./utils/dbUtils');

app.use(cors());

// use only when you want to see the metric related to express app
// app.use(require('express-status-monitor')());

require('./routes')(app);
const dir = path.join(__dirname, 'assets');
app.use('/upload', express.static(dir));

const port = process.env.PORT || config.port

const start = () => (
  app.listen(port, () => {
    console.log(chalk.yellow('.......................................'));
    console.log(chalk.green(config.name));
    console.log(chalk.green(`Port:\t\t${port}`));
    console.log(chalk.green(`Mode:\t\t${config.mode}`));
    console.log(chalk.green(`App version:\t${pack.version}`));
    console.log(chalk.green("database connection is established"));
    console.log(chalk.yellow('.......................................'));
  })
);

dbUtils.connectDB(start)


