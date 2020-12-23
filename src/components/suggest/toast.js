// 这里就是我们刚刚创建的那个静态组件
import Vue from 'vue'
import toastComponent from './Toast.vue'

// 返回一个 扩展实例构造器
let toastDom = null

export function show(text, duration = 2000) {
  const ToastConstructor = Vue.extend(toastComponent)
  toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text,
        showToast: true,    // 是否显示组件
        showContent: true  // 作用:在隐藏组件之前,显示隐藏动画
      }
    }
  });

  document.body.appendChild(toastDom.$el)

  if (duration == 0) {
    toastDom.showToast = true
    toastDom.showContent = true
    return
  }

  // 提前 300ms 执行淡出动画(因为我们再css里面设置的隐藏动画持续是300ms)
  setTimeout(() => { toastDom.showContent = false }, duration - 700)

  // 过了 duration 时间后隐藏整个组件
  setTimeout(() => { toastDom.showToast = false }, duration)

}


export function clear() {
  document.querySelectorAll('.mask').forEach((item, index) => item.remove())
}
