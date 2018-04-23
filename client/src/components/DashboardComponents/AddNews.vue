<template lang="pug">
  #addnews
    v-card(color='grey lighten-4 flat')
        v-card-text
            v-header Add News
            v-container(fluid)
                v-layout(row)
                    v-flex(xs12)
                        v-text-feild(name='input-1' label='Add News' textarea)
        v-card-action
            v-spacer
                v-btn Add
                v-btn Cancel
    
</template>
