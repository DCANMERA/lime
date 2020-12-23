<template>
  <div class="home">

    <!-- 顶部导航条 -->
    <NavBar class="home-nav border toFixed"
            @left-click="$goPage({name:'City'})">
      <div class="city-entry"
           slot="left">
        <span class="city-name">
          {{location[0].cityName}}
        </span>
        <i class="city-entry-arrow iconfont icon-caret-down"></i>
      </div>
      <div class="movie-nav"
           :data-active="navActive"
           slot="center">
        <div class="movie-nav-item"
             v-for="(item,index) in navData"
             :key="index"
             :class="{active: navActive == index}"
             @click="toggleNavTab(index)">
          {{item.name}}
        </div>
      </div>
      <i slot="right"
         class="iconfont icon-search nav-icon"
         @click="$goPage({name:'Search'})"></i>
    </NavBar>

    <!-- 内容区 -->
    <div class="block"
         v-show="succeedBool">

      <!-- 好评与推荐电影区域 -->
      <MovieList class="home-movie-list"
                 v-show="navActive < 2"
                 :movieList="hotMovie.coming"
                 @change="goMovieDetail">
        <p>{{navActive == 0 ? '最受好评电影' : '近期最受期待'}}</p>
      </MovieList>

      <!-- 电影列表 -->
      <Movie v-for="(item,index) in movieData"
             :key="index"
             :item="item"
             @movie="goMovieDetail">
      </Movie>
    </div>
  </div>
</template>

<script>
  import '@/assets/scss/home.scss'
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: 'Home',

    data() {
      return {

        // 判断数据是否加载完成bool
        succeedBool: false,

        // 电影菜单数据
        movieData: [],

        // 好评与期待电影列表数据
        hotMovie: [],

        // 导航栏数据
        navData: []

      };
    },

    created() {
      this.$toast.clear()
      this.navData.push({
        name: '热映',
        api: this.api.movieOnInfoList,
        hotApi: this.api.mostExpecteds
      }, {
        name: '待映',
        api: this.api.comingList,
        hotApi: this.api.mostExpected
      }, {
        name: '经典电影',
        api: this.api.moreComingList
      })

      // 获取电影数据
      this.getMoive();
    },

    computed: {
      ...mapState({
        token: state => state.token,
        optimus_uuid: state => state.optimus_uuid,
        optimus_risk_level: state => state.optimus_risk_level,
        optimus_code: state => state.optimus_code,
        limit: state => state.limit,
      }),
      ...mapState('homeModule', {
        navActive: state => state.navActive,
        location: state => state.location
      }),
      ...mapState('api', {
        api: state => state.api
      })
    },

    methods: {
      ...mapMutations('homeModule', {
        setNavActive: 'setNavActive'
      }),

      // 切换导航栏
      toggleNavTab(index) {
        if (this.navActive == index) return;
        this.setNavActive(index);
        this.getMoive();
      },

      // 获取电影数据
      getMoive() {

        // 加载中...
        this.$toast('loading', 0)

        // 请求最受好评与受欢迎电影数据
        if (this.navData[this.navActive].hotApi) {
          if (
            JSON.parse(sessionStorage.getItem('hotMovieone')) &&
            JSON.parse(sessionStorage.getItem('hotMovietwo'))
          ) {
            let target = this.navActive ? 'two' : 'one'
            this.hotMovie = JSON.parse(
              sessionStorage.getItem(`hotMovie${target}`)
            )
          } else {
            this.axios({
                url: this.navData[this.navActive].hotApi,
                params: {
                  token: this.token,
                  optimus_uuid: this.optimus_uuid,
                  optimus_risk_level: this.optimus_risk_level,
                  optimus_code: this.optimus_code,
                  limit: this.limit
                }
              })
              .then(res => {
                if (this.$judgeNetwork(res)) return
                let target = this.navActive ? 'two' : 'one'
                sessionStorage.setItem(
                  `hotMovie${target}`,
                  JSON.stringify(res.data)
                )
                this.hotMovie = res.data
              })
          }
        }

        // 请求电影数据
        if (
          sessionStorage.getItem('movieList') != 'undefined' &&
          sessionStorage.getItem('movieComing') != 'undefined' &&
          sessionStorage.getItem('movieDefault') != 'undefined' &&
          sessionStorage.getItem('movieList') &&
          sessionStorage.getItem('movieComing') &&
          sessionStorage.getItem('movieDefault')
        ) {
          switch (true) {
            case this.navActive == 0:
              this.movieData = JSON.parse(
                sessionStorage.getItem('movieList')
              )
              break
            case this.navActive == 1:
              this.movieData = JSON.parse(
                sessionStorage.getItem('movieComing')
              )
              break
            default:
              this.movieData = JSON.parse(
                sessionStorage.getItem('movieDefault')
              )
          }
          if (this.movieData.length > 0) {
            this.$toast.clear()
            this.succeedBool = true
          }
        } else {
          this.axios({
              url: this.navData[this.navActive].api,
              params: {
                token: this.token,
                optimus_uuid: this.optimus_uuid,
                optimus_risk_level: this.optimus_risk_level,
                optimus_code: this.optimus_code
              }
            })
            .then(res => {
              if (this.$judgeNetwork(res)) return
              if (Object.prototype.toString.call(res.data) == '[object Object]') {
                this.movieData = {}
                switch (true) {
                  case this.navActive == 0:
                    this.movieData = res.data.movieList
                    sessionStorage.setItem(
                      'movieList',
                      JSON.stringify(res.data.movieList)
                    )
                    break
                  case this.navActive == 1:
                    this.movieData = res.data.coming
                    sessionStorage.setItem(
                      'movieComing',
                      JSON.stringify(res.data.coming)
                    )
                    break
                  default:
                    this.movieData = res.data.coming
                    sessionStorage.setItem(
                      'movieDefault',
                      JSON.stringify(res.data.coming)
                    )
                }
                if (this.movieData.length > 0) {
                  this.$toast.clear()
                  this.succeedBool = true
                }
              }
            })
        }
      },

      // 跳往电影详情页
      goMovieDetail(id) {
        this.$goPage({
          name: 'MovieInfo',
          params: {
            movieId: id
          }
        })
      }
    }
  }

</script>
