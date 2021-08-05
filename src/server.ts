import chalk from 'chalk';
import pack from '../package.json';
import app from './app';

// import dbHandler from './database/dbHandler'
// dbHandler.alterTables()

const port = process.env.PORT || 4100
app.listen(port, () => {
  console.log(chalk.yellow('.......................................'));
  // console.log(chalk.green(config.name));
  console.log(chalk.green(`Port:\t\t${port}`));
  // console.log(chalk.green(`Mode:\t\t${config.mode}`));
  console.log(chalk.green(`App version:\t${pack.version}`));
  console.log(chalk.green("database connection is established"));
  console.log(chalk.yellow('.......................................'));
})


