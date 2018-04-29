<template lang="pug">
  v-footer(height="auto" dark)
    v-layout(row wrap justify-center)
      v-btn(color="white" flat)
        router-link(:to="'/'").plain Home
      v-btn(color="white" flat)
        router-link(:to="'/about'").plain About Us
      v-btn(color="white" flat)
        router-link(:to="'/team'").plain Team

      v-flex(xs12 py-3 text-xs-center white--text)
        | &copy;2018 —&nbsp;
        strong Laparwah and Debug Studios
</template>

<script>
export default {
  name: "footer_custom"
};
</script>

<style lang="scss">
a.plain {
  text-decoration: none;
  color: white;
}
</style>


