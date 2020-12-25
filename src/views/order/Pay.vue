<template>
  <div class="pay">

    <!-- 顶部导航栏 -->
    <NavBar @left-click="$goBack()"
            :text-center="cinemaName"
            class="toFixed">
    </NavBar>

    <div class="seat-block">

      <div class="info-block">

        <!-- 电影头部信息 -->
        <div class="movie-info box-flex middle">
          <div class="flex">
            <div class="title line-ellipsis">{{$route.query.nm}}</div>
            <div class="info line-ellipsis">
              <span>
                {{(new Date) | formatDate('yyyy-MM-dd hh:mm')}}
              </span>
              <span class="version line-ellipsis">
                {{$route.query.oriLang}}
                {{
                  ($route.query.ver).substring(
                    0,
                    ($route.query.ver).indexOf('/')
                  )
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- 电影通告 -->
        <ul class="reminder-list">
          <li class="reminder-item"
              :class="{
                height20: !isShowTip
              }">
            <img src="http://p1.meituan.net/movie/77717de09967c29cd5b3d1f76309ac841254.png">
            <div>观影需全程佩戴口罩,电影放映期间影厅内禁止饮食,感谢配合！</div>
            <span class="reminder-num"
                  @click="isShowTip = !isShowTip">
              1条通知
              <i class="iconfont"
                 :class="isShowTip?'icon-up':'icon-down'"></i>
            </span>
          </li>
        </ul>
      </div>

      <!-- 选座区域 -->
      <div class="select-block animate">
        <div class="seat-block-wrap animate">

          <!-- 影院厅 -->
          <div class="hall-name-wrapper animate">
            <span class="hall-name">{{cinemaHallType}}</span>
          </div>

          <div class="seats-block animate">
            <!-- 电影选座列数 -->
            <div class="seats-wrap animate"
                 v-for="(item,index) in seatsData"
                 :key="index">
              <div class="row-nav">{{index + 1}}</div>
              <div class="wrap"
                   v-for="(value,j) in item.seats"
                   :data-status="value.seatStatus"
                   :key="j"
                   @click="selectPlan(value)">
                <div class="seat">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 购买区域 -->
      <div class="buy-block"
           :data-show="planData.seats.length > 0 ? 'submit' : 'recommend'">
        <div class="cinema-info">
          <div class="seat-type-info">
            <span class="text-middle">
              <img class="icon"
                   src="http://p1.meituan.net/movie/9dfff6fd525a7119d44e5734ab0e9fb41244.png">
              <span class="text">可选</span>
            </span>
            <span class="text-middle">
              <img class="icon"
                   src="http://p0.meituan.net/moviemachine/2af4c987b1758563e22258c077139cdf842.png">
              <span class="text">已售</span>
            </span>
            <span class="text-middle">
              <img class="icon"
                   src="http://p0.meituan.net/moviemachine/4abd89a0c0a864694b27c54d229fa7f41099.png">
              <span class="text">不可售</span>
            </span>
          </div>
        </div>
        <div class="price-block"
             v-if="planData.seats.length > 0">
          <div class="title-block">
            已选座位
          </div>
          <div class="box-flex selected-block">
            <div class="selected-seat-item"
                 v-for="(item,index) in planData.seats"
                 :key="index"
                 @click="planData.seats.splice(index,1); item.seatStatus = 1;">
              <p class="selected-seat-info">
                {{item.rowId}}排{{item.columnId > 10 ? item.columnId : `0${item.columnId}`}}座
              </p>
              <p class="price-info">
                ¥{{item.price}}
              </p>
              <span class="iconfont close icon-close"></span>
            </div>
          </div>
        </div>
        <div class="submit-block box-flex">
          <div class="submit flex"
               @click="submit">
            {{getTotalPrice}}确认选座
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/scss/pay.scss';
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: 'Pay',

    data() {
      return {

        // 电影名字
        cinemaName: '',

        // 电影厅类型
        cinemaHallType: '',

        // 电影数据
        seatsData: [],

        // 是否展开提示内容
        isShowTip: false,

        // 选择座位信息
        planData: {
          cinemaHallType: '',
          cinemaName: '',
          movieName: '',
          movieDur: '',
          seats: [],
          date: ''
        }

      }
    },

    created() {
      setTimeout(() => {
        this.$toast.clear()
      }, 2000)
      this.cinemaName = this.cinema.nm ?
        this.cinema.nm :
        JSON.parse(sessionStorage.getItem('cinema')).nm
      let data = JSON.parse(
        localStorage.getItem(
          `seats${this.$route.query.id}${this.cinema.id}`
        )
      )
      if (data) {
        this.seatsData = data
        return
      }
      this.seatsData = this.seat
      this.seatsData.map(item => {
        item.seats.map(value => {
          if (value.seatStatus == 3) {
            value.seatStatus = 1
          }
        })
      })
    },

    computed: {
      getTotalPrice() {
        if (this.planData.seats.length == 0) {
          return ''
        }
        return `￥${this.planData.seats.reduce((p, n) => p + n.price, 0)}`
      },
      ...mapState('cinemaModule', {
        seat: state => state.seat,
        cinema: state => state.cinema,
        movieImg: state => state.movieImg,
      })
    },

    methods: {
      ...mapMutations('cinemaModule', {
        setPlan: 'setPlan',
        setSeat: 'setSeat',
        setMovieId: 'setMovieId',
      }),

      // 选择座位
      selectPlan(item) {
        switch (true) {
          case item.seatStatus == 1:
            if (this.planData.seats.length > 3) {
              this.$toast('一次最多选择四张电影票')
              return
            }
            item.seatStatus = 2
            this.planData.seats.push(item)
            break
          case item.seatStatus == 2:
            this.planData.seats.map((v, i) => {
              if (
                v.columnId == item.columnId &&
                v.rowId == item.rowId
              ) {
                this.planData.seats.splice(i, 1)
              }
            })
            item.seatStatus = 1
            break
          case item.seatStatus == 3:
            this.$toast('座位已售')
            break
          case item.seatStatus == 4:
            this.$toast('座位不可用')
            break
        }
      },

      // 提交订单
      submit() {
        let cinemaName = ''
        if (this.planData.seats.length == 0) {
          this.$toast('请选择座位')
          return
        }
        if (sessionStorage.getItem('cinema')) {
          cinemaName = JSON.parse(sessionStorage.getItem('cinema')).nm
        } else {
          cinemaName = this.cinema.nm
        }
        this.$toast('提交订单成功')
        this.planData.date = (new Date).getTime()
        this.planData.cinemaHallType = this.cinemaHallType
        this.planData.cinemaName = cinemaName
        this.planData.movieId = this.$route.query.id
        this.planData.movieName = this.$route.query.nm
        this.planData.movieDur = this.$route.query.dur
        this.planData.movieImg = this.movieImg
        this.setMovieId(this.$route.query.id)
        this.setSeat(this.planData)
        this.setPlan(this.planData)
        this.$goPage({
          name: 'Order'
        })
      }
    },

    beforeRouteEnter(to, from, next) {
      document.querySelectorAll('.mask').forEach((item, index) => item.remove())
      next()
    },
  }

</script>
