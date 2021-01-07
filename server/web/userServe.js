const userDao = require('../dao/userDao');
const axios = require("axios");

async function login(userInfo) {
    try {
        const result = await axios.post("http://121.36.51.141:9527/login", {username: userInfo.user, password: userInfo.password});
        result.data.data.authorization = result.headers.authorization
        return result.data;
    }catch (err) {
        return err.response.data;
    }
};
async function register(userInfo) {
    try {
        const result = await axios.post("http://121.36.51.141:9527/register", userInfo);
        return result.data;
    }catch (err) {
        return err.response.data;
    }
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
    register,
    findAllWord
}