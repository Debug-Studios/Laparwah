<template lang="pug">
  #allnews
    v-card
        v-card-title.blue-grey.darken-2.py-4.title(v-model='title')
            | {{title}}
        v-container.pa-4(grid-list-sm )
            v-layout(row wrap)
                v-flex(xs6)
                   p( label='Category' v-model='category' name='category') {{category}}
                v-spacer
                v-flex(xs3)
                    p(label='Tag' v-model='main_tag' name='tag') {{main_tag}}
                v-flex(xs12)
                    p(name='show_content' v-model='content' label='Content') {{content}}
                v-flex(xs6)
                    p(label='Applied Tags' v-model='tags' name='applied_tags') {{tags}}
                
            v-card-actions
                v-spacer
                v-btn( color='success' @click.native='' ) Edit
                v-btn( @click='') Delete
</template>
<script>
export default {
    data: ()=>({
        title: '',
        category:'',
        main_tag:'',
        content:'',
        tags:''
        
    }),
    created(){
        this.axios.get('/dashboard/allNewsPosts/:page').then(response =>{
            
            this.title= response.data.title;
            this.category= response.data.category;
            this.tag= response.data.main_tag;
            this.content= response.data.content;
            this.tags= response.data.tags;
            console.log(response);
        });
    }
  
}
</script>

