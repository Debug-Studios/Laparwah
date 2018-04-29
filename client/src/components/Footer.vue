<template lang="pug">
  v-footer(height="auto" dark)
    v-layout(row wrap justify-center)
      v-flex(xs12 pt-2 pb-0 text-xs-center white--text).grey.darken-3
        v-btn(fab flat small)
          v-avatar(size="32")
            img(src='/icons/facebook.svg')
        v-btn(fab flat small)
          v-avatar(size="32")
            img(src='/icons/twitter.svg')

      v-flex(xs12 pb-2 text-xs-center white--text).grey.darken-3
        v-btn(color="white" flat)
          router-link(:to="'/'").plain Home
        v-btn(color="white" flat)
          router-link(:to="'/about'").plain About Us
        v-btn(color="white" flat)
          router-link(:to="'/team'").plain Team
        v-btn(color="white" flat)
          router-link(:to="'/team'").plain Contact-Us

      v-flex(xs12 py-4 text-xs-center white--text).black

        | &copy;2018 —&nbsp;
        | Made with&nbsp;
        b(style="color:#f42") ♥&nbsp;
        | by&nbsp;
        strong Debug Studios

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


