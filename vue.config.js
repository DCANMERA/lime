module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/assets/scss/variate.scss';",
      }
    }
  },
  devServer: {
    proxy: {
      '/ajax': {
        target: 'http://m.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/ajax': '/ajax'
        }
      }
    }
  }
}
