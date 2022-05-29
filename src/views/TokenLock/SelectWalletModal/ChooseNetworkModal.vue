<template>
  <div class="text-center select-wallet">
    <v-dialog
      v-model="dialog"
      width="582"
      content-class="select-wallet"
      dialog-max-height="100"
      persistent
    >
      <v-card class="mx-auto">
        <v-card-title class="justify-center">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">
                Wrong Network!!
              </v-list-item-title>
              <v-list-item-subtitle>
                Please choose supported networks from the following:
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>

        <v-card-text>
          <v-btn
            v-for="(info, id) in allBlockchains"
            :key="id"
            elevation="0"
            width="502"
            height="60"
            class="mb-5"
            @click="switchNetwork(id, info)"
          >
            <v-img
              class="wallet-icon"
              lazy-src="@/assets/metamask.png"
              :src="info.icon"
              max-width="29"
              max-height="27"
              alt="icon"
            />
            <span class="button-text ml-2 mt-1 text-capitalize">{{
              info.chainName
            }}</span>
          </v-btn>
          <v-spacer />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import "./_selectwalletmodal.scss";
export default {
  name: "ChooseNetworkModal",
  props: {
    msg: String,
    dialog: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    allBlockchains() {
      return this.$store.state.base.blockChains;
    },
    blockchainId() {
      return this.$store.state.auth.chainId;
    },
  },
  methods: {
    switchNetwork(id, info) {
      this.$store.dispatch("switchNetwork", {
        networkID: id,
        networkInfo: info,
      });
    },
  },
};
</script>

