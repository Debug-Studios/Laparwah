<template lang="pug">
  v-app


    v-jumbotron(src="https://images.pexels.com/photos/314860/pexels-photo-314860.jpeg?cs=srgb&dl=clouds-cold-evening-314860.jpg&fm=jpg" dark)#laparwah-header
      v-container(fill-height)
        v-layout(align-center)
          v-flex
            h3.display-3.laparwah-font लापरवाह

    v-toolbar(flat style="z-index: 100").hidden-sm-and-down#news-toolbar
      v-toolbar-items
        v-btn(flat @click="$vuetify.goTo('#today', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Today
        v-btn(flat @click="$vuetify.goTo('#Politics', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Politics
        v-btn(flat @click="$vuetify.goTo('#Money', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Money
        v-btn(flat @click="$vuetify.goTo('#Entertainment', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Entertainment
        v-btn(flat @click="$vuetify.goTo('#Tech', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Tech
        v-btn(flat @click="$vuetify.goTo('#Sport', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Sport
        v-btn(flat @click="$vuetify.goTo('#Travel', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Travel
        v-btn(flat @click="$vuetify.goTo('#Style', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Style
        v-btn(flat @click="$vuetify.goTo('#Health', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Health
        v-btn(flat @click="$vuetify.goTo('#Culture', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Culture
        v-btn(flat @click="$vuetify.goTo('#Today', {duration: 500, offset: 200, easing: 'easeInOutQuad'})") Video
      v-spacer
      v-toolbar-items
        v-text-field(name="search", label="Search", append-icon="search")

    v-layout(column)
      v-flex(xs12 sm12)
        v-card
          v-container(fluid grid-list-md)
            v-layout(row wrap).mt-1
              v-flex(xs12 md8 style="display: flex;" v-if="breakingNews[0]")
                router-link(:to="'/news/' + breakingNews[0].url" style="width=100%").plain.full-width
                  v-jumbotron(:src="breakingNews[0].heroImage" dark :gradient="gradients[0]" height="100%")
                    v-container(fill-height)
                        v-layout(fill-height)
                          v-flex.breaking-flex(xs12 align-end flexbox dark)
                            v-chip(label color="red" text-color="white") BREAKING NEWS
                            v-flex.breaking-flex--text
                              .display-2(style="font-weight: 800") {{breakingNews[0].title}}
                              span.subheading.mt-2.grey--text.text--lighten-1.ml-1
                                span.span-bottom by {{breakingNews[0].creator.name}}
                                v-icon(left color="grey").mr-1.ml-2 schedule
                                span.span-bottom {{breakingNews[0].created_at | moment("dddd, MMMM Do YYYY")}}
                                v-icon(left color="grey").mr-2.ml-4 thumb_up
                                span.span-bottom {{breakingNews[0].stats.likes}}
              v-flex(xs12 md4)
                v-flex(xs12 style="display: flex;" v-if="breakingNews[1]").pt-0.px-0
                  router-link(:to="'/news/' + breakingNews[1].url").plain
                    v-jumbotron(:src="breakingNews[1].heroImage" dark :gradient="gradients[1]" style="height:20rem")
                      v-container(fill-height)
                          v-layout(fill-height)
                            v-flex.breaking-flex(xs12 align-end flexbox dark)
                              v-chip(label color="red" text-color="white") BREAKING NEWS
                              v-flex.breaking-flex--text
                                .headline(style="font-weight: 800") {{breakingNews[1].title}}
                                span.body-2.mt-2.grey--text.text--lighten-1.ml-1
                                  span.span-bottom by {{breakingNews[1].creator.name}}
                                  v-icon(left color="grey").mr-1.ml-2 schedule
                                  span.span-bottom {{breakingNews[1].created_at | moment("dddd, MMMM Do YYYY")}}
                                  v-icon(left color="grey").mr-2.ml-3 thumb_up
                                  span.span-bottom {{breakingNews[1].stats.likes}}
                v-flex(xs12 style="display: flex;" v-if="breakingNews[2]").pb-0.px-0
                  router-link(:to="'/news/' + breakingNews[2].url").plain
                    v-jumbotron(:src="breakingNews[2].heroImage" dark :gradient="gradients[1]"  style="height:20rem")
                      v-container(fill-height)
                          v-layout(fill-height)
                            v-flex.breaking-flex(xs12 align-end flexbox dark)
                              v-chip(label color="red" text-color="white") BREAKING NEWS
                              v-flex.breaking-flex--text
                                .headline(style="font-weight: 800") {{breakingNews[2].title}}
                                span.body-2.mt-2.grey--text.text--lighten-1.ml-1
                                  span.span-bottom by {{breakingNews[2].creator.name}}
                                  v-icon(left color="grey").mr-1.ml-2 schedule
                                  span.span-bottom {{breakingNews[2].created_at | moment("dddd, MMMM Do YYYY")}}
                                  v-icon(left color="grey").mr-2.ml-3 thumb_up
                                  span.span-bottom {{breakingNews[2].stats.likes}}

          v-container(fluid grid-list-xl).pa-0#today
            v-layout(row).px-5#spotlight-layout
              v-flex(xs12 sm12)
                h3.headline(style="font-weight: 800").primary--text SPOTLIGHT
                .py-4(fluid grid-list-lg)
                  v-layout(row wrap)
                    v-flex(xs12 md3 v-for="(news, index) in spotlights" :key="news._id")
                      router-link(:to="'/news/' + news.url").plain
                        v-card(flat)
                          v-card-media(:src="news.heroImage" height="10rem" cover)
                          v-card-title(primary-title).px-0
                            div
                              h3.title.ml-1.mb-2 {{news.title}}
                              span.body-2.mt-2.grey--text.text--lighten-1.ml-1
                                span.span-bottom by {{news.creator.name}}
                                v-icon(left color="grey").mr-1.ml-2 schedule
                                span.span-bottom {{news.created_at | moment("from", "now")}}


            v-layout(row wrap grid-list-xl).px-5#other-news-layout
              v-flex(md4 sm12 v-for="(category, index1) in newsCategories" :key="index1")
                h3.headline(style="font-weight: 800" :id="category").primary--text {{category}}
                div(v-if="newsCategoriesData" v-for="(newsPosts, index2) in newsCategoriesData" :key="index2")
                  div(xs12 style="display: flex;" v-if="index2 == index1" v-for="(news, index3) in newsPosts" :key="news._id")
                    v-jumbotron.py-4(:src="news.heroImage" dark :gradient="gradients[1]" height="16rem" v-if="index3 == 0")
                      router-link(:to="'/news/' + news.url").plain
                        v-container(fill-height).py-1
                            v-layout(fill-height)
                              v-flex.breaking-flex(xs12 align-end flexbox dark).pb-0.pt-0
                                v-chip(label color="red" text-color="white").pt-0 {{news.category}}
                                v-flex.breaking-flex--text
                                  .title(style="font-weight: 800") {{news.title}}
                                  span.body-2.grey--text.text--lighten-1.pb-0
                                    span {{news.created_at | moment("from", "now")}}
                    router-link(:to="'/news/' + news._id" v-else style="width: 100%").pt-3.plain.pb-2
                      v-layout(grid row style="align-items: center").pb-3.mx-0
                        .red--text.mr-2(xs1 style="font-size: 6px;") &#9679;
                        .body-2.black--text.grey--text.text--darken-3(xs11 style="font-weight: 400") {{news.title}}
                      v-divider(light)

</template>

<script>
import { newExpression } from "babel-types";
import stickybits from "stickybits";
import { EventBus } from "../eventbus.js";
export default {
  name: "home",

  data: () => ({
    breakingNews: [],
    spotlights: [],
    spotlightColors: [
      "cyan darken-2",
      "blue darken-2",
      "green darken-2",
      "orange darken-1",
      "blue-grey darken-2"
    ],
    gradients: [
      "to bottom, rgba(36,36,62,0.4), rgba(51,51,51,1)",
      "to bottom, rgba(0,0,0,0), rgba(0,0,0,1)"
    ],
    newsCategories: [
      "Politics",
      "Money",
      "Entertainment",
      "Tech",
      "Sport",
      "Travel",
      "Style",
      "Health",
      "Culture"
    ],
    newsCategoriesData: []
  }),
  created() {
    document.title = "Home";
  },
  async mounted() {
    stickybits("#news-toolbar");

    EventBus.$emit("show-loading");

    // Apply responsive padding
    if (screen.width < 800) {
      document.getElementById("other-news-layout").classList.remove("px-5");
      document.getElementById("spotlight-layout").classList.remove("px-5");
      document.getElementById("other-news-layout").classList.add("px-2");
      document.getElementById("spotlight-layout").classList.add("px-2");
    } else {
      document.getElementById("other-news-layout").classList.remove("px-2");
      document.getElementById("spotlight-layout").classList.remove("px-2");
      document.getElementById("other-news-layout").classList.add("px-5");
      document.getElementById("spotlight-layout").classList.add("px-5");
    }

    this.breakingNews = (await this.axios.get("/news/getBreaking/3")).data;
    EventBus.$emit("hide-loading");
    this.spotlights = (await this.axios.get("/news/getSpotlights/8")).data;
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getPolitics/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getMoney/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getEntertainment/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getTech/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getSport/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getTravel/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getStyle/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getHealth/6")).data
    );
    this.newsCategoriesData.push(
      (await this.axios.get("/news/getCulture/6")).data
    );
  }
};
</script>

<style lang="scss" scoped>
.laparwah-font {
  font-family: "Kalam", cursive;
  font-weight: bolder;
}

.card__media__background {
  filter: brightness(90%);
  -webkit-filter: brightness(90%);
}

a.plain {
  text-decoration: none;
  color: white;
}

a.plain.title {
  text-align: justify;
  font-weight: 300;
}

.breaking-flex {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  width: 100%;

  &--text {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }
}

#laparwah-header {
  height: 20vh !important;
}

.span-bottom {
  vertical-align: bottom;
}
</style>

<style lang="scss">
.jumbotron__image {
  min-height: 100%;
}

.full-width {
  width: 100%;
}
</style>

