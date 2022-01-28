<template>
  <b-col id="ad-item-card" class="col-lg-3 col-md-4 col-6 p-1">
    <router-link class="link" :to="{ name: 'AdById', params: { adId: ad.id } }">
      <b-card
        :img-src="`${$helpers.apiUrl()}images/ad-id-${ad.id}/${ad.image}`"
        img-alt="Image"
        img-top
        tag="article"
      >
        <span class="title">{{ ad.name }}</span>
        <br />
        <span class="info">{{ ad.description }}</span>
        <br />
        <span class="price">MX${{ ad.price }}</span>
      </b-card>
    </router-link>
  </b-col>
</template>

<script>
export default {
  name: "AdItemCard",
  props: {
    ad: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
#ad-item-card {
  .title {
    font-weight: bold;
    font-size: 20px;
  }

  .price {
    font-weight: bold;
  }

  .link {
    text-decoration: none;
    color: inherit;
  }
}
</style>
