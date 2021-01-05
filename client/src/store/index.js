import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket:"",
    userinfo:"",
  },
  mutations: {
    setSocket( state, payload ){
      state.socket = payload;
    },
    setUserinfo( state, payload ){
      state.userinfo = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
