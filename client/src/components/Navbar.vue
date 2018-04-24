<template lang="pug">
  v-toolbar(dark)
    v-toolbar-title.ml-0.pl-3 Breaking News:
    //- Transition: First writes letters and then goes up
    a.breaking-news-link.subheading.ml-0.pl-3(href="#") Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    v-spacer

    v-toolbar-items
      .d-flex.pr-4.flex-weather
        v-icon.pr-2 cloud
        .headline.pr-2 20&deg;C
        .subheading (Gopeshwar, Chamoli)

      .d-flex
        .px-4.flex-stock
          span.d-flex
            .body-2 DOW
            v-icon.green--text keyboard_arrow_up
          span.headline.green--text 24.45
        .px-4.flex-stock
          span.d-flex
            .body-2 NASDAQ
            v-icon.red--text keyboard_arrow_down
          span.headline.red--text 7.45
        .px-4.flex-stock
          span.d-flex
            .body-2 NIFTY
            v-icon.green--text keyboard_arrow_up
          span.headline.green--text 4.45

    v-menu(offset-y='' v-if='isLogged' )
      v-btn(icon='' slot='activator')
        v-avatar(size='32')
          v-gravatar(v-bind:email='email'  )
      v-card(style="margin-top:10px")
        v-flex.text-xs-center(xs12 style='padding:15px')
        span Welcome! {{name}}
        v-flex.text-xs-center(xs12 style='padding:10px')
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
  name: "navbar",
  data: () => ({
    user: "",
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
  created() {
    this.axios.get("/accounts/getCurrentUser").then(response => {
      this.isLogged = response.data.isLoggedin === "true";
      if (response.data.user) {
        this.email = response.data.user.email;
        this.name = response.data.user.name;
      }
    });
  }
};
</script>

<style scoped>
.avatar {
  margin: 15px;
}

.flex-stock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex-weather {
  display: flex;
  justify-content: center;
  align-items: center;
}

.breaking-news-link {
  text-decoration: none;
  color: inherit;
}
</style>
