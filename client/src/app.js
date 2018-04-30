import Vue from 'vue';
import Notifications from 'vue-notification';
import 'babel-polyfill';
import VueDisqus from 'vue-disqus';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router/router';
import VeeValidate from 'vee-validate';
import axios from './http';
import VueAxios from 'vue-axios';
import Gravatar from 'vue-gravatar';
import moment from 'moment-timezone';
require('vue2-animate/dist/vue2-animate.min.css');

Vue.component('v-gravatar', Gravatar);
// Vee-Validate
Vue.use(VeeValidate);
// VueAxios
Vue.use(VueAxios, axios);
// Disqus comments
Vue.use(VueDisqus);
// Notifications
Vue.use(Notifications);
// Moment
Vue.use(require('vue-moment'), { moment });

// Vuetify
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable-next-line no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
