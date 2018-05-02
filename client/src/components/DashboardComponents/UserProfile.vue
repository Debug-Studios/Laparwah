<template lang="pug">
  v-layout
    v-flex(xs12 offset-md1 md10)
      v-card(v-if="user")
        v-card-title(primary-title).pa-4.grey.darken-4
          h3.headline.text-xs-center Edit your profile
          v-spacer
          v-tooltip(bottom)
            v-btn(fab href="https://gravatar.com" target="_blank" slot="activator")
              v-avatar
                v-gravatar(:email="user.email")
            span Click to change your profile picture.
        v-card-text
          form(grid-list-sm)
            v-subheader.pa-0.py-4.subheading Personal Data
            v-layout(row wrap)
              v-flex(md3 xs12)
                v-text-field(prepend-icon="perm_identity" required label="Name" v-model="name" :error-messages="errors.collect('name')" v-validate="'required|max:50'" data-vv-name="name")
              v-spacer
              v-flex(md1 xs12)
                v-text-field(required label="Age" v-model="age" :error-messages="errors.collect('age')" v-validate="'required|numeric'" data-vv-name="age" type="number")
              v-spacer
              v-flex(md2 xs12)
                v-text-field(required label="Gender" v-model="gender" :error-messages="errors.collect('gender')" v-validate="'required|max:15'" data-vv-name="gender")
              v-spacer
              v-flex(md4 xs12)
                v-text-field(prepend-icon="location_on" required label="Location" v-model="location" :error-messages="errors.collect('location')" v-validate="'required|max:60'" data-vv-name="location")

            v-subheader.pa-0.py-4.subheading Social Links (Publicly Displayed on your profile)
            v-layout(row wrap)
              v-flex(md3 xs12)
                v-text-field(prepend-icon="email" label="Email Link" v-model="social_email")
              v-spacer
              v-flex(md3 xs12)
                v-text-field(label="Facebook Link" v-model="social_facebook")
              v-spacer
              v-flex(md3 xs12)
                v-text-field(label="Twitter Link" v-model="social_twitter")

            v-subheader.pa-0.py-4.subheading Other Information
            v-layout(row wrap)
              v-flex(md6 xs12)
                v-radio-group(v-model="spectrum" row)
                  v-radio(:key="1" label="Left Leaning" :value="1")
                  v-radio(:key="2" label="Moderate" :value="2")
                  v-radio(:key="3" label="Right Leaning" :value="3")

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
      spectrum: 1,
      selectedSpectrum: "",
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
    switch (this.user.spectrum) {
      case "<-":
        this.spectrum = 1;
        break;
      case "-":
        this.spectrum = 2;
        break;
      case "->":
        this.spectrum = 3;
        break;
      default:
        this.spectrum = 2;
        break;
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      let result = await this.$validator.validateAll();
      switch (this.spectrum) {
        case 1:
          this.selectedSpectrum = "<-";
          break;
        case 2:
          this.selectedSpectrum = "-";
          break;
        case 3:
          this.selectedSpectrum = "->";
          break;
        default:
          this.selectedSpectrum = "-";
          break;
      }
      if (result) {
        this.axios
          .post("/accounts/updateAccount", {
            name: this.name,
            gender: this.gender,
            age: this.age,
            location: this.location,
            social_facebook: this.social_facebook,
            social_twitter: this.social_twitter,
            social_email: this.social_email,
            spectrum: this.selectedSpectrum
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
      } else {
        this.loading = false;
        this.$validator.validateAll();
      }
    },
    clear() {
      this.name = "";
      this.age = "";
      this.gender = "";
      this.location = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.subheader {
  font-weight: 200;
}
</style>


