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
                v-card
                  v-card-media(src="https://cdn.cnn.com/cnnnext/dam/assets/180413094214-merker-macron-may-exlarge-169.jpg" height="400px")
                    v-container(fill-height)
                      v-layout(fill-height)
                        v-flex(xs12 align-end flexbox)
                          v-chip(label color="red" text-color="white") BREAKING NEWS
                  v-card-title(primary-title)
                    div
                      h3.headline Trump Under Pressure on Iran Deal
                      span.subheading.grey--text.text--darken-2 April 20, 2018
              v-flex(md4 xs12 sm12)
                h3.headline.text-xs-center SPOTLIGHT
                v-divider
                v-container(fluid grid-list-lg style="min-height: 0;")
                  v-layout(row wrap)
                    v-flex(xs12)
                      v-card(color="cyan darken-2" class="white--text")
                        v-container(fluid grid-list-lg)
                          v-layout(row)
                            v-flex(xs5)
                              v-card-media(src="https://thewire.in/wp-content/uploads/2017/03/Arun-jaitley-pti.jpg", height="100%" contain)
                            v-flex(xs7)
                              a.plain.title Allow us to jog your memory, Mr. Jaitley
                              .subheading.mt-1 April, 2018

                    v-flex(xs12)
                      v-card(color="blue-grey darken-2" class="white--text")
                        v-container(fluid grid-list-lg)
                          v-layout(row)
                            v-flex(xs5)
                              v-card-media(src="https://thewire.in/wp-content/uploads/2017/04/Aseemanand-PTI.png", height="100%" contain)
                            v-flex(xs7)
                              a.plain.title I Am Waiting for the Right Moment to Strike.
                              .subheading.mt-1 April, 2018

                    v-flex(xs12)
                      v-card(color="grey darken-2" class="white--text")
                        v-container(fluid grid-list-lg)
                          v-layout(row)
                            v-flex(xs5)
                              v-card-media(src="https://cdn.thewire.in/wp-content/uploads/2018/04/18174016/CJI-court-1024x541.jpg", height="100%" contain)
                            v-flex(xs7)
                              a.plain.title We Have Always Deprecated Restraints on Free Speech, Says SC
                              .subheading.mt-1 April, 2018


</template>

<script>
import navbar from "./Navbar.vue";
export default {
  name: "home",
  components: {
    navbar
  },
  data: () => ({})
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
