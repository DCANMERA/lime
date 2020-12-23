<template>
  <div class="cinema">
    <div class="cinema-list">
      <div class="list-wrap">
        <div class="item mb-line-b"
             v-for="(item,index) in cinemas"
             :key="index"
             @click.stop="cahnge(item)">
          <div class="title-block box-flex middle">
            <div class="title line-ellipsis">
              <span>{{item.nm}}</span>
              <span class="price-block"
                    v-if="item.sellPrice>0">
                <span class="price">{{item.sellPrice}}</span>
                <span class="q">元起</span>
              </span>
            </div>
            <div class="location-block box-flex">
              <div class="flex line-ellipsis">{{item.addr}}</div>
              <div class="distance">{{item.distance}}</div>
            </div>
            <div class="flex"></div>
            <div class="label-block">
              <div class="sell"
                   v-if="item.sell">座</div>
              <div v-for="(value,j) in item.hallType"
                   :key="j">
                <div class="default">{{value}}</div>
              </div>
              <div class="allowRefund"
                   v-if="item.allowRefund">退</div>
              <div class="endorse"
                   v-if="item.endorse">改签</div>
              <div class="snack"
                   v-if="item.snack">小吃</div>
              <div class="vipTag"
                   v-if="item.vipTag">
                {{item.vipTag}}
              </div>
            </div>
            <div class="discount-block"
                 v-if="item.cardPromotionTag">
              <div>
                <div class="discount-label normal card">
                  <img src="https://p1.meituan.net/scarlett/ff1c6e33ed0ac3cd862910a83d4bf959583.png">
                </div>
                <div class="discount-label-text">
                  {{item.cardPromotionTag}}
                </div>
              </div>
            </div>
          </div>
          <div class="min-show-block J-fload"
               data-bid="dp_wx_buy_cinema_list_spread"
               v-if="item.showTimes">
            <span>近期场次：</span>
            <span class="time-line">{{item.showTimes}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CinemaList',

    props: {
      cinemas: {
        default () {
          return [];
        }
      }
    },

    methods: {
      cahnge(item) {
        this.$emit('change', item);
      }
    }
  }

</script>

<style lang="scss">
  html {
    font-size: 14px;
  }

  .cinema-list {

    .location-block,
    .price-block,
    .title-block {
      line-height: 1.5;
    }

    .list-wrap {
      background-color: $mainBg;

      .item {
        padding: $margin $assistMargin $margin 0;
        margin-left: $assistMargin;
        background-color: $mainBg;
        position: relative;
        overflow: hidden;
      }

      .title-block {
        display: block;

        .title {
          height: 23px;
          line-height: 23px;
          font-size: 16px;
          color: $defaultColor;
        }

        .label-block {
          height: 17px;
          line-height: 17px;
          margin-top: 4px;
          margin-bottom: 4px;
          overflow: hidden;
          font-size: 0;
          flex-shrink: 0;

          div.default,
          div.allowRefund,
          div.endorse,
          div.hallType,
          div.sell {
            color: #589daf;
            border: 1px solid #589daf;
          }

          div.snack,
          div.vipTag {
            color: #f90;
            border: 1px solid #f90;
          }

          &>div {
            position: relative;
            display: inline-block;
            padding: 0 3px;
            height: 15px;
            line-height: 15px;
            border-radius: 2px;
            font-size: .1rem;
          }

          &>div+div {
            margin-left: 5px;
          }
        }
      }

      .price-block {
        padding-top: 9px;
        padding-left: 3px;

        .d,
        .price,
        .q {
          font-size: 11px;
          color: $priceFontColor;
        }

        .mb-line-b {
          background:
            url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAABlBMVEUAAADh4eGdLxMbAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjYGA4AAAAxADBPcXUKgAAAABJRU5ErkJggg==) 0 bottom repeat-x;
        }

        .price {
          font-size: 18px;
        }

        .q {
          margin-left: 3px;
        }
      }

      .location-block {
        margin-top: 6px;
        font-size: 13px;
        color: $inActiveColor;

        .distance,
        .region {
          margin-left: 5px;
        }
      }

      .min-show-block {
        padding: 0 15px 0 0;
        margin-right: -15px;
        line-height: 1.5;
        font-size: 0;

        &>span {
          font-size: 12px;
          color: $inActiveColor;
          opacity: .7;

          &.time-line {
            display: inline-block;
            position: relative;

            &+span.time-line {
              margin-left: 14px;

              &::before {
                content: "";
                display: block;
                position: absolute;
                height: 15px;
                width: 1px;
                left: -7px;
                background: $assistBg;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }

    .discount-block {
      color: $inActiveColor;
      margin-bottom: 4px;
      opacity: .9;

      .discount-label {
        width: 15px;
        height: 14px;
        position: relative;
        top: 3px;
      }

      .discount-label-text {
        margin-left: 5px;
        font-size: 11px;
      }
    }
  }

</style>
