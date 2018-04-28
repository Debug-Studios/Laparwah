/* global NProgress */
import Vue from 'vue';
import Router from 'vue-router';
import Navbar from './../components/Navbar.vue';
import Dashboard from './../components/Dashboard.vue';
import Home from './../components/Home.vue';
import NewsPost from './../components/NewsPost.vue';
import Author from './../components/Author.vue';
import AddNews from './../components/DashboardComponents/AddNews.vue';
import AllNewsOthers from './../components/DashboardComponents/AllNewsOthers.vue';
import AddUser from './../components/DashboardComponents/AddUser.vue';
import DeleteUser from './../components/DashboardComponents/DeleteUser.vue';
import UserProfile from './../components/DashboardComponents/UserProfile.vue';
import EditNews from './../components/DashboardComponents/EditNews.vue';
import NewsModeration from './../components/DashboardComponents/NewsModeration.vue';
import AllUsers from './../components/DashboardComponents/AllUsers.vue';
import AllNewsAdmin from './../components/DashboardComponents/AllNewsAdmin.vue';

Vue.use(Router);

const router = new Router({
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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'addnews',
          name: 'addnews',
          component: AddNews
        },
        {
          path: 'allnewsothers',
          name: 'allnewsothers',
          component: AllNewsOthers
        },
        {
          path: 'adduser',
          name: 'adduser',
          component: AddUser
        },
        {
          path: 'deleteuser',
          name: 'deleteuser',
          component: DeleteUser
        },
        {
          path: 'allusers',
          name: 'allusers',
          component: AllUsers
        },
        {
          path: 'allnewsadmin',
          name: 'allnewsadmin',
          component: AllNewsAdmin
        },
        {
          path: '',
          name: 'userprofile',
          component: UserProfile
        },
        {
          path: 'editnews',
          name: 'edtnews',
          component: EditNews
        },
        {
          path: 'newsmoderation',
          name: 'newsmoderation',
          component: NewsModeration
        }
      ]
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
