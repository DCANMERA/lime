const BASE_URL = 'http://47.106.197.108:10002'

const state = {
  api: {
    search: '/ajax/search',
    movieOnInfoList: '/ajax/movieOnInfoList',
    comingList: '/ajax/comingList',
    mostExpecteds: '/ajax/mostExpected?limit=12&offset=12',
    mostExpected: '/ajax/mostExpected',
    moreComingList: '/ajax/moreComingList?movieIds=1258140%2C1302281%2C1334709%2C1370629%2C1218142%2C1330790%2C1321157%2C1211009%2C1229845%2C553231',
    cinemaList: '/ajax/cinemaList',
    detailmovie: '/ajax/detailmovie',
    filterCinemas: '/ajax/filterCinemas',

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
