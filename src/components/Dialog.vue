<template>
  <v-dialog
    v-model="loading.status"
    max-width="480"
    class="mintr-dialog"
    medium
    @input="changeLoadingStatus"
    persistent
  >
    <v-card>
      <v-card-title class="mintr-dialog__title text-center pt-10 pl-6 d-block">
        {{ loading.msg }}
      </v-card-title>

      <v-card-subtitle class="loading-card-subtitle">
        {{ loading.description }}
      </v-card-subtitle>

      <v-card-text
        class="mintr-dialog__content"
        :style="{ color: $vuetify.theme.themes[theme].text }"
      >
        <v-img src="@/assets/pending.png" max-width="160" contain />
      </v-card-text>

      <v-card-actions class="mintr-dialog__footer">
        <a
          :href="loading.tx_url"
          target="_blank"
          class="text-decoration-none"
          v-if="loading.tx_url != null"
        >
          <v-btn
            text
            height="50"
            :style="{ background: $vuetify.theme.themes[theme].ether_btn }"
            class="
              mb-6
              mt-0
              d-flex
              v-btn v-btn--has-bg
              mintr-dialog__footer--confirm
              theme--light
              elevation-0
              v-size--default
              ether
            "
            @click="handleConfirm"
          >
            <v-img
              src="@/assets/ether.png"
              max-width="30"
              contain
              class="mr-4 mb-8 mt-8"
            />
            Ether scan transaction
          </v-btn>
        </a>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    loading: {
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    changeLoadingStatus(value) {
      this.$emit("changeLoadingStatus", { status: value });
    },
    handleConfirm() {
      this.$emit("handleConfirm");
    },
  },
};
</script>

<style lang="scss">
.dark .mintr-dialog__content {
}
.mintr-dialog__title {
  font-size: 23px !important;
}
.loading-card-subtitle {
  font-size: 18px !important;
  padding: 10px 24px 0px 24px !important;
}
.mintr-dialog__content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 138.19%;
  text-align: center;
  padding: 24px !important;
  .v-image {
    margin-bottom: 21px;
    width: 100px;
  }
}
.mintr-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-card__actions .mintr-dialog__footer--confirm {
  background: #f2f2f2;
  background-color: #f2f2f2;
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 8px;
  min-width: 150px !important;
  font-family: Manrope;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #5c6166 !important;
  padding: 16px;
}
.theme--dark {
  .mintr-dialog {
    .v-card__actions .mintr-dialog__footer--confirm {
      background: #3f4548 !important;
      border: 1px solid #7f8284 !important;
      .ether {
        background: #3f4548 !important;
        border: 1px solid #7f8284 !important;
      }
    }
  }
}
</style>