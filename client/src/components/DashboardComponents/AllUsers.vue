<template lang="pug">
    v-flex(xs4)
        v-card(v-for='(users, index) in allusers' :key='users._id')
            v-card-media#media
                v-flex.text-xs-center
                    v-avatar(size='180px')
                        v-gravatar(email='ayush.bahuguna12@gmail.com' size='100')
            v-divider
            v-card-title
                div
                    h3 {{users.name}}
                    span Roles: {{users.roles}}
            v-card-actions
                v-spacer
                v-btn(color='success' flat) Remove User

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
    }
}
</script>
<style scoped>
    
    #media{
        padding: 15px;
    }
</style>



