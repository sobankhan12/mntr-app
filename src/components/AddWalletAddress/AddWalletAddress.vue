<template>
  <v-col
    class="d-flex align-left flex-column"
    :class="initial ? 'mt-5 mr-16 ml-16 pl-4 pr-4' : ''"
  >
    <Confirm
      v-if="isDeleteModalOpen"
      :is-open="isDeleteModalOpen"
      content="Are you sure you want to delete it?"
      @handleConfirm="handleConfirm"
      @changeStatus="changeStatus"
    />
    <v-btn
      class="mintr-button__text mb-2"
      @click.stop
      @click="array.push({ text: '', value: '', isEdit: false })"
    >
      Enter Wallet Address
      <span class="wallet-add-icon">
        <v-icon medium left color="#fe6f0a">mdi-plus</v-icon></span
      >
    </v-btn>
    <div
      v-for="(item, index) in array"
      :key="index"
      class="wallet-input d-flex"
    >
      <v-text-field
        name="Wallet Adress"
        type="text"
        class="pb-0"
        height="300"
        placeholder="e.g “0x78ca4a9a1fec713..37e295ved48a473”"
        v-model="item.value"
        outlined
        :rules="[...walletAddressRules, ...[checkDuplication]]"
        @click.stop
        solo
      />
      <span
        v-if="item.isEdit"
        class="wallet-input-icon__edit"
        @click.stop
        @click="item.isEdit = false"
      >
        <v-icon medium left color="#B6B4B3">mdi-square-edit-outline</v-icon>
      </span>
      <span
        v-if="array.length > 0"
        class="wallet-input-icon__delete"
        @click.stop
        @click="changeStatus(true, index)"
      >
        <v-icon medium left color="#B6B4B3">mdi-trash-can-outline</v-icon>
      </span>
    </div>
    <div class="wallet-submit d-flex justify-end">
      <v-btn
        class="float-right mb-6 mt-0 d-flex"
        height="50"
        width="135"
        color="primary"
        elevation="0"
        @click.stop
        @click="handleSave(array)"
      >
        Save
      </v-btn>
    </div>
  </v-col>
</template>

<script>
import "../../stylesheets/components/buttons.scss";
import Confirm from "../ConfirmDialog/Confirm";
import { walletAddressRules } from "@/utils/validations";
import { CAPABILITIES_NAMES } from "../../constants/common";
export default {
  name: "AddWalletAddress",
  components: { Confirm },
  props: {
    initial: {
      required: false,
      default: true,
    },
    handleSave: {
      required: true,
    },
    addressList: {
      required: true,
      default: [],
    },
    formData: {
      required: true,
    },
    cap_name: {
      required: true,
    },
  },
  data() {
    return {
      array: this.addressList,
      isDeleteModalOpen: false,
      deletedIndex: null,
      walletAddressRules: walletAddressRules,
      CAPABILITIES_NAMES,
    };
  },
  watch: {
    addressList: function (newOne) {
      this.array = newOne;
    },
  },
  methods: {
    changeStatus(value, index) {
      this.deleteIndex = index;
      this.isDeleteModalOpen = value;
    },
    handleConfirm() {
      this.array.splice(this.deleteIndex, 1);
      this.isDeleteModalOpen = false;
    },
    checkDuplication(value) {
      if (this.cap_name === CAPABILITIES_NAMES.BLACKLIST) {
        if (
          this.formData?.whitelisted_wallets?.filter(
            (address) => address?.toUpperCase() === value?.toUpperCase()
          )?.length > 0
        ) {
          return "Wallet already Exist in Whitelist";
        }
      }

      if (this.cap_name === CAPABILITIES_NAMES.WHITELIST) {
        if (
          this.formData?.blacklisted_wallets?.filter(
            (address) => address?.toUpperCase() === value?.toUpperCase()
          )?.length > 0
        ) {
          return "Wallet already Exist in Blacklist";
        }
      }

      return this.array?.filter(
        (address) => address?.value?.toUpperCase() === value?.toUpperCase()
      )?.length > 1
        ? "Wallet already Exist"
        : true;
    },
  },
};
</script>

<style lang="scss">
.wallet-add-icon {
  margin-left: 8px;
  border: 1px solid #fe6f0a;
  display: flex;
  align-items: center;
  justify-content: center;
  .mdi-plus {
    margin: 0 !important;
    font-size: 14px !important;
    height: 14px !important;
    width: 14px !important;
  }
}
.wallet-input {
  position: relative;
  &-icon {
    &__edit {
      position: absolute;
      right: 50px;
      top: 12px;
      background: #f4f4f4;
      border-radius: 30px;
      height: 30px;
      width: 31px;
      padding: 3px 0px 0px 2px;
      font-size: 10px;
      border: 1px solid #c3c3c3;
    }
    &__delete {
      position: absolute;
      right: 10px;
      top: 12px;
      background: #f4f4f4;
      border-radius: 30px;
      height: 30px;
      width: 31px;
      padding: 3px 0px 0px 2px;
      font-size: 10px;
      border: 1px solid #c3c3c3;
    }
  }
}
.theme--dark {
  .wallet-input {
    &-icon{
      &__delete  {
       background: #3F4548 !important;
       border: 1px solid #788188 !important;
     }
    }
  }
}
</style>