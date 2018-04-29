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
                  v-gravatar(:size='256' :hash="author.email")
                v-flex.flex-profile-text.ml-3
                  .display-2 {{author.name}}
                  .headline.mt-1.ml-1 {{author.designation}}
                  span.mt-2
                    v-icon location_on
                    span.subheading(style="vertical-align: middle;") {{author.location}}
                  div.mt-3(v-if="author.social")
                    a(v-if="author.social.facebook" :href='author.social.facebook' target="_blank").mr-4
                      v-avatar(size='36')
                        img(src='/icons/facebook.svg')
                    a(v-if="author.social.twitter" :href='author.social.twitter' target="_blank").mr-4
                      v-avatar(size='36')
                        img(src='/icons/twitter.svg')
                    a( v-if="author.social.email" :href='author.social.email' target="_blank")
                      v-avatar.red(size='36')
                        v-icon(dark) mail

        v-flex(xs12)
          div
            v-stepper(:value="author.spectrum" non-linear)
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
      author: {},
      gradient: "to right, #485563, #29323c"
    };
  },
  async mounted() {
    this.author = (await this.axios.get(
      `/author/getAuthor/${this.$route.params.id}`
    )).data;
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