<template>
  <div class="nav-wrap filter-nav-wrap toFixed">
    <div class="tab mb-line-b">
      <div class="item"
           data-tab=".region"
           :class="{chosenTitle:showCityNav}"
           @click="setMask(0)">
        {{city | fontFormat}}
        <span class="drop"></span>
      </div>
      <div class="item"
           data-tab=".brand"
           :class="{chosenTitle:showBrandNav}"
           @click="setMask(1)">
        {{brand | fontFormat}}
        <span class="drop"></span>
      </div>
      <div class="item"
           data-tab=".special"
           :class="{chosenTitle:showSpecialNav}"
           @click="setMask(2)">
        {{special | fontFormat}}
        <span class="drop"></span>
      </div>
    </div>

    <Popup @close="closeMask"
           v-show="showMask" />
    <CinemaNavCity v-show="showCityNav"
                   :cityDistrict="cityDistrict"
                   :citySubway="citySubway"
                   @change="closeMask" />
    <CinemaNavBrand v-show="showBrandNav"
                    :brandList="brandList"
                    @change="closeMask" />
    <CinemaNavSpecial v-show="showSpecialNav"
                      :specialHallType="specialHallType"
                      :specialService="specialService"
                      @change="closeMask" />
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'CinemaNav',

    data() {
      return {
        showCityNav: false,
        showBrandNav: false,
        showSpecialNav: false,
        brandList: [],
        specialHallType: [],
        specialService: [],
        cityDistrict: [],
        citySubway: []
      };
    },

    created() {

      // 调用影院商圈数据
      this.filterCinemas();
    },

    computed: {
      showMask() {
        return this.showCityNav || this.showBrandNav || this.showSpecialNav
      },
      ...mapState('api', {
        api: state => state.api
      }),
      ...mapState('homeModule', {
        location: state => state.location[0].cityId
      }),
      ...mapState('cinemaModule', {
        city: state => state.city,
        brand: state => state.brand,
        special: state => state.special,
      }),
      ...mapState({
        optimus_uuid: state => state.optimus_uuid,
        optimus_risk_level: state => state.optimus_risk_level,
        optimus_code: state => state.optimus_code,
      }),
    },

    methods: {

      // 设置弹窗
      setMask(type) {
        const maskList = [
          this.showCityNav,
          this.showBrandNav,
          this.showSpecialNav
        ]
        const maskNameList = [
          'showCityNav',
          'showBrandNav',
          'showSpecialNav'
        ]
        if (!maskList[type]) {
          this.closeMask()
          this[maskNameList[type]] = true
          document.body.className = 'fixed'
          return
        }
        this[maskNameList[type]] = false

      },

      // 关闭弹窗
      closeMask(bool) {
        this.showCityNav = bool
        this.showBrandNav = bool
        this.showSpecialNav = bool
        document.body.className = ''
      },

      // 获取影院商圈
      filterCinemas() {
        if (this.location == 0) return
        this.axios({
            url: this.api.filterCinemas,
            params: {
              ci: this.location,
              optimus_uuid: this.optimus_uuid,
              optimus_risk_level: this.optimus_risk_level,
              optimus_code: this.optimus_code
            }
          })
          .then(res => {
            const {
              brand,
              hallType,
              service,
              district,
              subway
            } = res.data
            if (brand) {
              this.brandList = brand.subItems
              this.specialHallType = hallType
              this.specialService = service
              this.cityDistrict = district
              this.citySubway = subway
            }
          })
      }
    }
  }

</script>

<style lang="scss">
  body.fixed {
    height: 100%;
    overflow: hidden;
  }

  .nav-wrap {
    position: relative;
    top: 50px;
    user-select: none;

    .page {
      position: relative !important;
      overflow: scroll;
      background-color: $mainBg;
      overflow: auto;
      z-index: 999;
    }

    .popup {
      z-index: -1;
      background-color: rgba(0, 0, 0, .6);
      padding: 0;
    }

    &.filter-nav-wrap {
      width: 100%;
      height: 40px;
      z-index: 10;
      background-color: $mainBg;

      .tab {
        background-color: $mainBg;
        display: flex;

        .item {
          box-sizing: border-box;
          padding: 0 $margin;
          flex: 1;
          text-align: center;
          line-height: 40px;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          font-size: 13px;
          text-overflow: ellipsis;
          color: $inActiveColor;

          &+.item:before {
            content: "";
            display: block;
            position: absolute;
            height: 20px;
            top: 10px;
            left: 0;
            border-left: 1px solid $borderColor;
          }

          .drop {
            display: inline-block;
            position: absolute;
            top: 18px;
            width: 0;
            height: 0;
            margin-left: 4px;
            border: 4px solid transparent;
            border-top-color: $borderColor;
          }
        }

        .chosenTitle {
          color: $mainColor !important;

          &.item .drop {
            border-bottom-color: $mainColor;
            border-top-color: transparent;
            top: 14px;
          }
        }
      }

      .page {

        .item {
          font-size: 15px;
          padding: 0 15px;
        }
      }
    }
  }

</style>
