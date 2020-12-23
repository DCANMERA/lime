<template>
  <div class="mask"
       v-if="showToast">
    <div class="toast"
         :class="showContent ?'fadeIn':'fadeOut'"
         v-html="
         text.includes('loading') ?
              `<img class='loading'
                    src='${require('../../assets/img/loading.gif')}'>` :
              text">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Toast'
  }

</script>

<style lang="scss">
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2000;
  }

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    max-width: 70%;
    padding: 16px;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    transform: translate3d(-50%, -50%, 0);
  }

  .loading {
    width: 80px;
    position: relative;
    z-index: -1;
  }

  .fadeIn {
    animation: animate_in .3s;
  }

  .fadeOut {
    animation: animate_out .3s;
    opacity: 0;
  }

  @keyframes animate_in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes animate_out {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

</style>
