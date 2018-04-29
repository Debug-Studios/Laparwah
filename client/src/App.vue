<template lang="pug">
  v-app
    notifications(group="dashboard" position="bottom" width="100%")
      template(slot="body" slot-scope="props")
        v-snackbar(:timeout="10000" :color="props.item.type" :value="true") {{props.item.title}}

    router-view(:key="$route.fullPath")
    footer_custom

</template>

<script>
import footer_custom from "./components/Footer.vue";
export default {
  name: "app",
  components: {
    footer_custom
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



