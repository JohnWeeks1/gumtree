import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import UserModule from "@/store/UserModule";
import CategoryModule from "@/store/CategoryModule";
import AdModule from "@/store/AdModule";
import MessageModule from "@/store/MessageModule";
import NavBarModule from "@/store/NavBarModule";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'mexgumtree',
  storage: window.localStorage,
});


export default new Vuex.Store({
  modules: {
    user: UserModule,
    category: CategoryModule,
    ad: AdModule,
    message: MessageModule,
    nav: NavBarModule,
  },
  plugins: [vuexLocal.plugin]
});
