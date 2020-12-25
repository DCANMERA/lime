<template>
  <div class="login">

    <!-- 顶部栏 -->
    <NavBar textCenter="青柠影院">
      <div slot="left"></div>
    </NavBar>

    <!-- 登录界面 -->
    <div class="user-layout">
      <div class="layout-tip">欢迎登录</div>
      <div class="user-phone">
        <input type="text"
               class="common-ipt"
               placeholder="请输入你的登录手机号"
               v-model="loginData.phone" />
      </div>
      <form>
        <div class="user-password">
          <input :type=" isToggleInputType ? 'text' : 'password'"
                 class="common-ipt"
                 placeholder="请输入你的登录密码"
                 autocomplete="off"
                 v-model="loginData.password" />
          <i class="iconfont eye-close check-psd"
             :class="isToggleInputType ? 'icon-eye' : 'icon-eye-close'"
             @click="isToggleInputType = !isToggleInputType"></i>
        </div>
      </form>
      <input class="user-commit"
             type="button"
             value="登录"
             @click="submitLoginData" />
      <div class="link">
        <span @click="$goPage({name:'Register'})">立即注册</span>
        <span @click="$goPage({name:'Forgot'})">找回密码</span>
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
    name: 'Login',

    data() {
      return {

        // 密码框切换类型bool
        isToggleInputType: false,

        // 登录用户信息
        loginData: {
          phone: '',
          password: ''
        }
      };
    },

    created() {
      this.$toast.clear()
    },

    computed: {
      ...mapState({
        appkey: state => state.appkey
      }),
      ...mapState('api', {
        api: state => state.api
      })
    },

    methods: {

      // 发送登录信息给服务端出来逻辑
      submitLoginData() {

        //构造表单验证信息
        let formData = {
          phone: {
            value: Number(this.loginData.phone),
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9]\d{9}$/
          },
          password: {
            value: this.loginData.password,
            errorMsg: '密码格式不正确',
            reg: /^[A-Za-z]\w{5,15}$/
          }
        }

        // 前端处理验证表单，通过走以下逻辑
        let result = validateForm.validate(formData);
        if (!result.bool) {
          this.$toast(result.msg)
          return
        }

        // 拷贝用户登录逻辑，不能直接等与用户数据，因该类型是引用数据类型
        let userInfo = Object.assign({}, this.loginData)

        // 拷贝用户的appkey,appkey是用与验证用户和服务端的唯一标识
        userInfo.appkey = this.appkey

        // 加载中...
        this.$toast('loading', 0)

        // 请求登录接口
        this.axios({
            method: 'POST',
            url: this.api.login,
            data: userInfo
          })
          .then(res => {
            this.$toast.clear()
            this.$toast(res.data.msg)
            if (res.data.code == 200) {
              this.$store.commit('userModule/set__tk', res.data.token)
              localStorage.setItem('__tk', res.data.token)
              setTimeout(() => {
                this.$goPage({
                  name: 'Home'
                });
              }, 1500)
            }
          })
      }
    }
  }

</script>
