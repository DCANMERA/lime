<template>
  <div class="main">

    <!-- 顶部栏 -->
    <nav-bar text-center="青柠影院"
             class="toFixed">
      <div slot="left"></div>
    </nav-bar>

    <!-- 页面可视区 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- 底部导航栏 -->
    <tab-bar>
      <tab-item v-for="(item,index) in tabData"
                :key="index"
                :icon="item.icon"
                :to="item.path"
                :data-index="index">
        <span>{{item.title}}</span>
      </tab-item>
    </tab-bar>
  </div>
</template>

<script>
  export default {
    name: 'Main',

    data() {
      return {
        tabData: [{
            title: '首页',
            path: '/main/home',
            icon: 'icon-crown'
          },
          {
            title: '影院',
            path: '/main/cinema',
            icon: 'icon-video'
          },
          {
            title: '我的',
            path: '/main/profile',
            icon: 'icon-user'
          }
        ]
      }
    }
  }

</script>
