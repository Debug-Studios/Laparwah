<template lang="pug">
  v-app(dark)
    v-navigation-drawer(fixed :clipped='$vuetify.breakpoint.lgAndUp' app v-model='drawer' value='true')
      v-list(dense )
        v-list-tile(v-on:click='userProfile' )
          v-list-tile-action
            v-icon account_circle
          v-list-tile-title Profile
        v-list-tile(v-on:click='newsModeration' v-show='isEditor' )
          v-list-tile-action
            v-icon border_color
          v-list-tile-title Moderation Tools
        v-list-group(subgroup no-action value='true' v-show='isWriter')
          v-list-tile(slot='activator')
            v-list-tile-action
              v-icon trending_up
            v-list-tile-title News Management
          v-list-tile(v-on:click='allNewsCard(isAdmin)')
            v-list-tile-title All News
            v-list-tile-action
              v-icon all_inclusive
          v-list-tile(v-on:click='addNewsCard')
            v-list-tile-title New News
            v-list-tile-action
              v-icon note_add
        v-list-group(subgroup no-action value='true' v-show='isAdmin')
          v-list-tile(slot='activator')
            v-list-tile-action
              v-icon accessibility
            v-list-tile-title User Management
          v-list-tile(v-on:click='allUsers')
            v-list-tile-title All Users
            v-list-tile-action
              v-icon people_outline
          

    v-toolbar(app :clipped-left='$vuetify.breakpoint.lgAndUp' fixed)
      v-toolbar-title.ml-0.pl-3
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        span(style="text-transform: capitalize") {{name}}'s Dashboard
      v-spacer
      v-menu(offset-y='' v-if='isLogged' )
        v-btn(icon='' slot='activator')
          v-avatar(size='32')
            v-gravatar(v-bind:email='email'  )
        v-card#user_panel
         v-flex.text-xs-center(xs12)
          span(style="text-transform: capitalize") Welcome! {{name}}
         v-divider
         v-flex.text-xs-center(xs12)
            a(href='/#/')
              v-btn(fab small dark)
                v-icon home
            a(href='/auth/logout')
              v-btn(fab small dark color='red')
                v-icon exit_to_app
    v-content
      router-view
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    isLogged: false,
    add_news: false,
    all_news: false,
    isAdmin: false,
    isEditor: false,
    isWriter: false,
    name: ""
  }),
  methods: {
    newsModeration() {
      window.location.href = `${
        window.location.origin
      }/#/dashboard/newsmoderation`;
    },
    userProfile() {
      window.location.href = `${window.location.origin}/#/dashboard`;
    },
    addNewsCard() {
      window.location.href = `${window.location.origin}/#/dashboard/addnews`;
    },
    allNewsCard(isAdmin) {
      if(isAdmin){  
        window.location.href = `${window.location.origin}/#/dashboard/allnewsadmin`;

      }
      else
        window.location.href = `${window.location.origin}/#/dashboard/allnewsothers`;
    },
    addUser() {
      window.location.href = `${window.location.origin}/#/dashboard/adduser`;
    },
    allUsers() {
      window.location.href = `${window.location.origin}/#/dashboard/allusers`;
    },
    deleteUser() {
      window.location.href = `${window.location.origin}/#/dashboard/deleteuser`;
    }
  },
  created() {
    this.axios.get("/accounts/getCurrentUser").then(response => {
      this.isLogged = response.data.isLoggedin === "true";
      this.email = response.data.user.email;
      this.name = response.data.user.name;
      this.isAdmin = response.data.user.roles.includes("admin");
      this.isEditor = response.data.user.roles.includes("editor");
      this.isWriter = response.data.user.roles.includes("writer");
    });
  }
};
</script>
<style scoped>
    #user_panel{
      padding: 15px;
    }
</style>


