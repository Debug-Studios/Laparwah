import Vue from 'vue';
import Router from 'vue-router';
import Login from './../components/Login.vue';
import Navbar from './../components/Navbar.vue';
import Dashboard from './../components/Dashboard.vue';
import Home from './../components/Home.vue';
import NewsPost from './../components/NewsPost.vue';
import Author from './../components/Author.vue';
import AddNews from './../components/DashboardComponents/AddNews.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
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
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/news/:id',
      name: 'news',
      component: NewsPost
    },
    {
      path: '/author/:id',
      name: 'author',
      component: Author
    },
    {
      path: '/dashboard/AddNews',
      name: 'addnews',
      component: AddNews
    }
  ]
});
