import { DataTypes } from 'Sequelize';
import sequelize from '../db/index'

const Message = sequelize.define("message",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    content:DataTypes.TEXT,
    from_id:DataTypes.UUID,
    to_id:DataTypes.UUID,
    room_id:DataTypes.UUID,
    send_time:DataTypes.TIME,
    from_avatar:DataTypes.STRING,
    to_avatar:DataTypes.STRING,
    room_avatar:DataTypes.STRING,
    from_nickname:DataTypes.STRING,
    to_nickname:DataTypes.STRING,
})

export default Message;