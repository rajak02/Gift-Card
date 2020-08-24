import Vue from 'vue'
import App from './App.vue'
import route from './routes/routes'
import axios from 'axios';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
Vue.prototype.$http = axios

//Filter
Vue.filter('trim-decimal', function(value){
  return value.toFixed(2);
})

Vue.filter('formatted-date', function(value){
  var date = new Date(value);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  }).replace(/ /g, '-');
  return formattedDate;
})

const giftRouter = new VueRouter({
  routes: route,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: giftRouter
}).$mount('#app')
