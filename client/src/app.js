import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router/router';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Gravatar from 'vue-gravatar';

Vue.component('v-gravatar', Gravatar);
// Vee-Validate
Vue.use(VeeValidate);
// VueAxios
Vue.use(VueAxios, axios);

// Moment
Vue.use(require('vue-moment'));

// Vuetify
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
