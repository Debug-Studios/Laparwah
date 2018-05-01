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
                  v-btn(:loading="loadingApproved" :disabled="loadingApproved" color='success' @click.native='updateNewsStatus(news._id, true)' )
                    v-icon.mr-2 verified_user
                    | Approve
                  v-btn(:loading="loadingReject"  :disabled="loadingReject" @click.native='updateNewsStatus(news._id, false)' color='error' )
                    v-icon.mr-2 remove_circle
                    | Reject

</template>

<script>
export default {
  data: () => {
    return {
      user: {},
      allNews: [],
      loadingApproved: false,
      loadingReject: false
    };
  },
  methods: {
    async updateNewsStatus(id, isApproved) {
      if (isApproved) {
        this.loadingApproved = true;
      } else {
        this.loadingReject = true;
      }
      if (this.user.special_role) {
        this.axios
          .patch(
            `/dashboard/updateNewsPostStatus/${id}/${this.user.special_role}`,
            {
              status: isApproved
            }
          )
          .then(response => {
            let title = isApproved ? "Approved" : "Rejected!";
            let type = isApproved ? "success" : "error";
            this.$notify({
              group: "dashboard",
              title: title,
              type: type,
              duration: 30000
            });
            this.allNews.forEach((news, index) => {
              if (news._id == response.data._id) {
                this.allNews.splice(index, 1);
              }
            });
            this.loadingApproved = false;
            this.loadingReject = false;
          })
          .catch(error => {
            this.$notify({
              group: "dashboard",
              title: error,
              type: "error",
              duration: 30000
            });
          });
      }
    }
  },
  async mounted() {
    this.$notify({
      group: "dashboard",
      title: "Remember to be unbiased when approving or rejecting these posts!",
      type: "info",
      duration: 30000
    });
    this.user = (await this.axios.get("/accounts/getCurrentUser")).data.user;
    if (this.user.roles.includes("admin")) {
      this.allNews = (await this.axios.get(
        `/dashboard/moderationQueueAdmin/1/`
      )).data;
    } else if (this.user.roles.includes("editor")) {
      this.allNews = (await this.axios.get(
        `/dashboard/moderationQueueEditor/1/${this.user.special_role}`
      )).data;
    }
  }
};
</script>

