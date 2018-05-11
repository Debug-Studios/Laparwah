<template lang="pug">
  v-app

    notifications(group="main" position="bottom" width="100%")
      template(slot="body" slot-scope="props")
        v-snackbar(:timeout="10000" :color="props.item.type" :value="true") {{props.item.title}}

    navbar#navbar

    transition(name="fade" mode="out-in")
      router-view(:key="$route.fullPath")

    v-speed-dial(dark fixed bottom right transition="slide-y-transition" direction="top")
      v-btn(color="deep-orange accent-2" slot="activator" hover dark fab @click="$emit('show-loading')")
        v-icon view_list
        v-icon close
      v-btn(fab dark small color="blue accent-2" @click="$vuetify.goTo('#navbar')")
        v-icon keyboard_arrow_up
      v-btn(fab dark small color="amber darken-2" href="/")
        v-icon home

    transition(name="fade")
      .spinner-container(v-show="isLoading")
        semipolar-spinner(:animation-duration="2000", :size="128" )

    footer_custom

</template>

<script>
import footer_custom from "./components/Footer.vue";
import navbar from "./components/Navbar.vue";
import { SemipolarSpinner } from "epic-spinners";
import { EventBus } from "./eventbus.js";

export default {
  name: "app",
  components: {
    footer_custom,
    navbar,
    SemipolarSpinner
  },
  data() {
    return {
      isLoading: false
    };
  },
  created() {
    EventBus.$on("show-loading", () => {
      this.isLoading = true;
    });

    EventBus.$on("hide-loading", () => {
      this.isLoading = false;
    });
  }
};
</script>


<style lang="scss">
@import "./scss/main.scss";
@import url("https://fonts.googleapis.com/css?family=Kalam");

.spinner-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background-color: rgba(black, 0.8);
  transition: all 400ms;
}
.semipolar-spinner {
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>



