import Vue from 'vue';
import Notifications from 'vue-notification';
import Dashboard from './Dashboard.vue';
import Vuetify from 'vuetify';
import router from './router/router';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Gravatar from 'vue-gravatar';
require('vue2-animate/dist/vue2-animate.min.css');

Vue.component('v-gravatar', Gravatar);
// Vee-Validate
Vue.use(VeeValidate);
// VueAxios
Vue.use(VueAxios, axios);
// Notifications
Vue.use(Notifications);
// Moment
Vue.use(require('vue-moment'));

// Vuetify
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line no-new */
new Vue({
  router,
  render: h => h(Dashboard)
}).$mount('#dashboard');
