import Vue from 'vue';
import Router from 'vue-router';
import Login from './../components/Login.vue';
import Navbar from './../components/navbar.vue';
import Dashboard from './../components/adminDashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: Navbar
    },
    {
      path: '/dashboard',
      name: 'admin',
      component: Dashboard
    }
  ]
});
