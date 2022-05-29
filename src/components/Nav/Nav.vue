<template>
  <div>
    <v-app-bar
      id="nav"
      dense
      height="85"
      elevation="0"
      :style="{
        borderBottom: '1px solid ' + $vuetify.theme.themes[theme].border,
      }"
      :color="$vuetify.theme.themes[theme].background"
    >
      <v-app-bar-nav-icon
        class="hidden-md-and-up nav-drawer"
        @click="drawer = true"
      />
      <v-container>
        <v-row class="ma-0">
          <v-col class="pa-0 d-flex justify-start align-center flex-grow-0">
            <v-img
              v-if="theme == 'light'"
              class="mr-6 hidden-xs-only hidden-sm-only logo"
              src="@/assets/mintr-light.png"
              max-width="160"
              contain
              @click="moveToHome"
            />
            <v-img
              v-if="theme == 'dark'"
              class="mr-6 hidden-xs-only hidden-sm-only logo"
              src="@/assets/mintr-dark.png"
              max-width="160"
              contain
              @click="moveToHome"
            />
          </v-col>
          <v-col class="pa-0 d-flex justify-center align-center flex-grow-1">
            <v-img
              v-if="theme == 'light'"
              class="hidden-md-and-up logo"
              src="@/assets/mintr-light.png"
              max-width="113"
              contain
              @click="moveToHome"
            />
            <v-img
              v-if="theme == 'dark'"
              class="hidden-md-and-up logo"
              src="@/assets/mintr-dark.png"
              max-width="113"
              contain
              @click="moveToHome"
            />
          </v-col>
          <v-col
            class="
              pa-0
              d-flex
              justify-end
              align-center
              flex-grow-0
              nav-links
              text-nowrap
            "
          >
            <router-link
              :to="'/my-tokens'"
              class="text-decoration-none mr-10 hidden-xs-only hidden-sm-only"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              <span>My Token</span>
            </router-link>
            <router-link
              to="/view-all-tokens"
              class="text-decoration-none mr-10 hidden-xs-only hidden-sm-only"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              View All Tokens
            </router-link>
            <!-- <router-link
              to="/"
              class="text-decoration-none mr-10 hidden-xs-only hidden-sm-only"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              Token Calcu.
            </router-link> -->
            <!-- <router-link
              to="/"
              class="text-decoration-none mr-10 hidden-xs-only hidden-sm-only"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              Help
            </router-link> -->

            <v-btn
              class="ma-0 mr-6 hidden-xs-only hidden-sm-and-down"
              height="40"
              width="190"
              color="primary"
              elevation="0"
              @click="modalDisplay(true)"
            >
              <div v-if="!isUserConnected">
                <TextAndIcon>
                  <template v-slot:text> Connect to a wallet </template>
                  <template v-slot:icon> $mdiWalletOutline </template>
                </TextAndIcon>
              </div>
              <div v-else class="logout">
                <span class="mr-2">{{ getShortEthAddress }}</span>
                <div class="logout-icon">
                  <img
                    class="icon"
                    height="16"
                    width="20"
                    src="../../assets/sign-out-alt.svg"
                  />
                </div>
              </div>
            </v-btn>
            <v-switch
              v-model="$vuetify.theme.dark"
              class="ma-0 mt-1"
              elevation="3"
              inset
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="hidden-md-and-up"
    >
      <v-list nav dense>
        <v-list-item-group v-model="activeNav">
          <v-list-item value="/my-tokens">
            <router-link
              to="/my-tokens"
              class="text-decoration-none"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              <v-list-item-title>My Token</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item value="/view-all-tokens">
            <router-link
              to="/view-all-tokens"
              class="text-decoration-none"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              <v-list-item-title>View All Tokens</v-list-item-title>
            </router-link>
          </v-list-item>
          <!-- <v-list-item>
            <router-link
              to="/"
              class="text-decoration-none"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              <v-list-item-title>Token Calcu.</v-list-item-title>
            </router-link>
          </v-list-item> -->
          <!-- <v-list-item>
            <router-link
              to="/"
              class="text-decoration-none"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              <v-list-item-title>Help</v-list-item-title>
            </router-link>
          </v-list-item> -->
          <v-list-item>
            <v-btn
              class="ma-0 mt-6"
              height="40"
              width="190"
              color="primary"
              elevation="0"
              @click="modalDisplay(true)"
            >
              <div v-if="!isUserConnected">
                <TextAndIcon>
                  <template v-slot:text> Connect to a wallet </template>
                  <template v-slot:icon> $mdiWalletOutline </template>
                </TextAndIcon>
              </div>
              <div v-else class="logout">
                <span class="mr-2">{{ getShortEthAddress }}</span>
                <div class="logout-icon">
                  <img
                    class="icon"
                    height="16"
                    width="20"
                    src="../../assets/sign-out-alt.svg"
                  />
                </div>
              </div>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <SelectWalletModal :dialog="showWalletModal" @modalDisplay="modalDisplay" />
  </div>
</template>

<script>
import SelectWalletModal from "../../views/TokenLock/SelectWalletModal/SelectWalletModal";
import TextAndIcon from "../TextAndIcon/TextAndIcon";
import { mapGetters } from "vuex";
export default {
  name: "Nav",
  components: { SelectWalletModal, TextAndIcon },
  computed: {
    ...mapGetters({
      showWalletModal: "getWalletModalIsOpen",
      getShortEthAddress: "getShortEthAddress",
      isUserConnected: "isUserConnected",
    }),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    pathName() {
      return this.$route.path;
    },
  },
  data() {
    return {
      drawer: false,
      activeNav: null,
    };
  },
  methods: {
    myTokenClick(link) {
      // eslint-disable-next-line no-debugger
      // if (this.isUserConnected) {
      this.$router.push(link);
      // } else {
      //   this.modalDisplay(true);
      // }
    },
    moveToHome() {
      this.$router.push("/");
    },
    modalDisplay(val) {
      this.$store.dispatch("fillWalletModalStatus", val);
    },
  },
  watch: {
    pathName: function (newOne) {
      this.activeNav = newOne;
    },
  },
};
</script>

<style lang="scss">
@import "./_nav.scss";

.v-toolbar__content {
  .v-input--switch {
    width: 40px;
  }
}

.v-app-bar {
  z-index: 9;
}

.logout {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 40px;
}

.logout-icon {
  height: 40px;
  display: flex;
  align-items: center;
  background: #cb5807;
  width: 40px;
  position: absolute;
  right: -16px;
  border-radius: 4px;
  justify-content: center;
}
</style>
