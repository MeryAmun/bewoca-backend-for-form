const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    port: 3307,
    user: "root",
    password: "pass",
    database: 'bewoca'
    
});



/*pool.connect((err) => {
    if(err){
        console.log("Erro connecting to Db", err);
        return;
    }
    console.log('Connection established');

});*/


//module.exports = connect;