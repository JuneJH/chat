import express from 'express'
import { add } from '../services/roomService';

const Router = express();

Router.post("/add",async (req,res)=>{
    const room = req.body;
    const result = await add(room);
    if(result){
        res.send(JSON.stringify({
            msg:"创建成功",
            data:result
        }))
    }
})






export default Router;