import User from '../models/User';
import Room from '../models/Room'
import User2Room from '../models/User2Room'
import Message from '../models/Message'
async function asyncData() {
    await User.sync({ force: true });
    await Room.sync({ force: true });
    await User2Room.sync({ force: true });
    await Message.sync({ force: true });
    console.log("模型表刚刚(重新)创建！");
}
// asyncData();