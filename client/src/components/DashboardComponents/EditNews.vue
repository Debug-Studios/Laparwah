<template lang="pug">
    #editnews
        v-card
            v-card-title.blue-grey.darken-2.py-4.title
                | Edit News
            v-container.pa-4(grid-list-sm )
                v-layout(row wrap)
                    v-flex(xs5 align-center justify-space-between)
                        v-text-field(label="Title" name='add_title' v-model='title')
                    v-spacer
                    v-flex(xs3)
                        v-select(required :items='tag' label='Apply Tag' v-model='main_tag' name='add_tag' input-type='text')
                    v-spacer
                    v-flex(xs3 align-center justify-space-between)
                        span
                            h3 Applied Tag: {{applied_tag}}
                    v-flex(xs12)
                        v-text-field(name='add_content' v-model='content' label='Content' textarea dark)
                    v-flex(xs5)
                        template
                            v-select(required flat chips tags solo clearable prepend-icon='filter_list' append-icon='' label='Add Tags' v-model='tags' name='add_tags'  input-type='text'  v-validate="'required'" :error-messages="errors.collect('category')" apend-icon='')
                                template(slot='selection' slot-scope='data')
                                    v-chip(close @input='remove(data.item)' :selected='data.selected') {{data.item}}
                    v-spacer
                    v-flex(xs3)
                        v-select(required :items='items' label='Select Category' v-model='category' name='add_category' input-type='text')
                    v-spacer
                    v-flex(xs3 align-center justify-space-between)
                        h3 Applied Category: {{applied_category}}
                    v-flex(xs12)
                        v-text-field(label='Added Image Link' v-model='heroImage' name='add_image')
                    v-flex(xs12)
                        v-text-field(label='News Url' v-model='url' name='add_image' disabled)
                v-card-actions
                    v-spacer
                    v-btn( color='success' @click='savePost'  :loading="loading" :disabled="loading" ) Save
                    v-btn( @click='goBack') Cancel
</template>
<script>
export default {
    data: () =>{
        return{
        news: {},
        title:'',
        category:[],
        content:'',
        main_tag:[],
        applied_tag: '',
        applied_category: '',
        tags:[],
        heroImage:'',
        loading: false,
        url:'',
        items: [
            { text: "Politics" },
            { text: "Money" },
            { text: "Entertainment" },
            { text: "Tech" },
            { text: "Sport" },
            { text: "Travel" },
            { text: "Style" },
            { text: "Health" },
            { text: "Video" }
            ],
        tag: [{ text: "Breaking News" }, { text: "Spotlight" }, { text: "Live" }]
        }
    },
  async mounted(){
        this.news = (await this.axios.get(`/dashboard/editNewsPost/${this.$route.params.id}`)).data;
             this.title = this.news.title;
             this.applied_category = this.news.category;
             this.content  = this.news.content;
             this.applied_tag = this.news.main_tag;
             this.tags = this.news.tags;
             this.heroImage = this.news.heroImage;
             this.url = this.news.url;
    },
    methods: {
        savePost(){
            this.loading = true;
            this.axios.post(`/dashboard/editNewsPost/${this.$route.params.id}`,{
                title: this.title,
                content: this.content,
                category: this.category.text,
                main_tag: this.main_tag.text,
                tags: this.tags.toString(),
                heroImage: this.heroImage
                }).then(response => {
                    this.$notify({
                    group: "dashboard",
                    title: "News Updated!",
                    type: "success",
                    duration: 30000
                    });
                    this.clear();
                    this.loading = false;
                }).catch(error => {
                    this.$notify({
                    group: "dashboard",
                    title: "News cannot be updated at this time!",
                    type: "error",
                    duration: 30000
                    });
                    this.loading = false;
                })
        },
        goBack(){
            window.location.href = `${window.location.origin}/dashboard#/`;
        },
        remove (item) {
        this.tags.splice(this.tags.indexOf(item), 1);
        this.tags = [...this.tags];
      },
      clear(){
      this.title = '';
      this.category= [];
      this.content= '';
      this.main_tag= [];
      this.tags= [];
      this.heroImage= '';
      }
    }
}
</script>

