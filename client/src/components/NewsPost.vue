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
                    span.span-bottom Updated&nbsp;
                    span.span-bottom {{news.created_at | moment('timezone', 'Asia/Kolkata', 'HH:mm z')}}&nbsp;
                    span.span-bottom ({{news.created_at | moment('timezone', 'Atlantic/Reykjavik', 'HH:mm z')}})&nbsp;
                    span.span-bottom {{news.created_at | moment('dddd, MMMM Do YYYY')}}

            v-layout(row)
              img(:src="news.heroImage", style="width:100%")
            v-flex(row v-html="news.content").mt-4

          v-flex(md4 sm12)
            .text-xs-center#social-links
              a(:href="'https://plus.google.com/share?url='+ disqus_url + '&text=' + news.title" target="_blank").mr-4
                v-avatar(size='32')
                  img(src='/icons/google.svg')
              a(:href="'https://www.facebook.com/sharer.php?u='+ disqus_url" target="_blank").mr-4
                v-avatar(size='36')
                  img(src='/icons/facebook.svg')
              a(:href="'https://twitter.com/intent/tweet?url=' + disqus_url+ '&text=' + news.title" target="_blank").mr-4
                v-avatar(size='36')
                  img(src='/icons/twitter.svg')

              v-flex(row v-if="isLiked != null").pt-3
                v-tooltip(bottom)
                  v-btn(flat slot="activator" icon :color="like_color" @click="likeUnlike" :disabled="likeDisabled" :loading="likeDisabled").mr-3
                    v-icon thumb_up
                    span.subheading.ml-2 {{like_count}}
                  span(v-if="isLiked") Click to Unlike
                  span(v-else) Click to Like
                v-tooltip(bottom)
                  v-btn(flat slot="activator" icon @click="$vuetify.goTo('#comments')")
                    v-icon comment
                  span Click to go to comments

      v-flex.comments(v-if="disqus_url")#comments
        vue-disqus(shortname="laparwah" :identifier="disqus_id" :url="disqus_url" :title="news.title")

</template>

<script>
import stickybits from "stickybits";
import { EventBus } from "../eventbus.js";
export default {
  name: "newspost",
  data() {
    return {
      news: {},
      disqus_url: null,
      disqus_id: null,
      isLiked: null,
      like_color: "grey",
      like_count: 0,
      show_social_links: true,
      likeDisabled: false
    };
  },
  created() {
    this.disqus_url = window.location.href;
    this.disqus_id = this.$route.params.id;
  },
  async mounted() {
    EventBus.$emit("show-loading");
    stickybits("#social-links", { stickyBitStickyOffset: 20 });
    this.news = (await this.axios.get(
      `/news/getNewsPost/${this.$route.params.id}`
    )).data;
    document.title = `${this.news.title}`;
    EventBus.$emit("hide-loading");

    await this.likeChecker();
  },
  methods: {
    likeUnlike: async function() {
      this.likeDisabled = true;
      if (this.isLiked) {
        // Unlike the post
        await this.axios.get(`/news/unlike/${this.news._id}`);
        await this.likeChecker();
        this.$notify({
          group: "main",
          title: "Removed from liked posts",
          type: "dark"
        });
      } else {
        // Like the post
        await this.axios.get(`/news/like/${this.news._id}`);
        await this.likeChecker();
        this.$notify({
          group: "main",
          title: "Added to liked posts",
          type: "success"
        });
      }
      this.likeDisabled = false;
    },

    likeChecker: async function() {
      this.likeDisabled = true;
      this.isLiked = (await this.axios.get(
        `/news/currentLikeStatus/${this.news._id}`
      )).data;
      this.like_count = (await this.axios.get(
        `/news/likeCount/${this.news._id}`
      )).data.stats.likes;
      if (this.isLiked) {
        this.like_color = "blue accent-2";
      } else {
        this.like_color = "grey";
      }
      this.likeDisabled = false;
    }
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

.span-bottom {
  vertical-align: bottom;
}
</style>

