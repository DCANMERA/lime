<template>
  <div class="popup"
       @click="closePopup">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Popup',
    methods: {
      closePopup() {
        this.$emit('close', false)
      }
    }
  }

</script>

<style lang="scss">
  .popup {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 16px;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.7);
    transition: all .3s;
  }

</style>
