<template lang="pug">
  v-app
    notifications(group="dashboard" position="bottom" width="100%")
      template(slot="body" slot-scope="props")
        v-snackbar(:timeout="props.item.duration" :color="props.item.type" :value="true") {{props.item.title}}


    router-view

</template>

<script>
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



