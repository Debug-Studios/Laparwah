<template lang="pug">
    #editnews
        v-container(fluid grid-list-sm)
            v-layout(row wrap)
                v-flex(xs4)
                    v-card
                        v-card-media#media
                            v-flex.text-xs-center
                                v-avatar(size='180px')
                                    v-gravatar(:email= 'userDetails.email' :size='200')
                        v-divider
                        v-card-title
                            div
                                h3 {{userDetails.name}}
                                h4 Email: {{userDetails.email}}
                        v-card-actions
                            v-spacer
                            v-btn(@click='' color='success' flat ) Edit
                            v-btn(@click='' color='success' flat ) Remove User

</template>
<script>
export default {
  data: () => ({
      userDetails: [],
      id: ''
  }),
  mounted(){
      this.axios.get(`/dashboard/editAccount/${id}`).then((response) => {
          console.log(response);
          this.userDetails = response.data;
      });
  }
}
</script>

