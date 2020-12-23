export const routes = [

  // 路由重定向
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  },

  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue'),
    meta: {
      pageTitle: '登录',
      keepAlive: true
    }
  },

  // 注册
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/Register.vue'),
    meta: {
      pageTitle: '注册',
      keepAlive: true
    }
  },

  // 忘记密码
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('@/views/user/Forgot.vue'),
    meta: {
      pageTitle: '忘记密码',
      keepAlive: true
    }
  },

  // 安全中心
  {
    path: '/security',
    name: 'Security',
    component: () => import('@/views/user/Security.vue'),
    meta: {
      pageTitle: '安全中心',
      keepAlive: true
    }
  },

  // 首页
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    meta: {
      pageTitle: '首页',
      keepAlive: true
    },
    children: [

      // 首页
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          pageTitle: '首页',
          keepAlive: true
        },
      },

      // 影院
      {
        path: 'cinema',
        name: 'Cinema',
        component: () => import('@/views/cinema/Cinema.vue'),
        meta: {
          pageTitle: '影院',
          keepAlive: false
        },
      },

      // 我的
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/Profile.vue'),
        meta: {
          pageTitle: '我的',
          keepAlive: false
        },
      },
    ]
  },

  // 搜索
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/home/Search.vue')
  },

  // 地址
  {
    path: '/city',
    name: 'City',
    component: () => import('@/views/home/City.vue')
  },

  // 电影详情
  {
    path: '/movieinfo/:movieId/:showst?',
    name: 'MovieInfo',
    component: () => import('@/views/detail/MovieInfo.vue'),
    meta: {
      pageTitle: '详情',
      keepAlive: false
    }
  },

  // 订单
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/Order.vue')
  },

  // 选座支付页
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/views/order/Pay.vue'),
    meta: {
      pageTitle: '详情',
      keepAlive: false
    }
  }
]
