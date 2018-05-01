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
                                v-switch(label='Admin' v-model='setAdmin' value='admin')
                                v-switch(label='Writer' v-model='setWriter' value='writer')
                                v-switch(label='Editor' v-model='setEditor' value='editor')
                                v-switch(label='User' v-model='setUser' value='user')

                        v-card-actions
                            v-spacer
                            v-btn(@click='saveProfile' color='success' flat ) Save
                            v-btn(@click='goBack' color='red' flat ) Cancel

</template>
<script>
export default {
  data: () => ({
      acc: {},
      setAdmin: false,
      setWriter: false,
      setEditor: false,
      setUser: false,
  }),
  mounted(){
      this.axios.get(`/dashboard/editAccount/${this.$route.params.id}`).then((response) => {
          console.log(response);
          this.acc = response.data;
      });
  },

  methods:{
      saveProfile(){
          if(this.setAdmin == true){
              this.setWriter = true;
              this.setEditor = true;
              this.setUser = true;
          }
          else if(this.setEditor == true){
             this.setWriter = true;
             this.setUser = true;
          }
          else if (this.setWriter == true){
              this.setUser = true;
          }
          else
           this.setUser = true;



      },

      goBack(){
          window.location.href = `${window.location.origin}/dashboard#/allusers`;
      }
  }
}
</script>

