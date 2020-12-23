<template>
  <div class="forgot">

    <!-- 顶部栏 -->
    <NavBar textCenter="青柠影院"
            @left-click="$goBack()">
    </NavBar>

    <!-- 忘记密码界面 -->
    <div class="user-layout">
      <div class="layout-tip">找回密码</div>
      <div v-if="!isNext">
        <div class="user-phone">
          <input type="text"
                 class="common-ipt"
                 placeholder="请输入你的邮箱"
                 v-model="userInfo.email" />
        </div>
        <form>
          <div class="user-password">
            <input type="text"
                   class="common-ipt"
                   placeholder="请输入六位验证码"
                   v-model="userInfo.code" />
            <i class="check-psd sendCode"
               :class="{active: isSend}"
               @click="getValidCode">
              {{text}}
            </i>
          </div>
        </form>
        <div class="link">
          <span></span>
          <span @click="$goPage({name:'Login'})">已有账号，立即登录</span>
        </div>
        <input class="user-commit"
               type="button"
               value="下一步"
               @click="next" />
      </div>

      <div v-else>
        <div class="user-phone">
          <input type="text"
                 class="common-ipt"
                 placeholder="请输入你的登录手机号"
                 v-model="userInfo.phone" />
        </div>
        <form>
          <div class="user-password">
            <input :type=" isRegisterPassword ? 'text' : 'password'"
                   class="common-ipt"
                   placeholder="请输入你的登录密码"
                   autocomplete="off"
                   v-model="userInfo.password" />
            <i class="iconfont check-psd"
               :class="isRegisterPassword ? 'icon-eye' : 'icon-eye-close'"
               @click="toggleRegsiterPasswordType"></i>
          </div>
        </form>
        <div class="link">
          <span></span>
          <span @click="$goPage({name:'Login'})">已有账号，立即登录</span>
        </div>
        <input class="user-commit"
               type="button"
               value="提交"
               @click="commit" />
        <div class="user-back">
          <span @click="back">返回</span>
        </div>
      </div>

      <div class="copy">
        &copy; 青柠影院 客服电话：
        <span class="active">400-670-5335</span>
      </div>
    </div>


  </div>
</template>

<script>
  import {
    validateForm
  } from '@/assets/js/validateForm'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'Forgot',

    data() {
      return {

        // 用户信息
        userInfo: {
          phone: '',
          password: '',
          email: '',
          code: ''
        },

        // 切换注册密码框的类型
        isRegisterPassword: false,

        // 是否下一步
        isNext: false,

        // 是否发送
        isSend: false,

        // 发送按钮文本
        text: '发送验证码'
      };
    },

    computed: {
      ...mapState('api', {
        api: state => state.api
      }),
      ...mapState({
        appkey: state => state.appkey
      }),
    },

    methods: {

      // 返回上一步
      back() {
        this.isNext = false
      },

      // 切换注册框
      toggleRegisterBox() {
        this.isShow = true
      },

      // 切换注册密码框的类型
      toggleRegsiterPasswordType() {
        this.isRegisterPassword = !this.isRegisterPassword
      },

      // 下一步
      next() {

        // 构造表单验证信息
        let formData = {
          email: {
            value: this.userInfo.email,
            errorMsg: '邮箱格式不正确',
            reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          },
          code: {
            value: this.userInfo.code,
            errorMsg: '验证码格式不正确',
            reg: /^[A-Za-z\d]{6}$/
          }
        }

        // 前端处理验证表单，通过走以下逻辑
        let result = validateForm.validate(formData)
        if (!result.bool) {
          this.$toast(result.msg)
          return
        }

        // 加载中...
        this.$toast('loading', 0)

        // 发起验证并获取验证码请求
        this.axios({
          method: 'POST',
          url: this.api.checkValidCode,
          data: {
            appkey: this.appkey,
            validCode: this.userInfo.code
          }
        }).then(res => {
          this.$toast.clear()
          this.$toast(res.data.msg)
          if (res.data.code == 'K001') {
            this.isNext = true
          }
        })
      },

      // 获取邮箱验证码
      getValidCode() {

        if (this.isSend) return

        // 构造表单验证信息
        let formData = {
          email: {
            value: this.userInfo.email,
            errorMsg: '邮箱格式不正确',
            reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          }
        }

        // 前端处理验证表单，通过走以下逻辑
        let result = validateForm.validate(formData)
        if (!result.bool) {
          this.$toast(result.msg)
          return
        }

        let time = 60
        this.isSend = true
        this.text = time + '秒后重新发送'
        let timer = setInterval(() => {
          if (time <= 0) {
            clearInterval(timer)
            timer = null
            time = 60
            this.isSend = false
            this.text = '重新发送验证码'
          } else {
            time--
            this.text = time + '秒后重新发送'
          }
        }, 1000)

        // 加载中...
        this.$toast('loading', 0)

        this.axios({
            method: 'POST',
            url: this.api.emailValidCode,
            data: {
              appkey: this.appkey,
              email: this.userInfo.email
            }
          })
          .then(res => {
            this.$toast.clear()
            this.$toast(res.data.msg)
          })
      },

      // 提交
      commit() {

        // 构造表单验证信息
        let formData = {
          phone: {
            value: this.userInfo.phone,
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9]\d{9}$/
          },
          password: {
            value: this.userInfo.password,
            errorMsg: '新密码由数字字母下划线组合(6-16字符)',
            reg: /^[A-Za-z]\w{5,15}$/
          }
        };

        // 前端处理验证表单，通过走以下逻辑
        let result = validateForm.validate(formData)
        if (!result.bool) {
          this.$toast(result.msg)
          return;
        }

        // 加载中...
        this.$toast('loading', 0)

        // 发起找回密码请求
        this.axios({
            method: 'POST',
            url: this.api.retrievePassword,
            data: {
              appkey: this.appkey,
              phone: this.userInfo.phone,
              password: this.userInfo.password
            }
          })
          .then(res => {
            this.$toast.clear()
            this.$toast(res.data.msg)
            if (res.data.code == 'L001') {
              setTimeout(() => {
                this.$goPage('Login')
              }, 1500)
            }
          })
      }
    }
  }

</script>

<style lang="scss">
  .sendCode {
    font-size: 12px;
    color: $activeColor;
    background-color: $mainColor;
    padding: $margin * 0.5;
    border-radius: 5px;
    user-select: none;
  }

  .sendCode.active {
    opacity: .7;
  }

  .user-back {
    text-align: center;
    font-size: 14px;
    color: $inActiveColor;
  }

</style>
