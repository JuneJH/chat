const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userServe = require("./web/userServe")
const path = require("path")
let makeUser = [];
server.listen(9527);
console.log("开启一个服务");
app.use(express.static("./dist"));
io.on('connection', (socket) => {
    console.log("有一个连接")
    // 登录
    socket.on('login', (data) => {
        if (makeUser.includes(data.user)) {
            socket.emit("logined", {
                status: 0,
                msg: "该用户已经登录，已在线"
            })
        } else {
            makeUser.push(data.user)
            userServe.login(data, result => {
                socket.emit("logined", result)
            });
        }

    });
    // 登出
    socket.on("logout", data => {
        makeUser = makeUser.filter(ele => ele != data)
        console.log(data)
    })
    // 注册
    socket.on("registe", data => {
        userServe.registe(data, result => {
            socket.emit("reginsted", result)
        })
    })

    // 接受一个用户的消息
    socket.on('send', (data) => {
        isCheckoutMessage(data, socket)
    });

});

// 检查用户的消息
function isCheckoutMessage(message, socket) {
    let text = message.content;
    userServe.findAllWord(data => {
        const result = [];
        let isHit = false;
        for (let i = 0; data[i].wcontent && i < data.length; i++) {
            let temp = { wordType: data[i].wname, hits: [] };
            data[i].wcontent.split("&").forEach(ele => {
                if (text.includes(ele)) {
                    temp.hits.push(ele);
                    isHit = true;
                } else if (longestCommonSubsequence(text, ele).length > 3) {
                    temp.hits.push(ele);
                    isHit = true;
                }
            })
            temp.hits.length && result.push(temp);
        }
        if (isHit) {
            socket.emit("checkResult", { result, message })

        } else {
            socket.broadcast.emit("message", message);
        }
    })

    // request({
    //     url:"https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined",


    // }, (err, resp, body) => {
    //     if (!err) {


    //        console.log("请求百度",body)
    //     } else {
    //         throw Error('请求错误', err)
    //     }
    // })
}
// 最长公共子序列

var longestCommonSubsequence = function (text1, text2) {
    let t1Len = text1.length;
    let t2Len = text2.length;
    const dp = new Array(t1Len + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(t2Len + 1)
        dp[i][0] = 0;
    }
    dp[0].fill(0)
    for (let i = 1; i <= t1Len; i++) {
        for (let j = 1; j <= t2Len; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    return dp[t1Len][t2Len]
};

