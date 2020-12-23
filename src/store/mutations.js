const mutations = {

  // 修改tabbar的索引状态
  setTabActive: (state, index) => state.tabActive = index,

  // 修改navbar的link状态
  setIsShowLink: (state, bool) => state.isShowLink = bool,
}

export default mutations
