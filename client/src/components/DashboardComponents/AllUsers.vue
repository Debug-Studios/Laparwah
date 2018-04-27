<template lang="pug">
    v-flex(xs5)
        v-card(v-for='(users, index) in allusers' :key='users._id')
            v-card-media.text-align-center
                v-avatar(size='256px')
                    v-gravatar(email=`{users.email}`)
            v-card-title
                div
                    h3 {{users.name}}
                    span {{users.roles}}
            v-card-action
                v-spacer
                v-btn(color='success' flat) Remove User

</template>
<script>
export default {
    data: () => ({
        allusers: []
    }),
    mounted(){
        this.axios.get(`/dashboard/allAccounts/1`).then(response => {
            this.allusers = response.data;
        });
    }
}
</script>

