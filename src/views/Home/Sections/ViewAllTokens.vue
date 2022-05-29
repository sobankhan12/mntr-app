<template>
  <v-row>
    <v-col cols="" class="pa-0">
      <div
        class="view-all-tokens mb-5"
        :style="{
          background: $vuetify.theme.themes[theme].view_all_tokens_background,
        }"
      >
        <h3
          class="mb-4"
          :style="{ color: $vuetify.theme.themes[theme].view_all_tokens_text }"
        >
          View All Tokens
        </h3>
        <p
          class="mt-2"
          :style="{ color: $vuetify.theme.themes[theme].view_all_tokens_text }"
        >
          Here is an overview of the last ten tokens to be created through
          Mintr. Click on a token name to view more information about a project.
        </p>
        <div class="search">
          <v-text-field
            v-model="search"
            solo
            placeholder="Search for a token by name/address/contact"
            append-icon="mdi-magnify"
            class=""
            outlined
            persistent-hint
            autocomplete="off"
            :style="{ color: $vuetify.theme.themes[theme].text }"
          />
          <span
            class="help-text"
            :style="{
              color: $vuetify.theme.themes[theme].view_all_tokens_text,
            }"
            >To ensure the security of a token, please view the percentage of
            tokens/liquidity locked on the token details page. Using ‘Mint’ does
            not <br />
            guarantee security. You must personally verify the locks of each
            token.</span
          >
        </div>
      </div>
      <div class="view-token-grid mx-auto">
        <v-data-table
          :headers="headers"
          :items="dataList"
          :search="search"
          calculate-widths
          hide-default-footer
          mobile-breakpoint="300"
          item-key="token_address"
          class="elevation-0"
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
          ><template v-slot:[`item.contract_address`]="{ item }">
            <div class="text-container">
              <span class="text-align">{{ item.contract_address }}</span>
              <span
                style="cursor: pointer"
                @click="copyAddress(item.contract_address)"
              >
                <v-icon small color="#FE6F0A"
                  >mdi-clipboard-multiple-outline</v-icon
                >
              </span>
            </div>
          </template>
          <template v-slot:[`item.max_supply`]="{ item }">
            <div class="text-container">
              <span class="text-align">{{ item.max_supply }}</span>
            </div>
          </template>
          <template v-slot:[`item.capabilities`]="{ item }">
            <div class="text-container">
              <div class="capabilities-items d-flex align-center">
                <CapabilitiesIconListing :capabilities="item.capabilities" />
              </div>
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
          <template v-slot:footer v-if="dataList.length > 10">
            <v-btn
              class="mt-8 mb-8"
              height="50"
              width="173"
              color="primary"
              elevation="0"
              @click="continueToViewAllToken"
            >
              View All Tokens
            </v-btn>
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
    </v-col>
  </v-row>
</template>

<script>
import { getTokens } from "@/services/token.service";
import CapabilitiesIconListing from "@/components/CapabilitiesIconListing/CapabilitiesIconListing.vue";
import { COMMON_CONSTANTS } from "@/constants/common";
export default {
  name: "ViewAllTokens",
  components: { CapabilitiesIconListing },
  data() {
    return {
      search: null,
      timeout: 2000,
      dataList: [],
      headers: [
        { text: "Token Name", value: "name" },
        { text: "", value: "symbol", align: " d-none" },
        { text: "Blockchain Name", value: "blockchain_id" },
        { text: "Contract Address", value: "token_address" },
        { text: "Max Supply", value: "max_supply" },
        { text: "Capabilities", value: "capabilities" },
        { text: "", value: "view", width: "%10" },
      ],
      snackbar: false,
      text: `Contract Address Copied!`,
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
    this.getAllTokens();
  },
  methods: {
    continueToViewAllToken() {
      this.$router.push("/view-all-tokens");
    },
    copyAddress(val) {
      navigator.clipboard.writeText(val);
      this.snackbar = true;
    },
    // eslint-disable-next-line no-undef
    customFilter(value, search, item) {
      const { name, symbol, contract_address } = item;
      if (value === undefined || value == null) return false;
      return (
        (!!value &&
          search != null &&
          typeof value === "string" &&
          name &&
          value.toString().indexOf(search) !== -1) ||
        (symbol && value.toString().indexOf(search) !== -1) ||
        (contract_address && value.toString().indexOf(search) !== -1)
      );
    },

    getAllTokens() {
      this.loading = true;
      getTokens({ inComplete: false }).then(({ data }) => {
        this.dataList = data?.reverse();
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss">
@import "../_home.scss";
</style>
