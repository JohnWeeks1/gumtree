<template>
  <div class="google-maps">
    <div id="map2" class="w-100 h-100"></div>
  </div>
</template>

<script>

export default {
  name: "GoogleMaps",
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  mounted() {    
    this.initMap();
  },
  watch: {
    location(newValue, oldValue) {
      if (newValue.lat !== oldValue.lat) {
        this.initMap()
      }
    }
  },
  methods: {
    // Initialize and add the map
    initMap() {
      this.$loader
        .load()
        .then((google) => {
          
          // Get the map
          const map = new google.maps.Map(document.getElementById("map2"), {
            center: this.location,
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
          });
          
          // Add the circle for this city to the map.
          new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: this.location,
            radius: 300,
          });
                 
        })
        .catch((err) => {
          console.error('GoogleMapsError', err);
        });
    },
  },
};
</script>

<style lang="scss">
.google-maps {
  width: 100%;
  height: 300px;
}
// Remove t&c
.gm-style-cc {
  display: none;
}
</style>
