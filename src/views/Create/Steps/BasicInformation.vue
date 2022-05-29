<template>
  <v-form
    v-if="stepName == 'Basic Information'"
    class="pa-4 pb-0 basic-info"
    v-model="valid"
    :style="{
      borderTop: '1px solid ' + $vuetify.theme.themes[theme].border,
      borderRadius: '0px',
    }"
    ref="form"
    validate-on-blur
    v-async-form
  >
    <v-container>
      <v-row class="mb-8 mt-1">
        <h5 class="mb-2 text-left theme--text">Basic Token Information</h5>
        <small class="font-weight-light text-left"
          >Tell us the basics about the token you are building.</small
        >
      </v-row>

      <v-row class="pr-5 mb-2" v-for="field in formFields" :key="field.id">
        <v-label class="mb-8"
          >{{ field.label
          }}<span class="primary--text" v-if="field.required">*</span>
          <span v-if="!field.required"> (Optional)</span>
        </v-label>

        <v-text-field
          v-if="field.id == 1"
          :name="field.name"
          :type="field.type"
          class="mr-3 ml-3"
          :value="
            allBlockchains[blockchainId] &&
            allBlockchains[blockchainId].chainName
          "
          v-model="blockchainName"
          readonly
          disabled
          height="300"
          :rules="field.rules"
          solo
          persistent-hint
          :placeholder="blockchainName"
          :hint="field.hint"
        >
          <template v-slot:prepend-inner>
            <v-img
              alt=""
              :src="
                allBlockchains[blockchainId] &&
                allBlockchains[blockchainId].icon
              "
              max-width="30"
              max-height="30"
              class=""
            />
          </template>
        </v-text-field>

        <v-text-field
          v-else-if="field.type != 'file'"
          :name="field.name"
          :type="field.type"
          class="mr-3 ml-3"
          v-model="formData[field.name]"
          height="300"
          solo
          v-async-validate:debounce="1000"
          persistent-hint
          :async-rules="field.rules"
          :placeholder="field.placeholder"
          :hint="field.hint"
        >
        </v-text-field>

        <div
          class="file-upload mr-3 ml-3"
          v-if="field.type == 'file'"
          :class="theme"
          @click="showUploader"
        >
          <v-icon
            left
            class="mb-1"
            v-if="!formData.logo"
            :color="$vuetify.theme.themes[theme].text"
          >
            $mdiUpload
          </v-icon>
          <div class="close">
            <v-icon
              right
              size="17"
              v-if="formData.logo"
              @click="removeMe"
              :color="'#FE6F0A'"
            >
              $mdiCloseCircle
            </v-icon>
          </div>
          <p v-if="!formData.logo">Click <span>here to upload image</span></p>
          <div v-else>
            <cld-image :cloudName="cloudName" :publicId="formData.logo">
              <cld-transformation angle="-45" />
              <cld-transformation
                effect="trim"
                angle="45"
                crop="scale"
                width="150"
              />
            </cld-image>
          </div>
        </div>
      </v-row>

      <v-row class="mr-0 ml-0 d-flex justify-end">
        <!-- Next button  -->
        <v-btn
          class="mb-6 mt-0"
          height="50"
          width="135"
          color="primary"
          @click.prevent="save"
          :loading="loading"
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
import * as validations from "@/utils/validations";
import { saveToken, updateToken } from "@/services/token.service";
import { getEthAddress } from "@/services/web3.service";
import { COMMON_CONSTANTS } from "@/constants/common";
import { getValidUrl } from "@/utils/helpers";
export default {
  name: "Nav",
  components: {
    // FileUploadComponent
  },
  props: {
    extensions: {
      type: Array,
      default: () => {
        return ["gif", "jpg", "jpeg", "png", "bmp"];
      },
    },
    stepName: {
      required: true,
    },
    dataObject: {
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      loading: false,
      cloudinaryOpen: false,
      rules: [
        (value) => !!value || "This field is required",
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      rulesSymbol: [
        validations.required,
        (v) => validations.alphaNumeric(v),
        (v) => validations.minLength(v, 3, "Cannot be less than 3 characters"),
        (v) => validations.maxLength(v, 3, "Cannot be more than 3 characters"),
      ],
      formFields: [
        {
          id: 1,
          type: "text",
          required: true,
          name: "blockchain_id",
          label: "Blockchain",
          placeholder: "",
          hint: "",
        },
        {
          id: 2,
          type: "text",
          required: true,
          name: "name",
          label: "Token Name",
          placeholder: "eg. Mintr",
          hint: "Choose a name for your token",
          rules: [
            (v) => validations.required(v, "Please enter Token Name"),
            (v) =>
              (v && v.length <= 80) ||
              "Token Name must be less than 80 characters",
            (v) => validations.profanity(v),
          ],
        },
        {
          id: 3,
          type: "text",
          required: true,
          name: "symbol",
          label: "Symbol",
          placeholder: "e.g. “LKR”",
          hint: "Choose a symbol for your token",
          counter: 3,
          rules: [
            (v) => validations.required(v, "Please enter Symbol"),
            (v) =>
              (v && v.length <= 20) || "Symbol must be less than 20 characters",
          ],
        },
        {
          id: 4,
          type: "file",
          required: false,
          name: "icon",
          label: "Token Image",
          placeholder: "",
          hint: "",
        },
        {
          id: 5,
          type: "url",
          required: false,
          name: "website",
          label: "Website",
          placeholder: "https://polkalokr.com",
          hint: "Add website url for your token",
          rules: [
            (v) =>
              (v && validations.isValidHttpUrl(v)) ||
              !v ||
              "Website must be a valid URL",
          ],
        },
        {
          id: 6,
          type: "url",
          required: false,
          name: "twitter",
          label: "Twitter",
          placeholder: "https://twitter.com/polkalokr",
          hint: "Add twitter page url for your token",
          rules: [
            (v) =>
              (v && validations.isValidHttpUrl(v)) ||
              !v ||
              "Twitter must be a valid URL",
          ],
        },
        {
          id: 7,
          type: "url",
          required: false,
          name: "telegram",
          label: "Telegram",
          placeholder: "https://t.me/polkalokr",
          hint: "Add telegram group url for your token",
          rules: [
            (v) =>
              (v && validations.isValidHttpUrl(v)) ||
              !v ||
              "Telegram must be a valid URL",
          ],
        },
      ],
      formData: {
        name: "",
        logo: "",
        blockchain_id: this.blockchainId,
        ether_address: this.$store?.getters.getEthAddress,
        website: "",
        twitter: "",
        telegram: "",
      },
    };
  },
  methods: {
    async save() {
      this.loading = true;
      const isValid = await this.$refs.form?.validateAsync();
      if (!isValid) {
        this.loading = false;
        return;
      }

      this.formData.blockchain_id = this.$store?.state?.auth?.chainId;
      this.formData.twitter =
        this.formData.twitter && getValidUrl(this.formData.twitter);
      this.formData.telegram =
        this.formData.telegram && getValidUrl(this.formData.telegram);
      this.formData.website =
        this.formData.website && getValidUrl(this.formData.website);
      this.formData.ether_address = await getEthAddress();
      if (this.formData.id) {
        if (this.formData.info_level == 1) {
          this.formData.info_level = 2;
        }
        updateToken({ ...this.formData })
          .then((response) => {
            this.formData = response?.data;
            this.loading = false;
            EventBus.$emit("NEXT", 1, this.formData);
          })
          .catch((error) => {
            this.loading = false;
            console.log(error, "Error while updating token");
          });
      } else {
        saveToken({
          ...this.formData,
          info_level: 2,
          nominated_wallet: this.$store?.state?.auth?.ethAddress,
        })
          .then((response) => {
            this.formData = response?.data;
            this.loading = false;
            EventBus.$emit("NEXT", 1, this.formData);
          })
          .catch((error) => {
            this.loading = false;
            console.log(error, "Error while updating token");
          });
      }
    },

    showUploader(e) {
      if (!this.cloudinaryOpen) {
        this.cloudinaryOpen = true;
        e?.preventDefault();
        window?.cloudinary.openUploadWidget(
          {
            cloudName: COMMON_CONSTANTS.CLOUDINARY_CLOUD_NAME,
            uploadPreset: "test-preset",
            multiple: false,
            clientAllowedFormats: ["webp", "image", "gif"],
            sources: ["local", "url"],
          },
          (error, result) => {
            if (!error && result.info && result.event === "success") {
              this.$set(this.formData, "logo", result?.info?.public_id);
            }
            this.cloudinaryOpen = false;
          }
        );
      }
    },
    removeMe(e) {
      e.stopPropagation();
      // TODO: also remove this image from cloudinary
      this.formData.logo = "";
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    completed() {
      return this.$refs.form?.validate();
    },
    cloudName() {
      return COMMON_CONSTANTS.CLOUDINARY_CLOUD_NAME;
    },
    allBlockchains() {
      return this.$store.state.base.blockChains;
    },
    blockchainId() {
      return this.$store.state.auth.chainId;
    },
    blockchainName() {
      if (this.allBlockchains[this.blockchainId]) {
        return this.allBlockchains[this.blockchainId].chainName;
      }
      return null;
    },
  },
  mounted() {
    EventBus.$on("RESET_FORM", () => {
      this.$refs.form?.reset();
      this.formData = {};
    });
  },
  watch: {
    dataObject: function (newOne) {
      this.formData = newOne;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../_create.scss";
pre {
  text-align: left;
  margin-top: 50px;
}

.file-upload {
  border: 2px dashed #d2d2d2;
  height: 120px;
  width: calc(100% - 25px);
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  transition: 0.3s;
  opacity: 0.8;
  p {
    color: #5c6166 !important;
  }
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
  a {
    text-decoration: none;
  }
  // .close {
  //     position: relative;
  //     width: 8%;
  //     button {
  //         background-color: #ffffff;
  //     }
  //     .v-icon{
  //         position: absolute;
  //         right: 0;
  //         color: #FE6F0A !important;
  //     }
  // }
  .v-icon {
    color: #5c6166 !important;
  }
}
</style>
