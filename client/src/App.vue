<template lang="pug">
  router-view
</template>

<script>
import navbar from "./components/navbar.vue";
import dashboard from "./components/dashboard.vue";

export default {
  name: "app",
  data() {
    return {};
  }
};
</script>


<style lang="scss">
@import "./scss/main.scss";
@import url("https://fonts.googleapis.com/css?family=Kalam");
</style>



