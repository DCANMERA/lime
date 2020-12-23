<template>
  <div class="register login">

    <!-- 顶部栏 -->
    <NavBar textCenter="青柠影院"
            @left-click="$goBack()">
    </NavBar>

    <!-- 注册界面 -->
    <div class="user-layout">
      <div class="layout-tip">用户注册</div>
      <div class="user-name">
        <input type="text"
               class="common-ipt"
               placeholder="设置你的会员名"
               v-model="registerData.nickName" />
      </div>
      <div class="user-phone">
        <input type="text"
               class="common-ipt"
               placeholder="请入手机号码"
               v-model="registerData.phone" />
      </div>
      <form>
        <div class="user-password">
          <input :type="isToggleInputType ? 'text' : 'password'"
                 class="common-ipt"
                 placeholder="设置你的登录密码"
                 autocomplete="off"
                 v-model="registerData.password" />
          <i class="iconfont eye-close check-psd"
             :class="isToggleInputType ? 'icon-eye' : 'icon-eye-close'"
             @click="isToggleInputType = !isToggleInputType"></i>
        </div>
      </form>
      <form>
        <div class="user-password">
          <input :type="isAffirmInputType ? 'text' : 'password'"
                 class="common-ipt"
                 placeholder="请再次输入你的密码"
                 autocomplete="off"
                 v-model="registerData.affirmPassword" />
          <i class="iconfont eye-close check-psd"
             :class="isAffirmInputType ? 'icon-eye' : 'icon-eye-close'"
             @click="isAffirmInputType = !isAffirmInputType"></i>
        </div>
      </form>
      <div class="user-agree">
        <input type="checkbox"
               v-model="registerData.isAgree" />
        《青柠影院服务条款》|《法律声明和隐私权政策》
      </div>
      <input class="user-commit"
             type="button"
             value="注册"
             @click="submitRegister" />
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

  export default {
    name: 'Register',

    data() {
      return {

        // 密码框切换类型bool
        isToggleInputType: false,

        // 密码框切换类型bool
        isAffirmInputType: false,

        // 用户注册数据
        registerData: {
          nickName: '',
          phone: '',
          password: '',
          affirmPassword: '',
          isAgree: false
        }
      };
    },

    methods: {

      // 发送注册信息给服务端出来逻辑
      submitRegister() {

        //构造表单验证信息
        let formData = {
          isAgree: {
            value: this.registerData.isAgree,
            errorMsg: '请先同意用户协议',
            reg: new RegExp(true)
          },
          nickName: {
            value: this.registerData.nickName,
            errorMsg: '昵称格式不正确',
            reg: /^[\w\u4e00-\u9fa5]{1,10}$/
          },
          phone: {
            value: this.registerData.phone,
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9][0-9]{9}$/
          },
          password: {
            value: this.registerData.password,
            errorMsg: '密码格式不正确',
            reg: /^[A-Za-z]\w{5,15}$/
          },
          affirmPassword: {
            value: this.registerData.affirmPassword,
            errorMsg: '两次输入密码不正确',
            reg: new RegExp(this.registerData.password)
          }
        }

        // 前端处理验证表单，通过走以下逻辑
        let result = validateForm.validate(formData)
        if (!result.bool) {
          this.$toast(result.msg)
          return
        }

        let userInfo = Object.assign({}, this.registerData)
        userInfo.appkey = this.$store.state.appkey

        // 加载中...
        this.$toast('loading', 0)

        this.axios({
            method: 'POST',
            url: 'http://47.106.197.108:10002/register',
            data: userInfo
          })
          .then(res => {
            this.$toast.clear();
            this.$toast(res.data.msg)
            if (res.data.code == 100) {
              setTimeout(() => {
                this.$goPage({
                  name: 'Login'
                });
              }, 1500)
            }
          })
      }
    }
  }

</script>

<style lang="scss">
  .register {
    height: 100%;

    .user-layout {
      margin-top: 6vh;
    }
  }

</style>
