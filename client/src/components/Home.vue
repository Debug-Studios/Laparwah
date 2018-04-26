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
            v-layout(row wrap).mt-2
              v-flex(md7 xs12 sm12).mx-5
                v-card(v-if="breakingNews")
                  v-card-media(:src="breakingNews.heroImage" height="400px")
                    v-container(fill-height)
                      v-layout(fill-height)
                        v-flex(xs12 align-end flexbox)
                          v-chip(label color="red" text-color="white") BREAKING NEWS
                  v-card-title(primary-title)
                    div
                      h3.headline {{breakingNews.title}}
                      span.subheading.grey--text.text--darken-2 {{breakingNews.created_at | moment("dddd, MMMM Do YYYY")}}
              v-flex(md4 xs12 sm12)
                h3.headline.text-xs-center SPOTLIGHT
                v-divider
                v-container(fluid grid-list-sm)
                  v-layout(row wrap )
                    v-flex(xs6 md12 v-for="(news, index) in spotlights" :key="news._id")
                      v-card(:color="spotlightColors[index]" class="white--text")
                        v-container(fluid grid-list-lg)
                          v-layout(row)
                            v-flex(xs5)
                              v-card-media(:src="news.heroImage", height="100%" contain)
                            v-flex(xs7)
                              a.plain.title {{news.title}}
                              .subheading.mt-1 {{news.created_at | moment("dddd, MMMM Do YYYY")}}


</template>

<script>
import navbar from "./Navbar.vue";
export default {
  name: "home",
  components: {
    navbar
  },
  data: () => ({
    breakingNews: {},
    spotlights: [],
    spotlightColors: [
      "cyan darken-2",
      "blue darken-2",
      "green darken-2",
      "orange darken-1",
      "blue-grey darken-2"
    ]
  }),
  mounted() {
    // Get one breaking news
    this.axios.get("/news/getBreaking/1").then(response => {
      this.breakingNews = response.data[0];
    });

    // Get spotlights
    this.axios.get("/news/getSpotlights/5").then(response => {
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

#laparwah-header {
  height: 20vh !important;
}
</style>
