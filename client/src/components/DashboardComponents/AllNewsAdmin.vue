<template lang="pug">
    #allnews
        .text-xs-center.pageNumber
            v-pagination(:length='length' v-model='page' circle)
        transition-group(name="fade" tag="div")
            v-card.mt-4(v-for='(news, index) in allnews' :key='news._id')
                v-card-title.grey.darken-4.py-4.title
                    h3 {{news.title}}
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
                            h3(label='Applied Tags' name='applied_tags') Applied Tags: {{news.tags.toString()}}
                    v-card-actions
                        v-spacer
                        v-btn( color='success' @click.native='editNews(news._id)' ) Edit
                        v-btn(color='error' @click.native='deletePost(news._id)' ) Delete
        .text-xs-center.pageNumber
            v-pagination(:length='length' v-model='page' circle)
</template>
<script>
export default {
    data: ()=>({
        allnews: [],
        page: 1,
        length:1,
        user: [],

    }),
  async  mounted(){
        this.allnews = (await this.axios.get(`/dashboard/allNewsPosts/${this.page}`)).data;
        this.user = (await this.axios.get("/accounts/getCurrentUserDetails")).data.user;
        this.length = Math.ceil(parseInt((await this.axios.get('/dashboard/allNewsPostsCount')).data.newsCount)/10);
    },
    methods: {
        editNews(id){
            window.location.href=`${window.location.origin}/dashboard#/editnews/${id}`;
        },
        deletePost(id){
            this.axios.delete(`/dashboard/deleteNewsPost/${id}`).then((response)=>{
                this.allnews.forEach((news, index) => {
                    if(news._id == response.data._id){
                        this.allnews.splice(index, 1);
                        this.$notify({
                        group: "dashboard",
                        title: "Successfuly Deleted",
                        type: "success",
                        duration: 30000
                        });
                    }
                });
            }).catch((error) =>{
                this.$notify({
                        group: "dashboard",
                        title: "Cannot Delete! Try Again",
                        type: "error",
                        duration: 30000
                        });
            })

        }
    }

}
</script>
<style scoped>
    #allnews p {
        text-align: justify;
    }
    .pageNumber{
        padding: 1rem;
    }
</style>


