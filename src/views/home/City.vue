<template>
  <div id="city-list"
       class="city-list-container">

    <!-- 城市导航 -->
    <div class="nav"
         @click="jump">
      <div class="nav-item"
           data-id="locate">
        定位
      </div>
      <div class="nav-item"
           data-id="history">
        最近
      </div>
      <div class="nav-item"
           data-id="hot">
        热门
      </div>
      <div class="nav-letter  nav-item"
           v-for="(item,index) in city.letterMap"
           :data-id="index"
           :key="index">
        {{index}}
      </div>
    </div>

    <!-- 定位城市 -->
    <div>
      <div id="locate"
           class="city-title">
        定位城市
      </div>
      <div class="city-list city-list-inline clearfix">
        <div class="location-city"
             ref="location"
             @click="getLocation">
          {{
            position.nm ?
              position.nm :
              '定位失败，请点击重试'
          }}
        </div>
      </div>
    </div>

    <!-- 历史选择城市 -->
    <div class="history-city-list"
         v-if="historyCity.data.length > 0">
      <div id="history"
           class="city-title">
        最近访问城市
      </div>
      <div class="city-list city-list-inline clearfix">
        <div class="city-item"
             v-for="(item,index) in historyCity.data"
             :key="index"
             @click="selectCity(item)">
          {{item.cityName}}
        </div>
      </div>
    </div>

    <!-- 热门城市 -->
    <div id="hot"
         class="city-title">
      热门城市
    </div>
    <div class="city-list city-list-inline clearfix">
      <div class="city-item"
           v-for="(item,index) in city.hotCity"
           :key="index"
           @click="selectCity(item)">
        {{item.nm}}
      </div>
    </div>

    <!-- 所有城市 -->
    <div v-for="(item,key) in city.letterMap"
         :key="key">
      <div class="city-title city-title-letter"
           :id="key">
        {{key}}
      </div>
      <div class="city-list city-list-block clearfix">
        <div class="city-item"
             v-for="(value,index) in item"
             :key="index"
             @click="selectCity(value)">
          {{value.nm}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: 'City',

    data() {
      return {

        // 历史城市数据
        historyCity: {
          data: [],
          expire: ''
        }
      };
    },

    created() {
      if (localStorage.getItem('historyCity')) {
        this.historyCity = JSON.parse(localStorage.getItem('historyCity'));
      }
    },

    computed: {
      ...mapState('homeModule', {
        city: state => state.city,
        flag: state => state.flag,
        position: state => state.position,
      })
    },

    methods: {
      ...mapMutations('homeModule', {
        setLoaction: 'setLoaction',
        setPosition: 'setPosition',
        setFlag: 'setFlag'
      }),

      // 页面滚动指定位置
      jump($event) {
        let id = $event.target.getAttribute('data-id')
        document.getElementById(id).scrollIntoView()
      },

      // 选择城市
      selectCity(item, isGoBack = true) {
        let flag = false
        let data = this.historyCity.data
        let obj = {}
        if (item.cityId) {
          item.id = item.cityId
          item.nm = item.cityName
        }
        obj.cityId = item.id
        obj.cityName = item.nm
        obj.selectCity = true
        for (let i = 0; i < data.length; i++) {
          if (data[i].cityId == item.id) {
            if (i == 0) {
              flag = true
              break
            }
            data.splice(i, 1)
            break
          }
        }
        if (isGoBack) {
          this.$goBack()
        }
        if (flag) return
        this.historyCity.data.unshift(obj)
        if (this.historyCity.data.length > 3) {
          this.historyCity.data.pop()
        }
        localStorage.removeItem('historyCity')
        localStorage.setItem('historyCity', JSON.stringify(this.historyCity))
        this.setLoaction(this.historyCity.data)
      },

      // 定位
      getLocation() {
        let _this = this
        if (!this.flag) {
          this.$refs.location.innerHTML = '正在定位...'
          if (navigator.geolocation) {
            let timer = null
            let i = 0
            clearInterval(timer)
            timer = setInterval(() => {
              i++
              if (i == 2) {
                clearInterval(timer)
                _this.$refs.location.innerHTML = '定位失败，请点击重试'
              }
            }, 1000)
            navigator.geolocation.getCurrentPosition(

              // 成功
              res => {
                clearInterval(timer)
                let data = this.city.letterMap
                for (let key in data) {
                  if (this.flag) {
                    break
                  }
                  for (let item of data[key]) {
                    let ptn = res.coords
                    let lat = item.position.lat - ptn.latitude
                    let lng = item.position.lng - ptn.longitude
                    if (
                      lat <= 0.1 &&
                      lat >= -0.1 &&
                      lng <= 0.1 &&
                      lng >= -0.1
                    ) {
                      this.setFlag(true)
                      let timer = setTimeout(() => {
                        clearTimeout(timer)
                        this.$refs.location.innerHTML = item.nm
                        this.setPosition(item)
                      }, 1500)
                      break
                    }
                  }
                }
              },

              // 失败
              err => {
                let timer = setTimeout(() => {
                  clearTimeout(timer)
                  _this.$refs.location.innerHTML = '定位失败，请点击重试'
                }, 1500)
              });
            return
          }
          this.$refs.location.innerHTML = '定位失败，请点击重试'
          return
        }
        this.selectCity(this.position)
      }
    }
  }

</script>

<style lang="scss">
  .city-list-container {
    background-color: #EBEBEB;
    font-size: 14px;
    color: $defaultColor;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1000;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .city-title {
    padding-left: 15px;
    line-height: 30px;
  }

  .city-list-inline {
    background-color: #f5f5f5;
    padding-bottom: 8px;
  }

  .city-list {
    padding-right: 30px;
  }

  .city-list-block {
    background-color: #f5f5f5;
  }

  .city-list-inline .city-item,
  .city-list-inline .location-city {
    float: left;
    background: $mainBg;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 4%;
    padding: 0 4px;
    border: 1px solid $borderColor;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .city-list-inline .location-city {
    width: auto;
    min-width: 30%;
    padding: 0 20px;
  }

  .city-title-letter {
    padding-left: 25px;
  }


  .city-list-block .city-item {
    height: 44px;
    line-height: 44px;
    margin-left: 15px;
    border-bottom: 1px solid #c8c7cc;
  }

  .city-list-block .city-item:last-of-type {
    border-bottom: none;
  }

  .nav {
    position: fixed;
    top: 75px;
    top: 11vh;
    right: 0;
    width: 35px;
    z-index: 10;
    text-align: center;
    font-size: 12px;
  }

  .nav .nav-item {
    height: 16px;
    height: 2.8vh;
  }

  .nav .nav-letter {
    width: 15px;
    margin-left: 15px;
  }

</style>
