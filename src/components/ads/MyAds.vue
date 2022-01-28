<template>
  <b-container id="my-ads" class="pt-3">
    <h3>My Ads</h3>
    
    <div class="border border-top-0 mb-3"></div>
    
    <h5>Current active ads {{ myAds.length }}</h5>
    <div v-for="ad in myAds" :key="ad.id">
      <b-card
        class="image mb-3"
        :img-src="`${$helpers.apiUrl()}images/ad-id-${ad.id}/${ad.image}`"
        img-left
      >
        <b-card-text>
          <h6>{{ ad.name }}</h6>
          <div>
            <router-link
              class=""
              :to="{ name: 'EditAd', params: { adId: ad.id } }">
              Edit
            </router-link
            >
            |
            <router-link class="" to="#">Delete</router-link>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "MyAds",
  computed: {
    user() {
      return this.$store.getters['user/getUser']
    },
    myAds() {
      return this.$store.getters['ad/getAdsByUserId']
    },
  },
  mounted() {
    this.$store.dispatch("ad/fetchAdsByUserId", {
      id: this.user.id,
    }).catch((err) => {
      console.error(err)
    })
  },
};
</script>

<style lang="scss">
#my-ads {
  .image {
    height: 100px;
  }
}
</style>
