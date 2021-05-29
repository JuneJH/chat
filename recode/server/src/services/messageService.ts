import Message from '../models/Message';    

export  async function add(msg:any) {
    const result =await Message.create(msg);
    const res = await result.save();
    return res.toJSON();
}

export async function findAll4User(id:any) {
    const result = await Message.findAll({
        where:{
            user_id:id,
        }
    })
    return result.map((item:any)=>item.dataValues);
}
export async function findAll4Room(id:any) {
    const result = await Message.findAll({
        where:{
            room_id:id,
        }
    })
    return result.map((item:any)=>item.dataValues);
}

export async function update(room:any,id:any) {
    const result = await Message.update(room,{
        where:{
            id:id
        }
    })
    return {result,user: room,id};
}

