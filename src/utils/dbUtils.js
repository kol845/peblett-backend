const mysql = require('mysql');

var _db;

const checkIfTableExist= ()=>{
  const sql = `SHOW TABLES LIKE 'user';`
  _db.query(sql, (err, result)=>{
    if (err) throw err;
    if(result.length === 0){
      console.log("User table was not found. Creating table...")
      createTable(); 
    }
  })
}
const createTable = ()=>{
  const sql = `
    CREATE TABLE user (
      id int NOT NULL AUTO_INCREMENT,
      uname varchar(128) NOT NULL UNIQUE,
      email varchar(128) NOT NULL UNIQUE,
      passwd varchar(256) NOT NULL,
      wallet varchar(256),
      rec_phrase varchar(256),
      created_at timestamp default current_timestamp,
      updated_at timestamp,
      PRIMARY KEY (id)
    )`
  _db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log("User table succesfully created!")
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
            checkIfTableExist();
            callback();
          }
        });
      },


    getDB: () =>{
        return _db;
    },

};