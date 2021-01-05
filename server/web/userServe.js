const userDao = require('../dao/userDao');
function login(userInfo, callback) {
    userDao.login(userInfo.user, function (result) {
        if (result.length == 0) {
            // 获取初始化所有内容
            callback({
                status: 0,
                msg: "用户不存在，请注册"
            });
        } else if (result[0].password === userInfo.password) {
            result[0].status = 1;
            callback(result[0]);
        } else {
            callback({
                status: 0,
                msg: "用户密码不正确"
            });
        }
    })

};
function findAllWord(callback) {
    userDao.findAllWord(function (result) {
         callback(result);
    })

};
//注册
function registe(userInfo,callback){
    const path = Math.floor(Math.random()*13)
    userInfo = {
        username : userInfo.username,password:userInfo.pass,headPath:`../assets/header/${path}.jpg`
    }
    userDao.registe(userInfo,function(result){
        console.log("注册",result)

    })
}

module.exports = {
    login,
    registe,
    findAllWord
}