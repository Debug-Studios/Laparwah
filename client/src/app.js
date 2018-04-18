import Vue from 'vue';
import App from './App.vue';

// Vuetify
import Vuetify from 'vuetify';
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
