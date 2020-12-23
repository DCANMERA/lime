const state = {

  // 用户token
  __tk: '',

  user: null
}

const mutations = {

  // 修改用户token
  set__tk: (state, payload) => state.__tk = payload,

  // 用户信息
  setUser: (state, payload) => state.user = payload,
}

export default {
  namespaced: true,
  state,
  mutations
}
