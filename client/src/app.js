import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

// Vuetify
Vue.use(Vuetify);
Vue.config.productionTip = false;

// Vue-router
Vue.use(VueRouter);

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
