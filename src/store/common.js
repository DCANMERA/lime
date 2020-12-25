import *as toast from '../components/suggest/toast'

export default {

  install(Vue, options) {

    // 返回上一级
    Vue.prototype.$goBack = function () {
      this.$router.go(-1)
    }

    // 跳往指定页
    Vue.prototype.$goPage = function (option) {
      this.$router.push(option)
    }

    // 轻提示
    Vue.prototype.$toast = toast.show

    // 清除轻提示
    Vue.prototype.$toast.clear = toast.clear

    // 处理图片路径
    Vue.prototype.$imgUrl = (url) => url.replace(/w.h\//g, '')

    // 选择影院
    Vue.prototype.$selectCinema = function (item) {
      this.$toast('选择影院成功');
      this.$store.commit('cinemaModule/setCinema', item)
      sessionStorage.removeItem('cinema')
      sessionStorage.setItem('cinema', JSON.stringify(item))
      if (this.$store.state.cinemaModule.movieId != -1) {
        setTimeout(() => {
          this.$goPage({
            name: 'MovieInfo',
            params: {
              movieId: this.$store.state.cinemaModule.movieId
            }
          })
        }, 1500)
      }
    }

    // 网络验证
    Vue.prototype.$judgeNetwork = function (res) {
      if (res.data.code == 406) {
        this.$toast(
          `<a href="javascript:;"
                     style="color: #FFF;">请验证身份</a>`
        )
        setTimeout(() => {
          window.open(res.data.customData.verifyPageUrl);
        }, 2000)
        return true
      }
    }
  }
}
