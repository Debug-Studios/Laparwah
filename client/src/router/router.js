import Vue from 'vue';
import Router from 'vue-router';
import Login from './../components/Login.vue';
import Navbar from './../components/Navbar.vue';
import Dashboard from './../components/Dashboard.vue';
import Home from './../components/Home.vue';
import NewsPost from './../components/NewsPost.vue';
import Author from './../components/Author.vue';
import AddNews from './../components/DashboardComponents/AddNews.vue';
import AllNews from './../components/DashboardComponents/AllNews.vue';
import AddUser from './../components/DashboardComponents/AddUser.vue';
import DeleteUser from './../components/DashboardComponents/DeleteUser.vue';
import UserProfile from './../components/DashboardComponents/UserProfile.vue';

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
      component: Dashboard,
      children: [{
        path: 'addnews',
        name: 'addnews',
        component: AddNews
      },
      {
        path: 'allnews',
        name: 'allnews',
        component: AllNews

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
        path: 'userprofile',
        name: 'userprofile',
        component: UserProfile
      }]
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
