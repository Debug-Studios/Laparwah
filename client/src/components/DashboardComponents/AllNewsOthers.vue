<template lang="pug">
  #allnewsothers
    transition-group(name="fade" tag="div")
        v-card(v-for='(news, index) in allnewsothers' :key='news._id')
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
                    v-btn( color='success' @click.native='editNews(news._id)' ) Edit
                    v-btn( @click='deletePost(news._id)' ) Delete
</template>
<script>
export default {
    data: ()=>({
        allnewsothers: [],

    }),
    mounted(){
        this.axios.get(`/dashboard/ownNewsPosts/1`).then(response =>{
            this.allnewsothers = response.data;
        });
    },
    methods: {
        editNews(id){
            window.location.href=`${window.location.origin}/dashboard#/editnewsothers/${id}`
        },
        deletePost(id){
            this.axios.delete(`/dashboard/deleteNewsPost/${id}`).then((response)=>{
                this.allnewsothers.forEach((news, index) => {
                    if(news._id == response.data._id){
                        this.allnewsothers.splice(index, 1);
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
p {
    text-align: justify;
}
</style>


