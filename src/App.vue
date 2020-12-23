<template>
  <div id="app"
       @click.stop="$store.commit('setIsShowLink', false)">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
  @import './assets/scss/reset.scss';
  @import './assets/scss/common.scss';
  @import url('./assets/fonts/iconfont/iconfont.css');

</style>
