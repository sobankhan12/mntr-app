<template>
  <div id="create" class="mt-8 mb-14">
    <!-- Stepper component -->
    <v-stepper
      id="formStep"
      class="pb-0 mr-auto ml-auto"
      v-model="e6"
      max-width="900"
      vertical
      elevation="0"
      :style="{ background: $vuetify.theme.themes[theme].background }"
    >
      <!-- Stepper progress -->
      <v-stepper-header
        elevation="0"
        class="mb-4 pb-4 pr-8 pl-8"
        :style="{ background: $vuetify.theme.themes[theme].background }"
      >
        <template v-for="(value, n) in steps">
          <v-stepper-step
            class="ma-0 pa-4 transparent"
            elevation="0"
            :complete-icon="$vuetify.icons.tickIconWhite"
            :key="`${n++}-step`"
            @click="breadCrumbClickable(n, value) ? (e6 = n) : null"
            :complete="value.isDone"
            :step="n"
            :style="breadCrumbClickable(n, value) ? { cursor: 'pointer' } : {}"
          >
          </v-stepper-step>
          <v-divider
            v-if="n !== steps.length"
            :class="{ complete: e6 > n }"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>
      <!-- /Stepper progress -->

      <!-- Stepper wrapper-->
      <div
        class="stepper-wrap pa-12 pb-8 rounded"
        :style="{
          backgroundColor: $vuetify.theme.themes[theme].alt,
          border: '1px solid' + $vuetify.theme.themes[theme].border,
        }"
      >
        <div
          v-for="(step, index) in steps"
          :style="{
            background: $vuetify.theme.themes[theme].background,
            border: '1px solid' + $vuetify.theme.themes[theme].border,
          }"
          class="rounded mb-4 step-wrapper"
          :class="{ active: step.id == e6 }"
          :key="step.id"
        >
          <!-- Step header -->
          <v-stepper-step
            class="pb-4 pt-4 pr-6 pl-6 d-flex flex-row align-center"
            @click="handleStepperOnClick(step)"
            :class="{ editable: e6 > step.id }"
            :complete="step.isDone"
            step-icon="false"
            :step="index + 1"
          >
            {{ step.name }}
            <!-- <small>Summarize if needed</small> -->
            <template>
              <v-icon
                class="plusminus"
                v-if="e6 != step.id"
                :disabled="e6 != step.id ? true : false"
                >$mdiPlus</v-icon
              >
              <v-icon class="plusminus" v-if="e6 == step.id">$mdiMinus</v-icon>
            </template>
          </v-stepper-step>

          <!-- Step content -->
          <v-stepper-content
            step="1"
            class="ma-0 pa-0"
            v-if="step.name === 'Basic Information'"
          >
            <v-card class="transparent">
              <!-- Display form based on active step -->
              <BasicInformation :stepName="step.name" :dataObject="formData" />
            </v-card>
          </v-stepper-content>
          <v-stepper-content
            step="2"
            class="ma-0 pa-0"
            v-if="step.name === 'Tokenomics'"
          >
            <v-card class="transparent">
              <!-- Display form based on active step -->
              <Tokenomics :stepName="step.name" :dataObject="formData" />
            </v-card>
          </v-stepper-content>
          <v-stepper-content
            step="3"
            class="ma-0 pa-0"
            v-if="step.name === 'Capabilities'"
          >
            <v-card class="transparent">
              <!-- Display form based on active step -->

              <Capabilities :stepName="step.name" :dataObject="formData" />
            </v-card>
          </v-stepper-content>
          <v-stepper-content
            step="4"
            class="ma-0 pa-0"
            v-if="step.name === 'Auditing'"
          >
            <v-card class="transparent">
              <!-- Display form based on active step -->
              <Auditing :stepName="step.name" :dataObject="formData" />
            </v-card>
          </v-stepper-content>
          <v-stepper-content
            step="5"
            class="ma-0 pa-0"
            v-if="step.name === 'Summary & Confirmation' && formData"
          >
            <v-card class="transparent">
              <!-- Display form based on active step -->
              <Summary
                :data="formData"
                :dataObject="formData"
                ref="SummaryCom"
              />
            </v-card>
          </v-stepper-content>
          <ResumeMinting :dialog="resumeModalVisibility" />
        </div>
      </div>
      <!-- /Stepper wrapper -->
    </v-stepper>
    <!-- /Stepper component -->

    <!-- <div class="sidebar"><pre>{{formData}}</pre></div> -->
    <ChooseNetworkModal :dialog="wrongNetwork" />
  </div>
</template>

<script>
import EventBus from "@/components/EventBus";
import BasicInformation from "@/views/Create/Steps/BasicInformation";
import Tokenomics from "@/views/Create/Steps/Tokenomics";
import Capabilities from "@/views/Create/Steps/Capabilities";
import Auditing from "@/views/Create/Steps/Auditing";
import Summary from "@/views/Create/Steps/Summary";
import ChooseNetworkModal from "@/views/TokenLock/SelectWalletModal/ChooseNetworkModal";
import {
  COMMON_CONSTANTS,
  MINT_TOKEN_STEPS_LIST,
} from "../../constants/common";
import store from "@/store";
import { scrollToTop } from "@/utils/helpers";
import { getTokens, deleteToken } from "@/services/token.service";
import { getEthAddress } from "@/services/web3.service";
import ResumeMinting from "@/views/Create/ResumeMintingForm.vue";

const initialFormData = {
  transaction_fee: 0,
  name: "",
  Symbol: "",
};

export default {
  name: "Create",
  components: {
    BasicInformation,
    Tokenomics,
    Capabilities,
    Auditing,
    Summary,
    ResumeMinting,
    ChooseNetworkModal,
  },
  data() {
    return {
      e6: 1,
      latestStep: 1,
      resumeModalVisibility: false,
      formData: initialFormData,
      steps: MINT_TOKEN_STEPS_LIST,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    wrongNetwork() {
      return this.blockchainId && !this.allBlockchains[this.blockchainId];
    },
    allBlockchains() {
      return this.$store.state.base.blockChains;
    },
    blockchainId() {
      return this.$store.state.auth.chainId;
    },
  },
  methods: {
    breadCrumbClickable(n, value) {
      return (n == this.e6 || value.isDone) && !this.steps[4].isDone;
    },
    handleStepperOnClick(step) {
      if (step.isDone && this.formData.info_level !== 10) {
        this.e6 = step.id;
      }
    },
    setLoader() {
      // Need to be removed. this code here due to the example purposes
      store.dispatch("activateLoader", COMMON_CONSTANTS.ENABLELOADER);
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
      setTimeout(() => {
        store.dispatch("activateLoader", COMMON_CONSTANTS.DISABLELOADER);
        document.getElementsByTagName("html")[0].style.overflow = "scroll";
      }, 2500);
    },
    previousStep(step) {
      if (step > 1) {
        this.e6 = step - 1;
        scrollToTop();
      }
    },
    mintComplete() {
      this.steps[4].isDone = true;
    },
    nextStep(step) {
      if (step <= this.steps.length) {
        this.e6 = step + 1;
        this.steps[step - 1].isDone = true;
        scrollToTop();
      }
    },
    updateStep(level) {
      let counter = 0;
      const stepsLength = MINT_TOKEN_STEPS_LIST?.length;
      while (counter < stepsLength) {
        if (counter < level - 1) {
          this.steps[counter].isDone = true;
        } else {
          this.steps[counter].isDone = false;
        }
        counter++;
      }
      console.log(this.steps, "this.steps this.steps", level);
      scrollToTop();
      this.latestStep = level;
      this.e6 = level;
    },

    async getIncompleteToken() {
      const ethAddress = await getEthAddress();
      getTokens({ inComplete: true, ether_address: ethAddress })
        .then((response) => {
          if (response?.data?.length > 0) {
            let token = response?.data[0];
            this.formData = Object.assign({}, this.formData, token);
            this.updateStep(token?.info_level);
            this.resumeModalVisibility = true;
          } else {
            this.updateStep(1);
          }
        })
        .catch((error) => console.log(error, "Error while fething token"));
    },
  },
  mounted() {
    this.getIncompleteToken();

    EventBus.$on("MINT_COMPLETE", () => {
      this.mintComplete();
    });

    EventBus.$on("PREVIOUS", (step) => {
      this.previousStep(step);
    });

    EventBus.$on("NEXT", (step, data) => {
      this.formData = Object.assign({}, this.formData, data);
      this.nextStep(step);
    });

    EventBus.$on("ADD_CAPABILITY", (name) => {
      console.log(name, "namename", this.formData.capabilities);
      if (!this.formData?.capabilities?.includes(name)) {
        this.formData.capabilities.push(name);
      } // Avoiding duplication
    });

    EventBus.$on("REMOVE_CAPABILITY", (name) => {
      const index = this.formData.capabilities.indexOf(name);
      if (index > -1) {
        this.formData.capabilities.splice(index, 1);
      }
    });

    EventBus.$on(
      "TOGGLE_RESUME_MODAL",
      ({ visible = false, resume = false }) => {
        this.resumeModalVisibility = visible;
        if (!resume) {
          //    this.steps[this.formData?.info_level -1].isDone = false
          deleteToken(this.formData?.id).catch((error) =>
            console.log(error, "error")
          );
          this.formData = {
            ...initialFormData,
            blockchain_id: this.$store?.state?.auth?.chainId,
          };
          EventBus.$emit("RESET_FORM");
          this.updateStep(1);
        }
      }
    );
  },
  async beforeRouteLeave(to, from, next) {
    if (this.$refs.SummaryCom && this.$refs.SummaryCom.length > 0) {
      console.log(this.$refs.SummaryCom);
      console.log(this.$refs.SummaryCom[0]?.loading?.status);
      if (this.$refs.SummaryCom[0]?.loading?.status) {
        const answer = await window.confirm(
          "Do you really want to leave? you have unsaved changes!"
        );
        if (answer) {
          next();
        } else {
          return false;
        }
      } else {
        next();
      }
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "./_create.scss";

.sidebar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 150px;
  background: #fff;
  overflow-y: scroll;
  border-top: 1px solid #ddd;
}

pre {
  text-align: left;
  font-size: 13px;
  width: 450px;
  border-radius: 5px;
  padding: 20px 20px;
  margin: 0px;
  color: rgba(0, 0, 0, 0.8);
}

.editable {
  cursor: pointer;
}

.plusminus {
  position: absolute;
  right: 20px;
  top: 17px;
}
</style>
