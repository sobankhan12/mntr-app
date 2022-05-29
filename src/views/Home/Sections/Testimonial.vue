<template>
  <div class="testimonial">
    <div class="sm-title mb-5">TESTIMONIALS</div>
    <h3 :style="{ color: $vuetify.theme.themes[theme].text }">
      People Love using <span style="color: #fe6f0a"> Mintr</span>
    </h3>
    <vue-glide
      focus-at="1"
      :bullet="true"
      :breakpoints="{ 600: { perView: 1 } }"
      v-model="active"
    >
      <vue-glide-slide v-for="i in 3" :key="i">
        <v-card
          outlined
          max-height="176"
          max-width="379"
          elevation="0"
          :color="$vuetify.theme.themes[theme].card_background"
          :style="{
            border: $vuetify.theme.themes[theme].testmonial_card_border,
          }"
        >
          <v-img
            class="mx-auto non-active-icon"
            src="@/assets/satisfy-non-active.png"
            max-width="40"
            contain
          />
          <v-card-title>
            <v-img
              class="mx-auto active-icon mb-2"
              src="@/assets/satisfy-active.png"
              max-width="40"
              contain
            />
          </v-card-title>
          <v-card-text>
            <div
              class="description"
              :style="{ color: $vuetify.theme.themes[theme].text }"
            >
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.”
            </div>
          </v-card-text>
          <v-card-actions>
            <v-img
              class="rounded-circle mx-auto"
              src="@/assets/dacota.png"
              max-width="60"
              contain
            />
            <div class="client-info">
              <p
                class="name"
                :style="{ color: $vuetify.theme.themes[theme].p_text }"
              >
                John Dacota
              </p>
              <p
                class="designation"
                :style="{ color: $vuetify.theme.themes[theme].p_text }"
              >
                Crypto Advisor
              </p>
            </div>
          </v-card-actions>
        </v-card>
      </vue-glide-slide>
      <template slot="control">
        <button
          v-for="i in 3"
          :key="i"
          class="h-6 w-6 rounded-full"
          :class="'glide__slide--active' == i ? 'bg-red-600' : 'bg-gray-500'"
          :data-glide-dir="'=' + i"
        />
      </template>
    </vue-glide>
  </div>
</template>

<script>
import { Glide, GlideSlide } from "vue-glide-js";

export default {
  name: "Testimonial",
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  props: {},
  data() {
    return {
      autoplay: 2000,
      myStyle: { border: "1px solid" },
      active: 1,
    };
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
