<template lang="pug">
  v-app#navbar(dark='')
    v-navigation-drawer(fixed :clipped='$vuetify.breakpoint.lgAndUp' app='' v-model='drawer')
      v-list(dense v-show='isEditor')
        v-list-tile(slot='activator')
          v-list-tile-title News Management
        v-list-tile(v-for='(post,i) in posts' :key='i' @click='')
          v-list-tile-title(v-text='news[0]')
          v-list-tile-action(v-text='news[1]')

          
        
    v-toolbar(app='' :clipped-left='$vuetify.breakpoint.lgAndUp' fixed='')
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
      v-container(fluid='' fill-height='')
        v-layout(justify-center='' align-center='')
    v-btn(fab='' bottom='' right='' color='pink' dark='' fixed='' @click.stop='')
      v-icon keyboard_arrow_up
    
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      isAdmin: false,
      isEditor:false,
      name:'',
      posts:[
        ['All News', 'all_inclusive'],
        ['New News', 'note_add']
      ]
      
    }),
    props: {
      source: String
    },
    methods:{
      
    },
    created(){
      this.axios.get('/accounts/getCurrentUser').then(response =>{
          console.log(response);
          this.isLogged = response.data.isLoggedin === "true";
          this.email = response.data.user.email;
          this.name = response.data.user.name;
          this.isAdmin = response.data.user.roles.includes('admin');
          this.isEditor = response.data.user.roles.includes('editor');
          
      });
    }
  }
</script>

