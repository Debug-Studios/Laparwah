<template lang="pug">
    #allusers
        v-flex(xs4)
            transition-group(name="fade" tag="div")
                v-card(v-for='(users, index) in allusers' :key='users._id')
                    v-card-media#media
                        v-flex.text-xs-center
                            v-avatar(size='180px')
                                v-gravatar(email='ayush.bahuguna12@gmail.com')
                    v-divider
                    v-card-title
                        div
                            h3 {{users.name}}
                            span Roles: {{users.roles}}
                    v-card-actions
                        v-spacer
                        v-btn(@click='deleteUser(users._id)' color='success' flat ) Remove User

</template>
<script>
export default {
    data: () => ({
        allusers: [],
    }),
    mounted(){
        this.axios.get(`/dashboard/allAccounts/1`).then(response => {
            console.log(response);
            this.allusers = response.data;
        });
    },
    methods:{
        deleteUser(id){
            this.axios.delete(`/dashboard/deleteAccount/${id}`).then((response) => {
                this.allusers.forEach((users, index)=>{
                    if(users._id == response.data._id){
                        this.allusers.splice(index,1);
                        this.$notify({
                        group: "dashboard",
                        title: "Successfuly Deleted",
                        type: "success",
                        duration: 30000
                        });
                    }
                })
            }).catch((error) =>{
                this.$notify({
                        group: "dashboard",
                        title: "Cannot Delete! Try Again",
                        type: "error",
                        duration: 30000
                        });
            })
        }

    }
}
</script>
<style scoped>
    #media{
        padding: 15px;
    }
</style>



