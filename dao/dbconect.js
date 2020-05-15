const mysql = require('mysql');

function createConnection(){
    const conneciton = mysql.createConnection({
        // host: '121.36.51.141',
        host:"127.0.0.1",
        port: '3306',
        usre: 'root',
        password: 'root',
        database: 'chat'
    })
    return conneciton
}
module.exports.createConnection = createConnection;





