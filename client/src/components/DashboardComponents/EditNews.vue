<template lang="pug">
    #editnews
        v-card
            v-card-title.blue-grey.darken-2.py-4.title
                | Edit News
            v-container.pa-4(grid-list-sm )
                v-layout(row wrap)
                    v-flex(xs6 align-center justify-space-between)
                        v-text-field(label="Add Title" name='add_title' v-model='title')
                    v-spacer
                    v-flex(xs3)
                        v-text-field(label="Add Title" name='add_title' v-model='title')
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
                    v-btn( color='success' @click='sendPost' ) Save
                    v-btn( type='reset') Cancel
</template>
<script>
export default {
    data: () =>({
        newsPost: []
    }),
    mounted(){
        this.axios.get('/dashboard/editNewsPost/').then((response) => {
            console.log(response);
        })
    }
}
</script>

