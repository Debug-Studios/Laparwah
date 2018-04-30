<template lang="pug">
  v-app(dark)
    notifications(group="dashboard" position="bottom" width="100%")
      template(slot="body" slot-scope="props")
        v-snackbar(:timeout="10000" :color="props.item.type" :value="true") {{props.item.title}}

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
        span(style="text-transform: capitalize") {{user.name}}'s Dashboard
      v-spacer
      v-menu(offset-y v-if='isLogged && user' dark)
        v-btn(icon slot='activator')
          v-avatar(size='32')
            v-gravatar(v-bind:email='user.email')
        v-card
          v-list
            v-list-tile(avatar).pr-4
              v-list-tile-avatar
                v-gravatar(:email="user.email" :size="64")
              v-list-tile-content
                v-list-tile-title {{user.name}}
                v-list-tile-sub-title(v-if="user.designation") {{user.designation}}
          v-divider
          v-list
            v-list-tile(@click="toHome")
              v-list-tile-action
                v-icon home
              v-list-tile-title Home
            v-list-tile(@click="logout")
              v-list-tile-action
                v-icon(color="red") exit_to_app
              v-list-tile-title Sign out
    v-content
      router-view
</template>

<script>
export default {
  name: "dashboard",
  data: () => ({
    drawer: null,
    isLogged: false,
    add_news: false,
    all_news: false,
    isAdmin: false,
    isEditor: false,
    isWriter: false,
    user: {}
  }),
  methods: {
    newsModeration() {
      window.location.href = `${
        window.location.origin
      }/dashboard#/newsmoderation`;
    },
    userProfile() {
      window.location.href = `${window.location.origin}/dashboard#/userprofile`;
    },
    addNewsCard() {
      window.location.href = `${window.location.origin}/dashboard#/addnews`;
    },
    allNewsCard(isAdmin) {
      if (isAdmin) {
        window.location.href = `${
          window.location.origin
        }/dashboard#/allnewsadmin`;
      } else
        window.location.href = `${
          window.location.origin
        }/dashboard#/allnewsothers`;
    },
    addUser() {
      window.location.href = `${window.location.origin}/dashboard#/adduser`;
    },
    allUsers() {
      window.location.href = `${window.location.origin}/dashboard#/allusers`;
    },
    deleteUser() {
      window.location.href = `${window.location.origin}/dashboard#/deleteusers`;
    },
    logout() {
      window.location.href = `${window.location.origin}/auth/logout`;
    },
    toHome() {
      window.location.href = `${window.location.origin}/#/`;
    }
  },
  created() {
    this.axios.get("/accounts/getCurrentUser").then(response => {
      this.isLogged = response.data.isLoggedin === "true";
      if (response.data.user) {
        this.user = response.data.user;
        this.isAdmin = response.data.user.roles.includes("admin");
        this.isEditor = response.data.user.roles.includes("editor");
        this.isWriter = response.data.user.roles.includes("writer");
      }
    });
  }
};
</script>
<style lang="scss">
@import "./scss/main.scss";
@import url("https://fonts.googleapis.com/css?family=Kalam");

#user_panel {
  padding: 15px;
}
</style>


