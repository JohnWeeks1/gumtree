<template>
  <b-container id="ad-by-id">
    <b-row>
      <b-col class="col-lg-8 offset-lg-2 col-md-8 offset-md-2">
        <router-link v-if="!user.id" :to="{ name: 'Login' }">
          <b-button class="mt-3 w-100" type="submit" variant="danger">
            Login to message seller
          </b-button>
        </router-link>
        <h4 class="pt-4 pb-2">{{ ad.name }}</h4>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="location">
          {{ this.location.addressData.country }}, 
          {{ this.location.addressData.administrative_area_level_1 }}, 
          {{ this.location.addressData.route }}
          </h5>
          <h5>MX${{ ad.price }}</h5>
        </div>
        
        
        <div>
          <b-tabs content-class="mt-3" fill>
            <b-tab active>
            <template #title>
              <i class="fas fa-images"></i> Images
            </template>
              <Carousel v-if="ad.images" :images="ad.images" />
            </b-tab>
            <b-tab>
            <template #title>
              <i class="fas fa-map-signs"></i> Map
            </template>
              
              <GoogleMaps 
                v-if="ad.length !== 0" 
                :location="{ 
                  lat: Number(this.location.addressData.latitude), 
                  lng: Number(this.location.addressData.longitude) 
                }
              "/>
            </b-tab>
          </b-tabs>
        </div>
        
        <div>
          <h5 class="pt-3">Description</h5>
          <p>{{ ad.description }}</p>
        </div>
                        
        <div v-if="!!user.id && ad.user_id !== user.id">
          <h5>Contact:</h5>

          <b-form class="" @submit.prevent="sendMessage">
            <b-form-group id="message" label-for="message">
              <b-form-textarea
                id="message"
                v-model="message"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-button
              v-if="user.id"
              class="mt-3 mb-5 w-100"
              type="submit"
              variant="primary"
            >
              Message Seller
            </b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container> 
</template>

<script>
import Carousel from "@/components/global/Carousel.vue";
import GoogleMaps from "@/components/global/GoogleMaps.vue";

export default {
  name: "AdById",
  data() {
    return {
      location: {},
      message: "Hi, Is this item still available. Thanks",
    };
  },
  computed: {
    ad() {
      return this.$store.getters['ad/getAdById']
    },
    user() {
      return this.$store.getters['user/getUser']
    },
  },
  mounted() {
    this.$store
      .dispatch("ad/fetchAdById", {
        id: this.$route.params.adId,
      })
      .then(() => {
        this.location = JSON.parse(this.ad.location_json_data)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    sendMessage() {
      this.$store
        .dispatch("message/messageSeller", {
          userId: this.user.id,
          sellerId: this.ad.user_id,
          adId: this.ad.id,
          message: this.message,
          messageSentBy: "buyer",
        })
        .then((result) => {
          console.log(result);

          this.$swal({
            toast: true,
            icon: "success",
            title: 'Message sent for "' + this.ad.name + '"',
            animation: false,
            position: "top-right",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });

          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Carousel,
    GoogleMaps
  },
};
</script>

<style lang="scss" scoped>
#ad-by-id {
  .location {
    font-size: 19px;
    color: rgb(94, 153, 255);
  }
}
</style>
