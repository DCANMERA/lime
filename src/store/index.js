import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import homeModule from './modules/home'
import cinemaModule from './modules/cinema'
import userModule from './modules/user'
import api from './modules/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    homeModule,
    cinemaModule,
    userModule,
    api
  }
})
