import Vue from 'vue'
import App from './App.vue'
// import vueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
// Vue.use(vueResource)

Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
