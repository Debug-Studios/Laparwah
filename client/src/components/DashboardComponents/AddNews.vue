<template lang="pug">
  #add-news
    v-card(color='grey lighten-4 flat' v-model='card')
        v-card-text
            v-header 
                v-text-feild(name="title" label="Add Title")
            v-container(fluid)
                v-layout(row)
                    v-flex(xs12)
                        v-text-feild(name='content' label='Add News' textarea)
        v-card-action
            v-spacer
                v-btn(@click='sendPost') Add
                v-btn(@click.stop='card = false') Cancel
    
</template>
<script>
export default {
  name: "addnews",
  data: () => ({
      card: true,
      title:'',
      content: '',
      category: '',
      heroImage: '',
      tag:''
  }),
  methods:{
      sendPost: function(){
          this.axios.post("/dashboard/createNewsPost", {
              title:'',
              content: '',
              category:'',
              heroImage:'',
              tag:''
          }).then(function (response){
              console.log(response);
          }).catch(function (error){
              console.log(error);
          });

          
      }
  }
}
</script>

