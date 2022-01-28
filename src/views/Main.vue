<template>
  <div class="main">
    <b-container>
      <h3 class="pt-4">Featured Section</h3>
      <b-row>
        <AdItemCard v-for="ad in ads" :key="ad.id" :ad="ad" />
      </b-row>
      <div class="pt-5 d-flex justify-content-center align-items-center">
        <Pagination />
      </div>
    </b-container>
  </div>
</template>

<script>
import AdItemCard from "@/components/global/AdItemCard.vue";
import Pagination from "@/components/global/Pagination.vue";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Main",
  components: {
    AdItemCard,
    Pagination
  },
  computed: {
    ...mapGetters({
        ads: 'ad/getAds',
    })
  },
  mounted() {
    this.$store.dispatch("ad/fetchAds")
  },
};
</script>

