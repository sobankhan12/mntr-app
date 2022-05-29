<template>
  <div class="capabilities-items capabilities-icon d-flex">
    <div class="capabilities-items__item">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-icon
              v-if="isCapabilityInluded(CAPABILITIES_NAMES.TX_FEE)"
              v-bind="attrs"
              v-on="on"
              small
            >
              $vuetify.icons.transactionIcon
            </v-icon>
            <v-img
              v-else
              alt="Icon"
              src="@/assets/transaction.png"
              max-width="20"
              max-height="20"
              class=""
              v-bind="attrs"
              v-on="on"
            />
          </div>
        </template>
        <span class="Black--text">TaxFee</span>
      </v-tooltip>
    </div>
    <div class="capabilities-items__item">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-icon
              v-if="isCapabilityInluded(CAPABILITIES_NAMES.BURN)"
              small
              v-bind="attrs"
              v-on="on"
            >
              $vuetify.icons.burnIcon
            </v-icon>
            <v-img
              v-else
              alt="Icon"
              src="@/assets/fire.png"
              max-width="20"
              max-height="20"
              v-bind="attrs"
              v-on="on"
              class=""
            />
          </div>
        </template>
        <span class="Black--text">Burn</span>
      </v-tooltip>
    </div>
    <div class="capabilities-items__item">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-icon
              v-if="isCapabilityInluded(CAPABILITIES_NAMES.SNAPSHOT)"
              small
              v-bind="attrs"
              v-on="on"
            >
              $vuetify.icons.snapshotIcon
            </v-icon>
            <v-img
              v-else
              alt="Icon"
              src="@/assets/camera.png"
              max-width="20"
              max-height="20"
              class=""
              v-bind="attrs"
              v-on="on"
            />
          </div>
        </template>
        <span class="Black--text">Snapshot</span>
      </v-tooltip>
    </div>
    <div class="capabilities-items__item">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-icon
              v-if="isCapabilityInluded(CAPABILITIES_NAMES.BLACKLIST)"
              small
              v-bind="attrs"
              v-on="on"
            >
              $vuetify.icons.gearsIcon
            </v-icon>
            <v-img
              v-else
              alt="Icon"
              src="@/assets/gears.png"
              max-width="20"
              max-height="20"
              v-bind="attrs"
              v-on="on"
              class=""
            />
          </div>
        </template>
        <span class="Black--text">BlackList</span>
      </v-tooltip>
    </div>
    <div class="capabilities-items__item">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-icon
              v-if="isCapabilityInluded(CAPABILITIES_NAMES.MINT)"
              v-bind="attrs"
              v-on="on"
              small
            >
              $vuetify.icons.mintIcon
            </v-icon>
            <v-img
              v-else
              alt="Icon"
              src="@/assets/profile.png"
              max-width="20"
              max-height="20"
              v-bind="attrs"
              v-on="on"
              class=""
            />
          </div>
        </template>
        <span class="Black--text">Mint</span>
      </v-tooltip>
    </div>
    <div class="capabilities-items__item">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-icon
              v-if="isCapabilityInluded(CAPABILITIES_NAMES.WHITELIST)"
              v-bind="attrs"
              v-on="on"
              small
            >
              $vuetify.icons.pauseIcon
            </v-icon>
            <v-img
              v-else
              alt="Icon"
              src="@/assets/pause.png"
              max-width="20"
              max-height="20"
              v-bind="attrs"
              v-on="on"
              class=""
            />
          </div>
        </template>
        <span class="Black--text">Pausing</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import { CAPABILITIES_NAMES } from "../../constants/common";
export default {
  name: "CapabilitiesIconListing",
  props: {
    capabilities: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      CAPABILITIES_NAMES: CAPABILITIES_NAMES,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    isCapabilityInluded() {
      return (capabilityName) => {
        return this.capabilities.includes(capabilityName);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
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
.theme--dark {
  .capabilities-icon {
      .capabilities-items__item {
        border: 1px solid #3e4449;
      }
    }
}
</style>