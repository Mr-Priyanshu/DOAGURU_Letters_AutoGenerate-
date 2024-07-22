const mysql = require('mysql')

const connecion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME
})

connecion.connect((err)=>{
  if(err){
    console.error('Here DB ERROR',err);
    return
  }
  console.log('YES DB Connected (*_*)');
})

module.exports = connecion