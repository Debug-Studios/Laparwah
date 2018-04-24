<template lang="pug">
  v-app
    navbar
</template>


<script>
import navbar from "./Navbar.vue";

export default {
  name: "author",
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

<style lang="scss" scoped>
a.plain {
  text-decoration: none;
}
</style>