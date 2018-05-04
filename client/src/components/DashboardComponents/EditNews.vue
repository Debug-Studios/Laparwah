<template lang="pug">
    #editnews
        v-card
            v-card-title.blue-grey.darken-2.py-4.title
                | Edit News
            v-tabs(v-model="active" color="grey darken-4" dark slider-color="yellow")
                v-tab(ripple) Write News
                v-tab-item
                    v-container.pa-4(grid-list-sm )
                        v-layout(row wrap)
                            v-flex(xs6 align-center justify-space-between)
                                v-text-field(label="Added Title" name='add_title' v-model='title')
                            v-spacer
                            v-flex(xs3)
                                v-select(required :items='tag'  v-model='main_tag' name='add_tag' input-type='text')
                                v-flex(xs12)
                                    v-alert(type='error' v-show='isMainTag == true' transition='scale-transition') Please add Main Tag!
                            v-flex(xs12)
                                v-text-field(required name='add_content' v-model='content' label='Added Content' textarea dark v-on:keyup="parseMarkdown")
                            v-flex(xs8)
                                template
                                    v-select(required flat chips tags solo clearable prepend-icon='filter_list' append-icon='' label='Added Tags' v-model='tags' name='add_tags' input-type='text')
                                        template(slot='selection' slot-scope='data')
                                            v-chip(close @input='remove(data.item)' :selected='data.selected') {{data.item}}
                            v-spacer
                            v-flex(xs12)
                                v-select(required :items='items' v-model='category' name='add_category' input-type='text')
                                v-flex(xs8)
                                    v-alert(type='error' v-show='isCategory == true' transition='scale-transition') Please add Category!
                            v-flex(xs12)
                                v-text-field(required label='Add Image Link' v-model='heroImage' name='add_image')
                            v-flex(xs8)
                                v-text-field(required slot='activator' label='Added Url' v-model='url' name='add_url' disabled)
                        v-card-actions
                            v-spacer
                            v-btn( color='success' @click='savePost' :loading="loading" :disabled="loading" ) Save
                            v-btn( @click='goBack') Cancel

                v-tab(ripple) Preview
                v-tab-item
                    v-container(v-html="htmlContent")

</template>
<script>
import showdown from "showdown";
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
        htmlContent:'',
        active: null,
        isMainTag: false,
        isCategory: false,
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
            if (this.main_tag.text != null && this.category.text != null){
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
            }else{
                if (this.main_tag.text == null) {
                    this.isMainTag = true;
                }
                if (this.category.text == null){
                    this.isCategory = true;
                }
                this.loading= false;
            }
        },
        goBack(){
            window.location.href = `${window.location.origin}/dashboard/#/allnewsadmin`;
        },
        parseMarkdown() {
        let converter = new showdown.Converter();
        this.htmlContent = converter.makeHtml(this.content);
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

