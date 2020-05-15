const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userServe = require("./web/userServe")
let makeUser = [];

server.listen(12306);
// app.use(express.static("./dist"));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// {
//     id: 11,
//     nickname: "相亲相爱一家人",
//     date: "2020/5/5",
//     time: "16:33:25",
//     lastNews: "今天晚上在重庆火锅吃饭",
//     header: "../assets/header/1.jpg"
//   },
io.on('connection', (socket) => {
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
    socket.on("logout",data=>{
        makeUser = makeUser.filter(ele=>ele != data)
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
        socket.broadcast.emit("message", data);
    });

});

