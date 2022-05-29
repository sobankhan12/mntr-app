<template>
  <v-row>
    <v-col cols="">
      <div
        class="subscribe-to-email-container"
        :style="{
          background: $vuetify.theme.themes[theme].subscribe_email_background,
        }"
      >
        <v-form ref="form">
          <div class="subscribe-to-email">
            <div class="logo">
              <v-img
                class=""
                src="@/assets/minter-circle-light.png"
                v-if="theme == 'light'"
                max-width="106"
                contain
              ></v-img>
              <v-img
                class=""
                src="@/assets/minter-cirlce-dark.png"
                v-if="theme == 'dark'"
                max-width="106"
                contain
              ></v-img>
            </div>
            <div class="sub-text">
              <h3>Subscribe to News letter</h3>
              <p>Sign up to join mintr</p>
            </div>
            <div class="email">
              <div
                class="email-container"
                :style="{
                  color: $vuetify.theme.themes[theme].subscribe_email_text,
                }"
              >
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="[
                    validations.email,
                    (v) =>
                      validations.maxLength(
                        v,
                        255,
                        'Cannot be more than 255 characters'
                      ),
                  ]"
                  :background-color="
                    $vuetify.theme.themes[theme].subscribe_email_field
                  "
                  append-icon="mdi-arrow-right-bold-circle"
                  @keydown.enter.prevent="submit"
                  @click:append="submit"
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import * as validations from "@/utils/validations";
import { subscribeNewsLetter } from "@/services/common.service";

export default {
  name: "SubscribeToEmail",
  props: {},
  data() {
    return {
      email: "",
      validations: validations,
    };
  },
  methods: {
    submit() {
      if (this.email === "") return;
      if (!this.$refs.form.validate()) return;
      subscribeNewsLetter({ email: this.email }).then((response) => {
        if (response?.data) {
          this.$store.dispatch("createSnackBar", {
            message: "Subscribed Successfully!",
          });
          this.email = "";
        }
      });
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style lang="scss">
@import "../_home.scss";
</style>
