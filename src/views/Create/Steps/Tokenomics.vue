<template>
  <v-form
    v-if="stepName == 'Tokenomics'"
    class="pa-4 pb-0 tokenomics"
    v-model="valid"
    :style="{
      borderTop: '1px solid ' + $vuetify.theme.themes[theme].border,
      borderRadius: '0px',
    }"
    ref="tokenomicForm"
  >
    <v-container>
      <v-row class="mb-8 mt-1">
        <h5 class="mb-2 text-left">Let’s set up your Tokenomics</h5>
        <small class="font-weight-light text-left"
          >Create the rules around supply and limits of your token</small
        >
      </v-row>

      <v-row class="mb-6 pr-5" v-for="field in formFields" :key="field.id">
        <v-label class="mb-8"
          >{{ field.label
          }}<span
            :style="{ color: $vuetify.theme.themes[theme].primary }"
            v-if="field.required"
            >*</span
          >
          <span v-if="!field.required"> (Optional)</span>
        </v-label>

        <v-text-field
          :name="field.name"
          :type="field.type"
          class="mr-3 ml-3"
          v-model="formData[field.name]"
          height="300"
          solo
          persistent-hint
          :rules="field.rules"
          :error-message="field.error"
          :placeholder="field.placeholder"
          :hint="field.hint"
          :disabled="field.disabled"
        >
        </v-text-field>
      </v-row>

      <v-row class="mr-0 ml-0 mt-10 d-flex justify-space-between">
        <!-- Back button  -->
        <v-btn
          class="float-left mb-6 mt-0"
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
        <!-- Next button  -->
        <v-btn
          class="float-right mb-6 mt-0"
          height="50"
          width="135"
          color="primary"
          @click="save"
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
import * as validations from "../../../utils/validations";
import { updateToken } from "@/services/token.service";
export default {
  name: "Tokenomics",
  props: {
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
      rules: [[], []],

      formFields: [
        {
          id: 1,
          type: "number",
          required: true,
          name: "max_supply",
          label: "Maximum Supply",
          placeholder: "10000000",
          hint: "Insert the maximum number of token available",
          error: "Please select enter an maximum supply of tokens",
          readonly: false,
          rules: [
            (value) => !!value || "Please enter Maximum Supply",
            (v) =>
              validations.between(
                v,
                1,
                1000000000000000000000000000000000000000000000000000,
                "Decimals should be between 1-1e29"
              ),
          ],
        },
        {
          id: 2,
          type: "number",
          required: true,
          name: "decimals",
          label: "Decimals",
          placeholder: "eg. 18",
          hint: "Add a decimal precision of your token. Our recommendation is to keep this as 18 decimal points.",
          error: "Please enter decimal points",
          readonly: false,
          rules: [
            (v) => !!v || "Please enter Decimals",
            (v) =>
              validations.between(v, 1, 18, "Decimals should be between 1-18"),
          ],
        },
        {
          id: 3,
          type: "number",
          required: false,
          name: "mintr_fee",
          label: "Mintr Fee",
          placeholder: "0",
          hint: "No fee",
          error: "Please enter a correct value",
          readonly: true,
          disabled: true,
        },
      ],
      formData: {
        max_supply: "",
        decimals: "",
        mintr_fee: "",
      },
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    completed() {
      return this.validate(this.formData) ? true : false;
    },
  },
  mounted() {
    EventBus.$on("RESET_FORM", () => {
      this.formData = {};
      this.$refs.tokenomicForm?.reset();
    });
  },
  methods: {
    save() {
      if (!this.$refs.tokenomicForm?.validate()) return;
      this.loading = true;
      if (this.formData.id) {
        this.formData.initial_supply = this.formData.max_supply;
        if (this.formData.info_level <= 2) {
          this.formData.info_level = 3;
        }
        updateToken({ ...this.formData })
          .then((response) => {
            this.formData = response?.data;
            this.loading = false;
            EventBus.$emit("NEXT", 2, this.formData);
          })
          .catch((error) => {
            this.loading = false;
            console.log(error, "Error while updating token");
          });
      }
    },
    back() {
      EventBus.$emit("PREVIOUS", 2);
    },
    validate() {
      if (this.formData.max_supply != "" && this.formData.decimals != "") {
        return true;
      }
    },
  },
  watch: {
    dataObject: function (newOne) {
      this.formData = { ...this.formData, ...newOne };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../_create.scss";
.v-input--is-readonly {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
