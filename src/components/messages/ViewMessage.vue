<template>
  <div id="view-messages">
    <!-- Chat header -->
    <b-row id="chat-header" class="fixed-top">
      <b-container>
        <b-col
          sm="10"
          md="10"
          lg="8"
          offset-sm="1"
          offset-md="1"
          offset-lg="2"
          class="d-flex justify-content-between align-items-center p-1 px-3"
        >
          <div class="p-2 title" v-if="messagesByChat[0]">
            {{ messagesByChat[0].ad.name }} <span> | </span> MX${{
              messagesByChat[0].ad.price
            }}
          </div>
          <div role="button" @click="close">
            <i class="fas fa-times fa-lg"></i>
          </div>
        </b-col>
      </b-container>
    </b-row>
    <!-- Chat header end -->

    <!-- Chat body -->
    <b-container id="chat-body">
      <b-row>
        <b-col sm="10" md="10" lg="8" offset-sm="1" offset-md="1" offset-lg="2">
          <ul class="chat">
            <li
              class="p-2"
              v-for="(message, index) in messagesByChat"
              :key="message.id"
              :class="{ 'text-right': user.id === isBuyerOrSeller(message) }"
            >
              <div v-if="show">
                <ChatBody
                  :message="message"
                  :messages-count="messagesByChat.length"
                  :index="index"
                />
              </div>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <!-- Chat body end -->

    <!-- Chat input -->
    <b-row id="chat-textarea" class="bg-light fixed-bottom">
      <b-container>
        <b-col
          class="px-2"
          sm="10"
          md="10"
          lg="8"
          offset-sm="1"
          offset-md="1"
          offset-lg="2"
        >
          <div class="d-flex justify-content-between align-items-center p-2">
            <div ref="outerTextarea" class="w-100">
              <b-form-textarea
                class="shadow-none"
                id="textarea"
                v-model="inputMessage"
                placeholder="Type your message here..."
                :class="{
                  short:
                    textLength < outerTextarea + 10 &&
                    !inputMessage.includes('\n'),
                }"
                max-rows="4"
              />
            </div>
            <b-button
              class="shadow-none rounded-circle ml-2 p-2"
              @click="sendMessage"
              variant="success"
            >
              <i class="text-light text-center fas fa-arrow-up fa-lg p-0"></i>
            </b-button>
          </div>
        </b-col>
      </b-container>
    </b-row>
    <!-- Chat input end -->
  </div>
</template>

<script>
import ChatBody from "@/components/messages/ChatBody.vue";
export default {
  name: "ViewMessages",
  data() {
    return {
      show: false,
      inputMessage: "",
      textLength: 0,
      outerTextarea: 0,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    messagesByChat() {
      return this.$store.getters["message/getMessagesByChat"];
    },
    idsForCurrentChat() {
      return this.$store.getters["message/getIdsForCurrentChat"];
    },
    hideNavBar() {
      return this.$store.getters["nav/getHideNavBar"];
    },
  },
  watch: {
    inputMessage(newValue) {
      this.measureTextInPx(newValue);
    },
  },
  mounted() {
    this.updateChat();
    this.outerTextarea = this.$refs.outerTextarea.clientWidth;
    this.$store.dispatch("nav/storeHideNavBar", true);
  },
  updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToEnd());
  },

  beforeDestroy() {
    this.show = false
    this.$store.dispatch("nav/storeHideNavBar", false);
  },
  methods: {
    isBuyerOrSeller(message) {
      switch (message.message_sent_by) {
        case "buyer":
          return message.user.id;
        case "seller":
          return message.seller.id;
      }
    },
    close() {
      this.$store.dispatch("nav/storeHideNavBar", false)
      .catch((err) => {
        console.error(err)
      }).finally(() => {
        this.show = false
        this.$router.push({ name: "MyMessages" });
        this.$destroy()
      });
      
    },

    measureTextInPx(str) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = "18px Arial";
      this.textLength = ctx.measureText(str).width;
    },
    // Send message with all needed data
    // then update the chat
    sendMessage() {
      this.$store
        .dispatch("message/messageSeller", {
          userId: this.idsForCurrentChat.user_id,
          sellerId: this.idsForCurrentChat.seller_id,
          adId: this.idsForCurrentChat.ad_id,
          message: this.inputMessage,
          messageSentBy:
            this.user.id === this.idsForCurrentChat.user_id
              ? "buyer"
              : "seller",
        })
        .then(() => {
          this.inputMessage = "";
          this.updateChat();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // Fetch messages for the chat
    // get the data from MessageModule.js
    updateChat() {
      this.$store
        .dispatch("message/fetchMessagesByChat", {
          user_id: this.idsForCurrentChat.user_id,
          seller_id: this.idsForCurrentChat.seller_id,
          ad_id: this.idsForCurrentChat.ad_id,
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.show = true
        });
    },
  },
  components: {
    ChatBody,
  },
};
</script>

<style lang="scss">
#view-messages {
  #chat-header {
    background-color: $dark-blue;
    color: white;
    
    .title {
      font-size: 20px;
    }
  }

  #chat-body {
    margin-top: 60px;
    margin-bottom: 60px;
    
    .chat {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  #chat-textarea {
    #textarea {
      font-size: 16px;
    }
    
    .short {
      max-height: 38px;
    }

    .short:not(:focus) {
      max-height: 38px;
    }
  }
}
</style>
