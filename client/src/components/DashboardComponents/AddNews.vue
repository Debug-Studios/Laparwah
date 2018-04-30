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
                    v-select(:items='tag' label='Select Main Tag' v-model='main_tag' name='add_tag' input-type='text')
                v-flex(xs12)
                    v-text-field(name='add_content' v-model='content' label='Add Content' textarea dark)
                v-flex(xs6)
                    v-text-field(label='Apply Tags' v-model='tags' name='add_tags')
                v-spacer
                v-flex(xs3)
                    v-select(:items='items' label='Select Category' v-model='category' name='add_category' input-type='text')
                v-flex(xs12)
                    v-text-field(label='Add Image Link' v-model='heroImage' name='add_image')
            v-card-actions
                v-spacer
                v-btn( color='success' @click='sendPost' ) Add
                v-btn( type='reset') Reset
</template>
<script>
export default {
  data: () => ({
    _id: '',
    title: '',
    category: [],
    content: '',
    main_tag: [],
    tags: '',
    heroImage: '',
    url: '',
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
    tag: [
      { text: "Breaking News" },
      { text: "Spotlight" },
      { text: "Live" },

    ]
  }),

  methods: {
    sendPost() {
      this.createUrl();
      this.axios
        .post("/dashboard/createNewsPost", {
          _id: this._id,
          title: this.title,
          content: this.content,
          category: this.category.text,
          tags: this.tags,
          main_tag: this.main_tag.text,
          heroImage: this.heroImage,
          url: this.url
        })
        .then((response) => {
                  this.$notify({
                  group: "dashboard",
                  title: "Your News is added Successfully!",
                  type: "success",
                  duration: 30000
                  });
        })
        .catch((error) =>{
                this.$notify({
                group: "dashboard",
                title: "Unable to add news",
                type: "success",
                duration: 30000
                });
        });
    },

    createUrl(){
      let urltitle = this.title;
      urltitle = urltitle.toLowerCase().split("").join("-");
      let date = new Date();
      this.url = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()+1}/${urltitle}`;
    }
  }
};
</script>
