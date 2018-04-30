<template lang="pug">
  #moderation-queue
    transition-group(name="fade" tag="div" v-if="allNews")
        v-card(v-for='(news, index) in allNews' :key='news._id')
            v-card-title.blue-grey.darken-2.py-4.title
                | {{news.title}}
            v-container.pa-4(grid-list-sm )
                v-layout(row wrap)
                    v-flex(xs6)
                    h3( label='Category' name='category' ) Category: {{news.category}}
                    v-spacer
                    v-flex(xs3)
                        h3(name='tag') Tag: {{news.main_tag}}
                    v-flex(xs12)
                        p(name='show_content' label='Content') {{news.content}}
                    v-flex(xs6)
                        h3(label='Applied Tags' name='applied_tags') Applied Tags: {{news.tags}}
                v-card-actions
                    v-spacer
                    v-btn( color='success' @click.native='editNews' ) Edit
                    v-btn( @click='deletePost(news._id)' ) Delete

</template>

<script>
export default {
  data: () => {
    return {
      allNews: []
    };
  },
  async mounted() {
    this.allNews = (await this.axios.get("/dashboard/moderationQueue/1")).data;
  }
};
</script>

