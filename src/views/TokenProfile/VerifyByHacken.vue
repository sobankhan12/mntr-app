<template>
  <v-dialog
    v-model="show"
    max-width="857"
    content-class="verify-modal"
    style="overflow-y: visible !important"
    persistent
    :retain-focus="false"
  >
    <div
      class="verify-by-hacken"
      :style="{ background: $vuetify.theme.themes[theme].background }"
    >
      <v-icon right color="#41EAD4" size="28" @click.stop="show = false">
        mdi-close-circle
      </v-icon>
      <v-row no-gutters>
        <v-col cols="9">
          <h1
            class="hk-title"
            :style="{ color: $vuetify.theme.themes[theme].hk_text }"
          >
            Get Verified by <span style="color: #4adda5">Hacken.</span>
          </h1>
          <p
            class="mt-3"
            :style="{ color: $vuetify.theme.themes[theme].hk_text }"
          >
            To proceed with audited token contracts, you will need to first KYC
            with our auditors and pass their Due Diligence. You can skip this
            step if you do not want an audited contract. You can always audit
            your contract later. All audits can take up to 7 days to complete.
          </p>
          <v-form ref="auditingForm" v-model="valid" class="mt-10 pb-0">
            <div>
              <v-label
                class="mb-8"
                :style="{ color: $vuetify.theme.themes[theme].hk_text }"
              >
                Company Name<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.companyName"
                height="300"
                :background-color="$vuetify.theme.themes[theme].hk_background"
                outlined
                solo
                persistent-hint
                :rules="[
                  (v) => validations.required(v, 'Please enter company name'),
                  (v) =>
                    validations.maxLength(
                      v,
                      100,
                      'Cannot be more than 100 characters'
                    ),
                ]"
                :placeholder="'e.g “polkalokr”'"
              />
            </div>
            <div>
              <v-label
                class="mb-8"
                :style="{ color: $vuetify.theme.themes[theme].hk_text }"
              >
                Your Website URL<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.website"
                height="300"
                :background-color="$vuetify.theme.themes[theme].hk_background"
                outlined
                solo
                type="url"
                persistent-hint
                :rules="[
                  (v) => validations.required(v, 'Please enter website URL'),
                  (v) =>
                    validations.isValidHttpUrl(v) ||
                    'Please enter correct value',
                  (v) =>
                    validations.maxLength(
                      v,
                      255,
                      'Cannot be more than 255 characters'
                    ),
                ]"
                :placeholder="'e.g “http://www.polkalokr.com”'"
              />
            </div>
            <div>
              <v-label
                class="mb-8"
                :style="{ color: $vuetify.theme.themes[theme].hk_text }"
              >
                First Name<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.firstName"
                height="300"
                outlined
                :background-color="$vuetify.theme.themes[theme].hk_background"
                solo
                persistent-hint
                :rules="[
                  (v) =>
                    validations.required(v, 'Please enter your First Name'),
                  (v) =>
                    validations.maxLength(
                      v,
                      35,
                      'Cannot be more than 35 characters'
                    ),
                ]"
                :placeholder="'e.g “John”'"
              />
            </div>
            <div>
              <v-label
                class="mb-8"
                :style="{ color: $vuetify.theme.themes[theme].hk_text }"
              >
                Last Name<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.lastName"
                height="300"
                :background-color="$vuetify.theme.themes[theme].hk_background"
                outlined
                solo
                persistent-hint
                :rules="[
                  (v) => validations.required(v, 'Please enter your Last Name'),
                  (v) =>
                    validations.maxLength(
                      v,
                      35,
                      'Cannot be more than 35 characters'
                    ),
                ]"
                :placeholder="'e.g “Wick”'"
              />
            </div>
            <div>
              <v-label
                class="mb-8"
                :style="{ color: $vuetify.theme.themes[theme].hk_text }"
              >
                Email<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.email"
                height="300"
                :background-color="$vuetify.theme.themes[theme].hk_background"
                outlined
                solo
                persistent-hint
                type="email"
                :rules="[
                  (v) =>
                    validations.required(v, 'Please enter your email address'),
                  validations.email,
                  (v) =>
                    validations.maxLength(
                      v,
                      320,
                      'Cannot be more than 320 characters'
                    ),
                ]"
                :placeholder="'e.g “johnwick@gmail.com”'"
              />
            </div>
            <div class="mt-2">
              <v-label class="mb-8"
                >Whitepaper Url<span class="primary--text"
                  >&nbsp;*</span
                ></v-label
              >
              <v-text-field
                v-model="formData.whitepaper"
                height="300"
                outlined
                :background-color="$vuetify.theme.themes[theme].hk_background"
                solo
                persistent-hint
                :rules="[
                  (v) => validations.required(v, 'Please enter Whitepaper URL'),
                  (v) =>
                    validations.isValidHttpUrl(v) ||
                    'Please enter correct value',
                ]"
                type="url"
                placeholder="https://"
              >
              </v-text-field>
            </div>
            <div class="mt-8">
              <v-label class="mb-8"
                >Pitch deck Url<span class="primary--text">&nbsp;*</span>
              </v-label>
              <v-text-field
                v-model="formData.pitchDeck"
                height="300"
                :background-color="$vuetify.theme.themes[theme].hk_background"
                outlined
                solo
                persistent-hint
                :rules="[
                  (v) => validations.required(v, 'Please enter Pitch deck URL'),
                  (v) =>
                    validations.isValidHttpUrl(v) ||
                    'Please enter correct value',
                ]"
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
              >
                <template v-slot:label>
                  <p :style="{ color: $vuetify.theme.themes[theme].hk_text }">
                    By auditing your contract you agree to share this
                    information with Hacken and their KYC partners.
                  </p>
                </template>
              </v-checkbox>
            </div>
            <div class="buttons-group">
              <v-btn
                class="mr-3"
                outlined
                height="45"
                width="121"
                color="primary"
                elevation="0"
                @click.stop="show = false"
              >
                Cancel
              </v-btn>
              <v-btn
                class=""
                height="45"
                width="121"
                color="primary"
                @click="submitAuditRequest()"
                :disabled="!formData.accept"
                :loading="loading"
                elevation="0"
              >
                Submit&nbsp;
                <v-icon> mdi-arrow-right </v-icon>
              </v-btn>
            </div>
          </v-form>
        </v-col>
        <v-col cols="3">
          <v-img
            class=""
            height="218px"
            width="230px"
            src="@/assets/hacken.png"
            position="right"
            contain
          />
        </v-col>
      </v-row>
    </div>
  </v-dialog>
</template>

<script>
import * as validations from "@/utils/validations";
import EventBus from "@/components/EventBus";
import {
  // updateToken,
  sendHackenVarificationRequest,
} from "@/services/token.service";
export default {
  name: "VerifyByHacken",
  props: ["visible", "tokenId", "tokenAddress", "blockchainId"],
  data() {
    return {
      valid: true,
      formData: {
        // companyName: null,
        // url: null,
        // firstName: null,
        // lastName: null,
        // email: null,
        // accept: false,
      },
      validations: validations,
      loading: false,
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        console.log(value, " onclose");
        if (!value) {
          this.$refs.auditingForm.reset()
          this.$emit("close");
          this.formData = {};
        }
      },
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    getNetworkUrl() {
      return (query) => {
        const blockchainList = this.$store.state.base.blockChains;
        return `${blockchainList[this.blockchainId]?.blockExplorerUrl}${query}`;
      };
    },
  },
  methods: {
    submitAuditRequest() {
      if (!this.$refs.auditingForm.validate()) return;
      this.loading = true;
      sendHackenVarificationRequest({
        ...this.formData,
        tokenAddress: this.tokenAddress,
        etherscanLink: this.getNetworkUrl(`token/${this.tokenAddress}`),
        tokenId: this.tokenId,
      })
        .then(() => {
          this.loading = false;
          this.formData.accept = false;
          this.$store.dispatch("createSnackBar", {
            message: "Request Submitted Successfully!",
          });
          this.formData = {};
          this.$refs.auditingForm.reset();
          EventBus.$emit("onAuditStatusChange", "Requested");
        })
        .catch((err) => {
          this.loading = false;
          console.log(err, "error while d");
        });
    },
  },
};
</script>

<style lang="scss">
@import "./_tokenprofile.scss";
</style>
