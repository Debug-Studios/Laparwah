<template lang="pug">
  #addusers
    v-card
        v-card-title.blue-grey.darken-2.py-4.title
            | Add Users
        v-container.pa-4(grid-list-sm )
            v-layout(row wrap)
                v-flex(xs4 align-center justify-space-between)
                     v-text-field(label="Add Name" name='add_name' v-model='name')
                v-spacer
                v-flex(xs5)
                   v-text-field(label='Add Roles' v-model='roles' name='add_roles')
                v-flex(xs6)
                    v-text-field(label='Add Email' v-model='email' name='add_email')
                v-spacer
                v-flex(xs3)
                    v-text-field(label='Gender' v-model='gender' name='add_gender')
            v-card-actions
                v-spacer
                v-btn( color='success' @click='addUser' ) Add
                v-btn( type='reset') Reset
</template>
<script>
export default {
  data: () => ({
      name: '',
      roles: '',
      email: '',
      gender: '',
      items: [
            { text: "User" },
            { text: "Writer" },
            { text: "Editor" },
            { text: "Admin" }
        ]
  }),
  methods: {
      addUser(){
          this.axios.post('/dashboard/createAccount',{
              name:  this.name,
              email:  this.email,
              gender: this.gender,
              roles: this.roles
          })
          .then((response) =>{
              console.log(response);
            this.$notify({
                  group: "dashboard",
                  title: "User added successfully",
                  type: "success",
                  duration: 30000
                  });
          })
          .catch((error) => {
              this.$notify({
                  group: "dashboard",
                  title: "Cannot add at this time",
                  type: "red",
                  duration: 30000
                  });
          })
      }
  }

}
</script>

