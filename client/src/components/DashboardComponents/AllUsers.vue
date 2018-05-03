<template lang="pug">
    #allusers
        .text-xs-center.pageNumber
            v-pagination(:length='length' v-model='page' circle)
        v-container(fluid grid-list-sm)
            v-layout(row wrap)
                v-flex(xs4 v-for='(user, index) in allusers' :key='user._id')
                    v-card
                        v-card-media#media
                            v-flex.text-xs-center
                                v-avatar(size='180px')
                                    v-gravatar(:email= 'user.email' :size='200')
                        v-divider
                        v-card-title
                            div
                                h3 {{user.name}}
                                h4 Email: {{user.email}}
                                h4(style="text-transform: capitalize") Roles: {{user.roles[user.roles.length - 1]}}
                        v-card-actions
                            v-spacer
                            v-btn(@click='editUser(user._id)' color='success' flat ) Edit
                            v-btn(@click='deleteUser(user._id)' color='error' flat ) Remove User
        .text-xs-center.pageNumber
            v-pagination(:length='length' v-model='page' circle)

</template>
<script>
export default {
    data: () => ({
        allusers: [],
        page: 1,
        length:1
    }),
   async mounted(){
        this.allusers = (await this.axios.get(`/dashboard/allAccounts/${this.page}`)).data;
        this.length = Math.ceil(parseInt((await this.axios.get('/dashboard/allAccountsCount')).data.userCount)/10);
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
        },
        editUser(id){
            window.location.href=`${window.location.origin}/dashboard#/edituser/${id}`;
        }

    }
}
</script>
<style scoped>
    #media{
        padding: 15px;
    }
    .pageNumber{
        padding: 1rem;
    }
</style>



