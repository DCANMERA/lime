<template>
  <div class="page special">
    <div id="special-content"
         style="height: 344.52px;">
      <div class="item-title">{{specialService.name}}</div>
      <div class="item-list clearfix">
        <div class="item"
             :data-id="item.id"
             v-for="(item,index) in specialService.subItems"
             :key="index"
             :class="{chosen: serviceId==item.id}"
             @click="clickServiceItem(item.id)">
          {{item.name}}
        </div>
      </div>
      <div class="item-title">{{specialHallType.name}}</div>
      <div class="item-list clearfix">
        <div class="item"
             v-for="(item,index) in specialHallType.subItems"
             :key="index"
             :data-id="item.id"
             :class="{chosen: isActiveHallType(item.id)}"
             @click="clickHallTypeItem(item.id, item.name)">
          {{item.name}}
        </div>
      </div>
    </div>

    <div id="special-btn">
      <span class="btn"
            id="cancel-btn"
            @click="reset">
        重置
      </span>
      <span class="btn"
            id="confirm-btn"
            @click="confirm">
        确定
      </span>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: 'CinemaNavSpecial',

    props: {

      // 服务
      specialService: {},

      // 特殊厅
      specialHallType: {}
    },

    data() {
      return {

        // 服务id
        serviceId: -1,

        // 特色类型
        hallType: -1,

        // 导航条特色的名
        hallTypeName: ''
      }
    },

    created() {
      this.hallTypes = this.storeHallType;
    },

    computed: {
      ...mapState('cinemaModule', {
        storeHallType: state => state.hallType,
      })
    },

    methods: {
      ...mapMutations('cinemaModule', {
        setServiceId: 'setServiceId',
        setHallType: 'setHallType',
        setSpecialId: 'setSpecialId',
        setSpecial: 'setSpecial',
      }),

      // 特色区域激活状态
      isActiveHallType(id) {
        return id === this.hallType
      },

      // 服务区域事件
      clickServiceItem(id) {
        if (this.serviceId == id) return
        this.serviceId = id
      },

      // 特色区域事件
      clickHallTypeItem(id, name) {
        if (this.hallType == id) return
        this.hallType = id
        this.hallTypeName = name
      },

      // 重置事件
      reset() {
        if (this.hallType == -1 && this.serviceId == -1) return
        this.hallType = -1
        this.serviceId = -1
        this.setServiceId(-1)
        this.setHallType(-1)
        this.setSpecialId(-1)
      },

      // 确认事件
      confirm() {
        this.setServiceId(this.serviceId)
        if (this.storeHallType != this.hallType) {
          this.setHallType(this.hallType)
          this.setSpecial(this.hallTypeName)
        }
        this.$emit('change', false)
      }
    }
  }

</script>

<style lang="scss">
  .page.special {

    #special-content {
      min-height: 150px;
      max-height: 270px;
      overflow: scroll;

      .item-title {
        margin-left: 12px;
        margin-top: 11px;
        font-size: 14px;
        color: rgba($color: $inActiveColor, $alpha: .8);
      }

      .item-list {
        margin: 0 12px 12px;

        .item {
          float: left;
          width: 21.3%;
          height: 30px;
          padding: 3px 0;
          margin-right: 3%;
          margin-top: 10px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          border: 1px solid $borderColor;
          border-radius: 5px;
          font-size: 12px;

          &.chosen {
            background: rgba($color: $priceFontColor, $alpha: .1);
            color: $priceFontColor;
            border: 1px solid $priceFontColor;
          }
        }
      }

    }

    #special-btn {
      height: 60px;
      width: 100%;
      border-top: 1px solid $borderColor;
      margin-top: 10px;
      background: rgba($color: $assistBg, $alpha: .6);

      .btn {
        display: inline-block;
        height: 34px;
        width: 21.3%;
        margin: 13px 11px;
        border: 1px solid $borderColor;
        border-radius: 6px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        color: rgba($color: $inActiveColor, $alpha: .8);
      }

      #confirm-btn {
        float: right;
        background: $mainColor;
        border: 1px solid $mainColor;
        color: $activeColor;
      }
    }
  }

</style>
