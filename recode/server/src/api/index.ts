import express from 'express';
const app = express();
import login from './login';


app.use(express.urlencoded());
app.use(express.json());
app.use("/user",login);
app.listen(80,()=>{
    console.log("server start")
})