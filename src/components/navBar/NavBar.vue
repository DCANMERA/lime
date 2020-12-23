<template>
  <div class="nav-bar">
    <div class="nav-left"
         @click.stop="leftClick">
      <slot name="left">
        <i class="iconfont icon-left icon"></i>
        {{textLeft}}
      </slot>
    </div>
    <div class="nav-center"
         @click.stop="centerClick">
      <slot name="center">
        {{textCenter}}
      </slot>
    </div>
    <div class="nav-right"
         @click.stop="rightClick">
      <slot name="right">
        <i class="iconfont icon-menu"
           @click.stop="$store.commit(
             'setIsShowLink',
             !$store.state.isShowLink
             )">
        </i>
        {{textRight}}
        <div class="nav-link"
             v-show="$store.state.isShowLink"
             @click.stop="$store.commit('setIsShowLink', false)">
          <div class="nav-link-item border">
            <router-link to="/main/home">首页</router-link>
          </div>
          <div class="nav-link-item border">
            <router-link to="/main/cinema">影院</router-link>
          </div>
          <div class="nav-link-item border">
            <router-link to="/main/profile">我的</router-link>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',

    props: {
      textLeft: {
        default: ''
      },
      textCenter: {
        default: ''
      },
      textRight: {
        default: ''
      },
    },

    methods: {
      leftClick() {
        this.$emit('left-click')
      },
      centerClick() {
        this.$emit('center-click')
      },
      rightClick() {
        this.$emit('right-click')
      }
    }
  }

</script>

<style lang="scss">
  .nav-bar {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 22px;
    font-size: 18px;
    display: flex;
    align-items: center;
    background-color: $mainColor;
    color: $activeColor;
    position: relative;
    z-index: 2001;

    .nav-center {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 70%;
      margin: 0 auto;
    }

    .nav-left,
    .nav-right {
      line-height: 50px;
      text-align: center;
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 $margin;
    }

    .nav-left .icon {
      font-size: 26px;
    }

    .nav-right .iconfont {
      font-size: 18px;
    }

    .nav-left {
      left: 0;
    }

    .nav-right {
      right: 0;
    }

    .nav-link {
      position: fixed;
      top: 46px;
      right: 12px;
      width: 110px;
      background-color: $mainBg;
      z-index: 20;
      box-shadow: 0 3px 9px 0 rgba(0, 0, 0, .1);
    }

    .nav-link .nav-link-item {
      height: 45.5px;
      text-align: center;
    }

    .nav-link .nav-link-item:last-of-type {
      border-bottom: none;
    }

    .nav-link-item a {
      display: block;
      font-size: 15px;
      line-height: 45.5px;
    }
  }

</style>
