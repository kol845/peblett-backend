
module.exports = {
  "config":{
    "development": {
      "username": process.env.PEB_USR,
      "password": process.env.PEB_PSWD,
      "database": process.env.PEB_DB,
      "host": process.env.PEB_HOST,
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
};

