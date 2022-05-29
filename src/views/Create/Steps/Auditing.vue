<template>
  <v-form
    v-if="stepName == 'Auditing'"
    ref="auditingForm"
    class="pa-4 pb-0"
    v-model="valid"
    :style="{
      borderTop: '1px solid ' + $vuetify.theme.themes[theme].border,
      borderRadius: '0px',
    }"
    lazy-validation
  >
    <v-container>
      <div v-if="!requested" class="auditing">
        <div class="auditing-content">
          <v-row class="mb-10 mt-1">
            <h1 class="title">Get Verified by <span>Hacken.</span></h1>
            <p class="text">
              To proceed with audited token contracts, you will need to first
              KYC with our auditors and pass their Due Diligence. You can skip
              this step if you do not want an audited contract. You can always
              audit your contract later. All audits can take up to 7 days to
              complete.
            </p>
            <div class="mt-4">
              <v-label class="mb-8"
                >Company Name<span class="primary--text">*</span></v-label
              >
              <v-text-field
                v-model="formData.companyName"
                height="300"
                solo
                persistent-hint
                :rules="rulesList[0]"
                :placeholder="'e.g “polkalokr”'"
              >
              </v-text-field>
            </div>

            <div class="mt-2">
              <v-label class="mb-8"
                >Your Website URL<span class="primary--text">*</span></v-label
              >
              <v-text-field
                v-model="formData.website"
                height="300"
                solo
                persistent-hint
                :rules="rulesList[1]"
                type="url"
                :placeholder="'e.g “http://www.polkalokr.com”'"
              >
              </v-text-field>
            </div>

            <div class="mt-2">
              <v-label class="mb-8"
                >First Name<span class="primary--text">*</span></v-label
              >
              <v-text-field
                v-model="formData.firstName"
                height="300"
                solo
                persistent-hint
                :rules="rulesList[2]"
                :placeholder="'e.g “David”'"
              >
              </v-text-field>
            </div>

            <div class="mt-2">
              <v-label class="mb-8"
                >Last Name<span class="primary--text">*</span></v-label
              >
              <v-text-field
                v-model="formData.lastName"
                height="300"
                solo
                persistent-hint
                :rules="rulesList[3]"
                :placeholder="'e.g “Wick”'"
              >
              </v-text-field>
            </div>

            <div class="mt-2">
              <v-label class="mb-8"
                >Email<span class="primary--text">*</span></v-label
              >
              <v-text-field
                v-model="formData.email"
                height="300"
                solo
                persistent-hint
                :rules="rulesList[4]"
                type="email"
                :placeholder="'e.g “davidwick@gmail.com”'"
              >
              </v-text-field>
            </div>

            <div class="mt-2">
              <v-label class="mb-8"
                >Whitepaper Url<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.whitepaper"
                height="300"
                solo
                persistent-hint
                :rules="rulesList[5]"
                type="url"
                placeholder="https://"
              >
              </v-text-field>
            </div>

            <div class="mt-2">
              <v-label class="mb-8"
                >Pitch deck Url<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.pitchDeck"
                height="300"
                solo
                persistent-hint
                :rules="rulesList[6]"
                type="url"
                placeholder="https://"
              >
              </v-text-field>
            </div>
            <div class="checkbox">
              <v-checkbox
                v-model="formData.accept"
                color="orange darken-3"
                value="orange darken-3"
                ><template v-slot:label>
                  <p class="text">
                    By auditing your contract you agree to share this
                    information with Hacken and their KYC partners.
                  </p>
                </template></v-checkbox
              >
            </div>
          </v-row>
        </div>
        <div class="auditing-side hidden-md-and-down">
          <v-img class="logo mt-8" src="@/assets/hacken.png" contain />
        </div>
      </div>
      <div v-if="!requested" class="d-flex justify-start">
        <v-btn
          class="mb-6 mt-0"
          height="50"
          width="135"
          color="primary"
          :disabled="!formData.accept"
          @click="submitAuditRequest()"
          :loading="loading"
          elevation="0"
        >
          Submit
          <v-icon right> $mdiArrowRight </v-icon>
        </v-btn>
      </div>
      <div v-else class="auditing-verfied">
        <v-row class="mb-14 mt-3 d-flex align-center">
          <v-icon class="mb-7 mt-5 approve-icon" width="93" height="93">
            $approveIcon
          </v-icon>
          <h3
            class="mt-2 mb-6 text-center d-flex"
            :text-color="$vuetify.theme.themes[theme].text"
          >
            Audit Request Submitted
            <v-img
              src="@/assets/tick.png"
              max-width="30"
              class="ml-2"
              contain
            />
          </h3>
        </v-row>
      </div>
      <v-row class="mr-0 ml-0 mt-10 d-flex justify-space-between">
        <!-- Back button  -->
        <v-btn
          class="float-left mb-6 mt-0 mr-6"
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
        <!-- Skip button  -->
        <v-btn
          class="float-right mb-6 mt-0"
          v-if="skip"
          height="50"
          width="135"
          color="primary"
          elevation="0"
          @click="save"
          :loading="loading2"
        >
          Skip
        </v-btn>
        <!-- Next button  -->
        <v-btn
          v-else
          class="float-right mb-6 mt-0"
          height="50"
          width="135"
          color="primary"
          @click="save(true)"
          :loading="loading2"
          elevation="0"
        >
          Next
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import EventBus from "@/components/EventBus";
// import FileUploadComponent from "@/components/FormElements/FileUpload";
import * as validations from "@/utils/validations";
import {
  updateToken,
  sendHackenVarificationRequest,
} from "@/services/token.service";
export default {
  name: "Auditing",
  props: {
    stepName: {
      required: false,
    },
    dataObject: {
      required: true,
    },
  },
  components: {
    // FileUploadComponent,
  },
  data() {
    return {
      valid: true,
      loading2: false,
      requested: false,
      formData: {},
      formData2: {},
      validations: validations,
      loading: false,
      skip: true,
      rules: [
        [
          (v) => validations.required(v, "Please enter company name"),
          (v) =>
            validations.maxLength(v, 100, "Cannot be more than 100 characters"),
        ],
        [
          (v) => validations.required(v, "Please enter website URL"),
          (v) => validations.isValidHttpUrl(v) || "Please enter correct value",
          (v) =>
            validations.maxLength(v, 255, "Cannot be more than 255 characters"),
        ],
        [
          (v) => validations.required(v, "Please enter your First Name"),
          (v) =>
            validations.maxLength(v, 35, "Cannot be more than 35 characters"),
        ],
        [
          (v) => validations.required(v, "Please enter your Last Name"),
          (v) =>
            validations.maxLength(v, 35, "Cannot be more than 35 characters"),
        ],
        [
          (v) => validations.required(v, "Please enter your email address"),
          validations.email,
          (v) =>
            validations.maxLength(v, 320, "Cannot be more than 320 characters"),
        ],
        [
          (v) => validations.required(v, "Please enter Whitepaper URL"),
          (v) => validations.isValidHttpUrl(v) || "Please enter correct value",
        ],
        [
          (v) => validations.required(v, "Please enter Pitch deck URL"),
          (v) => validations.isValidHttpUrl(v) || "Please enter correct value",
        ],
      ],
      rulesList: [[], [], [], [], [], [], []],
    };
  },
  methods: {
    save() {
      this.loading2 = true;
      if (this.formData2.id) {
        if (this.formData2.info_level <= 4) {
          this.formData2.info_level = 5;
        }
        updateToken({ ...this.formData2 })
          .then((response) => {
            this.loading2 = false;
            this.formData2 = response?.data;
            EventBus.$emit("NEXT", 4, this.formData2);
          })
          .catch((error) => {
            this.loading2 = false;
            console.log(error, "Error while updating token");
          });
      }
    },
    submitAuditRequest() {
      this.rulesList = this.rules;
      this.$nextTick(async () => {
        if (this.$refs.auditingForm.validate()) {
          this.requested = true;
          this.loading = false;
          this.formData.accept = false;
          this.skip = false;
          // this.loading = true;
          // sendHackenVarificationRequest({
          //   ...this.formData,
          //   tokenId: this.formData2.id,
          // })
          //   .then((res) => {
          //     this.loading = false;
          //     this.formData.accept = false;
          //     this.formData2 = res.data;
          //     this.skip = false;
          //   })
          //   .catch((err) => {
          //     this.loading = false;
          //     console.log(err);
          //   });
        }
      });
    },
    back() {
      EventBus.$emit("PREVIOUS", 4);
    },
    next() {
      EventBus.$emit("NEXT", 4);
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    getNetworkUrl() {
      return (query) => {
        const blockchainList = this.$store.state.base.blockChains;
        return `${
          blockchainList[this.$store.state.auth.chainId]?.blockExplorerUrl
        }${query}`;
      };
    },
  },
  watch: {
    dataObject: function (newOne) {
      this.formData2 = newOne;
    },
  },
  mounted() {
    EventBus.$on("MINT_COMPLETE", (tokenAddress) => {
      if (this.requested) {
        sendHackenVarificationRequest({
          ...this.formData,
          tokenAddress,
          tokenId: this.formData2.id,
          etherscanLink: this.getNetworkUrl(`token/${tokenAddress}`),
        })
          .then(() => {
            this.requested = false;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          });
      }
    });
  },
};
</script>

<style lang="scss">
.auditing {
  display: flex;
  text-align: left;
  .text {
    background-color: transparent !important;
  }
  .checkbox .v-input__slot {
    align-items: flex-start !important;
    background: transparent !important;
  }
  .v-input--selection-controls__ripple {
    height: 35px;
    width: 35px;
  }
  .v-input--selection-controls__input {
    margin-top: 3px !important;
  }
  &-side {
    width: 25%;
  }
  &-content {
    width: 75%;
    .v-input__slot {
      height: 40px !important;
    }
  }
  .title {
    font-family: Manrope !important;
    font-style: normal;
    font-weight: 600;
    font-size: 32px !important;
    line-height: 138.19%;
    color: #5c6266;
    span {
      color: #4adda5;
    }
  }
  .text {
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 169.19%;
    color: #5c6266;
  }
  .file-upload {
    border: 2px dashed #d2d2d2;
    height: 120px;
    width: 100%;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-direction: column;
    transition: 0.3s;

    &:hover {
      background-color: #f8f8f8;
    }

    label {
      font-size: 14px;
      color: #5c6166;
      font-weight: 400;
      opacity: 0.8;
      cursor: pointer;
    }

    &.dark {
      border-color: rgba(178, 190, 200, 0.6);

      &:hover {
        background-color: #272b2e;
      }

      label {
        color: #b2bec8;
      }
    }
  }
  .error--text .v-messages__message {
    color: #fe6f0a !important;
  }
}
.auditing-verfied {
  h3 {
    width: 100%;
    justify-content: center;
  }
}
@media (max-width: 600px) {
  .auditing-verfied {
    h3 {
      font-family: Manrope;
      font-style: normal;
      font-size: 26px;
      padding: 0 30px;
      .v-image {
        top: 192px;
        right: 55px;
        position: absolute;
      }
    }
  }
}
</style>
