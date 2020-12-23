import *as seatPlan from '../../assets/js/seatPlan'

const state = {
  seat: seatPlan.seat,

  // 导航数据
  city: '全城',
  brand: '品牌',
  special: '特色',
  cityId: -1,
  districtId: -1,
  lineId: -1,
  areaId: -1,
  stationId: -1,
  brandId: -1,
  specialId: -1,
  hallType: -1,
  serviceId: -1,

  // 导航条默认激活索引
  navCityItemIndex: 0,

  // 选择影院
  cinema: {
    nm: '',
    id: -1
  },

  // 电影票数据
  plan: [],

  // 电影id
  movieId: -1,

  // 电影图
  movieImg: ''
}

const getters = {
  getCinema: state => state.cinema,
}

const mutations = {

  // 修改导航条索引
  setNavCityItemIndex: (state, payload) => (state.navCityItemIndex = payload),

  // 修改region的状态
  setCity: (state, payload) => (state.city = payload),

  // 修改region的id
  setCityId: (state, payload) => {
    if (payload === -1) {
      state.city = '全城'
    }
    state.cityId = payload
  },

  // 修改districtId状态
  setDistrictId: (state, payload) => (state.districtId = payload),

  // 修改lineId状态
  setLineId: (state, payload) => (state.lineId = payload),

  // 修改areaId状态
  setAreaId: (state, payload) => (state.areaId = payload),

  // 修改stationId状态
  setStationId: (state, payload) => (state.stationId = payload),

  // 修改brand状态
  setBrand: (state, payload) => (state.brand = payload),

  // 修改brandId状态
  setBrandId: (state, payload) => {
    if (payload === -1) {
      state.brand = '品牌'
    }
    state.brandId = payload
  },

  // 修改special状态
  setSpecial: (state, payload) => (state.special = payload),

  // 修改specialId状态
  setSpecialId: (state, payload) => {
    if (payload === -1) {
      state.special = '特色'
    }
    state.specialId = payload
  },

  // 修改serviceId状态
  setServiceId: (state, payload) => (state.serviceId = payload),

  // 修改hallType状态
  setHallType: (state, payload) => (state.hallType = payload),

  // 修改影院状态
  setCinema: (state, payload) => (state.cinema = payload),

  // 修改电影详情Id
  setMovieId: (state, payload) => state.movieId = payload,

  // 修改电影详情img
  setMovieImg: (state, payload) => state.movieImg = payload,

  // 修改座位状态
  setSeat: (state, payload) => {
    let localSeats = JSON.parse(
      localStorage.getItem(`seats${state.movieId}${state.cinema.id}`)
    )
    if (localSeats) {
      payload.seats.map(item => {
        localSeats[item.rowId - 1].seats.map(value => {
          if (item.columnId == value.columnId) {
            value.seatStatus = 3
          }
        })
      })
      localStorage.setItem(
        `seats${state.movieId}${state.cinema.id}`,
        JSON.stringify(localSeats)
      )
      return
    }
    payload.seats.map(item => {
      state.seat[item.rowId - 1].seats.map(value => {
        if (item.columnId == value.columnId) {
          value.seatStatus = 3
        }
      })
    })
    localStorage.setItem(
      `seats${state.movieId}${state.cinema.id}`,
      JSON.stringify(state.seat)
    )
  },

  // 修改电影票数据状态
  setPlan: (state, payload) => (state.plan.push(payload)),
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
