import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'


// 导入公共组件
import Popup from './components/suggest/Popup.vue'
import NavBar from './components/navBar/NavBar.vue'
import TabBar from './components/tabBar/TabBar.vue'
import TabItem from './components/tabBar/TabItem.vue'
import Movie from './components/movie/Movie.vue'
import MovieList from './components/movie/MovieList.vue'
import CinemaNav from './components/cinema/CinemaNav.vue'
import CinemaNavCity from './components/cinema/CinemaNavCity.vue'
import CinemaNavBrand from './components/cinema/CinemaNavBrand.vue'
import CinemaNavSpecial from './components/cinema/CinemaNavSpecial.vue'
import CinemaList from './components/cinema/CinemaList.vue'

// 注册公共组件
Vue.component('Popup', Popup)
Vue.component('NavBar', NavBar)
Vue.component('TabBar', TabBar)
Vue.component('TabItem', TabItem)
Vue.component('Movie', Movie)
Vue.component('MovieList', MovieList)
Vue.component('CinemaNav', CinemaNav)
Vue.component('CinemaNavCity', CinemaNavCity)
Vue.component('CinemaNavBrand', CinemaNavBrand)
Vue.component('CinemaNavSpecial', CinemaNavSpecial)
Vue.component('CinemaList', CinemaList)

// 导入公共方法
import common from './store/common'

// 注册公共方法
Vue.prototype.common = common
Vue.use(common)

// 格式化日期
Vue.filter('formatDate', (v, format = 'yyyy-MM-dd hh:mm:ss') => {

  // 创建日期对象
  let date = new Date(v);

  // 格式化年份
  let year = date.getFullYear().toString();
  if (/(y+)/.test(format)) {

    // 获取匹配组的内容
    var content = RegExp.$1;
    format = format.replace(content, year.slice(year.length - content.length));
  }

  // 格式化月份、日份、时、分、秒
  let dateObj = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  for (let key in dateObj) {

    // 创建动态正则表达式
    let reg = new RegExp(`(${key}+)`);

    if (reg.test(format)) {

      // 获取组匹配的内容
      let groupContent = RegExp.$1;
      format = format.replace(
        groupContent,
        dateObj[key] >= 10 ?
          dateObj[key] :
          groupContent.length == 2 ?
            '0' + dateObj[key] :
            dateObj[key]
      );
    }
  }

  return format;
})

// 截取字符串
Vue.filter('fontFormat', (string, startNum = 0, endNum = 7) => {
  return string.length > endNum ?
    `${string.substr(startNum, endNum - 1)}...` :
    string
})

// 格式化千分位
Vue.filter('getThousands', (num, step = '.', link = '.') => {
  let nums = String(num).split(step)
  let reg = /\d{1,3}(?=(\d{3})+$)/g
  if (nums[1]) {
    return nums[0].replace(reg, '$&,') + link + nums[1]
  }
  return nums[0].replace(reg, '$&,')
})

Vue.use(VueAxios, axios)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.config.productionTip = false

// axios拦截器，在发起请求之前执行
axios.interceptors.request.use(config => {

  // 处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    // 序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += key + '=' + config.data[key] + '&';
    }

    // 重新赋值config.data
    config.data = paramsString.slice(0, -1)
  }

  // 必须返回config
  return config;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
