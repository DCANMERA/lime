<template>
  <div class="order">

    <!-- 顶部栏 -->
    <NavBar textCenter="我的订单"
            class="toFixed"
            @left-click="$goBack()">
    </NavBar>

    <div v-if="orderData.length==0"
         class="order-mask">
      <img :src="require('@/assets/img/logo.png')">
      <span>没有相关订单</span>
    </div>

    <!-- 订单信息 -->
    <div class="order-content"
         v-else>
      <div class="order-list">
        <div class="order-item mb-line-tb"
             v-for="(item,index) in orderData"
             :key="index">
          <div class="order-title mb-line-b">
            <div class="cinema-name line-ellipsis">
              <span>{{item.cinemaName}}</span>
              <i class="iconfont icon-right"></i>
            </div>
          </div>
          <div class="order-detail-link"
               @click="$goPage({
                 name:'MovieInfo',
                 params:{
                   movieId:item.movieId
                 }
          })">
            <div class="order-info">
              <img :src="item.movieImg" />
              <div class="order-desc">
                <div class="movie-name line-ellipsis">
                  <span>{{item.movieName}}</span>
                  <span>{{item.seats.length}}张</span>
                </div>
                <div class="showTime line-ellipsis">
                  {{item.date | formatDate('yyyy-MM-dd hh:mm')}} 时长
                  {{item.movieDur}}分钟
                </div>
                <div class="position line-ellipsis">
                  <span>{{item.cinemaHallType}}</span>
                  <span v-for="(value,index) in item.seats"
                        :key="index">
                    {{value.rowId}}排{{
                      value.columnId > 10 ? value.columnId : `0${value.columnId}`
                    }}座
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-more  mb-line-t">
            <div class="price">
              <span>总价：</span>
              <span>{{item.seats.length * item.seats[0].price}}元</span>
            </div>
            <div class="status">
              {{
                (item.date + item.movieDur * 3600) > (new Date()).getTime() ?
                  '进行中' :
                  '已完成'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/scss/order.scss'

  export default {
    name: 'Order',

    data() {
      return {
        orderData: []
      }
    },

    created() {
      this.orderData = this.$store.state.cinemaModule.plan
    }
  }

</script>
