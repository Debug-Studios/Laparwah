<template lang="pug">
  #addnews
    v-card
        v-card-title.grey.darken-4.py-4.title
            | Add News
        v-tabs(v-model="active" color="grey darken-4" dark slider-color="yellow")
          v-tab(ripple) Write News
          v-tab-item
            v-container.pa-4(grid-list-sm )
                v-layout(row wrap)
                    v-flex(xs6 align-center justify-space-between)
                        v-text-field(required label="Add Title" name='add_title' v-model='title' v-validate="'required'" :error-messages="errors.collect('title')" data-vv-name="title")
                    v-spacer
                    v-flex(xs3)
                        v-select(required :items='tag'  v-model='main_tag' name='add_tag' input-type='text' v-validate="'required'" :error-messages="errors.collect('main_tag')" data-vv-name="main_tag")
                    v-flex(xs12)
                        v-text-field(required name='add_content' v-model='content' label='Add Content' textarea dark v-validate="'required'" :error-messages="errors.collect('content')" data-vv-name="content" v-on:keyup="parseMarkdown")
                    v-flex(xs8)
                      template
                        v-select(required flat chips tags solo clearable prepend-icon='filter_list' append-icon='' label='Add Tags' v-model='tags' name='add_tags' input-type='text'  v-validate="'required'" :error-messages="errors.collect('category')" apend-icon='' data-vv-name="tags")
                          template(slot='selection' slot-scope='data')
                            v-chip(close @input='remove(data.item)' :selected='data.selected') {{data.item}}
                    v-spacer
                    v-flex(xs3)
                        v-select(required :items='items' v-model='category' name='add_category' input-type='text'  v-validate="'required'" :error-messages="errors.collect('category')" data-vv-name="category")
                    v-flex(xs12)
                        v-text-field(required label='Add Image Link' v-model='heroImage' name='add_image' v-validate="'required'" :error-messages="errors.collect('heroImage')" data-vv-name="heroImage")
                    v-flex(xs8)
                      v-tooltip(bottom)
                        v-text-field(required slot='activator' label='Add Url' v-model='url' name='add_url' v-validate="'required'" :error-messages="errors.collect('url')" :append-icon='icon' data-vv-name="url")
                        span Url should be in English only!
                      v-flex(xs4)
                        v-alert(type='success' v-show='isUrlUnique == true' transition='scale-transition') Url is Available!
                        v-alert(type='error' v-show='isUrlUnique == false' transition='scale-transition') Url is not Available!
                        v-alert(type='error' v-show='selectCategory == true' transition='scale-transition') Please Select a Category!

                    v-spacer
                    v-flex(xs3)
                      v-btn(:loading='checkLoading' @click='checkAvailability') Check Availability
                v-card-actions
                    v-spacer
                    v-btn( color='success' @click='sendPost' :loading="loading" :disabled="loading" ) Add
                    v-btn( @click='clear') Reset

          v-tab(ripple) Preview
          v-tab-item
            v-container(v-html="htmlContent")

</template>
<script>
import showdown from "showdown";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    _id: "",
    icon: "",
    title: "",
    category: "Politics",
    content: "",
    htmlContent: "",
    main_tag: "Spotlight",
    tags: [],
    heroImage: "",
    url: "",
    generated_url: "",
    loading: false,
    checkLoading: false,
    isUrlUnique: false,
    selectCategory: false,
    active: null,
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
      { text: "Spotlight" },
      { text: "Breaking News" },
      { text: "Live" },
      { text: "Others" }
    ]
  }),

  methods: {
    sendPost() {
      this.loading = true;
      this.checkAvailability();
      this.$validator.validateAll();
      if (this.isUrlUnique) {
        this.axios
          .post("/dashboard/createNewsPost", {
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
      } else {
        console.log("Cannot Add");
        this.loading = false;
        this.$validator.validateAll();
      }
    },

    createUrl() {
      this.url = this.url
        .toLowerCase()
        .split(" ")
        .join("-");
      let date = new Date();
      if (this.category.text != null) {
        this.url = `${date.getDate()}-${date.getMonth()}-${date.getFullYear() +
          1}-${this.category.text.toLowerCase()}-${this.url}`;
      } else {
        this.selectCategory = true;
        this.checkLoading = false;
      }
    },

    clear() {
      this.title = "";
      this.category = [];
      this.content = "";
      this.main_tag = [];
      this.tags = [];
      this.heroImage = "";
      this.url = "";
      this.$validator.reset();
    },
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
    parseMarkdown() {
      let converter = new showdown.Converter();
      this.htmlContent = converter.makeHtml(this.content);
    },
    checkAvailability() {
      this.createUrl();
      this.checkLoading = true;
      if (this.category.text != null) {
        this.axios
          .post("/dashboard/isNewsUrlUnique", {
            url: this.url
          })
          .then(response => {
            console.log(response);
            this.isUrlUnique = response.data;
            if (this.isUrlUnique) {
              this.icon = "check_circle";
            } else {
              this.icon = "do_not_disturb";
            }
            this.checkLoading = false;
          })
          .catch(error => {
            alert("Cannot Check at this time!");
            this.checkLoading = false;
          });
      } else {
        this.selectCategory = true;
        this.checkLoading = false;
      }
    }
  }
};
</script>
