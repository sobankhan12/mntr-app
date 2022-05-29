<template>
  <v-form
    class="pa-4 pb-0 summary-confirmation"
    v-model="valid"
    :style="{
      borderTop: '1px solid ' + $vuetify.theme.themes[theme].border,
      borderRadius: '0px',
    }"
  >
    <v-container>
      <v-row class="mb-14 mt-3 d-flex align-center">
        <v-icon class="mb-7 mt-2 approve-icon" width="90" height="90">
          $approveIcon
        </v-icon>
        <h3
          class="mt-2 mb-6 text-center"
          :text-color="$vuetify.theme.themes[theme].text"
        >
          <span v-if="!isConfirm">Approve minting</span>
          <span v-if="isConfirm">Successfully Minted</span>
          Token
        </h3>
      </v-row>

      <v-row class="mb-0 mt-6 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Mint Transaction ID:</v-col>
        <v-col
          class="text-right"
          v-if="formData && formData.mint_transaction_id"
          ><div class="d-flex justify-content-end">
            <a
              target="_blank"
              :href="getNetworkUrl(`tx/${formData.mint_transaction_id}`)"
              >{{ getShorterText(formData.mint_transaction_id, 20) }}
            </a>
            <span
              style="cursor: pointer"
              class="ml-1"
              @click="copyAddress(formData.mint_transaction_id)"
            >
              <v-icon small> mdi-clipboard-multiple-outline</v-icon>
            </span>
          </div>
        </v-col>
        <v-col v-else class="text-right">{{ "---" }}</v-col>
      </v-row>
      <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Token Address</v-col>

        <v-col class="text-right" v-if="formData && formData.token_address">
          <div class="d-flex justify-content-end">
            <a
              target="_blank"
              :href="getNetworkUrl(`token/${formData.token_address}`)"
              >{{ formData && formData.token_address }}
            </a>
            <span
              style="cursor: pointer"
              class="ml-1"
              @click="copyAddress(formData.token_address)"
            >
              <v-icon small> mdi-clipboard-multiple-outline</v-icon>
            </span>
          </div>
        </v-col>

        <v-col class="text-right" v-else>{{ "---" }}</v-col>
      </v-row>
      <!-- <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
				<v-col class="text-left">Mint Block</v-col>
				<v-col class="text-right">---</v-col>
			</v-row> -->
      <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Blockchain(s) Name</v-col>
        <v-col class="text-right">{{
          (allBlockchains[blockchainId] &&
            allBlockchains[blockchainId].chainName) ||
          "---"
        }}</v-col>
      </v-row>
      <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Token Name & Symbol</v-col>
        <v-col class="text-right">
          {{ (formData && formData.name) || "---" }}
          {{
            formData && formData.symbol ? "(" + formData.symbol + ")" : "---"
          }}
        </v-col>
      </v-row>
      <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Max. Supply</v-col>
        <v-col class="text-right">{{
          (formData && numberWithCommas(formData.max_supply)) || "---"
        }}</v-col>
      </v-row>
      <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Mintr fee</v-col>
        <v-col class="text-right">{{
          (formData && formData.mintr_fee) || 0
        }}</v-col>
      </v-row>
      <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Auditor fee</v-col>
        <v-col class="text-right">{{
          (formData && formData.auditor_fee) || 0
        }}</v-col>
      </v-row>
      <v-row class="mb-0 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Decimal</v-col>
        <v-col class="text-right">{{
          formData ? formData.decimals : "---"
        }}</v-col>
      </v-row>
      <v-row class="mb-10 mt-0 d-flex flex-row justify-space-between mr-3 ml-3">
        <v-col class="text-left">Capabilities</v-col>
        <v-col
          class="text-right"
          v-if="
            formData &&
            formData.capabilities &&
            formData.capabilities.length < 0
          "
          >---</v-col
        >
        <v-col
          class="
            text-right
            d-flex
            align-center
            justify-end
            pa-0
            overflow-visible
          "
          v-else
        >
          <div>
            <CapabilitiesIconListing
              :capabilities="(formData && formData.capabilities) || []"
            />
          </div>
        </v-col>
      </v-row>

      <Dialog
        v-if="loading.status"
        :loading="loading"
        @changeLoadingStatus="changeLoadingStatus"
      ></Dialog>

      <!-- Summary options -->
      <v-row v-if="!isConfirm" class="d-flex justify-center">
        <v-btn
          class="ma-3 mt-0 mb-6"
          outlined
          @click="
            back();
            isConfirm = false;
          "
          :style="{ border: 'none' }"
          height="50"
          width="60"
          color="primary"
          elevation="0"
        >
          <v-icon left> $mdiArrowLeft </v-icon>
          Back
        </v-btn>
        <v-btn
          class="ma-3 mt-0 mb-6"
          height="50"
          width="135"
          color="primary"
          elevation="0"
          @click="confirm"
        >
          Confirm
        </v-btn>
      </v-row>
      <div v-else class="d-flex confirm-footer">
        <a
          :href="getNetworkUrl(`tx/${formData.mint_transaction_id}`)"
          target="_blank"
          class="text-decoration-none"
          v-if="formData.mint_transaction_id"
        >
          <v-btn
            text
            width="250"
            height="55"
            :style="{ background: $vuetify.theme.themes[theme].ether_btn }"
            class="
              d-flex
              v-btn v-btn v-btn--has-bg
              mintr-dialog__footer--confirm
              theme--light
              elevation-0
              ether
              v-size--default
              mr-4
            "
          >
            <v-img
              src="@/assets/ether.png"
              max-width="30"
              contain
              class="mr-4 mb-8 mt-8"
            ></v-img>
            Ether scan transaction
          </v-btn>
        </a>

        <v-btn
          class="ma-3 mt-0 mb-6"
          height="55"
          width="233"
          color="primary"
          :disabled="!(formData && formData.token_address)"
          @click="
            $router.push(`/token-profile/${formData && formData.token_address}`)
          "
          elevation="0"
        >
          View Mint Profile <v-icon right> $mdiArrowRight </v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import EventBus from "@/components/EventBus";
import Dialog from "../../../components/Dialog";
import CapabilitiesIconListing from "@/components/CapabilitiesIconListing/CapabilitiesIconListing.vue";
import { deployContract } from "@/services/web3.service";
import { getShorterText, numberWithCommas } from "../../../utils/helpers";
export default {
  name: "Summary",
  components: { Dialog, CapabilitiesIconListing },
  props: {
    data: Object,
    dataObject: {
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      summary: this.data,
      isConfirmLoading: false,
      isConfirm: false,
      formData: {},
      loading: {
        msg: ``,
        description: "",
        tx_url: null,
        status: false,
      },
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    isCapabilityInluded() {
      return (capabilityName) => {
        return this.formData?.capabilities?.includes(capabilityName);
      };
    },
    allBlockchains() {
      return this.$store.state.base.blockChains;
    },
    blockchainId() {
      return this.$store.state.auth.chainId;
    },
    getNetworkUrl() {
      return (query) => {
        const blockchainList = this.$store.state.base.blockChains;
        return `${
          blockchainList[this.formData?.blockchain_id]?.blockExplorerUrl
        }${query}`;
      };
    },
  },
  methods: {
    getShorterText,
    numberWithCommas,
    copyAddress(txt) {
      navigator.clipboard.writeText(txt);
      this.$store.dispatch("createSnackBar", {
        message: "copied",
      });
    },
    back() {
      EventBus.$emit("PREVIOUS", 5);
    },
    changeLoadingStatus(loadingState) {
      this.loading = {
        ...this.loading,
        ...loadingState,
      };
    },
    async confirm() {
      this.formData.blockchain_id = this.$store?.state?.auth?.chainId;
      // Deploy contract/Token on Blockchain
      const contract = await deployContract(
        this.formData,
        this.changeLoadingStatus
      );

      this.changeLoadingStatus({ status: false });
      if (!contract) {
        return;
      }
      EventBus.$emit("MINT_COMPLETE", contract.token_address);
      this.isConfirm = true;
      this.formData = contract;
    },
    handlePageLeave() {},
  },
  created() {
    const confirmExit = () => window.confirm("Reload?");

    window.addEventListener("beforeunload", (evt) => {
      if (this.loading?.status && !confirmExit()) {
        evt.preventDefault();
        evt.returnValue = true;
      }
    });
  },
  watch: {
    dataObject: function (newOne) {
      this.formData = newOne;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../_create.scss";
.summary-confirmation {
  .capabilities-items {
    &__item {
      border: 1px solid #d9d7d7;
      box-sizing: border-box;
      border-radius: 2px;
      height: 25px;
      width: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      cursor: pointer;
    }
  }
  .mintr-dialog__footer--confirm {
    // background: #f2f2f2 !important;
    // background-color: #f2f2f2 !important;
    // border: 1px solid #dadada !important;
    box-sizing: border-box;
    border-radius: 8px;
    // min-width: 150px !important;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #5c6166 !important;
    padding: 16px;
  }
  .confirm-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .ether {
      background: #f2f2f2;
      border: 1px solid #dadada;
    }
  }
}
.theme--dark {
  .summary-confirmation {
    .mintr-dialog__footer--confirm {
      border: 1px solid #7f8284 !important;
      color: #dae2e9 !important;
    }
    .confirm-footer {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .ether {
        background: #3f4548 !important;
        border: 1px solid #7f8284 !important;
      }
    }
  }
}
</style>