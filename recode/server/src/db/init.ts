import User from '../models/User';

async function asyncData() {
    await User.sync({ force: true });
    console.log("用户模型表刚刚(重新)创建！");
}

asyncData();