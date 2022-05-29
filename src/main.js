import Vue from 'vue'

import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import i18n from "./i18n";
import VueGlide from "vue-glide-js";
import "vue-glide-js/dist/vue-glide.css";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@mdi/font/css/materialdesignicons.css'
import Cloudinary, { CldImage, CldTransformation } from "cloudinary-vue";
import VuetifyAsyncValidation from "vuetify-async-validation";
import App from './App.vue'

Vue.config.productionTip = false

// Async validation
Vue.use(VuetifyAsyncValidation)

Vue.use(Cloudinary, {
  configuration: {
    cloudName: process.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
    secure: true
  },
  components: [CldImage, CldTransformation]
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  VueGlide,
  render: h => h(App),
}).$mount('#app')
