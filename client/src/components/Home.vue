<template lang="pug">
  v-app
    navbar

    v-jumbotron
      v-container
        v-layout
          v-flex(text-xs-center)
            h3.display-3 Laaparwah
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

