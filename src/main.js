import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './mock/mockServer'
//引入公共样式
import "./styles/reset.css";
//引入字体图标
import './styles/iconfont.css'
import './plugins/element.js'
import "swiper/swiper-bundle.min.css";
Vue.config.productionTip = false



new Vue({
  beforeCreate() {
    // 初始化全局事件总线对象
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')