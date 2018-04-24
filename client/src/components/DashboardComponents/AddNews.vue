<template lang="pug">
import { functionDeclaration } from 'babel-types';
  #addnews
    v-card(color='grey lighten-4 flat' width='400px;')
        v-card-text
            v-header 
                v-text-field(name='title')
                v-spacer
                v-flex(xs12 sm6)  
                    v-select(:items='items' v-model='ctg' label='Select Category' class='input-group--focused' name='category' single-line)
            v-container(fluid)
                v-layout(row)
                    v-flex(xs12)
                        v-text-field(name='content' label='Add News' textarea)
        v-card-action
            input(type='file' name='heroImage' accept='image/*')
            v-spacer
                v-btn(@click='sendPost') Add
                v-btn Cancel
    
</template>
<script>
export default {
    data: ()=> ({
        ctg: null,
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
      sendPost: function(){
          this.axios.post('/dashboard/createNewsPost', {
              title: this.title,
              content: this.content,
              category:this.category,
              tag: this.tag,
              heroImage: this.heroImage

          }).then(function(response){
              console.log(response);
          }).catch(function(error){
              console.log(error);
          })
      }
  }
}
</script>
