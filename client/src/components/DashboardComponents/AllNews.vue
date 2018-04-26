<template lang="pug">
  #allnews
    v-card(v-for='(news, index) in allnews' :key='news._id')
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
                v-btn( color='success' @click.native='' ) Edit
                v-btn( @click='deletePost') Delete
</template>
<script>
export default {
    data: ()=>({
        allnews: [],

    }),
    mounted(){
        this.axios.get('/dashboard/allNewsPosts/:page').then(response =>{
            this.allnews = response.data;
            console.log(response);

        });
    },
    methods: {
        deletePost(){
            this.axios.post('/deleteNewsPost/:id').then(function(response){
                console.log(response);
            }).catch(function(error){
                console.log(error);
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


