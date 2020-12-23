import city from '@/assets/js/city'

let location
if (!JSON.parse(localStorage.getItem('historyCity'))) {
  location = [
    {
      cityId: 20,
      cityName: '广州',
      expire: ''
    }
  ]
} else {
  location = JSON.parse(localStorage.getItem('historyCity')).data
}

const state = {

  // 城市
  city,

  // 用户地址
  location,

  // 定位bool
  flag: false,

  // 定位
  position: {
    id: -1,
    nm: ''
  },

  // 首页导航激活索引
  navActive: 0,

}

const mutations = {
  // 修改全局的用户地址
  setLoaction: (state, payload) => state.location = payload,

  // 修改定位
  setPosition: (state, payload) => state.position = payload,
  setFlag: (state, payload) => state.flag = payload,

  // 修改首页导航的索引
  setNavActive: (state, payload) => state.navActive = payload,
}

export default {
  namespaced: true,
  state,
  mutations
}
