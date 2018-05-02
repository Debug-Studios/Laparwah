<template lang="pug">
  #addnews
    v-card
        v-card-title.blue-grey.darken-2.py-4.title
            | Add News
        v-container.pa-4(grid-list-sm )
            v-layout(row wrap)
                v-flex(xs6 align-center justify-space-between)
                     v-text-field(required label="Add Title" name='add_title' v-model='title' v-validate="'required'" :error-messages="errors.collect('title')")
                v-spacer
                v-flex(xs3)
                    v-select(required :items='tag' label='Select Main Tag' v-model='main_tag' name='add_tag' input-type='text' v-validate="'required'" :error-messages="errors.collect('main_tag')")
                v-flex(xs12)
                    v-text-field(required name='add_content' v-model='content' label='Add Content' textarea dark v-validate="'required'" :error-messages="errors.collect('content')")
                v-flex(xs8)
                  template
                    v-select(required flat chips tags solo clearable prepend-icon='filter_list' append-icon='' label='Add Tags' v-model='tags' name='add_tags' input-type='text'  v-validate="'required'" :error-messages="errors.collect('category')" apend-icon='')
                      template(slot='selection' slot-scope='data')
                        v-chip(close @input='remove(data.item)' :selected='data.selected') {{data.item}}
                v-spacer
                v-flex(xs3)
                    v-select(required :items='items' label='Select Category' v-model='category' name='add_category' input-type='text'  v-validate="'required'" :error-messages="errors.collect('category')")
                v-flex(xs12)
                    v-text-field(required label='Add Image Link' v-model='heroImage' name='add_image' v-validate="'required'" :error-messages="errors.collect('heroImage')")
            v-card-actions
                v-spacer
                v-btn( color='success' @click='sendPost' :loading="loading" :disabled="loading" ) Add
                v-btn( @click='clear') Reset
</template>
<script>
export default {
   $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    _id: "",
    title: "",
    category: [],
    content: "",
    main_tag: [],
    tags: [],
    heroImage: "",
    url: "",
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
  }),

  methods: {
    sendPost() {
      this.loading = true;
      this.$validator.validateAll();
      this.createUrl();
      this.axios.post("/dashboard/createNewsPost", {
          _id: this._id,
          title: this.title,
          content: this.content,
          category: this.category.text,
          tags: this.tags.toString(),
          main_tag: this.main_tag.text,
          heroImage: this.heroImage,
          url: this.url
        })
        .then(response => {
          this.$notify({
            group: "dashboard",
            title: "Your News is added Successfully!",
            type: "success",
            duration: 30000
          });
          this.clear();
          this.loading = false;
        })
        .catch(error => {
          this.$notify({
            group: "dashboard",
            title: "Unable to add news",
            type: "error",
            duration: 30000
          });
          this.loading = false;
        });
    },

    createUrl() {
      let urltitle = this.title;
      urltitle = urltitle
        .toLowerCase()
        .split(" ")
        .join("-");
      let date = new Date();
      this.url = `${date.getDate()}-${date.getMonth()}-${date.getFullYear() +
        1}-${this.category.text.toLowerCase()}-${urltitle}`;
    },

    clear(){
      this.title = '';
      this.category= '';
      this.content= '';
      this.main_tag= '';
      this.tags= '';
      this.heroImage= '';
      this.$validator.reset();
      },
      remove (item) {
        this.tags.splice(this.tags.indexOf(item), 1);
        this.tags = [...this.tags];
      }
  }
};
</script>
