import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import helpers from './helpers'
import axios from 'axios'
import moment from 'moment';

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// name is optional
Vue.use(VueLodash, { lodash: lodash })

// https://www.npmjs.com/package/@googlemaps/js-api-loader
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  libraries: ["places"],
});

Vue.prototype.$loader = loader;

// axios
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.prototype.$http = axios;
Vue.prototype.$moment= moment;

// axios.interceptors.response.use(
//   function (response) {
//     console.log('INSIDE interceptor response')
//     // Call was successful, don't do anything special.
//     return response;
//   },
//   function (error) {
//     switch (error.response.status) {
//       case 401: // Not logged in
//       case 419: // Session expired
//       case 503: // Down for maintenance
//         // Bounce the user to the login screen with a redirect back
//         localStorage.removeItem('mexgumtree');
//         window.location.reload();
//         break;
//       case 500:
//         alert('Oops, something went wrong!  The team have been notified.');
//         break;
//       default:
//         // Allow individual requests to handle other errors
//         return Promise.reject(error);
//     }
//   });

// https://bootstrap-vue.org/docs
import {BootstrapVue, IconsPlugin, FormRatingPlugin, FormSelectPlugin  } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(FormRatingPlugin)
Vue.use(FormSelectPlugin)

// https://fontawesome.com/v5.15/how-to-use/on-the-web/setup/using-package-managers
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// SweetAlert2
// https://github.com/avil13/vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

// Layouts
import BaseLayout from "@/components/layouts/BaseLayout.vue";
import ContentBox from "@/components/layouts/ContentBox.vue";
import PageLoader from "@/components/global/Loader.vue";

Vue.component('BaseLayout', BaseLayout)
Vue.component('ContentBox', ContentBox)
Vue.component('PageLoader', PageLoader)


// helpers.js
const plugin = {
  install() {
      Vue.helpers = helpers
      Vue.prototype.$helpers = helpers
  }
}

Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
