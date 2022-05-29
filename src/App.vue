<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-main>
      <Nav />
      <v-container class="pa-0">
        <router-view />
      </v-container>
      <Loading v-if="isLoadingFromGlobal" :is-loading="isLoadingFromGlobal" />
      <Snackbar />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Nav from "@/components/Nav/Nav";
import Loading from "@/components/Loading/Loading";
import { mapGetters } from "vuex";
import Footer from "@/components/Footer/Footer";
import Moralis from "moralis";
// import { moralisAppID, moralisServerUrl } from "../config/api";
import { MORALIS } from "./constants/common";
import Snackbar from "./components/Snackbar/Snackbar";
export default {
  name: "App",
  components: {
    Snackbar,
    Nav,
    Loading,
    Footer,
  },
  computed: {
    ...mapGetters({
      isLoadingFromGlobal: "getLoading",
    }),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  created() {
    Moralis.start({
      serverUrl: MORALIS.other.moralisServerUrl,
      appId: MORALIS.other.moralisAppID,
    });
    this.$store.dispatch("connectMetamask", { connect: false });
  },
};
</script>

<style lang="scss" src="./stylesheets/_main.scss">
</style>
