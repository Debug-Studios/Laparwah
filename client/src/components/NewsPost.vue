<template lang="pug">
  v-app
    navbar

    h1 {{route}}

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
