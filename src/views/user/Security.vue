<template>
  <div class="security">

    <!-- 顶部导航条 -->
    <NavBar class="toFixed"
            @left-click="$goBack()"
            text-center="安全中心">
    </NavBar>

    <ul class="security-content">
      <li @click="$goPage({name:'Forgot'})">修改密码</li>
      <li @click="showPopup(0)">注销账号</li>
      <li @click="showPopup(1)">退出登录</li>
    </ul>

    <Popup v-show="isShowPopup">
      <div class="security-destroy">
        <p>{{active ? '确认注销账号' : '确认退出登录'}}</p>
        <div class="box-flex">
          <div class="cancel"
               @click="cancel">
            取消
          </div>
          <div class="affirm"
               @click="affirm">
            确认
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: 'Security',

    data() {
      return {
        isShowPopup: false,
        active: 0
      }
    },

    computed: {
      ...mapState({
        appkey: state => state.appkey
      }),
      ...mapState('api', {
        api: state => state.api
      }),
      ...mapState('userModule', {
        __tk: state => state.__tk
      }),
    },

    methods: {
      ...mapMutations('cinemaModule', {
        setPlan: 'setPlan'
      }),
      ...mapMutations('userModule', {
        set__tk: 'set__tk'
      }),

      showPopup(index) {
        this.isShowPopup = true
        this.active = index
      },

      cancel() {
        this.isShowPopup = false
      },

      // 账号
      affirm() {

        // 先判断用户token的存在
        let tokenString = localStorage.getItem('__tk')
        if (!tokenString) {
          this.$toast('请先登录')
          setTimeout(() => {
            this.$goPage({
              name: 'Login'
            })
          }, 1000)
          return
        }
        this.setPlan([])

        // 执行账号注销
        if (!this.active) {
          this.axios({
              method: "POST",
              url: this.api.destroyAccount,
              data: {
                appkey: this.appkey,
                tokenString,
              },
            })
            .then(res => {
              if (res.data.code == 700) {
                this.$toast('请先登录')
                setTimeout(() => {
                  this.$goPage({
                    name: 'Login'
                  });
                }, 1500)
                return
              }
              if (res.data.code == "G001") {
                this.$toast('注销账号成功')
                localStorage.clear()
                this.set__tk('')
                setTimeout(() => {
                  this.$goPage({
                    name: 'Login'
                  });
                }, 800)
                return
              }
              this.isShowPopup = false
              this.$toast(res.data.msg)
            })
          return
        }

        // 退出登录
        localStorage.removeItem('__tk')
        if (tokenString != this.__tk) {
          localStorage.removeItem('historyCity')
          localStorage.removeItem('_sh')
        }
        this.$toast('退出登录成功')
        this.isShowPopup = false
        setTimeout(() => {
          this.$goPage({
            name: 'Login'
          });
        }, 1500)
      },

    }
  }

</script>

<style lang="scss">
  .security {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    ul.security-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      li {
        color: $inActiveColor;
        padding: $margin;
        margin: $assistMargin 0;
        font-size: 16px;
        border: 1px solid $mainColor;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .security-destroy {
      width: 220px;
      height: 160px;
      background-color: $mainBg;
      border-radius: 16px;
      padding: 0 $margin;
      overflow: hidden;

      p {
        padding-top: 26px;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
        color: $defaultColor;
      }

      .affirm,
      .cancel {
        flex: 1;
        height: 48px;
        font-size: 14px;
        color: rgba($color: $inActiveColor, $alpha: .6);
        text-align: center;
        line-height: 48px;
        margin-top: 50px;
        padding: 0 $margin;
        cursor: pointer;
      }

      .affirm {
        color: $priceFontColor;
      }
    }
  }

</style>
