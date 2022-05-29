<template>
  <div id="my-token" class="mb-14 my-token">
    <div class="my-token-header">
      <h1 class="header" :loading="loading">View All Tokens</h1>
      <p class="content-text">
        Take a look at every bespoke token smart contract successfully coined
        through Mintr. Click on a project to view its profile and learn more
        about it.
      </p>
      <div class="search">
        <v-text-field
          v-model="search"
          solo
          label="Search Tokens Here....."
          append-icon="mdi-magnify"
          class="search-field"
          height="300"
          outlined
          persistent-hint
          :style="{ color: $vuetify.theme.themes[theme].text }"
        />
      </div>
    </div>
    <div class="datatable">
      <v-data-table
        :headers="headers"
        :items="dataList"
        :search="search"
        item-key="token_address"
        class="elevation-0"
        :loading="loading"
        mobile-breakpoint="300"
        :style="{
          background:
            $vuetify.theme.themes[theme].view_all_tokens_grid_background,
        }"
      >
        <template v-slot:[`item.name`]="{ item }">
          <div class="text-container">
            <div class="d-flex">
              <cld-image
                v-if="item.logo"
                :cloud-name="cloudName"
                :public-id="item.logo"
                height="30"
              >
                <cld-transformation radius="max" />
                <cld-transformation width="30" height="30" crop="scale" />
              </cld-image>
              <!-- <v-img
                v-else
                alt="Icon"
                src="@/assets/pok-logo.png"
                max-width="30"
                max-height="30"
                class=""
              /> -->
              <div class="d-flex flex-column ml-2">
                <span
                  :style="{ color: $vuetify.theme.themes[theme].text }"
                  class="token-name"
                  >{{ item.name }}</span
                >
                <span class="token-name__short">{{ item.symbol }}</span>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:[`item.blockchain_id`]="{ item }">
          <div class="text-container">
            <div class="d-flex align-items-center">
              <v-img
                alt=""
                :src="
                  allBlockchains[item.blockchain_id] &&
                  allBlockchains[item.blockchain_id].icon
                "
                class="cap-logo"
              />
              <span class="text-align">{{
                allBlockchains[item.blockchain_id] &&
                allBlockchains[item.blockchain_id].chainName
              }}</span>
            </div>
          </div> </template
        ><template v-slot:[`item.token_address`]="{ item }">
          <div class="text-container">
            <span class="text-align">{{ item.token_address }}</span>
            <span
              style="cursor: pointer"
              @click="copyAddress(item.token_address)"
            >
              <v-icon small color="#FE6F0A" class="ml-2"
                >mdi-clipboard-multiple-outline</v-icon
              >
            </span>
          </div>
        </template>
        <template v-slot:[`item.max_supply`]="{ item }">
          <div class="text-container">
            <span class="text-align">
              {{ numberWithCommas(item.max_supply) }}
            </span>
          </div>
        </template>
        <template v-slot:[`item.capabilities`]="{ item }">
          <div class="text-container">
            <CapabilitiesIconListing :capabilities="item.capabilities" />
          </div>
        </template>
        <template v-slot:[`item.view`]="{ item }">
          <div class="text-container view">
            <router-link
              :to="`/token-profile/${item.token_address}`"
              class="text-decoration-none"
            >
              <span class="text-align"
                >{{ item.view }}View
                <v-icon small left color="#FE6F0A">mdi-eye</v-icon></span
              >
            </router-link>
          </div>
        </template>
      </v-data-table>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="#FD791C">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="#ffffff" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
// import store from "@/store";
import { getTokens } from "@/services/token.service";
import CapabilitiesIconListing from "@/components/CapabilitiesIconListing/CapabilitiesIconListing.vue";
import { COMMON_CONSTANTS } from "@/constants/common";
import { getShorterNumber, numberWithCommas } from "@/utils/helpers";
export default {
  name: "MyToken",
  components: { CapabilitiesIconListing },
  data() {
    return {
      search: null,
      dataList: [],
      loading: true,
      timeout: 2000,
      snackbar: false,
      text: `Contract Address Copied!`,
      headers: [
        { text: "Token Name", value: "name" },
        { text: "", value: "symbol", align: " d-none" },
        { text: "Blockchain Name", value: "blockchain_id", filterable: false },
        { text: "Contract Address", value: "token_address", width: 390 },
        { text: "Max Supply", value: "max_supply", filterable: false },
        { text: "Capabilities", value: "capabilities" },
        { text: "", value: "view", width: 96 },
      ],
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    allBlockchains() {
      return this.$store.state.base.blockChains;
    },
    cloudName() {
      return COMMON_CONSTANTS.CLOUDINARY_CLOUD_NAME;
    },
  },
  mounted() {
    this.image = "'img/my-token-background'";
    this.getAllTokens();
  },
  methods: {
    getShorterNumber,
    numberWithCommas,
    getAllTokens() {
      this.loading = true;
      getTokens({ inComplete: false }).then(({ data }) => {
        this.dataList = data?.reverse();
        this.loading = false;
      });
    },
    copyAddress(val) {
      navigator.clipboard.writeText(val);
      this.$store.dispatch("createSnackBar", {
        message: "copied",
      });
    },
  },
};
</script>

<style lang="scss">
@import "./_viewAllTokens.scss";
</style>
