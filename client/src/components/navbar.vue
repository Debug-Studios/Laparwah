<template lang="pug">
  v-app#navbar
    v-toolbar(app='' dark='' :clipped-left='$vuetify.breakpoint.lgAndUp' fixed='')
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        span.hidden-sm-and-down Laparwah
      v-text-field.hidden-sm-and-down(flat='' solo-inverted='' prepend-icon='search' label='Search')
      v-spacer
      p {{user.name}}
      v-menu(offset-y='')
        v-btn(icon='' slot='activator')
          v-icon account_circle
        v-card(v-if='isLogged == false')
          v-flex.text-xs-center(xs12)
            span(style='margin-top:30px;') SIGN IN USING
          v-flex.text-xs-center(xs12 )
            a(href='/auth/google')
              v-avatar(size='32')
                img(src='/icons/google.svg')
            a(href='/auth/facebook')
              v-avatar(size='32')
                img(src='/icons/facebook.svg')
            a(href='/auth/twitter')
              v-avatar(size='32')
                img(src='/icons/twitter.svg')
            a(href='/auth/microsoft')
              v-avatar(size='32')
                img(src='/icons/windows.svg')
        v-card(v-if='isLogged == true')
          v-flex.text-xs-center(xs12)
            a(href='#')
              v-btn(fab small dark)
                v-icon settings
            a(href='/auth/logout')
              v-btn(fab small dark @click.prevent='logout')
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
      user: '',
      errors: [],
      dialog: false,
      isLogged: false,
      socials: [
        {icon: '/icons/google.svg'},
        {icon: '/icons/facebook.svg'},
        {icon: '/icons/twitter.svg'},
        {icon: '/icons/windows.svg'}
      ]
      
      
    }),
    props: {
      source: String
    },
    methods:{
      
    },
    created(){
      this.axios.get('/auth/getCurrentUser')
      .then(response => {
        console.log(response)
        this.isLogged = response.data.isLoggedin
        
        
        })

    }
  }
</script>

<style scoped>
.avatar{
  margin: 15px;
}

</style>
