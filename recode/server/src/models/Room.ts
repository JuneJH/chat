import { DataTypes } from 'Sequelize';
import sequelize from '../db/index';

const Room = sequelize.define("room",{
    id:{
        primaryKey:true,
        type:DataTypes.UUID
    },
    room_name:DataTypes.STRING,
    create_person:DataTypes.STRING,
    room_avatar:DataTypes.STRING,
})
export default Room;