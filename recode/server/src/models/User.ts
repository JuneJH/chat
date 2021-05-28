import sequelize from "../db";
import {DataTypes} from 'Sequelize';

const User = sequelize.define("user", {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    username:DataTypes.STRING,
    nickname:DataTypes.STRING,
    password:DataTypes.STRING,
    email:DataTypes.STRING,
    address:DataTypes.STRING,
    hobby:DataTypes.STRING,
    avatar:DataTypes.STRING,
    count:DataTypes.INTEGER,
    sex:DataTypes.INTEGER,
    phone:DataTypes.STRING,
  });

export default User;