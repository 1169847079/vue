import Vue from 'vue'
import VuecompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router/router.js'
import './router/premit'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icons/index.js'
import cookie from 'cookie_js'
import '../src/styles/main.scss'
import global from '../src/utils/global'
Vue.use(global)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VuecompositionApi);

new Vue({
  router,
  store,
  cookie,
  render: h => h(App)
}).$mount('#app')
