
<template>
  <v-form ref="addressForm" lazy-validation>
    <div class="capability">
      <v-card
        class="pa-5 b-0 d-flex flex-column"
        :style="{ background: $vuetify.theme.themes[theme].cap_card }"
        min-height="100"
        background="primary"
        outlined
        @click="toggle"
        :elevation="0"
      >
        <v-row class="d-flex flex-row justify-space-between align-center">
          <v-col
            class="flex-grow-0 pa-3 ml-3 d-flex align-center"
            :style="{
              border: '1px solid ' + $vuetify.theme.themes[theme].primary,
              borderRadius: '50%',
            }"
            width="60"
          >
            <template>
              <v-icon v-if="data.icon == 'transactionIcon'"
                >$vuetify.icons.transactionIcon</v-icon
              >
              <v-icon v-if="data.icon == 'mintIcon'"
                >$vuetify.icons.mintIcon</v-icon
              >
              <v-icon v-if="data.icon == 'burnIcon'"
                >$vuetify.icons.burnIcon</v-icon
              >
              <v-icon v-if="data.icon == 'snapshotIcon'"
                >$vuetify.icons.snapshotIcon</v-icon
              >
              <v-icon v-if="data.icon == 'whitelistIcon'"
                >$vuetify.icons.whitelistIcon</v-icon
              >
              <v-icon v-if="data.icon == 'gearsIcon'"
                >$vuetify.icons.gearsIcon</v-icon
              >
              <v-icon v-if="data.icon == 'pauseIcon'"
                >$vuetify.icons.pauseIcon</v-icon
              >
            </template>
          </v-col>
          <v-col class="flex-grow-1 mr-2">
            <v-card-title class="mb-0 pa-0">
              {{ data.label }}
            </v-card-title>
            <v-card-text class="text-left pa-0">
              {{ data.hint }}
            </v-card-text>
          </v-col>
          <v-col
            class="flex-grow-0 pa-1 mr-3 d-flex align-center"
            :style="{
              border: '2px solid ' + $vuetify.theme.themes[theme].border,
              borderRadius: '50%',
              backgroundColor: $vuetify.theme.themes[theme].background,
            }"
            :class="{ checked: checked }"
            width="60"
          >
            <v-icon small v-if="!checked">$vuetify.icons.tickIcon</v-icon>
            <v-icon small v-if="checked">$vuetify.icons.tickIconWhite</v-icon>
          </v-col>
        </v-row>

        <!-- Transaction Fee -->
        <v-row v-if="data.name == CAPABILITIES_NAMES.TX_FEE && checked">
          <v-col
            class="mt-5 mr-16 ml-16 pl-4 pr-4 d-flex align-left flex-column"
          >
            <v-label class="text-left">Tax Percentage</v-label>
            <v-text-field
              v-on:click.stop
              :value="dataObject.transaction_fee_percentage"
              :rules="[(v) => validations.isValidPercentage(v)]"
              @input="onInput"
              name="Tax Percentage"
              type="number"
              class="pb-0"
              height="300"
              placeholder="e.g “1”"
              outlined
              suffix="%"
              solo
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="data.name == CAPABILITIES_NAMES.TX_FEE && checked">
          <v-col class="mr-16 ml-16 pl-4 pr-4 d-flex align-left flex-column">
            <v-label class="text-left">Nominated Wallet</v-label>
            <v-text-field
              disabled
              v-on:click.stop
              :value="dataObject.nominated_wallet"
              :rules="[
                (v) => validations.walletAddress(v),
                (v) => validations.required(v, 'Please enter Wallet address'),
              ]"
              @input="onNominateInput"
              name="nominated_wallet"
              class="pb-0"
              height="300"
              placeholder="e.g “0x45F9E983D7f9d52a14DFE5f1728A408c4226d1BA”"
              outlined
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="data.name == CAPABILITIES_NAMES.BLACKLIST && checked">
          <v-col
            class="mt-5 mr-16 ml-16 pl-4 pr-4 d-flex align-left flex-column"
          >
            <AddWalletAddress
              :initial="false"
              :handleSave="handleSave"
              :formData="formData"
              :addressList="addressList"
              :cap_name="data.name"
            />
          </v-col>
        </v-row>
        <v-row v-if="data.name == CAPABILITIES_NAMES.WHITELIST && checked">
          <v-col
            class="mt-5 mr-16 ml-16 pl-4 pr-4 d-flex align-left flex-column"
          >
            <h5 class="text-left">White Listing Capability</h5>
            <AddWalletAddress
              :initial="false"
              :handleSave="handleSave"
              :formData="formData"
              :addressList="addressList"
              :cap_name="data.name"
            />
          </v-col>
        </v-row>
      </v-card>
      <!-- {{checked}} -->
    </div>
  </v-form>
</template>

<script>
import EventBus from "@/components/EventBus";
import AddWalletAddress from "../AddWalletAddress/AddWalletAddress";
import "../../stylesheets/components/radio.scss";
import { CAPABILITIES_NAMES } from "../../constants/common";
import * as validations from "@/utils/validations";
export default {
  name: "Capability",
  components: { AddWalletAddress },
  props: {
    selected: Boolean,
    data: Object,
    transaction_fee: String,
    dataObject: Object,
  },
  data() {
    return {
      checked: this.selected,
      radioGroup: 1,
      formData: {},
      CAPABILITIES_NAMES: CAPABILITIES_NAMES,
      validations,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    addressList() {
      let array = [];
      let dataArr = this.formData?.blacklisted_wallets;
      if (this.data.name == CAPABILITIES_NAMES.WHITELIST) {
        dataArr = this.formData?.whitelisted_wallets;
      }
      for (let item of dataArr) {
        array.push({ text: "", value: item, isEdit: false });
      }
      return array;
    },
  },
  methods: {
    toggle() {
      this.checked = !this.checked;

      if (this.checked) {
        EventBus.$emit("ADD_CAPABILITY", this.data.name);
      }
      if (!this.checked) {
        EventBus.$emit("REMOVE_CAPABILITY", this.data.name);
      }
    },
    onInput(event) {
      EventBus.$emit("UPDATE_FORM_DATA", "transaction_fee_percentage", event);
    },
    onNominateInput(event) {
      EventBus.$emit("UPDATE_FORM_DATA", "nominated_wallet", event);
    },
    handleSave(dataArray) {
      if (!this.$refs.addressForm?.validate()) return;
      let addresses = [];
      for (const item of dataArray) {
        addresses.push(item.value);
      }
      if (this.data.name == CAPABILITIES_NAMES.BLACKLIST) {
        EventBus.$emit("UPDATE_FORM_DATA", "blacklisted_wallets", addresses);
      } else {
        EventBus.$emit("UPDATE_FORM_DATA", "whitelisted_wallets", addresses);
      }
    },
    updateRadio(value) {
      EventBus.$emit(
        "UPDATE_FORM_DATA",
        "pause_for_everyone",
        value == 1 ? true : false
      );
    },
  },
  watch: {
    selected: function (newOne) {
      this.checked = newOne;
    },
    dataObject: function (newOne) {
      this.radioGroup = !newOne.pause_for_everyone ? 2 : 1;
      this.formData = Object.assign({}, this.formData, newOne);
      // this.formData = newOne;
    },
  },
  mounted() {
    EventBus.$on("TRANSACTION_FEE_VALIDATION", () => {
      this.$refs.addressForm?.validate();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "./_capability.scss";
</style>



