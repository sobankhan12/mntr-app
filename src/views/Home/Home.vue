<template>
  <div id="home" class="mt-8 mb-14">
    <v-container>
      <v-row>
        <v-col cols="">
          <div class="intro">
            <h3
              :style="{ color: $vuetify.theme.themes[theme].text }"
              class="hidden-xs-only"
            >
              Create your Token on
              <span style="color: #fe6f0a"> BSC, Ethereum & Polygon</span>
              <br />with no coding required
            </h3>
            <h3
              :style="{ color: $vuetify.theme.themes[theme].text }"
              class="hidden-sm-and-up"
            >
              Create your Token on <br />
              <span style="color: #fe6f0a"> BSC, Ethereum & Polygon</span> with
              <br />
              no coding required.
            </h3>
            <p
              class="mt-5 hidden-xs-only"
              :style="{ color: $vuetify.theme.themes[theme].p_text }"
            >
              Mintr makes it safe & easy for you to mint and store your token that you can <br /> send, receive, stake and swap on ETH, BSC and Polygon.
            </p>
            <p
              class="mt-5 hidden-sm-and-up"
              :style="{ color: $vuetify.theme.themes[theme].p_text }"
            >
               Mintr makes it safe & easy for you to mint and store your token that you can send, receive, stake and swap on ETH, BSC and Polygon
            </p>
            <div class="intro-btn mt-10">
              <v-btn
                class="mr-5"
                height="50"
                width="173"
                color="primary"
                elevation="0"
                @click="continueTOCreateToken"
              >
                Create Token
              </v-btn>
              <v-btn
                class=""
                outlined
                height="50"
                width="173"
                color="primary"
                elevation="0"
                @click="continueToAdvanceFeatures"
              >
                Explore Features
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <VideoAndImage />
      <Features />
      <!-- <OurProjects /> -->
      <CustomToken />
      <AboutUs />
      <ViewAllTokens />
      <SubscribeToEmail />
      <!-- <Testimonial /> -->
    </v-container>
  </div>
</template>

<script>
import Features from "./Sections/Features";
import VideoAndImage from "./Sections/VideoAndImage.vue";
// import OurProjects from "./Sections/OurProjects.vue";
import CustomToken from "./Sections/CustomToken.vue";
import AboutUs from "./Sections/AboutUs.vue";
import SubscribeToEmail from "./Sections/SubscribeToEmail";
// import Testimonial from "./Sections/Testimonial.vue";
import ViewAllTokens from "./Sections/ViewAllTokens.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Features,
    VideoAndImage,
    // OurProjects,
    CustomToken,
    AboutUs,
    SubscribeToEmail,
    // Testimonial,
    ViewAllTokens,
  },
  methods: {
    continueTOCreateToken() {
      // if(this.isUserConnected){
      this.$router.push("/mint-token");
      // }else{
      //   this.$store.dispatch('fillWalletModalStatus', true)
      // }
    },
    continueToAdvanceFeatures() {
      this.$router.push("/advance-features");
    },
  },
  computed: {
    ...mapGetters({
      showWalletModal: "getWalletModalIsOpen",
      isUserConnected: "isUserConnected",
    }),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./_home.scss";
</style>
