
module.exports =  class UserList {
    constructor() {
        this.UserList = [];
    }
    save(user){
        this.UserList.push(user);
    }
    remove(username){
        this.UserList = this.UserList.filter(u => u.username !== username);
    }
    removeBy(socket){
        this.UserList = this.UserList.filter(u=>u.socket === socket);
    }
    getUser(username){
        return this.UserList.find(u => u.username === username);
    }
    isUser(username){
        return this.UserList.some(u => u.username === username);
    }
    getAllUser(){
        return this.UserList.map(u=>u.user)
    }
}