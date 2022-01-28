<template>
  <div>
    <b-pagination @change="handlePageChange"></b-pagination>
  </div>
</template>

<script>
// Helper doc
// https://www.bezkoder.com/vue-pagination-axios/
export default {
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    handlePageChange(value) {
      this.page = value;
    },
  },
};
</script>
