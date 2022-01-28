<template>
  <div id="google-autocomplete" class="d-flex">
    <vue-google-autocomplete
      v-model="formattedAddress"
      ref="address"
      id="map"
      classname="form-control shadow-none"
      :class="{
        error: errors.state === false,
        success: errors.state === true,
      }"
      placeholder="Please type your address"
      autocomplete="off"
      v-on:placechanged="getAddressData"
      :country="['mx']"
    >
    </vue-google-autocomplete>
    <div class="input-icon">
      <b-icon
        v-if="errors.state === false"
        style="height: 15px"
        icon="exclamation-circle"
      ></b-icon>
      <i v-if="errors.state === true" class="fas fa-check"></i>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "GoogleAutocomplete",
  data() {
    return {
      formattedAddress: ""
    }
  },
  mounted() {
    this.$loader.load();    
  },
  props: {
    errors: {
      type: Object,
      required: false
    },
    formattedAddress: {
      type: String,
      required: false
    },
  },
  methods: {
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function (addressData, placeResultData, id) {
      // Remove from object because is deprecated
      delete placeResultData.utc_offset;

      const location = {
        addressData: addressData,
        placeResultData: placeResultData,
      };

      this.$emit("location", location);
    },
  },
  components: {
    VueGoogleAutocomplete,
  },
};
</script>

<style lang="scss" scoped>
#google-autocomplete {
  .error {
    border-color: red;
  }
  
  .success {
    border-color:rgb(81, 153, 95);
  }
  
  .input-icon {
    position: absolute;
    right: 25px;
    margin-top: 5px;
    padding-left: 12px;
    background-color: rgb(255, 255, 255);;
  }
}
</style>
