<template>
  <v-card class="loading">
    <v-row justify="center">
      <v-overlay
        :absolute="true"
        :opacity="0"
        :value="isLoading"
      >
        <v-icon size="268">
          {{ theme === 'dark' ? '$vuetify.icons.LoadingLight' : '$vuetify.icons.LoadingDark' }}
        </v-icon>
      </v-overlay>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Loading",
  props:{
    isLoading: {
      required: true,
    }
  },
  computed:{
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>

<style scoped>
  .loading{
    width: 100%;
    height: calc(100vh);
    position: fixed !important;
    top: 0;
  }
</style>