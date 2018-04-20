<template lang="pug">
  v-app#navbar(dark='')
    v-navigation-drawer(fixed='' :clipped='$vuetify.breakpoint.lgAndUp' app='' v-model='drawer')
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
    v-toolbar(app='' :clipped-left='$vuetify.breakpoint.lgAndUp' fixed='')
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        span.hidden-sm-and-down Admin Dashboard
      v-spacer
      v-btn(icon='' @click.stop='dialog = !dialog')
        v-icon account_circle
    v-content
      v-container(fluid='' fill-height='')
        v-layout(justify-center='' align-center='')
    v-btn(fab='' bottom='' right='' color='pink' dark='' fixed='' @click.stop='')
      v-icon keyboard_arrow_up
    v-dialog(v-model='dialog' width='800px')
      v-card
        v-card-title.grey.lighten-4.py-4.title
          | Sign in
        v-container.pa-4(grid-list-sm='')
          v-layout(row='' wrap='')
            v-flex(xs12='')
              v-text-field(v-model='email' prepend-icon='mail' label='E-mail' :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-name='email' required='')
            v-flex(xs12='')
              v-text-field(v-model='password' prepend-icon='lock' label='Password' :type="'password'" required='')
            v-flex(xs12='')
              span Or Sign in using
              v-btn(fab='' color='pink' dark='')
                v-icon blur_circular
              v-btn(fab='' color='pink')
                v-icon google
              v-btn(fab='' color='pink')
                v-icon google
        v-card-actions
          v-spacer
          v-btn(flat='' color='primary' @click='dialog = false') Cancel
          v-btn(flat='' @click='submit') Sign in

</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
          {icon: 'chat_bubble', text: 'Blogs'},
          {icon: 'mail_outline', text: 'Breaking News' },
        
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'All Users',
          model: false,
          children: [
            { text: 'Add User' },
            { text: 'Remove User' }
          ]
        },
        {icon: 'settings', text: 'Settings'}
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

