import {Sequelize} from 'Sequelize';
const sequelize = new Sequelize("chart","june","root",{
    host:"121.36.51.141",
    port:3306,
    dialect:"mysql"
})
async function test(){
    try {
        await sequelize.authenticate();
        console.log('数据库连接成功');
      } catch (error) {
        console.error('连接数据库错误', error);
      }
}

export default sequelize;