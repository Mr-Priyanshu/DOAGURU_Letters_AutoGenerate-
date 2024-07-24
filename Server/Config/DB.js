const mysql = require('mysql')
require('dotenv').config()

const connecion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME 
})

connecion.connect((err )=>{
  if(err){
    console.error('Here DB ERROR',err);
    return
  } else{
    console.log('YES DB Connected (*_*) Name>>>>>:', db.config.database);
  }
})

module.exports = connecion