const express = require('express');
const app = express();
const server = require('http').Server(app);
const dealMessage = require("./chat/dealMessage")

app.use(express.static("./dist"));

dealMessage.init(server)

server.listen(9527,()=>{
    console.log("start server")
});