const BASE_URL = 'http://api.kele8.cn/agent/http://47.106.197.108:10002'
const PATH_UPL = 'http://api.kele8.cn/agent/http://m.maoyan.com'

const state = {
  api: {
    search: PATH_UPL + '/ajax/search',
    movieOnInfoList: PATH_UPL + '/ajax/movieOnInfoList',
    comingList: PATH_UPL + '/ajax/comingList',
    mostExpecteds: PATH_UPL + '/ajax/mostExpected?limit=12&offset=12',
    mostExpected: PATH_UPL + '/ajax/mostExpected',
    moreComingList: PATH_UPL + '/ajax/moreComingList?movieIds=1258140%2C1302281%2C1334709%2C1370629%2C1218142%2C1330790%2C1321157%2C1211009%2C1229845%2C553231',
    cinemaList: PATH_UPL + '/ajax/cinemaList',
    detailmovie: PATH_UPL + '/ajax/detailmovie',
    filterCinemas: PATH_UPL + '/ajax/filterCinemas',

    login: BASE_URL + '/login',
    register: BASE_URL + '/register',
    findAccountInfo: BASE_URL + '/findAccountInfo',
    checkValidCode: BASE_URL + '/checkValidCode',
    emailValidCode: BASE_URL + '/emailValidCode',
    retrievePassword: BASE_URL + '/retrievePassword',
    destroyAccount: BASE_URL + '/destroyAccount',
  }
}

export default {
  namespaced: true,
  state
}
