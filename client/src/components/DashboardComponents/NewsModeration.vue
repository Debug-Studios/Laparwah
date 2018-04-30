<template lang="pug">
  v-container(grid.list-md)
    v-layout(row wrap)
      v-flex(xs6)
        transition-group(name="fade" tag="div" v-if="allNews")
          v-card(v-for='(news, index) in allNews' :key='news._id')
              v-card-title.blue-grey.darken-2.py-4.title
                | {{news.title}}
              v-container.pa-4(grid-list-sm )
                v-layout(row wrap)
                  v-flex(xs4)
                    h3(label='Category' name='category' ) Category: {{news.category}}
                  v-spacer
                  v-flex(xs4)
                    h3(name='tag') Tag: {{news.main_tag}}
                  v-flex(xs12).mt-3
                    p(name='show_content' label='Content') {{news.content}}
                  v-flex(xs6)
                    h3(label='Author') Author: {{news.creator.name}}
                v-card-actions.mt-3
                  v-btn( color='success' @click.native='approveNews' )
                    v-icon.mr-2 verified_user
                    | Approve
                  v-btn( @click='rejectNews' color='error' )
                    v-icon.mr-2 remove_circle
                    | Reject

</template>

<script>
export default {
  data: () => {
    return {
      allNews: []
    };
  },
  methods: {
    approveNews() {},
    rejectNews() {}
  },
  async mounted() {
    this.$notify({
      group: "dashboard",
      title: "Remember to be unbiased when approving or rejecting these posts!",
      type: "error",
      duration: 30000
    });
    this.allNews = (await this.axios.get("/dashboard/moderationQueue/1")).data;
  }
};
</script>

