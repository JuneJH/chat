import "./db/index";
import "./db/init";
import { login, register, update } from "./services/userService";

// register({username:"june",nickname:"july",password:"123"})

// login({username:"june",password:"1234"})
update({username:"juhong"},"f12db859-ee7d-4c0a-9a9c-f5781e03ff44")
console.log("run server")