<template lang="pug">
  v-app
    navbar

    v-jumbotron(src="https://images.pexels.com/photos/314860/pexels-photo-314860.jpeg?cs=srgb&dl=clouds-cold-evening-314860.jpg&fm=jpg" dark)#laparwah-header
      v-container(fill-height)
        v-layout(align-center)
          v-flex
            h3.display-3.laparwah-font लापरवाह

    v-toolbar(flat)
      v-toolbar-items
        v-btn(flat) Today
        v-btn(flat) Politics
        v-btn(flat) Money
        v-btn(flat) Entertainment
        v-btn(flat) Tech
        v-btn(flat) Sport
        v-btn(flat) Travel
        v-btn(flat) Style
        v-btn(flat) Health
        v-btn(flat) Culture
        v-btn(flat) Video
      v-spacer
      v-toolbar-items
        v-text-field(name="search", label="Search", append-icon="search")

    v-layout(column)
      v-flex(xs12 sm12)
        v-card
          v-container(fluid grid-list-md)
            v-layout(row wrap).mt-1
              v-flex(xs12 md8 style="display: flex;" v-if="breakingNews[0]")
                v-jumbotron(:src="breakingNews[0].heroImage" dark :gradient="gradients[0]" height="100%")
                  v-container(fill-height)
                      v-layout(fill-height)
                        v-flex.breaking-flex(xs12 align-end flexbox dark)
                          v-chip(label color="red" text-color="white") BREAKING NEWS
                          v-flex.breaking-flex--text
                            .display-2(style="font-weight: 800") {{breakingNews[0].title}}
                            span.subheading.mt-2.grey--text.text--lighten-1.ml-1
                              span by {{breakingNews[0].creator.name}}
                              v-icon(left color="grey").mr-1.ml-2 schedule
                              span {{breakingNews[0].created_at | moment("dddd, MMMM Do YYYY")}}
              v-flex(xs12 md4)
                v-flex(xs12 style="display: flex;" v-if="breakingNews[1]").pt-0.pr-0
                  v-jumbotron(:src="breakingNews[1].heroImage" dark :gradient="gradients[1]" style="height:20rem")
                    v-container(fill-height)
                        v-layout(fill-height)
                          v-flex.breaking-flex(xs12 align-end flexbox dark)
                            v-chip(label color="red" text-color="white") BREAKING NEWS
                            v-flex.breaking-flex--text
                              .headline(style="font-weight: 800") {{breakingNews[1].title}}
                              span.body-2.mt-2.grey--text.text--lighten-1.ml-1
                                span by {{breakingNews[1].creator.name}}
                                v-icon(left color="grey").mr-1.ml-2 schedule
                                span {{breakingNews[1].created_at | moment("dddd, MMMM Do YYYY")}}
                v-flex(xs12 style="display: flex;" v-if="breakingNews[2]").pb-0.pr-0
                  v-jumbotron(:src="breakingNews[2].heroImage" dark :gradient="gradients[1]"  style="height:20rem")
                    v-container(fill-height)
                        v-layout(fill-height)
                          v-flex.breaking-flex(xs12 align-end flexbox dark)
                            v-chip(label color="red" text-color="white") BREAKING NEWS
                            v-flex.breaking-flex--text
                              .headline(style="font-weight: 800") {{breakingNews[2].title}}
                              span.body-2.mt-2.grey--text.text--lighten-1.ml-1
                                span by {{breakingNews[2].creator.name}}
                                v-icon(left color="grey").mr-1.ml-2 schedule
                                span {{breakingNews[2].created_at | moment("dddd, MMMM Do YYYY")}}

            v-layout(row).px-5.pt-5
              v-flex(xs12 sm12)
                h3.headline(style="font-weight: 800").primary--text SPOTLIGHT
                .py-4(fluid grid-list-lg)
                  v-layout(row wrap)
                    v-flex(xs12 md3 v-for="(news, index) in spotlights" :key="news._id")
                      v-card(flat)
                        v-card-media(:src="news.heroImage" height="10rem" cover)
                        v-card-title(primary-title).px-0
                          div
                            h3.title.ml-1.mb-2 {{news.title}}
                            span.body-2.mt-2.grey--text.text--lighten-1.ml-1
                              span by {{news.creator.name}}
                              v-icon(left color="grey").mr-1.ml-2 schedule
                              span {{news.created_at | moment("from", "now")}}

            v-layout(row).px-5
              v-flex(xs4 sm12)
                h3.headline(style="font-weight: 800").primary--text Politics
              v-flex(xs4 sm12)
                h3.headline(style="font-weight: 800").primary--text Money
              v-flex(xs4 sm12)
                h3.headline(style="font-weight: 800").primary--text Entertainment


</template>

<script>
import navbar from "./Navbar.vue";
import { newExpression } from "babel-types";
export default {
  name: "home",
  components: {
    navbar
  },
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
    ]
  }),
  mounted() {
    // Get one breaking news
    this.axios.get("/news/getBreaking/3").then(response => {
      this.breakingNews = response.data;
    });

    // Get spotlights
    this.axios.get("/news/getSpotlights/8").then(response => {
      this.spotlights = response.data;
    });
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

  &--text {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }
}

#laparwah-header {
  height: 20vh !important;
}
</style>

<style lang="scss">
.jumbotron__image {
  min-height: 100%;
}
</style>

