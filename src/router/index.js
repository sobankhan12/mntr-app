import Vue from "vue";
import VueRouter from "vue-router";

import { routes } from './routes';
import store from "../store"
import {scrollToTop} from "../utils/helpers"

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
});
// global route guard
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isUserConnected) {
      next()
      return
    }
    store.dispatch('fillWalletModalStatus', true)
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  scrollToTop();
  next && next()
})
export default router;
