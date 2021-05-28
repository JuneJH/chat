import User from '../models/User';    

export  async function register(user:any) {
    const result =await User.create(user);
    const res = await result.save();
    return res.toJSON();
}

export async function login(login:any) {
    const result = await User.findOne({
        where:{
            username:login.username,
            password:login.password
        }
    })
    return result?.toJSON();
}

export async function update(user:any,id:any) {
    const result = await User.update(user,{
        where:{
            id:id
        }
    })
    return {result,user,id};
}

