import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router/router';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Gravatar from 'vue-gravatar';

// Vee-Validate
Vue.use(VeeValidate);
// VueAxios
Vue.use(VueAxios, axios);
// Vue-Gravatar
Vue.component('vue-gravatar', Gravatar);
// Vuetify
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
