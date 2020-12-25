<template>
  <div class="search">

    <!-- 顶部导航栏 -->
    <NavBar class="toFixed"
            text-center="青柠电影"
            @left-click="$goBack()">
    </NavBar>

    <!-- 搜索栏  -->
    <div class="search-wrap boder toFixed">
      <div class="input-wrap">
        <i class="iconfont icon-search"></i>
        <input type="search"
               class="search-input"
               ref="search"
               placeholder="搜电影、搜影院"
               @blur="getHistory"
               v-model="searchValue" />
      </div>
      <span class="search-btn"
            @click="$goPage({name:'Home'})">
        取消
      </span>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history"
         v-show="isShowHistory">
      <div class="history-item border"
           v-for="(item,index) in searchData.movies"
           :key="index">
        <i class="iconfont icon-time-circle history-icon"></i>
        <span class="history-word line-ellipsis"
              @click="searchValue=item">
          {{item}}
        </span>
        <i class="iconfont del-word icon-close"
           @click.stop="clearHistory(index)">
        </i>
      </div>
    </div>

    <!-- 搜索电影层 -->
    <div class="block"
         v-show="movies.list.length > 0 && !isShowHistory">
      <div class="tip border">电影/电视剧/综艺</div>
      <div class="border"></div>
      <Movie v-for="(item,index) in movies.list"
             :key="index"
             :item="item"
             :class="item.id"
             @movie="goMovieDetail">
      </Movie>
      <div class="tip border result">
        查看全部{{movies.total}}部影视剧
      </div>
    </div>

    <!-- 搜索电影影院 -->
    <div class="block"
         v-show="cinemas.list.length > 0 && !isShowHistory">
      <div class="tip border">影院</div>
      <CinemaList :cinemas="cinemas.list"
                  @change="selectCinema"></CinemaList>
      <div class="tip border result">
        查看全部{{cinemas.total}}家电影院
      </div>
    </div>

    <div v-show="movies.list.length ==0 && cinemas.list.length == 0 && !isShowHistory"
         class="loading-mask">
      <img :src="require('@/assets/img/logo.png')">
      <span>无相关电影或影院</span>
    </div>
  </div>
</template>

<script>
  import '@/assets/scss/search.scss'
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: 'Search',

    data() {
      return {

        // 搜索值
        searchValue: '',

        // 搜素数据
        movies: {
          list: [],
          total: 0,
          type: 0
        },

        cinemas: {
          list: [],
          total: 0,
          type: 0
        },

        // 是否显示历史记录
        isShowHistory: false,

        // 保存搜索历史数据
        historyData: {
          movies: []
        },

        // 获取搜索历史数据
        searchData: []

      };
    },

    created() {
      this.$nextTick(() => {

        //获取搜索框
        let searchIpt = this.$refs.search

        //获取焦点
        searchIpt.focus()
        this.isShowHistory = true
        if (JSON.parse(localStorage.getItem('_sh'))) {
          this.searchData = JSON.parse(localStorage.getItem('_sh'))
        }
      })
    },

    computed: {
      ...mapState('api', {
        api: state => state.api
      }),
      ...mapState('homeModule', {
        location: state => state.location
      }),
    },

    watch: {
      searchValue(value) {
        if (value === '') {
          this.isShowHistory = true
          return
        }

        // 加载中...
        this.$toast('loading', 0)
        this.axios({
            url: this.api.search,
            params: {
              kw: value,
              cityId: this.location[0].cityId,
              stype: -1
            }
          })
          .then(res => {
            this.$toast.clear()
            this.isShowHistory = false
            if (res.data.movies) {
              this.movies = {
                list: [],
                total: 0,
                type: 0
              }
              this.movies = Object.assign({}, res.data.movies)
            }

            if (res.data.cinemas) {
              this.cinemas = {
                list: [],
                total: 0,
                type: 0
              }
              this.cinemas = Object.assign({}, res.data.cinemas)
            }
          })
      }
    },

    methods: {

      // 设置历史记录
      getHistory() {
        let value = this.searchValue
        if (value == '') return
        this.isShowHistory = false
        if (
          this.historyData.movies.filter(item => item == value).length == 0
        ) {
          this.historyData.movies.unshift(this.searchValue)
          if (this.historyData.movies.length > 3) {
            this.historyData.movies.pop()
          }
          localStorage.removeItem('_sh')
          localStorage.setItem('_sh', JSON.stringify(this.historyData))
        }
      },

      // 清除历史
      clearHistory(index) {
        this.searchData.movies.splice(index, 1)
        if (this.searchData.movies.length == 0) return
        localStorage.removeItem('_sh')
        localStorage.setItem('_sh', JSON.stringify(this.searchData))
      },

      // 去往电影详情
      goMovieDetail(id) {
        this.$goPage({
          name: 'MovieInfo',
          params: {
            movieId: id
          }
        })
      },

      // 选择影院
      selectCinema(item) {
        this.$selectCinema(item)
      }
    }
  }

</script>
