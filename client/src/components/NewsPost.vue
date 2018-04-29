<template lang="pug">
  v-app
    navbar

    v-container(v-if="news")
      h1.display-3.pb-3(style="font-weight: 300; line-height: 1.2 !important;") {{news.title}}
      v-container.px-0(grid-list-md)
        v-layout(row)
          v-flex(md8 sm12)
            v-layout(row v-if="news.creator")
              v-flex(md1)
                v-avatar(size='48')
                  v-gravatar(v-bind:email='news.creator.email')
              v-flex(md10)
                span
                  p.title.grey--text.text--darken-2.mb-1 By&nbsp;
                    router-link(:to="'/test'").plain {{news.creator.name}}
                    span(v-if="news.co_creator") and {{news.co_creator.name}}
                    span , Laparwah
                span
                  p.subheading.grey--text
                    span Updated&nbsp;
                    span {{news.updated_at | moment('timezone', 'Asia/Kolkata', 'HH:mm z')}}&nbsp;
                    span ({{news.updated_at | moment('timezone', 'Atlantic/Reykjavik', 'HH:mm z')}})&nbsp;
                    span {{news.updated_at | moment('dddd, MMMM Do YYYY')}}&nbsp;
                    v-icon(right) schedule

            v-layout(row)
              img(:src="news.heroImage", style="width:100%")
            v-flex(row v-html="news.content").mt-4

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
      news: {}
    };
  },
  async mounted() {
    this.news = (await this.axios.get(
      `/news/getNewsPost/${this.$route.params.id}`
    )).data;
  }
};
</script>

<style lang="scss">
a.plain {
  text-decoration: none;
}

p {
  font-size: 1.2rem;
}
</style>

