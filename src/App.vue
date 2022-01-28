<template>
  <div id="app">
    <PageLoader v-if="show"/>
    <Navbar v-if="!hideNavBar"/>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/global/Navbar.vue";

export default {
  name: "App",
  data() {
    return {
      show: false,
      idsForCurrentChat: {},
    };
  },
  created() {
    // By default show NavBar
    this.$store.dispatch("nav/storeHideNavBar", false)
    this.getUserDetails()
    this.$store.dispatch("category/fetchCategories");
  },
  computed: {
    hideNavBar() {
      return this.$store.getters["nav/getHideNavBar"];
    },
  },
  methods: {
    getUserDetails() {
      this.$store.dispatch("user/fetchLoggedInUser")
      .catch((err) => {
        console.error(err);
      });
    }
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">

#app {
  background: $light-gray;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
