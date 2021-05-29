import "./db/index";
import "./db/init";
import { add, findAll4User } from "./services/user2RoomService";
// import { add } from "./services/roomService";
import { login, register, update } from "./services/userService";

// register({username:"june",nickname:"july",password:"123"})
// add({room_name:"相亲相爱",create_person:"June",})
// login({username:"june",password:"1234"})
// update({username:"juhong"},"f12db859-ee7d-4c0a-9a9c-f5781e03ff44")
// add({user_id:"1c57366d-add3-430c-81e0-62e14ecd7a0b",room_id:"3bdd25cd-1e69-40f7-8e80-d81e06d67cfe"})
findAll4User("1c57366d-add3-430c-81e0-62e14ecd7a0b").then(res=>{
    console.log("结果",res)
})
console.log("run server")