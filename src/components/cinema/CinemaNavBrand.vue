<template>
  <div class="page brand">
    <div id="brand-content">
      <div class="item brand-list"
           v-for="(item,index) in brandList"
           :key="index"
           :class="{chosen: activeItem(item.id)}"
           @click="checkBrand(item.name, item.id)">
        <span class="brand-name">{{item.name}}</span>
        <span class="brand-count">{{item.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CinemaNavBrand',

    props: {
      brandList: {}
    },

    computed: {
      brandId() {
        return this.$store.state.cinemaModule.brandId
      }
    },

    methods: {

      // 检查品牌id的状态改变
      checkBrand(name, id) {
        this.$store.commit('cinemaModule/setBrand', name)
        this.$store.commit('cinemaModule/setBrandId', id)
        this.$emit('change', false)
      },

      // 根据bandId判断激活状态
      activeItem(id) {
        return id == this.brandId
      }
    }
  }

</script>

<style lang="scss">
  .page.brand {
    min-height: 150px;
    max-height: 352px;

    #brand-content {

      .item.chosen,
      .item.chosen .brand-count {
        color: $priceFontColor;
      }

      .brand-list {
        position: relative;
        line-height: 44px;
        height: 44px;
        padding: 0 15px 0 26px;
        border-bottom: 1px solid $borderColor;
        color: $defaultColor;

        span {
          display: inline-block;
          width: 49%;
        }

        .brand-count {
          text-align: right;
          color: $inActiveColor;
          font-size: 12px;
        }
      }

      .item.chosen:before {
        content: "";
        display: block;
        position: absolute;
        left: 8px;
        top: 18px;
        width: 11.5px;
        height: 8px;
        background-image: url('../../assets/img/right.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }

</style>
