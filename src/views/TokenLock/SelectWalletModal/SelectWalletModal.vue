<template>
  <div class="text-center select-wallet">
    <v-dialog
      v-model="dialog"
      max-width="582"
      content-class="select-wallet"
      dialog-max-height="100"
      :fullscreen= isMobile()
      persistent
    >
      <v-icon
        right
        color="#FE6F0A"
        size="28"
        @click="closeWalletModal"
      >
        mdi-close-circle
      </v-icon>
      <v-card class="mx-auto">
        <v-card-title class="justify-center">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">
                <v-img
                  alt="Icon"
                  src="@/assets/wallet_orange.png"
                  max-width="25"
                  max-height="25"
                  class="mr-3"
                />
                {{ disconnect?'Would you like to disconnect wallet?':'Choose a Wallet to Connect' }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>

        <v-card-text>
          <span v-show="!isWalletExtension" class="text-danger wallet-warn pb-2" ref="walletWarn">Please install MetaMask wallet browser extension to proceed!</span>
          <v-btn
            elevation="0"
            width="75%"
            height="60"
            class="mb-5"
            @click="connectMetamask"
          >
            <v-img
              class="wallet-icon"
              lazy-src="@/assets/metamask.png"
              src="@/assets/metamask.png"
              max-width="29"
              max-height="27"
              alt="icon"
            />
            <span class="button-text ml-2 mt-1 text-capitalize">Metamask</span>
          </v-btn>
          <v-spacer />
          <!--WalletConnect Conection-->
          <!-- <v-btn
            elevation="0"
            width="75%"
            height="60"
            @click="connectWalletConnect"
          >
            <v-img
              class="wallet-icon"
              src="@/assets/walletconnect-logo.png"
              max-width="29"
              max-height="27"
              alt="icon"
            />
            <span class="button-text ml-2 mt-1 text-capitalize">WalletConnect</span>
          </v-btn> -->
          <v-spacer :class="disconnect?'':'bottom-space'" />
        </v-card-text>

        <v-card-actions
          v-if="disconnect"
          class="justify-center spacing"
        >
          <v-spacer />
          <v-btn
            color="#FE6F0A"
            class="white--text"
            rounded
            width="200px"
            height="50px"
            @click="disconnectWallet"
          >
            Disconnect Wallet
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import "./_selectwalletmodal.scss";
export default {
  name: "SelectWalletModal",
  props: {
    msg: String,
    dialog:Boolean
  },
  data () {
    return {
      // dialog: false,
      isWalletExtension : true
    }
  },
  computed: {
    disconnect () {
      return this.$store.state.auth.user ? true : false
    }
  },
  methods: {
    //Close the Modal if click on the close button
    closeWalletModal () {
      this.$emit("modalDisplay", false);
    },

    //Connect website to Metamask
     connectMetamask () {
      let self = this;
      this.isWalletExtension = true;
      this.$store.dispatch("connectMetamask", {callback: self.closeWalletModal})
      .catch(e => {
        console.log(e)
        //handle no wallet attached exception here
        this.isWalletExtension = false;
      });
    },
    //Connect website to WalletConnect
    async connectWalletConnect () {
      this.$store.dispatch("ethereum/connectWalletConnect");
    },

    //Discconnect the wallet  
    async disconnectWallet () {
      this.$store.dispatch("disConnectMetamask",this.closeWalletModal);
      if(['/mint-token', '/my-tokens'].includes(this.$route.path)){
      this.$router.push('/')
      }
    },
    isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
    }
  }
}
</script>

