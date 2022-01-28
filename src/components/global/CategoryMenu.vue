<template>
  <div id="category-menu" v-if="categoryIsVisible">
    <horizontal-scroll class="pt-3">
      <ul class="content d-flex">
        <li v-for="category in categories" :key="category.id">
          <router-link
            class="link"
            :to="{ name: 'AdsByCategory', params: { category: category.name } }"
          >
            {{ $helpers.capitalizeFirstLetter(category.name) }}
          </router-link>
        </li>
      </ul>
    </horizontal-scroll>
  </div>
</template>

<script>
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";

export default {
  name: "CategoryMenu",
  props: {
    categoryIsVisible: {
      required: true,
    },
  },
  computed: {
    categories() {
      return this.$store.getters['category/getCategories']
    },
  },
  components: {
    HorizontalScroll,
  },
};
</script>

<style lang="scss">
#category-menu {
  background: linear-gradient(to left, rgb(70, 70, 70), transparent 12%);
  background-color: $darker-blue;
  
  .content {
    list-style-type: none;
  }
  
  .link {
    text-decoration: none;
    color: inherit;
  }
  
  li {
    color: white;
    font-weight: 400;
    padding: 0 12px 0 12px !important;
  }
    
  li:first-child {
    padding: 0 12px 0 0 !important;
    margin: 0 0 0 -15px;
  }
}
</style>