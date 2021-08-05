
export = {
  "config":{
    "development": {
      "username": process.env.PEB_USR,
      "password": process.env.PEB_PSWD,
      "database": process.env.PEB_DB,
      "host": process.env.PEB_HOST,
      "dialect": "mysql",
      // "logging": false
    },
    "test": {
      "username": process.env.PEB_USR,
      "password": process.env.PEB_PSWD,
      "database": process.env.PEB_DB+"_test",
      "host": process.env.PEB_HOST,
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.PEB_USR,
      "password": process.env.PEB_PSWD,
      "database": process.env.PEB_DB,
      "host": process.env.PEB_HOST,
      "dialect": "mysql"
    }
  }
};

