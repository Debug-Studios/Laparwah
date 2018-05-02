<template lang="pug">
    #editnews
        v-card
            v-card-title.blue-grey.darken-2.py-4.title
                | Edit News
            v-container.pa-4(grid-list-sm )
                v-layout(row wrap)
                    v-flex(xs6 align-center justify-space-between)
                        v-text-field(label="Title" name='add_title' v-model='title')
                    v-spacer
                    v-flex(xs3)
                        v-text-field(label='Applied Tag' v-model='main_tag' name='add_tag')
                    v-flex(xs12)
                        v-text-field(name='add_content' v-model='content' label='Content' textarea dark)
                    v-flex(xs6)
                        v-text-field(label='Applied Tags' v-model='tags' name='add_tags')
                    v-spacer
                    v-flex(xs3)
                        v-text-field(label='Applied Category' v-model='category' name='add_category')
                    v-flex(xs12)
                        v-text-field(label='Added Image Link' v-model='heroImage' name='add_image')
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
        category:'',
        content:'',
        main_tag:'',
        tags:'',
        heroImage:'',
        loading: false,
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
        this.news = (await this.axios.get(`/dashboard/editOwnNewsPost/${this.$route.params.id}`)).data;
             this.title = this.news.title;
             this.category = this.news.category;
             this.content  = this.news.content;
             this.main_tag = this.news.main_tag;
             this.tags = this.news.tags;
             this.heroImage = this.news.heroImage;
    },
    methods: {
        savePost(){
            this.loading = true;
            this.axios.post(`/dashboard/editOwnNewsPost/${this.$route.params.id}`,{
                title: this.title,
                content: this.content,
                category: this.category,
                main_tag: this.main_tag,
                tags: this.tags,
                heroImage: this.heroImage
                }).then(response => {
                    this.$notify({
                    group: "dashboard",
                    title: "News Updated!",
                    type: "success",
                    duration: 30000
                    });
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
        }
    }
}
</script>

