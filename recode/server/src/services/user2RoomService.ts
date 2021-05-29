import User2Room from '../models/User2Room';    

export  async function add(map:any) {
    const result =await User2Room.create(map);
    const res = await result.save();
    return res.toJSON();
}

export async function findAll4User(id:any) {
    const result = await User2Room.findAll({
        where:{
            user_id:id,
        }
    })
    return result.map((item:any)=>item.dataValues);
}
export async function findAll4Room(id:any) {
    const result = await User2Room.findAll({
        where:{
            room_id:id,
        }
    })
    return result.map((item:any)=>item.dataValues);
}

export async function update(room:any,id:any) {
    const result = await User2Room.update(room,{
        where:{
            id:id
        }
    })
    return {result,user: room,id};
}

