<template lang="pug">
  v-app#navbar
    v-navigation-drawer(fixed='' dark='' :clipped='$vuetify.breakpoint.lgAndUp' app='' v-model='drawer')
      v-list(dense='')
        template(v-for='item in items')
          v-layout(row='' v-if='item.heading' align-center='' :key='item.heading')
            v-flex(xs6='')
              v-subheader(v-if='item.heading')
                | {{ item.heading }}
            v-flex.text-xs-center(xs6='')
              a.body-2.black--text(href='#!') EDIT
          v-list-group(v-else-if='item.children' v-model='item.model' :key='item.text' :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon='')
            v-list-tile(slot='activator')
              v-list-tile-content
                v-list-tile-title
                  | {{ item.text }}
            v-list-tile(v-for='(child, i) in item.children' :key='i' @click='')
              v-list-tile-action(v-if='child.icon')
                v-icon {{ child.icon }}
              v-list-tile-content
                v-list-tile-title
                  | {{ child.text }}
          v-list-tile(v-else='' @click='' :key='item.text')
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title
                | {{ item.text }}
    v-toolbar(app='' dark='' :clipped-left='$vuetify.breakpoint.lgAndUp' fixed='')
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
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
      dialog: false,
      drawer: null,
      items: [
        
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'District Blocks',
          model: false,
          children: [
            { text: 'Dasoli' },
            { text: 'Deval' },
            { text: 'Gairsain' },
            { text: 'Ghaat' },
            { text: 'Joshimath' },
            { text: 'Karanprayag' },
            { text: 'Narayanbagar' },
            { text: 'Pokhari' },
            { text: 'Tharali' }
          ]
        }
      ]
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
  margin: 10px;
}
</style>
