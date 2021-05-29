import { DataTypes } from 'Sequelize';
import sequelize from "../db/index"


const User2Room = sequelize.define("user_map_room",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    user_id:DataTypes.UUID,
    room_id:DataTypes.UUID,
})
export default User2Room;