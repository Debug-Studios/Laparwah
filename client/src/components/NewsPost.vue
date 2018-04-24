<template lang="pug">
  v-app
    navbar

    v-container
      h1.display-3 Russia ramps up pressure on Trump to honor Iran nuclear deal
      span

</template>

<script>
import navbar from "./Navbar.vue";
export default {
  name: "newspost",
  components: {
    navbar
  },
  data() {
    return {
      route: ""
    };
  },
  created() {
    this.route = this.$route.params.id;
  }
};
</script>
