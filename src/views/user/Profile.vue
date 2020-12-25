<template>
  <div class="profile">
    <div class="profile-header">
      <img src="https://img.meituan.net/maoyanuser/c524afeb2e56c93093a1b7c26d5ac6b114424.png"
           class="head-icon">
    </div>

    <div class="container">
      <div class="container-item"
           v-for="(item,index) in profileData"
           :key="index"
           @click="$goPage({name:item.name})">
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/scss/profile.scss';

  export default {
    name: 'Profile',

    data() {
      return {
        profileData: [{
            title: '我的电影票',
            name: 'Order'
          },
          {
            title: '安全中心',
            name: 'Security'
          }
        ]
      }
    },

    created() {
      this.$toast.clear()

      // 获取token
      let tokenString = localStorage.getItem('__tk')

      // 调用判断用户的token
      if (!tokenString) {
        this.$toast('请先登录')
        this.$goPage({
          name: 'Login'
        })
      }

      this.axios({
        method: 'GET',
        url: this.$store.state.api.api.findAccountInfo,
        params: {
          appkey: this.$store.state.appkey,
          tokenString,
        },
      }).then(res => {
        if (res.data.code == 700) {
          this.$toast('请先登录')
          setTimeout(() => {
            this.$goPage({
              name: 'Login'
            })
          }, 1500)
        }
      })
    }
  }

</script>
