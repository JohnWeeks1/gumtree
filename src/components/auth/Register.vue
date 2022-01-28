<template>
  <b-container id="register">
    <ContentBox class="mt-4 m-auto">
      <b-form class="m-auto" @submit.prevent="onSubmit">
        <div class="pt-3 pb-3">
          <span style="font-size: 25px">Register</span>
          or
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </div>

        <b-form-group 
          id="input-group-1" 
          label="First name" 
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="firstName"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          class="pt-2"
          label="Last name"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="lastName"
            type="text"
            required
          ></b-form-input>
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
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          class="pt-2"
          label="Password"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          class="pt-2"
          label="Confirm password"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="confirmPassword"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" class="pt-3" label-for="input-3">
          <b-button variant="primary">Register</b-button>
        </b-form-group>
      </b-form>
    </ContentBox>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    onSubmit(event) {
      //
    },
  },
};
</script>