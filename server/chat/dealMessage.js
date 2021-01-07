const Socket = require('socket.io');
const userServe = require("../web/userServe")
const UserList = require("../onlineUser")
const userList = new UserList();

function init(server){
    const io = Socket(server)
    io.on('connection', (socket) => {
        console.log("有一个连接");
        // 登录
        socket.on('login', async (data) => {
            const result = await userServe.login(data);
            const d = result.data;
            if (result.code === 200) {
                const isUser = userList.isUser(result.data.username);
                if (isUser) {
                    userList.remove(result.data.username);
                    socket.emit("login", {
                        status: 0,
                        msg: "该用户已经登录,系统以强制其下线,请重新登录"
                    })
                } else {
                    userList.save({user:d,socket});
                    socket.emit("login", result);
                }
            } else {
                console.log("登录失败");
                socket.emit("login", result);
            }
        });

        // 登出
        socket.on("logout", data => {
            userList.removeBy(socket);
        })

        // 注册
        socket.on("register", async data => {
            const result = await userServe.register(data);
            socket.emit("register",result);

        })

        // 客户端自动退出
        socket.on("disconnect",data=>{
            userList.removeBy(socket);
        })

        // 接受一个用户的消息
        socket.on('send', (data) => {
            isCheckoutMessage(data, socket)
        });
    });


}
// 检查用户的消息
function isCheckoutMessage(message, socket) {
    let text = message.content;
    userServe.findAllWord(data => {
        const result = [];
        let isHit = false;
        for (let i = 0; data[i].wcontent && i < data.length; i++) {
            let temp = {wordType: data[i].wname, hits: []};
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
            socket.emit("checkResult", {result, message})

        } else {
            socket.broadcast.emit("message", message);
        }
    })
}

// 最长公共子序列

const longestCommonSubsequence = function (text1, text2) {
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

module.exports = {
    init
}