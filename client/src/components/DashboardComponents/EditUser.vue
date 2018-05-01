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
                                v-switch(label='Admin' v-model='isAdmin')
                                v-switch(label='Writer' v-model='isWriter')
                                v-switch(label='Editor' v-model='isEditor')
                                v-switch(label='User' v-model='isUser')

                        v-card-actions
                            v-spacer
                            v-btn(@click='saveProfile' color='success' flat ) Save
                            v-btn(@click='goBack' color='red' flat ) Cancel

</template>
<script>
export default {
  data: () => ({
      acc: {},
      isAdmin: false,
      isWriter: false,
      isEditor: false,
      isUser: false,
      modifiedRoles: []
  }),
  mounted(){
      this.axios.get(`/dashboard/editAccount/${this.$route.params.id}`).then((response) => {
          this.acc = response.data;
          this.isAdmin = this.acc.roles.includes('admin') ;
          this.isWriter = this.acc.roles.includes('writer') ;
          this.isEditor = this.acc.roles.includes('editor');
          this.isUser = this.acc.roles.includes('user');
      })
  },

  methods:{
      saveProfile(){
            if(this.isAdmin){
                this.modifiedRoles = "user editor writer admin";
            };

            if(this.isEditor){
                this.modifiedRoles = "user editor writer";
            };

            if(this.isWriter){
                this.modifiedRoles = "user writer";
            };

            this.axios.post(`/dashboard/editAccount/${this.$route.params.id}`,{

                roles: this.modifiedRoles

            }).then(response => {
                console.log(response);
                this.$notify({
                group: "dashboard",
                title: "Roles Updated!",
                type: "success",
                duration: 30000
                });
            }).catch(error => {
                console.log(error);
                this.$notify({
                group: "dashboard",
                title: "Failed to Update!",
                type: "red",
                duration: 30000
                });
            })
      },

      goBack(){
          window.location.href = `${window.location.origin}/dashboard#/allusers`;
      }
  }
}
</script>

