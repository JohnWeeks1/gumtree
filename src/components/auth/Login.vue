<template>
  <b-container id="login">
    <ContentBox class="mt-4 m-auto">
      <b-form class="m-auto" @submit.prevent="login">
        <div class="pt-3 pb-3">
          <span style="font-size: 25px">Login</span>
          or
          <router-link :to="{ name: 'Register' }">Register</router-link>
        </div>

        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          class="pt-2"
          label="Password"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" class="pt-3" label-for="input-3">
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form-group>
      </b-form>
    </ContentBox>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    async login() {
      try {
        await this.$http.get("sanctum/csrf-cookie");
      } catch (err) {
        console.log("ERROR FOR CSRF", err);
      }

      try {
        const res = await this.$http.post("login", {
          email: this.email,
          password: this.password,
        });
        this.fetchLoggedInUser();
      } catch (err) {
        console.error("ERROR LOGGING IN", err);
      }
    },

    fetchLoggedInUser() {
      this.$store
        .dispatch("user/fetchLoggedInUser")
        .then(() => {
          
        this.$swal({
          toast: true,
          icon: 'success',
          title: 'Hey, '+ this.$store.state.user.firstName +'! You\'re logged in.',
          animation: false,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });

          this.$router.push({ name: "Main" });
        })
        .catch((err) => {
          console.error("ERROR GETTING USER", err);
        });
    },
  },
};
</script>
