# Lime 青柠影院购票系统

## 前言

- 基于 Vue Cli4.5.0 脚手架搭建，通过 Vue 全家桶构建、指令的灵活运用、组件封装、组件之间通信，使各组件库可实现自由替换和组合。
- 建议使用谷歌浏览器查看或开发，iPhone 6/7/8 屏幕尺寸为 375px 宽和 667px 高是最佳效果。
- 如果感觉还不错的话，请赏个 ★Star 鼓励一哈，后续会持续更新和优化；
  同时有需改进或完善的地方请我发邮箱 DCanmera@outlook.com

[在线效果演示](https://dcanmera.github.io/lime/)

## 提示：如果出现网络问题或者是要验证身份等问题

- 原因：美团接口访问限制

- 解决方法：可以按 F12 找到 Network 选项 找到接口 api 复制请求路径，在浏览器地址栏打开接口路径,点击 verifyPageUrl 认证地址即可

- 对于后端响应回来的数据延迟导致 vue 报 undefined 问题，这里提供三种方法
  一、利用 async 与 await 关键字实现同步
  二、watch 监听数据变化 (推荐)
  三、判断数据，如果为空就不渲染 DOM

# 项目架构

```
│  vue.config.js                      // webpack配置
├─public
│      favicon.ico                    // ico图标
│      index.html                     // 入口html文件
└─src
    │  App.vue                        // 根组件
    │  main.js                        // 程序入口文件
    ├─assets
    │  ├─font                         // 存放公共字体文件夹
    │  ├─img                          // 存放公共图片文件夹
    │  ├─js
    │  │      city.js                 // 城市文件
    │  │      seatPlan.js             // 座位数据
    │  │      validateForm.js         // 表单验证文件
    │  └─scss
    │      │  variate.scss            // 全局变量样式文件
    │      │  reset.scss              // 清除样式文件
    │      │  common.scss             // 公用样式文件
    │      │  adaptive.scss           // 适配样式文件
    │      │  cinema.scss             // 影院样式文件
    │      │  home.scss               // 首页样式文件
    │      │  movieInfo.scss          // 电影详情样式文件
    │      │  order.scss              // 订单样式文件
    │      │  profile.scss            // 我的样式文件
    │      │  pay.scss                // 支付样式文件
    │      └─search.scss              // 搜索样式文件
    ├─components
    │  ├─cinema
    |  |  ├─CinemaList.vue            // 影院列表组件
    │  |  ├─CinemaNav.vue             // 影院导航条组件
    │  |  ├─CinemaNavBrand.vue        // 影院品牌组件
    │  |  ├─CinemaCity.vue            // 影院城市区域组件
    │  |  └─CinemaNavSpecial.vue      // 影院服务与特殊厅组件
    │  ├─movie
    |  |  ├─Movie.vue                 // 电影组件
    │  |  └─MovieList.vue             // 电影列表组件
    │  ├─navBar
    │  |  └─NavBar.vue                // 导航条组件
    │  ├─suggest
    |  |  ├─Popup.vue                 // 弹出窗组件
    │  |  ├─toast.js                  // 轻提示方法
    │  |  └─Toast.vue                 // 轻提示组件
    │  └─tabBar
    │     ├─TabBar.vue                // 底部tabBar栏组件
    │     └─TabItem.vue               // 底部tabBar栏子组件
    ├─router
    │      index.js                   // 页面路由注册组件
    │      routes.js                  // 页面路由配置
    ├─store
    │      index.js                   // 状态管理仓库
    │      common.js                  // 自定义全局方法
    │      state.js                   // 单一状态树
    │      mutations.js               // 修改状态
    │      modules                    // 模块
    │       ├─api.js                  // 接口模块
    │       ├─cinema.js               // 影院模块
    │       ├─home.js                 // 首页模块
    │       └─user.js                 // 用户模块
    └─views
       ├─cinema
       |  └─Cinema.vue                // 影院页
       ├─detail
       |  └─MovieInfo.vue             // 电影详情页
       ├─home
       |  ├─City.vue                  // 城市选择页
       |  ├─Home.vue                  // 首页
       |  └─Search.vue                // 搜索页
       ├─order
       |  ├─Order.vue                 // 订单页
       |  └─Pay.vue                   // 支付页
       ├─user
       |  ├─Forgot.vue                // 忘记密码页
       |  ├─Login.vue                 // 登录页
       |  ├─Profile.vue               // 我的页
       |  ├─Register.vue              // 注册页
       |  └─Security.vue              // 安全中心页
       └─ Main.vue                    // 主页
```

# 技术栈

- Vue Cli ~4.5.0
- vue-axios
- vue-router
- Vuex
- Webpack
- ES6
- Sass
- CSS3

# 功能模块

- 登录、注册、忘记密码模块
- 首页模块
- 影院模块
- 我的模块
- 搜索模块
- 电影详情模块
- 支付模块
- 城市选择模块
- 订单模块
- 安全中心模块
- 自定义导航条模块
- 自定义 TabBar 栏模块
- 自定义轻提示模块
- 自定义弹出窗模块
- 自定义电影模块
- 自定义电影列表模块
- 自定义影院列表模块
- 自定义影院导航条模块
- 自定义影院导航城市区选择模块
- 自定义影院导航品牌选择模块
- 自定义影院导航服务与特殊厅选择模块

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
