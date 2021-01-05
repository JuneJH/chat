const mysql = require('mysql');

function createConnection(){
    console.log("调用了数据库嘛")
    const conneciton = mysql.createConnection({
        host: '121.36.51.141',
        // host:"127.0.0.1",
        port: '3306',
        user: 'june',
        password: 'root',
        database: 'chat',
        // host     : '121.36.51.141',
        // user     : 'root',
        // password : 'root',
        // database : 'chat'
    })
    return conneciton
}
module.exports.createConnection = createConnection;





