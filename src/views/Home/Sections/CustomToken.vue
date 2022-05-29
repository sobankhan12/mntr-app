<template>
  <div
    class="custom-token"
    :style="{ background: $vuetify.theme.themes[theme].custom_sec_background }"
  >
    <v-container>
      <v-row>
        <v-col xl="6" lg="6" md="12" sm="12" xs="12" class="pa-0">
          <div class="custom-description">
            <div class="sm-title mb-5 left-space create">CREATE TOKEN</div>
            <h3
              class="mb-4 left-space hidden-sm-and-down"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              <span class="hidden-sm-and-down" style="color: #fe6f0a"
                >Launch</span
              >
              your<br />
              Custom Token Now
            </h3>
            <h3
              class="mb-4 left-space hidden-md-and-up"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              <span class="hidden-md-and-up" style="color: #fe6f0a"
                >Launch</span
              >
              your Custom Token Now
            </h3>
            <p
              class="left-space hidden-sm-and-down"
              :style="{ color: $vuetify.theme.themes[theme].p_text }"
            >
              Mintr enables you to launch your very own custom tokens with ease.
              Bypass the humdrum and unnecessary overheads by <br />
              getting the ball rolling right away.
            </p>
            <p
              class="left-space hidden-md-and-up"
              :style="{ color: $vuetify.theme.themes[theme].p_text }"
            >
              Mintr enables you to launch your very own custom tokens with ease.
              Bypass the humdrum and unnecessary overheads by getting the ball
              rolling right away.
            </p>
            <div class="btn-container">
              <v-btn
                class="mt-8 left-space"
                height="50"
                width="173"
                color="primary"
                elevation="0"
                @click="continueToCreateToken"
              >
                Create Token
              </v-btn>
              <!-- <v-btn
                class="mt-8"
                outlined
                height="38"
                width="123"
                color="primary"
                elevation="0"
              >
                Learn More
              </v-btn> -->
            </div>
          </div>
        </v-col>
        <v-col xl="6" lg="6" md="12" sm="12" xs="12" class="pa-0">
          <div class="right-custom-container">
            <v-img
              v-if="theme === 'light'"
              class="img-fluid img-position"
              src="@/assets/light-custom-laptop.png"
              height="auto"
              max-width="800"
            />
            <v-img
              v-if="theme === 'dark'"
              class="img-fluid img-position"
              src="@/assets/dark-custom-laptop.png"
              height="auto"
              max-width="800"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CustomToken",
  props: {},
  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    continueToCreateToken() {
      this.$router.push("/mint-token");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../_home.scss";
</style>
