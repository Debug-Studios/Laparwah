<template lang="pug">
  v-app
    navbar

    v-container
      h1.display-3.pb-3(style="font-weight: 300; line-height: 1.2 !important;") Russia ramps up pressure on Trump to honor Iran nuclear deal
      v-container.px-0(grid-list-md)
        v-layout(row)
          v-flex(md8 sm12)
            v-layout(row)
              v-flex(md1)
                v-avatar(size='48')
                  v-gravatar(v-bind:email='email')
              v-flex(md10)
                span
                  p.title.grey--text.text--darken-2.mb-1 By&nbsp;
                    a(href="#").plain Sudhir Chaudhary&nbsp;
                    | and Ravish Kumar, Laparwah
                span
                  p.subheading.grey--text
                    | Updated 1807 GMT (0207 IN) April 23, 2018 &nbsp;
                    v-icon(right) schedule

            v-layout(row)
              img(src="http://media3.s-nbcnews.com/j/newscms/2016_18/1528271/trump_a99a1b1c10529223908f3db88c87685f.nbcnews-fp-1200-800.jpg", style="width:100%")

          v-flex(md4 sm12)
            .text-xs-center
              a(href='#').mr-4
                v-avatar(size='32')
                  img(src='/icons/google.svg')
              a(href='#').mr-4
                v-avatar(size='36')
                  img(src='/icons/facebook.svg')
              a(href='#').mr-4
                v-avatar(size='36')
                  img(src='/icons/twitter.svg')
              a(href='#')
                v-avatar.teal(size='36')
                  v-icon(dark) mail

</template>

<script>
import navbar from "./Navbar.vue";

export default {
  name: "newspost",
  components: {
    navbar
  },
  data() {
    return {
      route: ""
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
</style>

