<template>
  <div class="tabs border"
       @click="toggleTab">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    methods: {
      toggleTab() {
        this.$emit('change')
      }
    }
  }

</script>

<style lang="scss">
  .tabs {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 12px;
    cursor: pointer;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: $tabBarBg;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    z-index: 9999;
  }

  .tabs::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -999;
  }

</style>
