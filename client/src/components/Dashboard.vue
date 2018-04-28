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
            v-icon face
          v-list-tile-title Moderation Tools
        v-list-group(subgroup no-action value='true' v-show='isWriter')
          v-list-tile(slot='activator')
            v-list-tile-action
              v-icon people_outline
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
              v-icon people_outline
            v-list-tile-title Writer's Tools
          v-list-tile(v-on:click='addUser')
            v-list-tile-title Add User
            v-list-tile-action
              v-icon add_circle
          v-list-tile(v-on:click='allUsers')
            v-list-tile-title All Users
            v-list-tile-action
              v-icon add_circle
          v-list-tile(v-on:click='deleteUser')
            v-list-tile-title Delete User
            v-list-tile-action
              v-icon delete_forever

    v-toolbar(app :clipped-left='$vuetify.breakpoint.lgAndUp' fixed)
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        span(style="text-transform: capitalize") {{name}} Dashboard
      v-spacer
      v-menu(offset-y='' v-if='isLogged' )
        v-btn(icon='' slot='activator')
          v-avatar(size='32')
            v-gravatar(v-bind:email='email'  )
        v-card
         v-flex.text-xs-center(xs12)
          span(style="text-transform: capitalize") Welcome! {{name}}
         v-flex.text-xs-center(xs12)
            a(href='/#/dashboard')
              v-btn(fab small dark)
                v-icon settings
            a(href='/auth/logout')
              v-btn(fab small dark)
                v-icon directions_walk
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
      window.location.href = `${
        window.location.origin
      }/#/dashboard/userprofile`;
    },
    addNewsCard() {
      window.location.href = `${window.location.origin}/#/dashboard/addnews`;
    },
    allNewsCard() {
      window.location.href = `${window.location.origin}/#/dashboard/allnews`;
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
    });
  }
};
</script>
<style scoped>

</style>


