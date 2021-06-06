import { DataTypes } from 'Sequelize';
import sequelize from '../db/index';

const Room = sequelize.define("room",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    room_name:DataTypes.STRING,
    create_person:DataTypes.STRING,
    create_person_id:DataTypes.UUID,
    room_avatar:DataTypes.STRING,
})
export default Room;