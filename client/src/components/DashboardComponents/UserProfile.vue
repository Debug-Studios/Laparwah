<template lang="pug">
  v-layout
    v-flex(xs12 offset-md3 md6)
      v-card(v-if="user")
        v-card-title(primary-title)
          h3.headline.mb-0.text-xs-center Edit your profile
        v-card-text
          form
            v-text-field(required label="Name" v-model="name" :error-messages="errors.collect('name')" v-validate="'required|max:30'" data-vv-name="Name")
            v-text-field(required label="Age" v-model="age" :error-messages="errors.collect('age')" v-validate="'required|number'" data-vv-name="Age")
            v-text-field(required label="Gender" v-model="gender" :error-messages="errors.collect('gender')" v-validate="'required|max:2'" data-vv-name="Gender")
            v-text-field(required label="Location" v-model="location" :error-messages="errors.collect('lcoation')" v-validate="'required|max:30'" data-vv-name="Location")

            v-subheader.pa-0 Social Links (Publicly Displayed on your profile)
            v-divider
            v-text-field(label="Facebook Link" v-model="social_facebook")
            v-text-field(label="Email Link" v-model="social_email")
            v-text-field(label="Twitter Link" v-model="social_twitter")

            v-btn(@click="submit" :loading="loading" :disabled="loading" color="green") submit
            v-btn(@click="clear") clear
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => {
    return {
      loading: false,
      name: "",
      age: "",
      gender: "",
      location: "",
      social_facebook: "",
      social_twitter: "",
      social_email: "",
      user: {}
    };
  },
  async mounted() {
    this.user = (await this.axios.get(
      "/accounts/getCurrentUserDetails"
    )).data.user;
    // Set all local variables
    this.name = this.user.name;
    this.gender = this.user.gender;
    this.age = this.user.age;
    this.location = this.user.location;
    this.social_facebook = this.user.social.facebook;
    this.social_twitter = this.user.social.twitter;
    this.social_email = this.user.social.email;
  },
  methods: {
    submit() {
      this.loading = true;
      this.$validator.validateAll();
      this.axios
        .post("/accounts/updateAccount", {
          name: this.name,
          gender: this.gender,
          age: this.age,
          location: this.location,
          social_facebook: this.social_facebook,
          social_twitter: this.social_twitter,
          social_email: this.social_email
        })
        .then(response => {
          this.$notify({
            group: "dashboard",
            title: "Profile Updated!",
            type: "success",
            duration: 30000
          });
          this.loading = false;
        })
        .catch(error => {
          this.$notify({
            group: "dashboard",
            title: "Profile cannot be updated at this time due to" + error,
            type: "error",
            duration: 30000
          });
          this.loading = false;
        });
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    }
  }
};
</script>

