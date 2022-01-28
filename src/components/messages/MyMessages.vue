<template>
  <b-container class="my-messages">
    <h3 class="pt-4 pb-2">My Messages</h3>
    <div class="border border-top-0 mb-3"></div>
    <MessageItemCard
      v-for="message in sortMessagesByLatestDate"
      :key="message.id"
      :message="message"
    />
  </b-container>
</template>

<script>
import MessageItemCard from "./MessageItemCard.vue";

export default {
  name: "MyMessages",
  computed: {
    messagesByUser() {
      return this.$store.getters["message/getMessagesByUser"];
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
    sortMessagesByLatestDate() {
      return _.orderBy(this.messagesByUser, ['created_at'], ['desc'])
    }
  },
  mounted() {
    this.$store.dispatch("message/fetchMessagesByUser", {
      id: this.user.id,
      seller_id: this.user.id,
    });
  },
  components: {
    MessageItemCard,
  },
};
</script>
