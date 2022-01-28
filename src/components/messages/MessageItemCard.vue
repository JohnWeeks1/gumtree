<template>
  <div class="message-item-card">
    <b-card
      :img-src="`${$helpers.apiUrl()}images/ad-id-${message.ad_id}/${message.image}`"
      img-left
      class="image mb-3"
    >
      <b-card-text>
        <div class="title">{{ message.name }}</div>
        <div class="message">
          <div class="truncate">
          {{ message.message.message }}
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-1 price">
          <div class="price">MX${{ message.price }}</div>
          <a @click.prevent="storeIdsForCurrentChat(message)" href="">View</a>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "MessageItemCard",
  props: {
    message: {
      required: true,
      type: Object,
    },
  },
  methods: {
    // Get all the ids needed to get the data for the chat
    storeIdsForCurrentChat(message) {
      this.$store
        .dispatch("message/storeIdsForCurrentChat", {
          user_id: message.user_id,
          seller_id: message.seller_id,
          ad_id: message.ad_id,
        })
        .then(() => {
          this.$router.push({ name: "ViewMessage" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
.message-item-card {
  .title {
    font-size: 18px;
    font-weight: 400;
    margin-top: -15px;
    padding: 0;
  }

  .price {
  font-size: 15px;
    font-weight: 300;
  }

  .message {
    display: table;
    width: 100%;
    font-weight: 300;
  }

  .truncate {
    display: table-cell;
    max-width: 1px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .image {
    height: 92px;
  }
}
</style>
