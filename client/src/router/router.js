import Vue from 'vue';
import Router from 'vue-router';
import Navbar from './../components/Navbar.vue';
import Home from './../components/Home.vue';
import NewsPost from './../components/NewsPost.vue';
import Author from './../components/Author.vue';

Vue.use(Router);

export default new Router({
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
