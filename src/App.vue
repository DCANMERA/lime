<template>
  <div id="app"
       @click.stop="$store.commit('setIsShowLink', false)">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="scss">
  @import './assets/scss/reset.scss';
  @import './assets/scss/common.scss';
  @import url('./assets/fonts/iconfont/iconfont.css');

</style>
