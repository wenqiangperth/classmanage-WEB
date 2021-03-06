// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import './assets/iconfont/iconfont.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/common_style_teacher.css';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Mint);


Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  created(){
    this.$axios.defaults.baseURL = 'http://47.107.103.28:8082'
  },

  components: { App },
  template: '<App/>',
})
