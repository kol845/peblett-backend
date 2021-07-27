const mysql = require('mysql2');

var _db;

const checkIfTableExist= (table)=>{
  const sql = `SHOW TABLES LIKE '${table}';`
  _db.query(sql, (err, result)=>{
    if (err) throw err;
    if(result.length === 0){
      console.log(`${table} table was not found. Creating table...`)
      createTable(table); 
    }
  })
}

const createTable = (table)=>{
  let sql;
  if(table == "user")
    sql = `
      CREATE TABLE user (
        id int NOT NULL AUTO_INCREMENT,
        uname varchar(128) NOT NULL UNIQUE,
        email varchar(128) NOT NULL UNIQUE,
        passwd varchar(256) NOT NULL,
        wallet int,
        created_at timestamp default current_timestamp,
        updated_at timestamp,
        PRIMARY KEY (id)
      )`
  else if (table=="wallet")
    sql = `
      CREATE TABLE wallet (
        id int NOT NULL AUTO_INCREMENT,
        private_key varchar(128) NOT NULL UNIQUE,
        mnomic varchar(256) NOT NULL UNIQUE,
        userID int UNIQUE,
        created_at timestamp default current_timestamp,
        updated_at timestamp,
        PRIMARY KEY (id)
      )`
  if(sql)
    _db.query(sql, (err, result)=>{
      if(err) throw err;
      console.log(`${table} table succesfully created!`)
    })

}

module.exports = {
    connectDB: (callback) => {

        // MYSQL database connection start
      
        const databaseConfig = {
          multipleStatements: true,
          host: process.env.PEB_HOST,
          user: process.env.PEB_USR,
          password: process.env.PEB_PSWD,
          database: process.env.PEB_DB,
        };
        console.log(databaseConfig)
      
        // con can be access anywhere in the project
        con = mysql.createPool(databaseConfig);
        con.getConnection((err) => {
          if (err) {
            //- The server close the connection.
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
              console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
            }
      
            //- Connection in closing
            else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
              console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
            }
      
            //- Fatal error : connection variable must be recreated
            else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
              console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
            }
      
            //- Error because a connection is already being established
            else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
              console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
            }
      
            //- Anything else
            else {
              console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
            }
      
            setTimeout(dbConnection, 5000); // Try DB connection again after 5 sec
          } else {
            _db = con // make db 'con' available for whole app
            checkIfTableExist("user");
            checkIfTableExist("wallet");
            callback();
          }
        });
      },


    getDB: () =>{
        return _db;
    },

};