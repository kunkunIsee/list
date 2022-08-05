import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible'
import "@/router/premit"
import '@/utils/request'
import '@/utils/axios'
import mixin  from '@/utils/mixin'; 
Vue.mixin(mixin)
Vue.use(Vant);
Vue.config.productionTip = false
import axios from 'axios';
Vue.prototype.$http=axios
axios.defaults.baseURL='https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
