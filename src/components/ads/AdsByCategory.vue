<template>
  <div id="ads-by-category">
    <b-container>
      <h3 class="pt-4">{{ $helpers.capitalizeFirstLetter(this.$route.params.category) }}</h3>
      <b-row>
        <AdItemCard 
          v-for="ad in adsByCategory"
          :key="ad.id"
          :ad="ad"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AdItemCard from "@/components/global/AdItemCard.vue";

export default {
  name: "AdsByCategory",
  data() {
    return {
      categoryId: null,
      adsByCategory: {}
    }
  },
  computed: {
    categories() {
      return this.$store.getters['category/getCategories']
    },
  },
  mounted() {
    this.getCategoryId(this.$route.params.category);
  },
  watch:{
    /**
     * On route change get the category param
     */
    $route(to){
        this.getCategoryId(to.params.category);
    }
  },
  methods: {
    getAdsByCategory(categoryId) {
      this.$store.dispatch("ad/fetchAdsByCategory", {
        categoryId: categoryId
      }).then(() => {
        this.adsByCategory = this.$store.state.ad.adsByCategory;
      }).catch((err) => {
        console.log(err)
      });;
      
    },

    getCategoryId(categoryName) {
      for (let i = 0; i < this.categories.length; i++) {
        if (categoryName === this.categories[i].name) {
          this.categoryId = this.categories[i].id
          this.getAdsByCategory(this.categoryId)
        }
      }
    }
  },
  components: {
    AdItemCard,
  },
};
</script>
