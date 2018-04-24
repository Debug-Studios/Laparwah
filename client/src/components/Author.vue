<template lang="pug">
  v-app
    navbar

    v-layout(layout row)
      v-flex(xs12)
        v-jumbotron(:gradient="gradient" dark)
          v-container(fill-height fill-width)
            v-layout(row)
              v-flex(xs6 offset-xs3).flex-profile
                v-avatar.main-avatar(size='256')
                  v-gravatar(size='256' email="ayush.bahuguna12@gmail.com")
                v-flex.flex-profile-text.ml-3
                  .display-2 Ravish Kumar
                  .headline.mt-1.ml-1 Digital Producer, News
                  span.mt-2
                    v-icon location_on
                    span.subheading(style="vertical-align: middle;") Gopeshwar, Chamoli
                  div.mt-3
                    a(href='#').mr-4
                      v-avatar(size='36')
                        img(src='/icons/facebook.svg')
                    a(href='#').mr-4
                      v-avatar(size='36')
                        img(src='/icons/twitter.svg')
                    a(href='#')
                      v-avatar.red(size='36')
                        v-icon(dark) mail

        v-flex(xs12)
          div
            v-stepper
              v-stepper-header
                v-stepper-step(step="<-") Left Leaning
                v-divider
                v-stepper-step(step="-") Moderate
                v-divider
                v-stepper-step(step="->") Right Leaning

</template>


<script>
import navbar from "./Navbar.vue";

export default {
  name: "author",
  components: {
    navbar
  },
  data() {
    return {
      route: "",
      gradient: "to right, #485563, #29323c"
    };
  },
  created() {
    this.route = this.$route.params.id;
  }
};
</script>

<style lang="scss" scoped>
a.plain {
  text-decoration: none;
}

.flex-profile {
  display: flex;
  justify-content: center;
  align-items: center;

  .main-avatar img {
    border: 5px solid white;
    padding: 10px;
  }

  &-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>