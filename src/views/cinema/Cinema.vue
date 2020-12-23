<template>
  <div class="cinemas">

    <!-- 选择城市 -->
    <div class="city-entry white"
         @click="$goPage({name:'City'})">
      <span class="city-name">
        {{$store.state.homeModule.location[0].cityName}}
      </span>
      <i class="city-entry-arrow iconfont icon-caret-down"></i>
    </div>

    <!-- 顶部导航栏 -->
    <CinemaNav ref="cinemaNav"></CinemaNav>

    <!-- 影院列表栏 -->
    <div v-if="isShowMask"
         class="cinema-mask">
      <img :src="require('@/assets/img/logo.png')">
      <span>{{tip}}</span>
    </div>
    <CinemaList v-else
                :cinemas="cinemasData"
                @change="selectCinema">
    </CinemaList>
  </div>
</template>

<script>
  import '@/assets/scss/cinema.scss'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: 'Cinema',

    data() {
      return {

        // 没有数据显示
        isShowMask: false,

        // 提示内容
        tip: '没有相关影院',

        // 请求参数
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,

        // 影院数据
        cinemasData: []
      }
    },

    created() {
      this.cinemasData.length == 0 && this.initCinemas()
      this.getCinemaList()
    },

    computed: {
      ...mapState({
        optimus_uuid: state => state.optimus_uuid,
        optimus_risk_level: state => state.optimus_risk_level,
        optimus_code: state => state.optimus_code,
      }),
      ...mapState('homeModule', {
        cityId: state => state.location[0].cityId
      }),
      ...mapState('api', {
        api: state => state.api
      })
    },

    watch: {
      '$store.state.cinemaModule.districtId'(id) {
        this.districtId = id
      },
      '$store.state.cinemaModule.lineId'(id) {
        this.lineId = id
      },
      '$store.state.cinemaModule.hallType'(id) {
        this.hallType = id
        this.getCinemaList()
      },
      '$store.state.cinemaModule.brandId'(id) {
        this.brandId = id
        this.getCinemaList()
      },
      '$store.state.cinemaModule.serviceId'(id) {
        this.serviceId = id
        this.getCinemaList()
      },
      '$store.state.cinemaModule.areaId'(id) {
        this.areaId = id
        this.getCinemaList()
      },
      '$store.state.cinemaModule.stationId'(id) {
        this.stationId = id
        this.getCinemaList()
      }
    },

    methods: {
      ...mapMutations('cinemaModule', {
        setCityId: 'setCityId',
        setSpecialId: 'setSpecialId',
        setDistrictId: 'setDistrictId',
        setLineId: 'setLineId',
        setHallType: 'setHallType',
        setBrandId: 'setBrandId',
        setServiceId: 'setServiceId',
        setAreaId: 'setAreaId',
        setStationId: 'setStationId'
      }),

      initCinemas() {
        this.setCityId(-1)
        this.setSpecialId(-1)
        this.setDistrictId(-1)
        this.setLineId(-1)
        this.setBrandId(-1)
        this.setHallType(-1)
        this.setServiceId(-1)
        this.setAreaId(-1)
        this.setStationId(-1)
      },

      // 获取影院
      getCinemaList() {

        // 加载中...
        this.$toast('loading', 0)
        this.axios({
            url: this.api.cinemaList,
            params: {
              day: new Date().toLocaleDateString().replace(/\//g, '-'),
              optimus_uuid: this.optimus_uuid,
              optimus_risk_level: this.optimus_risk_level,
              optimus_code: this.optimus_code,
              cityId: this.cityId,
              districtId: this.districtId,
              lineId: this.lineId,
              hallType: this.hallType,
              brandId: this.brandId,
              serviceId: this.serviceId,
              areaId: this.areaId,
              stationId: this.stationId
            }
          })
          .then(async (res) => {
            this.$toast.clear()
            if (this.$judgeNetwork(res)) {
              this.tip = res.data.msg
              return
            }
            if (res.data.cinemas) {
              res.data.cinemas.map(item => {
                for (let key in item.promotion) {
                  item[key] = item.promotion[key]
                }
                for (let key in item.tag) {
                  item[key] = item.tag[key]
                }
              })
              const {
                cinemas
              } = res.data
              this.cinemasData = await cinemas
              if (this.cinemasData.length == 0) {
                this.isShowMask = true
              } else {
                this.isShowMask = false
              }
            }
          });
      },

      // 选择影院
      selectCinema(item) {
        this.$selectCinema(item)
      }
    }
  }

</script>
