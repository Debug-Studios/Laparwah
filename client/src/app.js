import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router/router';

// Vuetify
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
