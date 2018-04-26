<template lang="pug">
  #addnews
    v-card
        v-card-title.blue-grey.darken-2.py-4.title
            | Add News
        v-container.pa-4(grid-list-sm )
            v-layout(row wrap)
                v-flex(xs6 align-center justify-space-between)
                     v-text-field(label="Add Title" name='add_title' v-model='title')
                v-spacer
                v-flex(xs3)
                   v-select(:items='items' label='Add Category' v-model='category' name='add_category' input-type='text')
                v-flex(xs12)
                    v-text-field(name='add_content' v-model='content' label='Add Content' textarea dark)
                v-flex(xs6)
                    v-text-field(label='Apply Tags' v-model='tags' name='add_tags')
                v-spacer
                v-flex(xs3)
                    v-text-field(label='Add Tag' v-model='main_tag' name='add_tag')
                v-flex(xs12)
                    v-text-field(label='Add Image Link' v-model='heroImage' name='add_image')
            v-card-actions
                v-spacer
                v-btn( color='success' @click='sendPost' ) Add
                v-btn( type='reset') Reset
</template>
<script>
export default {
    data: ()=> ({
        _id: '',
        title:'',
        category:'',
        content:'',
        main_tag:'',
        tags:'',
        heroImage:'',
        items: [
            {text : 'Politics'},
            {text : 'Money'},
            {text : 'Entertainment'},
            {text : 'Tech'},
            {text : 'Sport'},
            {text : 'Travel'},
            {text : 'Style'},
            {text : 'Health'},
            {text : 'Video'}

        ]

    }),



  methods: {
      sendPost(){
          this.axios.post('/dashboard/createNewsPost', {
              _id : this._id,
              title: this.title,
              content: this.content,
              category: this.category,
              tags: this.tags,
              main_tag: this.main_tag,
              heroImage: this.heroImage

          })
          .then(function(response){
                  console.log(response);

          })
          .catch(function(error){
              console.log(error);
          })
      }
  }
}
</script>
