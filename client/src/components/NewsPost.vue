<template lang="pug">
  v-app

    v-container(v-if="news")
      h1.display-3.pb-3(style="font-weight: 300; line-height: 1.2 !important;") {{news.title}}
      v-container.px-0(grid-list-md)
        v-layout(row wrap)
          v-flex(md8 sm12)
            v-layout(row v-if="news.creator")
              v-flex(md1)
                v-avatar(size='48')
                  v-gravatar(:hash='news.creator.email' :size='48')
              v-flex(md10)
                span
                  p.title.grey--text.text--darken-2.mb-1 By&nbsp;
                    router-link(:to="'/author/' + news.creator._id").no-underline {{news.creator.name}}
                    span(v-if="news.co_creator") and {{news.co_creator.name}}
                    span , Laparwah
                span
                  p.subheading.grey--text
                    v-icon(right color="grey").mr-1 schedule
                    span Updated&nbsp;
                    span {{news.updated_at | moment('timezone', 'Asia/Kolkata', 'HH:mm z')}}&nbsp;
                    span ({{news.updated_at | moment('timezone', 'Atlantic/Reykjavik', 'HH:mm z')}})&nbsp;
                    span {{news.updated_at | moment('dddd, MMMM Do YYYY')}}

            v-layout(row)
              img(:src="news.heroImage", style="width:100%")
            v-flex(row v-html="news.content").mt-4

          v-flex(md4 sm12)
            .text-xs-center
              a(:href="'https://plus.google.com/share?url='+ disqus_url + '&text=' + news.title" target="_blank").mr-4
                v-avatar(size='32')
                  img(src='/icons/google.svg')
              a(:href="'https://www.facebook.com/sharer.php?u='+ disqus_url" target="_blank").mr-4
                v-avatar(size='36')
                  img(src='/icons/facebook.svg')
              a(:href="'https://twitter.com/intent/tweet?url=' + disqus_url+ '&text=' + news.title" target="_blank").mr-4
                v-avatar(size='36')
                  img(src='/icons/twitter.svg')

      v-flex.comments(v-if="disqus_url")
        vue-disqus(shortname="laparwah" :identifier="disqus_id" :url="disqus_url" :title="news.title")

</template>

<script>
export default {
  name: "newspost",
  data() {
    return {
      news: {},
      disqus_url: null,
      disqus_id: null
    };
  },
  created() {
    this.disqus_url = window.location.href;
    this.disqus_id = this.$route.params.id;
  },
  mounted() {
    this.axios
      .get(`/news/getNewsPost/${this.$route.params.id}`)
      .then(response => {
        this.news = response.data;
        document.title = `${this.news.title}`;
      });
  }
};
</script>

<style lang="scss">
a.no-underline {
  text-decoration: none;
}

p {
  font-size: 1.2rem;
}
</style>

