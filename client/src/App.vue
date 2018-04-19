<template lang="pug">
  #app
    <navbar/>
    router-view
</template>

<script>
import navbar from './components/navbar.vue'
export default {
  name: 'app',
  components:{
    navbar
  },
  data() {
    return {};
  }
};
</script>


<style lang="scss">
@import "./scss/main.scss";
</style>



