<template lang="pug">
  v-app(dark)
    notifications(group="dashboard" position="bottom left" width="100%")
      template(slot="body" slot-scope="props")
        v-snackbar(:timeout="10000" :color="props.item.type" :value="true" bottom left) {{props.item.title}}

    v-navigation-drawer(app v-model='drawer')
      v-toolbar(flat :style="{'background-image': roleColor}")
        v-list
          v-list-tile
            v-list-tile-title.title.text-xs-center {{role}}

      v-toolbar(flat).transparent
        v-list.pa-0
          v-list-tile(avatar v-on:click='userProfile' )
            v-list-tile-avatar
              v-gravatar(v-bind:email='user.email')
            v-list-tile-content
              v-list-tile-title {{user.name}}

      v-divider

      v-list.pt-0
        v-list-tile(v-on:click='newsModeration' v-show='isEditor' prepend-icon="border_color")
          v-list-tile-action
            v-icon gavel
          v-list-tile-title Moderation Tools
        v-list-group(subgroup no-action value='true' v-show='isWriter' prepend-icon="library_books")
          v-list-tile(slot='activator')
            v-list-tile-title News Management
          v-list-tile(v-on:click='allNews' v-show='isAdmin')
            v-list-tile-title All News
            v-list-tile-action
              v-icon all_inclusive
          v-list-tile(v-on:click='ownNews' v-show='isEditor')
            v-list-tile-title My News
            v-list-tile-action
              v-icon shopping_cart
          v-list-tile(v-on:click='addNewsCard')
            v-list-tile-title New News
            v-list-tile-action
              v-icon note_add
        v-list-group(subgroup no-action value='true' v-show='isAdmin' prepend-icon="accessibility")
          v-list-tile(slot='activator')
            v-list-tile-title User Management
          v-list-tile(v-on:click='allUsers')
            v-list-tile-title All Users
            v-list-tile-action
              v-icon people_outline

    v-toolbar(app flat)
      v-toolbar-title.ml-0.pl-3
        v-toolbar-side-icon(@click.stop='drawer = !drawer').hidden-md-and-up
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
      v-container(fluid)
        router-view.pa-2
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
    user: {},
    id: "",
    role: "USER",
    roleColor: "black"
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
    allNews() {
      window.location.href = `${
        window.location.origin
      }/dashboard#/allnewsadmin`;
    },
    ownNews() {
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
        this.id = response.data.user.id;
        if (this.isAdmin) {
          this.role = "ADMIN  (★★★)";
          this.roleColor =
            "linear-gradient( 135deg, #F05F57 10%, #360940 100%)";
        } else if (this.isEditor) {
          this.role = "EDITOR  (★★)";
          this.roleColor =
            "linear-gradient( 135deg, #97ABFF 10%, #123597 100%)";
        } else if (this.isWriter) {
          this.role = "WRITER  (★)";
          this.roleColor =
            "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)";
        }
      }
    });

    // Make Navigation Drawer Responsive
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


