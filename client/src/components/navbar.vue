<template lang="pug">
  v-app#navbar
    v-toolbar(app='' dark='' :clipped-left='$vuetify.breakpoint.lgAndUp' fixed='')
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        span.hidden-sm-and-down Laparwah
      v-text-field.hidden-sm-and-down(flat='' solo-inverted='' prepend-icon='search' label='Search')
      v-spacer
      v-btn(icon='' @click.stop='dialog = !dialog')
        v-icon account_circle
    v-content
      v-container(fluid='' fill-height='')
        v-layout(justify-center='' align-center='')
    v-btn(fab='' bottom='' right='' color='pink' dark='' fixed='' @click.stop='')
      v-icon keyboard_arrow_up
    v-dialog(v-model='dialog' width='400px')
      v-card
        v-card-title.gray.lighten-4.py-4.title
          | SIGN IN
        v-container.pa-4(grid-list-sm='')
          v-layout(row='' wrap='')
            v-flex(xs12='')
              v-text-field(v-model='email' prepend-icon='mail' label='E-mail' :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-name='email' required='')
            v-flex(xs12='')
              v-text-field(v-model='password' prepend-icon='lock' label='Password' :type="'password'" required='')
            v-flex.text-xs-center(xs12='')
              v-btn(color='info' :loading='loading4' @click.native="loader = 'loading4'" :disabled='loading4' @click='submit')
                | Sign in
                span.custom-loader(slot='loader')
                  v-icon(light='') cached
              router-view
            v-flex.text-xs-center(xs12='')
              span  OR 
            v-flex.text-xs-center(xs12='')
              v-avatar
                img(src='/icons/google.svg')
              v-avatar
                img(src='/icons/facebook.svg')
              v-avatar
                img(src='/icons/twitter.svg')
              v-avatar
                img(src='/icons/windows.svg')
  
</template>

<script>
  export default {
    data: () => ({
      dialog: false
      
      
    }),
    props: {
      source: String
    },
    methods:{
      submit() {
        this.$validator.validateAll()
      }
    }
  }
</script>

<style scoped>
.avatar{
  margin: 15px;
}
</style>
