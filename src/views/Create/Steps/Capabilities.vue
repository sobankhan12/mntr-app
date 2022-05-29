<template>
  <v-form
    v-if="stepName == 'Capabilities'"
    class="pa-4 pb-0"
    v-model="valid"
    :style="{
      borderTop: '1px solid ' + $vuetify.theme.themes[theme].border,
      borderRadius: '0px',
    }"
  >
    <v-container>
      <v-row class="mb-7">
        <h5
          class="mb-2 text-left"
          :text-color="$vuetify.theme.themes[theme].text"
        >
          Select capabilities for your token
        </h5>
        <small class="font-weight-light text-left"
          >Choose the additional functionality you want added to your smart
          contract code.</small
        >
      </v-row>
      <v-row
        class="mb-4"
        v-for="capability in capabilitiesList"
        :key="capability.id"
      >
        <Capability
          :key="capability.id"
          :data="capability"
          :selected="isSelected(capability)"
          :dataObject="formData"
          :transaction_fee_percentage="formData.transaction_fee_percentage"
        />
      </v-row>

      <v-row
        class="mr-0 ml-0 mt-10 d-flex justify-space-between capability-btns"
      >
        <!-- Back button  -->
        <v-btn
          class="float-left mb-6 mt-0"
          @click="back"
          outlined
          height="50"
          width="135"
          color="primary"
          elevation="0"
        >
          <v-icon left> $mdiArrowLeft </v-icon>
          Back
        </v-btn>
        <!-- Next button  -->
        <v-btn
          class="float-right mb-6 mt-0"
          v-if="formData.capabilities.length"
          height="50"
          width="135"
          color="primary"
          @click="save"
          :loading="loading"
          elevation="0"
        >
          Next
        </v-btn>
        <!-- Skip button  -->
        <v-btn
          class="float-right mb-6 mt-0"
          v-else
          height="50"
          width="135"
          color="primary"
          elevation="0"
          @click="next"
          :loading="loading"
        >
          Skip
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import EventBus from "@/components/EventBus";
import Capability from "@/components/Capability/Capability";
import { updateToken } from "@/services/token.service";
import { CAPABILITIES_NAMES } from "@/constants/common";
import { isValidPercentage } from "../../../utils/validations";
export default {
  name: "Capabilities",
  props: {
    stepName: {
      required: true,
    },
    dataObject: {
      required: true,
    },
  },
  components: {
    Capability,
  },
  data() {
    return {
      valid: true,
      loading: false,
      capabilitiesList: [
        {
          id: 1,
          name: CAPABILITIES_NAMES.TX_FEE,
          label: "Transaction Fee",
          hint: "Charge a fee for each transaction that takes place",
          icon: "transactionIcon",
          selected: false,
          value: null,
        },
        {
          id: 2,
          name: CAPABILITIES_NAMES.MINT,
          label: "Mint Capability",
          hint: "Add the ability to mint additional token.",
          icon: "mintIcon",
          selected: false,
          value: null,
        },
        {
          id: 3,
          name: CAPABILITIES_NAMES.BURN,
          label: "Burn Capability",
          hint: "Add the ability to burn your tokens. This is great for creating deflation.",
          icon: "burnIcon",
          selected: false,
          value: null,
        },
        {
          id: 4,
          name: CAPABILITIES_NAMES.SNAPSHOT,
          label: "Snapshot Capability",
          hint: "Add the capability to take a screenshot of the of minted token transaction wallets at anytime.",
          icon: "snapshotIcon",
          selected: false,
          value: null,
        },
        {
          id: 6,
          name: CAPABILITIES_NAMES.BLACKLIST,
          label: "Black Listing Capability",
          hint: "Add capability to prevent the shady wallets to make any transaction of your token.",
          icon: "gearsIcon",
          selected: false,
          value: null,
        },
        {
          id: 7,
          name: CAPABILITIES_NAMES.WHITELIST,
          label: "Pausing Capability",
          hint: "Add capability to either pause transactions for everyone or allow specific wallets to make transactions in mean time.",
          icon: "pauseIcon",
          selected: false,
          value: null,
        },
      ],
      formData: {
        capabilities: [],
        transaction_fee_percentage: 0,
        nominated_wallet: this.$store.state.auth?.ethAddress,
        blacklisted_wallets: [],
        whitelisted_wallets: [],
      },
    };
  },
  methods: {
    save() {
      if (this.formData.id) {
        if (this.formData.info_level <= 3) {
          this.formData.info_level = 4;
        }
        if (
          this.formData.capabilities?.includes(CAPABILITIES_NAMES.TX_FEE) &&
          isValidPercentage(this.formData.transaction_fee_percentage)
        ) {
          EventBus.$emit("TRANSACTION_FEE_VALIDATION");
          // transaction_fee_percentage validation
          return;
        }
        this.loading = true;

        if (
          !this.formData.capabilities?.includes(CAPABILITIES_NAMES.BLACKLIST)
        ) {
          this.formData.blacklisted_wallets = [];
        }
        if (
          !this.formData.capabilities?.includes(CAPABILITIES_NAMES.WHITELIST)
        ) {
          this.formData.whitelisted_wallets = [];
        }

        updateToken({ ...this.formData })
          .then((response) => {
            this.formData = response?.data;
            this.loading = false;
            EventBus.$emit("NEXT", 3, this.formData);
          })
          .catch((error) => {
            this.loading = false;
            console.log(error, "Error while updating token");
          });
      }
    },
    back() {
      EventBus.$emit("PREVIOUS", 3);
    },
    next() {
      EventBus.$emit("NEXT", 3);
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    isSelected() {
      return (value) => {
        // console.log(this.formData?.capabilities,'capability',value, this.formData?.capabilities?.includes(value?.name));
        return this.formData?.capabilities?.includes(value?.name);
      };
    },
  },
  mounted() {
    EventBus.$on("UPDATE_FORM_DATA", (key, value) => {
      this.formData[key] = value;
    });
  },
  watch: {
    dataObject: function (newOne) {
      // console.log(this.formData, "new one", newOne);
      this.formData = Object.assign({}, this.formData, newOne);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../_create";
</style>
