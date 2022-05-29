<template>
  <v-dialog
    v-model="visible"
    max-width="515"
    height="313"
    content-class="verify-ether"
    persistent
    :retain-focus="false"
  >
    <v-card class="">
      <div class="close_container">
        <v-icon color="#FE6F0A" size="28" @click="closeWalletModal">
          mdi-close-circle
        </v-icon>
      </div>
      <v-card-text>
        <div v-if="success">
          <v-icon class="mb-7 mt-10 approve-icon" width="90" height="90">
            $approveIcon
          </v-icon>
          <h3
            class="mt-2 mb-6 text-center"
            :text-color="$vuetify.theme.themes[theme].text"
          >
            Requested Successfully
          </h3>

          <h5>Token will be verified by {{ blockchainName }} in few minutes</h5>
        </div>
        <div v-else>
          <v-img
            alt="Icon"
            src="@/assets/Group.png"
            max-width="90"
            max-height="90"
            class="mx-auto mt-10"
          />
          <h5
            class="mt-10 mb-10"
            :text-color="$vuetify.theme.themes[theme].text"
          >
            There is an issue while verifying your token contract. If you wish
            to verify it now then please select one option below.
            <!-- Your Token is not Verified on {{ blockchainName }} -->
          </h5>
          <div class="btn_container">
            <v-btn
              color="#FE6F0A"
              class="white--text mr-5"
              rounded
              width="133px"
              height="49px"
              :loading="loading"
              @click="getVerification(tokenAddress, blockId)"
            >
              Auto Verify
            </v-btn>
            <a
              :href="getNetworkUrl(`proxyContractChecker?a=${tokenAddress}`)"
              class="text-decoration-none"
              target="_blank"
            >
              <v-btn
                color="#FE6F0A"
                rounded
                width="133px"
                height="49px"
                outlined
                @click="verifyToken(tokenAddress, blockId)"
              >
                Manual Verify
              </v-btn>
            </a>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { verifyToken } from "../../services/token.service";

export default {
  name: "VerifyByEther",
  props: ["visible", "blockId", "tokenAddress"],
  data() {
    return {
      loading: false,
      success: false,
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        console.log(value, " onclose");
        if (!value) {
          this.$emit("close");
        }
      },
    },
    getNetworkUrl() {
      return (query) => {
        const blockchainList = this.$store.state.base.blockChains;
        return `${blockchainList[this.blockId]?.blockExplorerUrl}${query}`;
      };
    },
    blockchainName() {
      return (
        (this.$store.state.base.blockChains[this.blockId] &&
          this.$store.state.base.blockChains[this.blockId].chainName) ||
        "Ether"
      );
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    verifyToken,
    closeWalletModal() {
      this.$emit("close");
    },

    async getVerification(address, id) {
      this.loading = true;
      verifyToken(address, id).then((res) => {
        this.loading = false;
        this.success = true;
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./_tokenprofile.scss";
</style>
