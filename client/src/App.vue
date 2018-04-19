<template lang="pug">
  #app
    nav
      router-link(to="/login") Login

    router-view
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>


<style lang="scss">
@import "./scss/main.scss";
</style>



