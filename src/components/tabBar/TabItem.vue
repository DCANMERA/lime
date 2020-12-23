<template>
  <div class="tab-item"
       ref="tabItem"
       :class="{active: isActive}"
       @click="goPage">
    <div class="tab-item-icon">
      <div class="tab-icon">
        <slot name="icon">
          <i class="iconfont tab-icon"
             :class="icon"></i>
        </slot>
      </div>
      <div class="tab-dot"
           v-if="dot != '' ">
        <slot name="dot"></slot>
      </div>
    </div>
    <div class="tab-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabItem',

    props: {
      dot: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      to: {
        type: String | Object
      }
    },

    computed: {

      // 是否处于激活状态
      isActive() {
        return this.$route.path.includes(this.to)
      }

    },

    methods: {
      goPage() {
        let index = this.$refs.tabItem.getAttribute('data-index')
        if (this.isActive) return
        this.$store.commit('setTabActive', index)
        if (this.to.includes('http')) {
          location.href = this.to
          return
        }
        this.$router.replace(this.to)
      }
    }
  }

</script>

<style lang="scss">
  .tab-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $inActiveColor;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;

    .tab-item-icon {
      position: relative;
      margin-bottom: 4px;
      font-size: 22px;
    }

    .tab-icon {
      position: relative;
      display: inline-block;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
    }

    .tab-dot {
      position: absolute;
      top: 0;
      right: 0;
      box-sizing: border-box;
      min-width: 16px;
      padding: 0 3px;
      color: $activeColor;
      font-weight: 500;
      font-size: 12px;
      font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
      line-height: 1.2;
      text-align: center;
      background-color: $mainColor;
      border: 1px solid $activeColor;
      border-radius: 16px;
      transform: translate(50%, -50%);
      transform-origin: 100%;
      margin-top: 4px;
    }
  }

  .active {
    color: $mainColor;
    background-color: $mainBg;
  }

</style>
