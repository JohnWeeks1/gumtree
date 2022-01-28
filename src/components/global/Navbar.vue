<template>
  <div>
    <b-navbar id="nav" type="dark">
      <b-container>
        <b-navbar-brand
          @click="
            categoryMenu(true);
            searchBox(true);
          "
          :to="{ name: 'Main' }"
        >
          MexGumtree
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item @click="showSearchBox = !showSearchBox">
            <i class="fas fa-search"></i>
          </b-nav-item>

          <b-nav-item
            @click="
              categoryMenu(true);
              searchBox(false);
            "
            :to="{ name: 'CreateAd' }"
          >
            <i class="fas fa-plus-square"></i>
          </b-nav-item>

          <b-nav-item
            v-if="user.id"
            @click="
              categoryMenu(true);
              searchBox(false);
            "
            :to="{ name: 'MyMessages' }"
          >
            <i class="fas fa-envelope"></i>
          </b-nav-item>

          <b-nav-item>
            <div v-b-toggle.sidebar-backdrop>
              <div>
                <i class="fas fa-bars"></i>
              </div>
            </div>
          </b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <SearchBox :is-visible="showSearchBox" />

    <CategoryMenu :category-is-visible="showCategoryMenu" />

    <b-sidebar
      width="220px"
      id="sidebar-backdrop"
      backdrop
      shadow
      no-header
      right
    >
      <b-list-group flush>
        <b-list-group-item
          class="d-flex justify-content-between bg-transparent"
        >
          <router-link
            class="link"
            @click.native="
              categoryMenu(true);
              searchBox(true);
            "
            :to="{ name: 'Main' }"
          >
            Main
          </router-link>
          <span>
            <i class="fas fa-chevron-right icon"></i>
          </span>
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between bg-transparent"
        >
          <router-link
            class="link"
            @click.native="
              categoryMenu(true);
              searchBox(false);
            "
            :to="{ name: 'MyAds' }"
          >
            My Ads
          </router-link>
          <span>
            <i class="fas fa-chevron-right icon"></i>
          </span>
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between bg-transparent"
        >
          <router-link
            class="link"
            @click.native="
              categoryMenu(true);
              searchBox(false);
            "
            :to="{ name: 'MyMessages' }"
          >
            Messages
          </router-link>
          <span>
            <i class="fas fa-chevron-right icon"></i>
          </span>
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between bg-transparent"
        >
          <router-link
            class="link"
            @click.native="categoryMenu(true); searchBox(false);"
            :to="{ name: 'MyProfile', params: { userId: getUserId } }"
          >
            Profile
          </router-link>
          <span>
            <i class="fas fa-chevron-right icon"></i>
          </span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between bg-transparent">
          <a v-if="user.id" @click.prevent="logout" href="" class="link">
            Logout, {{ user.first_name }}
          </a>
          <router-link
            class="link"
            v-else
            @click.native="categoryMenu(true); searchBox(false);"
            :to="{ name: 'Login' }">
            Login/Register
          </router-link>
          <span>
            <i class="fas fa-sign-in-alt icon"></i>
          </span>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
    </div>
</template>

<script>
import SearchBox from "@/components/global/SearchBox.vue";
import CategoryMenu from "@/components/global/CategoryMenu.vue";

export default {
  name: "Navbar",
  data() {
    return {
      showSearchBox: true,
      showCategoryMenu: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters['user/getUser']
    },
  },
  watch:{
    // On route change clear the search results
    $route (to, from){
        this.$store.dispatch("ad/clearAdsBySearch");
    }
  },
  methods: {
    searchBox(val) {
      this.showSearchBox = val;
    },
    categoryMenu(val) {
      this.showCategoryMenu = val;
    },
    logout() {
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.$swal({
            icon: "info",
            title: "You logged out",
            text: "Come back soon!",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: false,
          });

          this.$router.push({ name: "Main" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  components: {
    SearchBox,
    CategoryMenu,
  },
};
</script>

<style lang="scss">
  #nav {
    background: $dark-blue;
  }
  #sidebar-backdrop {
  	background: $dark-blue !important;
  	
  	.link {
  	 text-decoration: none; 
  	 color: white;
  	}
  	
  	.icon {
  	 color: white !important;
  	}
  }
</style>
