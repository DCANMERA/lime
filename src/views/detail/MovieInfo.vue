<template>
  <div class="movie-detail"
       :style="isShow ? `backgroundColor: ${movieData.backgroundColor}` : ''">

    <!-- 顶部导航栏 -->
    <NavBar @left-click="$goBack()"
            text-center="详情"
            class="toFixed"></NavBar>

    <!-- 电影详情信息 -->
    <div class="movie-info"
         :style="isShow ? `backgroundColor: ${movieData.backgroundColor}` : ''"
         v-if="isShow">

      <!-- 电影头部详情介绍 -->
      <div class="movie-info-top">
        <div class="movie-cover"
             @click.stop="isShowVideo = true">
          <img class="img noneBg poster"
               :src="movieData.img"
               width="100"
               height="138"
               e="1"
               c="1">
          <img class="img noneBg poster-play"
               src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/poster-play.png">
        </div>
        <div class="movie-desc">
          <div class="movie-desc-top">
            <div class="movie-cn-name">
              <h1>{{movieData.nm}}</h1>
            </div>
            <div class="movie-en-name">{{movieData.enm}}</div>
            <div class="movie-other-info">
              <div class="movie-type">
                <span class="movie-cat">{{movieData.cat}}</span>
              </div>
              <div class="actors">
                <span>{{movieData.star}}</span>
              </div>
              <div class="movie-show-time">
                <span>
                  {{movieData.pubDesc}}
                  <i v-if="movieData.dur">/ {{movieData.dur}}分钟</i>
                </span>
                <i class="iconfont icon-right img noneBg "></i>
              </div>
            </div>
          </div>
          <div class="btns">
            <button data-bid="b_rjonirtp"
                    type="button"
                    class="button"
                    :class="{watched: watchData.wantToWatch}"
                    @click="wantToWatch">
              <i class="iconfont icon-heart img noneBg"></i>
              <span>想看</span>
            </button>
            <button class="link button btn-right"
                    :class="{watched: watchData.watched}"
                    @click="watched">
              <i class="iconfont icon-star img noneBg"></i>
              <span>看过</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 电影想看区 -->
      <div class="real-time-word-of-mouth theater-chain-not-graded">
        <div class="top">
          <div class="left">
            <img class="img noneBg"
                 alt="logo"
                 src="../../assets/img/logo.png">
            <span>实时口碑</span>
          </div>
        </div>
        <div class="middle">
          <span class="people-want-to-watch">
            {{movieData.wish | getThousands}}
          </span>
          <span>人想看</span>
        </div>
      </div>

      <!-- 电影介绍 -->
      <div class="brief-introduction">
        <div class="title">
          <span>简介</span>
          <div class="open"
               @click="isOpen = !isOpen">
            <span>{{isOpen?'收起':'展开'}}</span>
            <i class="iconfont"
               :class="isOpen ? 'icon-up' : 'icon-down'"></i>
          </div>
        </div>
        <div data-bid="b_y93QJ"
             class="content ">
          <p id="brief-introduction-content"
             :class="isOpen ? '' : 'line-clamp'">
            {{movieData.dra}}
          </p>
        </div>
      </div>

      <!-- 剧照区域 -->
      <MovieList :movieList="photos"
                 @click-photo="showPhoto">
        <div class="stage-photo">剧照</div>
      </MovieList>

      <!-- 电影票购买区域 -->
      <div class="buyMovie">
        <div class="buyMovie-btn"
             @click="buyTickets">
          特约购票
        </div>
      </div>
    </div>

    <div v-else
         class="loading-mask">
      <img :src="require('@/assets/img/logo.png')">
      <span>加载中...</span>
    </div>

    <!-- 图片与视频弹出 -->
    <Popup v-show="isShowPhoto"
           @close="closePupop">
      <img class="img"
           :src="imgUrl">
    </Popup>
    <Popup v-if="isShowVideo"
           @close="closePupop">
      <video :src="movieData.vd"
             controls
             autoplay>
      </video>
    </Popup>
  </div>
</template>

<script>
  import '@/assets/scss/movieInfo.scss'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: 'movieInfo',

    data() {
      return {

        // 加载完成
        isShow: false,

        // 电影ID
        movieId: '',

        // 判断电影类型
        showst: '',

        // 电影数据
        movieData: {},

        // 保存想看与看过bool
        watchData: {

          // 是否想看
          "wantToWatch": false,

          // 是否看过
          "watched": false

        },


        // 是否展开内容区
        isOpen: false,

        // 电影剧照数据
        photos: [],

        // 弹窗bool
        isShowVideo: false,

        // 弹窗bool
        isShowPhoto: false,

        // 判断是视频还是图
        judge: true,

        // 剧照url
        imgUrl: ''
      }
    },

    created() {

      // 截取电影params
      this.movieId = this.$route.params.movieId
      this.showst = this.$route.params.showst
      this.setMovieId(this.movieId)


      // 获取电影数据
      this.getMovieDetail(this.movieId)

      // 获取看过的bool、想看的bool
      if (JSON.parse(localStorage.getItem('watch' + this.movieId))) {
        this.watchData = JSON.parse(localStorage.getItem('watch' + this.movieId))
      }
    },

    watch: {
      '$route.params.movieId'(movieId) {
        this.getMovieDetail(movieId)
      }
    },

    computed: {
      ...mapState('api', {
        api: state => state.api,
      }),
      ...mapState('cinemaModule', {
        cinema: state => state.cinema
      }),
      ...mapState({
        appkey: state => state.appkey
      })
    },

    methods: {
      ...mapMutations('userModule', {
        setUser: 'setUser'
      }),
      ...mapMutations('cinemaModule', {
        setMovieImg: 'setMovieImg',
        setMovieId: 'setMovieId',
        setCinema: 'setCinema',
      }),

      // 获取电影详情
      getMovieDetail(movieId) {

        // 加载中...
        this.isShow = false
        // this.$toast('loading', 0)
        this.axios({
            url: this.api.detailmovie,
            params: {
              movieId: movieId
            }
          })
          .then(res => {
            if (res.data.detailMovie) {
              this.$toast.clear()
              this.isShow = true
              this.movieData = res.data.detailMovie
              this.movieData.cat = this.movieData.cat.replace(/\,/g, ' / ')
              this.movieData.star = this.movieData.star.replace(/\,/g, ' / ')
              this.movieData.img = this.$imgUrl(this.movieData.img)
              this.movieData.photos.map(item => {
                let obj = {}
                obj.img = this.$imgUrl(item)
                obj.nm = ''
                obj.comingTitle = ''
                this.photos.push(obj)
              })
            }
          })
      },

      // 关闭弹窗
      closePupop(bool) {
        this.isShowVideo = bool
        this.isShowPhoto = bool
      },

      // 显示大图
      showPhoto(index) {
        this.isShowPhoto = true
        this.imgUrl = this.photos[index].img
      },

      // 想看
      wantToWatch() {
        let watch = 'watch' + this.movieId
        this.watchData.wantToWatch = !this.watchData.wantToWatch
        localStorage.removeItem(watch)
        localStorage.setItem(watch, JSON.stringify(this.watchData))
      },

      // 看过
      watched() {
        let watch = 'watch' + this.movieId
        this.watchData.watched = !this.watchData.watched
        localStorage.removeItem(watch)
        localStorage.setItem(watch, JSON.stringify(this.watchData))
      },

      // 买票
      buyTickets() {

        // 先判断用户token的存在
        let tokenString = localStorage.getItem('__tk')
        if (!tokenString) {
          this.$toast('请先登录')
          setTimeout(() => {
            this.$goPage({
              name: 'Login'
            })
          }, 1000)
          return
        }

        this.axios({
            method: "GET",
            url: this.api.findAccountInfo,
            params: {
              appkey: this.appkey,
              tokenString,
            },
          })
          .then(res => {
            this.$toast.clear()
            if (res.data.code == 700) {
              this.$toast('请先登录')
              setTimeout(() => {
                this.$goPage({
                  name: 'Login'
                })
              }, 1500)
            }
            if (res.data.code == "B001") {
              this.setUser(res.data)
              if (!this.cinema.nm) {
                this.$toast('请先选择影院')
                setTimeout(() => {
                  this.$goPage({
                    name: 'Cinema'
                  })
                }, 1500)
                return
              }
              if (this.showst == 4) {
                this.$toast('该电影处于预售状态，现不可购票')
                return
              }
              this.setMovieImg(this.movieData.img)
              this.$goPage({
                name: 'Pay',
                query: {
                  id: this.movieData.id,
                  nm: this.movieData.nm,
                  oriLang: this.movieData.oriLang,
                  ver: this.movieData.ver,
                  dur: this.movieData.dur
                }
              })
            }
          })
      }
    },

    beforeRouteEnter(to, from, next) {
      document.querySelectorAll('.mask').forEach((item, index) => item.remove())
      next()
    },

    beforeRouteLeave(to, from, next) {
      document.querySelectorAll('.mask').forEach((item, index) => item.remove())
      next()
    }
  }

</script>
