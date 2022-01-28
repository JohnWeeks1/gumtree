<template>
  <div class="chat-body" :ref="`chatBody${++index}`">
    <div>
      <div>
        <strong v-if="isBuyerOrSeller(message)">{{ chatName }}</strong>
        <small class="text-muted"> | </small>
        <small class="text-muted">{{
          formateDateTime(message.created_at)
        }}</small>
      </div>
      <p
        class="chat-text"
        :class="[
          user.first_name === chatName
            ? 'bg-primary round px-3 p-2 text-light'
            : 'gray-box round px-3 p-2 text-dark',
        ]"
      >
        {{ message.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBody",
  data() {
    return {
      chatName: "",
    };
  },
  props: {
    message: {
      required: true,
      type: Object,
    },
    messagesCount: {
      required: true,
      type: Number,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
  },
  created() {
    this.scrollToBottom(this.messagesCount);
  },
  updated() {
    this.scrollToBottom(this.messagesCount);
  },
  methods: {
    scrollToBottom(count) {
      const el = this.$refs[`chatBody${count}`];
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
        // el.scrollIntoView({ behavior: "smooth" });
      }
    },

    // Formate the date and time
    formateDateTime(date) {
      return this.$moment(date).format("MMM Do, YYYY, h:mm a");
    },

    // Select first_name based on if it's a user or a seller
    isBuyerOrSeller(message) {
      switch (message.message_sent_by) {
        case "buyer":
          return (this.chatName = message.user.first_name);
        case "seller":
          return (this.chatName = message.seller.first_name);
      }
    },
  },
};
</script>

<style lang="scss">
.chat-body {
  overflow-y: scroll;
  .chat-text {
    margin: 0;
    color: #777777;
    display: inline-block;
  }
  .round {
    border-radius: 10px;
  }
  .gray-box {
    background-color: rgb(220, 220, 220);
  }
}
</style>
