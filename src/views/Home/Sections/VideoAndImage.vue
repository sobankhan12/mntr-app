<template>
  <v-row>
    <v-col cols="" class="pa-0">
      <div class="video-section">
        <h3>Turn your browser into a platform where you can mint your custom token with no coding required.</h3>
        <p class="mt-2">
          A simple and secure way to deploy your custom token on blockchain directly from mintr.
        </p>
        <div class="video-laptop-container">
          <div v-if="theme === 'light'" class="laptop-frame-light">
            <!-- <iframe
              width="560"
              height="315"
              src="//www.youtube.com/embed/sUscfnMeqHk"
              frameborder="0"
              allowfullscreen
            /> -->

            <!-- <iframe
              src="https://streamable.com/e/n77g27"
              frameborder="0"
              width="560"
              height="315"
              allowfullscreen
              allow="autoplay"
            ></iframe> -->
            <!-- <div style="height: 400px"> -->
            <iframe
              src="https://drive.google.com/file/d/1q6aJ7h7h8APZ3ONjBIPi_e0FDGl_CUJd/preview"
              width="560"
              height="315"
              allow="autoplay"
            ></iframe>

            <!-- <iframe
              src="https://drive.google.com/file/d/1q6aJ7h7h8APZ3ONjBIPi_e0FDGl_CUJd/preview"
              width="560"
              height="315"
              allow="autoplay"
            ></iframe> -->
          </div>
          <div v-else class="laptop-frame-dark">
            <!-- <iframe
              width="560"
              height="315"
              src="//www.youtube.com/embed/sUscfnMeqHk"
              frameborder="0"
              allowfullscreen
            /> -->

            <iframe
              src="https://drive.google.com/file/d/1q6aJ7h7h8APZ3ONjBIPi_e0FDGl_CUJd/preview"
              width="560"
              height="315"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "VideoAndImage",
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../_home.scss";
</style>
