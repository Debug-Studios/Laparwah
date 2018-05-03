/* global NProgress */
import Vue from 'vue';
import Router from 'vue-router';
import Navbar from './../components/Navbar.vue';
import Home from './../components/Home.vue';
import NewsPost from './../components/NewsPost.vue';
import Author from './../components/Author.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: Navbar
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
    }
  ]
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
