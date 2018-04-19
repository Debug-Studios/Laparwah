import Vue from 'vue';
import App from './App.vue';

// Vuetify
import Vuetify from 'vuetify';

// Vue-router
import VueRouter from 'vue-router';
Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.use(VueRouter);

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
