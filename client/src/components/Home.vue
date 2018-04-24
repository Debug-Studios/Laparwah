<template lang="pug">
  v-app
    navbar

    v-jumbotron(style="height: 20vh;")
      v-container(fill-height)
        v-layout(align-center)
          v-flex
            h3.display-3.laparwah-font लापरवाह

    v-toolbar(flat)
      v-toolbar-items
        v-btn(flat) Regions
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
</template>

<script>
import navbar from "./navbar.vue";
export default {
  name: "home",
  components: {
    navbar
  }
};
</script>

<style lang="scss">
.laparwah-font {
  font-family: "Kalam", cursive;
  font-weight: bolder;
}
</style>
