<template>
  <div class="home">
    <a-row class="layout-container">
      <a-col :span="1" class="login-container">
        <div class="heder-img">
          <a-avatar :size="36" icon="user" :src="selfHeader" />
        </div>
        <div class="setting-list">
          <a-icon class="modify-btn" @click="loginHandler" type="login" style="color:green" />
          <a-icon class="modify-btn" type="poweroff" @click="logoutHande" />
        </div>
      </a-col>
      <a-col :span="6" class="frend-container">
        <a-row class="add-message">
          <a-col :span="20" style="padding:10px">
            <a-input placeholder="add list" style="border-radius:20px" />
          </a-col>
          <a-col :span="4" style="padding:10px 0 0 5px;font-size:22px;">
            <a-icon type="plus-circle" />
          </a-col>
        </a-row>
        <a-row class="show-list-content">
          <a-row class="message-item" v-for="item in friendList" :key="item.id">
            <div @click="changeChatHandler(item.nickname)">
              <a-col :span="4" style="padding-top:5px">
                <a-avatar :size="30" icon="user" :src="item.header" />
              </a-col>
              <a-col :span="12" class="message-overview">
                <a-row>
                  <span class="nickname">{{ item.nickname}}</span>
                </a-row>
                <a-row style="margin-top:5px" @click="changeChatHandler">
                  <span>{{item.lastNews}}</span>
                </a-row>
              </a-col>
              <a-col :span="8" style="text-align: right;">
                <a-row>{{item.date}}</a-row>
                <a-row style="margin-top:5px">{{item.time}}</a-row>
              </a-col>
            </div>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="17" class="chat-container">
        <a-row class="chat-title">{{chatTitle}}</a-row>
        <a-row class="chat-content">
          <a-row v-for="item in messageList" :key="item.id">
            <a-row class="content-left-item" v-if="item.uid !== userInfo.data.id">
              <a-col :span="4" class="header">
                <a-avatar :size="30" :src="item.header" />
              </a-col>
              <a-col :span="20">
                <a-row class="time">{{item.date}} {{item.time}}</a-row>
                <a-row class="news-content">{{item.content}}</a-row>
              </a-col>
            </a-row>

            <a-row class="content-right-item" :class="item.hits ? 'red' : ''" v-else>
              <a-col :span="22">
                <a-row class="time">{{item.date}} {{item.time}}</a-row>
                <a-row class="news-content">
                  <span @click="showDetalHandler(item)">{{item.content}}</span>
                </a-row>
              </a-col>
              <a-col :span="2" class="header">
                <a-avatar :size="30" :src="item.header" />
              </a-col>
            </a-row>
          </a-row>
        </a-row>
        <a-row class="input-content">
          <div class="print-container">
            <div class="textarea-mask" v-show="checkoutMask">
              请文明用语，你已开启实时监测系统
              <div class="tip">系统会根据你违规次数，依次叠加时间限制你的输入</div>
              <div style="color:#999">{{ delayTIme }}</div>
            </div>
            <textarea
              class="input-box"
              v-model="messageContent"
              v-on:keydown.13="sendContentHandle"
              @input="checkoutHander"
              ref="textarea"
            ></textarea>
            <div class="modify-btn">
              <div class="show-word">
                <a-tag class="word-item" color="orange" v-show="isCheckoutIng">系统词库</a-tag>
                <a-tag class="word-item" color="orange" v-show="isCheckoutIng">敏感词汇</a-tag>
                <a-tag class="word-item" color="orange" v-show="isCheckoutIng">不文明行为</a-tag>
                <a-tag class="word-item" color="#f50" v-show="isCheckoutIng">优先词库</a-tag>
              </div>
              <div class="show-tip">
                <a-switch
                  checked-children="启动监测"
                  un-checked-children="关闭监测"
                  default-checked
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <div class="send-container">
            <a-button type="primary" @click="sendContentHandle">发送</a-button>
          </div>
        </a-row>
      </a-col>
    </a-row>
    <Drawer :drawerVisible="drawerVisible" @onClose="onClose" />
  </div>
</template>
<script>
import Drawer from "../views/Login";
const friendList = [
  {
    id: 11,
    nickname: "JyCHAT",
    date: "2020/5/5",
    time: "16:33:25",
    lastNews: "公共聊天场所，请文明用语",
    header:
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2698168715,411094115&fm=26&gp=0.jpg"
  }
];
const messageList = [];
export default {
  created() {
    this.io.on("message", data => {
      this.messageList.push(data);
      this.friendList[0].date = data.date.slice(0, 10);
      this.friendList[0].lastNews = data.content;
      this.friendList[0].time = data.date.slice(10);
    });
    this.io.on("checkResult", data => {
      let str = "";
      data.result.forEach(ele => {
        str += ele.wordType + "中的" + ele.hits.toString();
      });
      this.$message.warning(`你发送的消息已违反合法社区词汇，${str}`);
      this.messageList = this.messageList.map(ele => {
        if (ele.id == data.message.id) {
          return {
            ...data.message,
            hits: true,
            result: data.result
          };
        }
        return ele;
      });
    });
  },
  beforeDestroy() {
    this.io.emit("logout", this.userInfo.uid);
  },
  components: {
    Drawer,
  },
  data() {
    return {
      //userInfo
      userInfo: {},
      // 自己的头像
      selfHeader: "",
      friendList,
      messageList,
      chatTitle: "JyCHAT",
      drawerVisible: true,
      messageContent: "",
      messagesID: "",
      checkoutMask: false,
      wordList: ["cnm", "卧槽", "草泥马", "哈狗", "智障", "脑卡","bitch"],
      delayTIme: "",
      //记录触发几次
      badCount: 0,
      //防抖标记
      flagTimerOut: null,
      //是否开启实时检查
      isCheckoutIng: true
    };
  },

  methods: {
    // 点击消息查看详情
    showDetalHandler(item) {
      if (item.hits) {
        let str = "";
           item.result.forEach(ele => {
        str += ele.wordType + "=>" + ele.hits.toString();
      });
        this.$notification.error({
          message: "不良用语详情",
          description: str,
          style:{
            color:'red',
          }
        });
      }
    },
    checkoutHander() {
      if (this.isCheckoutIng) {
        clearTimeout(this.flagTimerOut);
        this.flagTimerOut = setTimeout(() => {
          this.checkoutIng(this.messageContent);
        }, 1000);
      }
    },
    //实时监测用户用语
    checkoutIng(msg) {
      if (!this.checkoutMask) {
        if (this.wordList.some(ele => ele.includes(msg))) {
          this.checkoutMask = true;
          this.$refs.textarea.blur();
          this.badCount++;
          let delay = this.badCount * 10;
          this.delayTIme = delay;
          const timer = setInterval(() => {
            this.delayTIme--;
          }, 1000);
          setTimeout(() => {
            clearInterval(timer);
            this.checkoutMask = false;
            this.messageContent = "请注意用词规范";
          }, delay * 1000);
        }
      }
    },
    onChange(check) {
      this.isCheckoutIng = check;
    },
    //  发送一条消息
    sendContentHandle() {
      const myDate = new Date();
      const msg = {
        id: ++this.messagesID,
        uid: this.userInfo.data.id,
        header:"http://121.36.51.141:9527/" + this.userInfo.data.headerImg,
        time: "",
        date: myDate.toLocaleString(),
        content: this.messageContent
      };
      this.friendList[0].date = msg.date.slice(0, 10);
      this.friendList[0].lastNews = msg.content;
      this.friendList[0].time = msg.date.slice(10);
      this.messageList.push(msg);
      this.messageContent = "";
      this.io.emit("send", msg);
      console.log("this.userInfo",this.userInfo)
      console.log("this.messageList",this.messageList)
    },
    changeChatHandler(title) {
      this.chatTitle = title;
    },
    //  登录
    loginHandler() {
      this.drawerVisible = true;
    },
    logoutHande() {
      this.drawerVisible = true;
      this.io.emit("logout", this.userInfo.uid);
    },
    onClose() {
      this.drawerVisible = false;
      const userInfo = this.$store.state.userinfo;
      this.userInfo = userInfo;
      this.selfHeader = "http://121.36.51.141:9527/" + userInfo.data.headerImg;
      this.messagesID = +userInfo.data.id + 10000000;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .layout-container {
    height: 100%;
    .login-container {
      background-color: #fdcb6e;
      border-radius: 5px 0 0 5px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      .heder-img {
        margin-top: 10px;
      }
      .setting-list {
        font-size: 26px;
        cursor: pointer;
        text-align: center;
        color: #fff;
        padding-bottom: 15px;
        .modify-btn {
          transition: all 0.3s;
          box-shadow: 0px 0px 1px 5px 2px red;
          &:hover {
            transform: scale(1.1);
            color: red;
            
          }
        }
      }
    }
    .frend-container {
      height: 100%;
      background-color: rgba(255, 234, 167, 0.3);
      .add-message {
        padding: 10px;
      }
      .show-list-content {
        height: calc(100% - 72px);
        overflow-y: auto;
        .message-item {
          padding: 15px 10px;
          box-sizing: border-box;
          cursor: pointer;
          color: #999;
          font-size: 12px;
          transition: all 0.2s;
          &:hover {
            background-color: rgba(255, 234, 167, 1);
            transform: scale(1.001);
          }
          .message-overview {
            .nickname {
              color: #000;
              font-weight: 600;
              font-size: 14px;
            }
            span {
              display: inline-block;
              width: 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
            }
          }
        }
      }
    }
    .chat-container {
      height: 100%;
      border-radius: 0 5px 5px 0;
      color: #666;
      .chat-title {
        height: 72px;
        line-height: 72px;
        padding-left: 15px;
        color: #000;
        font-weight: 700;
      }
      .chat-content {
        padding: 10px 0;
        height: 550px;
        overflow-y: auto;
        .content-left-item {
          width: 450px;
          .header {
            padding-top: 20px;
            padding-left: 15px;
          }
          .time {
            font-size: 12px;
          }
          .news-content {
            display: inline-block;
            background-color: #fff;
            word-wrap: break-word;
            word-break: break-all;
            padding: 15px 10px;
            border-radius: 5px;
            box-shadow: 0px 0px 0px 1px 2px #eee;
            margin: 5px 0 20px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              border-bottom: 15px solid #fff;
              border-left: 0px solid #fff;
              border-bottom-left-radius: 25px 25px;
              height: 20px;
              width: 20px;
              left: -8px;
              top: 8px;
            }
          }
        }
        .content-right-item {
          // width: 100%;
          .header {
            padding-top: 20px;
            padding-right: 15px;
            text-align: right;
          }
          .time {
            font-size: 12px;
            text-align: right;
          }
          .news-content {
            float: right;
            // display: inline-block;
            word-wrap: break-word;
            word-break: break-all;
            background-color: #fff;
            margin-left: 400px;
            padding: 15px 10px;
            border-radius: 5px;
            box-shadow: 0px 0px 0px 1px 2px #eee;
            margin-top: 5px;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              border-bottom: 15px solid #fff;
              border-right: 0px solid #fff;
              border-bottom-right-radius: 25px 25px;
              height: 20px;
              width: 20px;
              right: -12px;
              top: 10px;
            }
          }
        }
        .red {
          color: red;
          cursor: pointer
        }
      }
      .input-content {
        margin-top: 20px;
        .print-container {
          height: 110px;
          padding: 5px 20px 0;
          .modify-btn {
            height: 100%;
            width: 40%;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 6px 0 0 6px;
            float: left;
            .show-word {
              color: #666;
              width: 60%;
              height: 100%;
              display: inline-block;
              padding: 10px;
              overflow-y: hidden;
              .word-item {
                margin: 5px;
              }
            }
            .show-tip {
              width: 40%;
              height: 100%;
              display: inline-block;
              font-size: 20px;
              color: #666;
              font-weight: 700;
              padding: 5px;
              text-align: center;
              vertical-align: top;
              line-height: 90px;
              &::after {
                content: "";
                display: inline-block;
                width: 5px;
                height: 50px;
                border-right: 2px dashed #999;
                vertical-align: middle;
                margin-left: 20px;
                &:hover {
                  background-color: #fff;
                }
              }
            }
          }
          position: relative;
          .textarea-mask {
            z-index: 999;
            font-size: 12px;
            position: absolute;
            top: 0;
            right: 20px;
            height: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            text-align: center;
            width: 60%;
            border: none;
            color: #fff;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 6px;
            color: rgb(255, 38, 0);
            font-weight: 600;
          }
          .input-box {
            height: 100%;
            resize: none;
            width: 60%;
            border: none;
            outline: none;
            color: #fff;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 0px 6px 6px 0px;
            padding: 10px;
          }
        }
        .send-container {
          padding: 5px 20px 10px;
          text-align: right;
        }
        color: red;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #b9b9b9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(133, 133, 133);
}
</style>
