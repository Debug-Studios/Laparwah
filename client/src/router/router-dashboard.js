/* global NProgress */
import Vue from 'vue';
import Router from 'vue-router';
import AddNews from './../components/DashboardComponents/AddNews.vue';
import AllNewsOthers from './../components/DashboardComponents/AllNewsOthers.vue';
import AddUser from './../components/DashboardComponents/AddUser.vue';
import DeleteUser from './../components/DashboardComponents/DeleteUser.vue';
import UserProfile from './../components/DashboardComponents/UserProfile.vue';
import EditNews from './../components/DashboardComponents/EditNews.vue';
import NewsModeration from './../components/DashboardComponents/NewsModeration.vue';
import AllUsers from './../components/DashboardComponents/AllUsers.vue';
import AllNewsAdmin from './../components/DashboardComponents/AllNewsAdmin.vue';
import EditUser from './../components/DashboardComponents/EditUser.vue';
import Dashboard from '../Dashboard.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/addnews',
      name: 'addnews',
      component: AddNews
    },
    {
      path: '/allnewsothers',
      name: 'allnewsothers',
      component: AllNewsOthers
    },
    {
      path: '/allnewsadmin',
      name: 'allnewsadmin',
      component: AllNewsAdmin
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: AddUser
    },
    {
      path: '/allusers',
      name: 'allusers',
      component: AllUsers
    },
    {
      path: '/deleteusers',
      name: 'deleteusers',
      component: DeleteUser
    },
    {
      path: '/edituser/:id',
      name: 'edituser',
      component: EditUser
    },
    {
      path: '/userprofile',
      name: 'userprofile',
      component: UserProfile
    },
    {
      path: '/editnews/:id',
      name: 'editnews',
      component: EditNews
    },
    {
      path: '/newsmoderation',
      name: 'newsmoderation',
      component: NewsModeration
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
