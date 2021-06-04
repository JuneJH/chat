import express from 'express';
import { login, register } from '../services/userService';

const Router = express.Router();

Router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await login({ username, password })
    if (result) {
        res.send(JSON.stringify({
            code: 200,
            msg: "登录成功",
            data: { username }
        }))
    } else {
        res.send(JSON.stringify({
            code: 400,
            msg: "用户或密码不正确",
        }))
    }

})

Router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const result = await register({ username, password })
    if(result){
        res.send(JSON.stringify({
            msg:"创建成功",
            data:{result}
        }))
    }
})

export default Router;