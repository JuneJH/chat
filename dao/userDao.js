const dbUtil = require('./dbconect');
function login(id,success){
    const connection = dbUtil.createConnection();
    const sql = 'select * from user where uid=?';
    connection.connect();
    connection.query(sql,[id],function(error,result){
        if(error == null){
            success(result);
        }else{
            throw Error('查询错误'+ error)
        }
    })
    connection.end();
}

// 查询所有词汇
    function findAllWord(success){
        const connection = dbUtil.createConnection();
        const sql = 'select * from word';
        connection.connect();
        connection.query(sql,function(error,result){
            if(error == null){
                success(result);
            }else{
                throw Error('查询错误'+ error)
            }
        })
        connection.end();
    }
    

//查所有列表信息
function findAllMessageList(id,success){
    const connection = dbUtil.createConnection();
    const sql = 'select * from user where uid=?';
    connection.connect();
    connection.query(sql,[id],function(error,result){
        if(error == null){
            success(result);
        }else{
            throw Error('查询错误'+ error)
        }
    })
    connection.end();
}

//注册
function registe(user,success){
    const connection = dbUtil.createConnection();
    connection.connect();
    console.log(user)
    const sql = 'INSERT INTO user(username,PASSWORD,headPath) VALUES (?,?,?)';
    connection.query(sql,user,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw Error('插入错误',error)
        }
    })
    connection.end();
}

module.exports = {
    login,
    registe,
    findAllMessageList,
    findAllWord
    
}