import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 引入soceketio
import SocketIO from "socket.io-client"
const socket = SocketIO(`ws://121.36.51.141:9527`);





Vue.use(Antd);

Vue.prototype.io =socket;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
