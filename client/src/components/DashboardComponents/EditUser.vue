<template lang="pug">
    #editnews
        v-container(fluid grid-list-sm)
            v-layout(row wrap)
                v-flex(xs4)
                    v-card
                        v-card-media#media
                            v-flex.text-xs-center
                                v-avatar(size='180px')
                                    v-gravatar(:email= 'acc.email' :size='200')
                        v-divider
                        v-card-title
                            v-flex(xs12)
                                h3 Name:{{acc.name}}
                                h4 Email: {{acc.email}}
                            v-flex(xs12)
                                v-switch(label='Admin' v-model='role' value='admin')
                                v-switch(label='Writer' v-model='role' value='writer')
                                v-switch(label='Editor' v-model='role' value='editor')
                                v-switch(label='User' v-model='role' value='user')

                        v-card-actions
                            v-spacer
                            v-btn(@click='' color='success' flat ) Save
                            v-btn(@click='' color='red' flat ) Cancel

</template>
<script>
export default {
  data: () => ({
      acc: {},
      role: ['user'],
      id: ''
  }),
  mounted(){
      console.log(this.role);
      this.axios.get(`/dashboard/editAccount/${id}`).then((response) => {
          console.log(response);
          this.acc = response.data;
      });
  }
}
</script>

