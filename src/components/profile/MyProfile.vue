<template>
  <b-container id="my-profile">
    <b-row>
      <b-col class="col-lg-8 offset-lg-2 col-md-8 offset-md-2">
        <b-form class="m-auto" @submit.prevent="update">
          <div class="pt-3 pb-3">
            <span style="font-size: 25px">My Profile</span>
          </div>

          <b-form-group
            id="input-group-1"
            :class="{
              'text-danger': errors.firstName.state === false,
              'text-success': errors.firstName.state === true,
            }"
            label="First name"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="firstName"
              class="shadow-none"
              :state="errors.firstName.state"
              type="text"
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              {{ errors.firstName.value }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            :class="{
              'text-danger': errors.lastName.state === false,
              'text-success': errors.lastName.state === true,
            }"
            class="pt-2"
            label="Last name"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="lastName"
              class="shadow-none"
              :state="errors.lastName.state"
              type="text"
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              {{ errors.lastName.value }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            class="pt-2"
            label="Email"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="email"
              class="shadow-none"
              type="email"
              :disabled="true"
            ></b-form-input>
          </b-form-group>

          <div class="border border-top-0"></div>

          <b-col>
            <b-row class="d-flex justify-content-end">
              <b-button class="mt-3 mb-4" type="submit" variant="primary">
                Update details
              </b-button>
            </b-row>
          </b-col>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "MyProfile",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      errors: {
        firstName: { value: "", state: null },
        lastName: { value: "", state: null },
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
  },
  mounted() {
    this.setProfileData();
    console.log(this.$myMethod)
    this.$myMethod()
  },
  watch: {
    // Validation
    firstName(val) {
      if (this.firstName.length > 0) {
        this.errors.firstName.state = true;
        this.errors.firstName.value = "";
      } else {
        this.errors.firstName.state = null;
        this.errors.firstName.value = "";
      }
    },

    lastName(val) {
      if (this.lastName.length > 0) {
        this.errors.lastName.state = true;
        this.errors.lastName.value = "";
      } else {
        this.errors.lastName.state = null;
        this.errors.lastName.value = "";
      }
    },
  },
  methods: {
    setProfileData() {
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
      this.email = this.user.email;
    },

    validationErrors() {
      let isError = false;

      if (this.firstName.length < 1) {
        this.errors.firstName.state = false;
        this.errors.firstName.value = "Please enter your first name";
        isError = true;
      }

      if (this.lastName.length < 1) {
        this.errors.lastName.state = false;
        this.errors.lastName.value = "Please enter your last name";
        isError = true;
      }

      return isError;
    },

    update() {
      if (this.validationErrors()) {
        return true;
      }

      this.$store
        .dispatch("user/updateUserById", {
          id: this.user.id,
          first_name: this.firstName,
          last_name: this.lastName,
        })
        .then(() => {
          this.$swal({
            toast: true,
            icon: "success",
            title: 'Details updated!',
            position: "top-right",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          
          this.$router.push({ name: "MyAds" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
