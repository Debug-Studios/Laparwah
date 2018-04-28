<template lang="pug">
  v-footer(height="auto").black
    v-layout(row wrap justify-center)
      v-btn(color="white" flat) Home
      v-btn(color="white" flat) About Us
      v-btn(color="white" flat) Team
      v-btn(color="white" flat) Services
      v-flex(xs12 py-3 text-xs-center white--text)
        | &copy;2018 —
        strong Laparwah
</template>

<script>
export default {
  name: "footer_custom"
};
</script>

