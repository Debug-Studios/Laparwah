<template lang="pug">
  v-app(dark)
    v-navigation-drawer(fixed :clipped='$vuetify.breakpoint.lgAndUp' app v-model='drawer' value='true')
      v-list(dense v-show='isEditor')
        v-list-tile(@click='')
          v-list-tile-action
            v-icon face 
          v-list-tile-title Profile
        v-list-group(subgroup no-action value='true')
          v-list-tile(slot='activator')
            v-list-tile-action 
              v-icon people_outline
            v-list-tile-title News Management
          v-list-tile
            v-list-tile-title All News
            v-list-tile-action
              v-icon all_inclusive
          v-list-tile
            v-list-tile-title New News
            v-list-tile-action
              v-icon note_add

      v-list(dense v-show='isAdmin')
        v-list-tile(@click='')
          v-list-tile-action
            v-icon face 
          v-list-tile-title Profile
        v-list-group(subgroup no-action value='true')
          v-list-tile(slot='activator')
            v-list-tile-action 
              v-icon people_outline
            v-list-tile-title User Management
          v-list-tile
            v-list-tile-title Add User
            v-list-tile-action
              v-icon add_circle
          v-list-tile
            v-list-tile-title Delete User
            v-list-tile-action
              v-icon delete_forever
        
        v-list-group(subgroup no-action value='true')
          v-list-tile(slot='activator')
            v-list-tile-action
              v-icon people_outline
            v-list-tile-title News Management
          v-list-tile 
            v-list-tile-title All News
            v-list-tile-action  
              v-icon all_inclusive
          v-list-tile(v-on:click='add_news = !add_news')
            v-list-tile-title New News
            v-list-tile-action  
              v-icon note_add

        
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
      router-view(v-if='add_news')
    
    
</template>

<script>
 
  export default {
    data: () => ({
      drawer: null,
      isLogged:false,
      add_news: false,
      isAdmin: false,
      isEditor:false,
      name:''
      
    }),
    
    methods:{
      
    },
    created(){
      this.axios.get('/accounts/getCurrentUser').then(response =>{
          this.isLogged = response.data.isLoggedin === "true";
          this.email = response.data.user.email;
          this.name = response.data.user.name;
          this.isAdmin = response.data.user.roles.includes('admin');
          this.isEditor = response.data.user.roles.includes('editor');
          
      });
    }
  }
</script>
<style scoped>

</style>


