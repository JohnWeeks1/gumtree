<template>
  <div id="loader" class="bg-primary">
    <div id="icon-box" class="text-white small-4 medium-4 large-4 columns text-center">
        <i class="fas fa-sync fa-spin fa-5x"></i>
        <br>
        <div id="text">Page Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
name: "Loader",
  data() {
    return {
      //
    };
  },
  props: {
    //
  },
  methods: {
    //
  },
};
</script>

<style lang="scss">
#loader {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 1000000 !important;
    top: 0;
    left: 0;
    
    #icon-box {
        margin-top: 65%;
    }
    
    #text {
        padding-top: 15px;
        font-size: 1.5em;
    }
}
</style>
