<template lang="pug">
  v-app#navbar
    v-toolbar(app='' dark='' :clipped-left='$vuetify.breakpoint.lgAndUp' fixed='')
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        span.hidden-sm-and-down(style='font-size:30px;')
          strong लापरवाह
      v-text-field.hidden-sm-and-down(flat='' solo-inverted='' prepend-icon='search' label='Search')
      v-spacer
      
      v-menu(offset-y='' v-if='isLogged' )
        v-btn(icon='' slot='activator')
          v-avatar(size='32')
            v-gravatar(v-bind:email='email'  )
        v-card
         v-flex.text-xs-center(xs12)
          span Welcome! {{name}}
         v-flex.text-xs-center(xs12)
            a(href='/#/dashboard')
              v-btn(fab small dark)
                v-icon settings
            a(href='/auth/logout')
              v-btn(fab small dark)
                v-icon directions_walk

      v-menu(offset-y='' v-else)
        v-btn(icon='' slot='activator')
          v-icon account_circle

        v-card
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

    
</template>

<script>
export default {
  data: () => ({
    user: "",
    errors: [],
    dialog: false,
    isLogged: false,
    name: "",
    email: "",
    socials: [
      { icon: "/icons/google.svg" },
      { icon: "/icons/facebook.svg" },
      { icon: "/icons/twitter.svg" },
      { icon: "/icons/windows.svg" }
    ]
  }),
  props: {
    source: String
  },
  methods: {},
  created() {
    this.axios.get("/accounts/getCurrentUser").then(response => {
      this.isLogged = response.data.isLoggedin === "true";
      this.email = response.data.user.email;
      this.name = response.data.user.name;
      
      
      
    });
  }
};
</script>

<style scoped>
#navbar{
  font-family: 'Kalam', cursive;
}
.avatar {
  margin: 15px;
}

.card{
  margin-top: 10px;
}

.flex{
  padding: 10px;
}
</style>
