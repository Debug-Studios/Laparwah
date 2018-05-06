<template lang="pug">
  v-app

    notifications(group="main" position="bottom" width="100%")
      template(slot="body" slot-scope="props")
        v-snackbar(:timeout="10000" :color="props.item.type" :value="true") {{props.item.title}}

    navbar#navbar

    transition(name="fade" mode="out-in")
      router-view(:key="$route.fullPath")

    v-speed-dial(v-model="fab" dark fixed bottom right transition="slide-y-transition" direction="top")
      v-btn(color="deep-orange accent-2" slot="activator" v-model="fab" hover dark fab)
        v-icon view_list
        v-icon close
      v-btn(fab dark small color="blue accent-2" @click="$vuetify.goTo('#navbar')")
        v-icon keyboard_arrow_up
      v-btn(fab dark small color="amber darken-2" href="/")
        v-icon home

    footer_custom

</template>

<script>
import footer_custom from "./components/Footer.vue";
import navbar from "./components/Navbar.vue";
export default {
  name: "app",
  components: {
    footer_custom,
    navbar
  },
  data() {
    return {};
  }
};
</script>


<style lang="scss">
@import "./scss/main.scss";
@import url("https://fonts.googleapis.com/css?family=Kalam");
</style>



