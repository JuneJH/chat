import Room from '../models/Room';    

export  async function add(room:any) {
    const result =await Room.create(room);
    const res = await result.save();
    return res.toJSON();
}

export async function findAll(id:any) {
    const result = await Room.findAll({
        where:{
            id,
        }
    })
    return result.toString;
}

export async function update(room:any,id:any) {
    const result = await Room.update(room,{
        where:{
            id:id
        }
    })
    return {result,user: room,id};
}

