<template>
  <div class="page region">

    <!-- 顶部导航条 -->
    <div id="region-tab">
      <ul class="tab">
        <li class="item"
            :class="{chosen: !navCityItemIndex}"
            data-type="region"
            data-subnav="#district"
            @click="toggleTab(0)">
          商区
        </li>
        <li class="item"
            :class="{chosen: navCityItemIndex}"
            data-type="region"
            data-subnav="#subway"
            @click="toggleTab(1)">
          地铁站
        </li>
      </ul>
    </div>

    <!-- 导航列表 -->
    <div id="region-list">

      <!-- 侧栏 -->
      <div id="region-sidenav">

        <!-- 商区 -->
        <div id="district"
             v-show="navCityItemIndex == 0">
          <div class="district-li item"
               v-for="(item,index) in cityDistrict.subItems"
               :class="{chosen: districtId == item.id}"
               :data-id="item.id"
               :key="index"
               @click="toggleSubNav(index,item)">
            {{item.name}}({{item.count}})
          </div>
        </div>

        <!-- 地铁站 -->
        <div id="subway"
             v-show="navCityItemIndex == 1">
          <div class="district-li item"
               v-for="(item,index) in citySubway.subItems"
               :class="{chosen: lineId == item.id}"
               :data-id="item.id"
               :key="index"
               @click="toggleSubNav(index,item)">
            {{item.name}}({{item.count}})
          </div>
        </div>
      </div>

      <!-- 选择内容区 -->
      <div id="region-list-item">
        <div id="filter-list"
             v-if="citySubway.subItems || cityDistrict.subItems">
          <div class="item"
               v-for="(item,index) in sideNavs[subNavIndex].subItems"
               :class="{
                 chosen: navCityItemIndex ?
                  stationId == item.id :
                  areaId == item.id
                }"
               :data-id="item.id"
               :key="index"
               @click="changeTab(index,item)">
            <span class="item-name">{{item.name}}</span>
            <span class="item-count">{{item.count}}</span>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: 'CinemaNavCity',

    props: {

      // 商圈数据
      cityDistrict: {},

      // 地铁站数据
      citySubway: {}
    },

    data() {
      return {

        // 记录侧栏点击索引
        subNavIndex: 0,

        // 记录侧栏点击id
        subNavId: -1
      };
    },

    computed: {
      sideNavs() {
        return this.navCityItemIndex ?
          this.citySubway.subItems :
          this.cityDistrict.subItems
      },
      ...mapState('cinemaModule', {
        navCityItemIndex: state => state.navCityItemIndex,
        districtId: state => state.districtId,
        lineId: state => state.lineId,
        areaId: state => state.areaId,
        stationId: state => state.stationId
      })
    },

    methods: {
      ...mapMutations('cinemaModule', {
        setNavCityItemIndex: 'setNavCityItemIndex',
        setCity: 'setCity',
        setCityId: 'setCityId',
        setDistrictId: 'setDistrictId',
        setLineId: 'setLineId',
        setAreaId: 'setAreaId',
        setStationId: 'setStationId'
      }),

      // 切换商区与地铁站
      toggleTab(index) {
        this.setNavCityItemIndex(index)
        let items = document.querySelectorAll(`#region-sidenav>div:nth-of-type(${index+1}) .item`)
        items.forEach((item, i) => {
          if (item.className.includes('chosen')) {
            this.subNavIndex = i
          }
        });

      },

      // 切换侧栏导航
      toggleSubNav(index, item) {
        this.subNavIndex = index
        this.subNavId = item.id
        this.navCityItemIndex ?
          this.setLineId(this.subNavId) :
          this.setDistrictId(this.subNavId)
        if (
          (this.areaId != -1 || this.stationId != -1) &&
          item.id == -1
        ) {
          this.$emit('change', false)
          this.setAreaId(-1)
          this.setStationId(-1)
          this.setCityId(-1)
        }
      },

      // 选择StationId与AreaId，并切换激活状态
      changeTab(index, item) {
        this.$emit('change', false)
        this.setCity(item.name)
        this.navCityItemIndex ?
          this.setStationId(item.id) :
          this.setAreaId(item.id)
      }
    }
  }

</script>

<style lang="scss">
  .page.region {

    #region-tab {
      height: 44px;

      ul li {
        position: relative;
        display: inline-block;
        padding: 0 10px;
        width: 50%;
        height: 100%;
        line-height: 44px;
        text-align: center;

        &.chosen {
          color: $priceFontColor;

          &:after {
            content: "";
            position: absolute;
            display: block;
            bottom: 0;
            left: 0;
            width: 90%;
            border-top: 1px solid $priceFontColor;
          }
        }
      }
    }

    #region-list {
      background: $assistBg;
      height: 400px;

      .item {
        border: 0;
      }

      #region-sidenav {
        width: 35%;
        height: 100%;
        float: left;
        overflow: scroll;

        #district,
        #subway {
          min-height: 100%;
          background: $mainBg;

          .chosen {
            color: $priceFontColor;
            background: $assistBg;
          }

          .district-li {
            height: 44px;
            padding-left: 10px;
            line-height: 44px;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }

      #region-list-item {
        width: 65%;
        height: 100%;
        float: right;
        overflow: scroll;

        #filter-list {
          background: $assistBg;

          .item.chosen,
          .item.chosen span.item-count,
          .item.chosen span.item-name {
            color: $priceFontColor;
          }

          .item {
            position: relative;
            height: 45px;
            line-height: 45px;
            padding: 0 0 0 25px;
          }

          .item.chosen:before {
            content: "";
            display: block;
            position: absolute;
            left: 8px;
            top: 19px;
            width: 11.5px;
            height: 8px;
            background-image: url('../../assets/img/right.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .item span {
            display: inline-block;

            &.item-name {
              width: 80%;
              font-size: 14px;
              color: $defaultColor;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }

            &.item-count {
              float: right;
              width: 20px;
              margin-right: 10px;
              color: $inActiveColor;
              font-size: 12px;
              text-align: right;
            }
          }
        }
      }
    }
  }

</style>
