<template>
  <div class="our-projects">
    <v-row no-gutters>
      <v-col cols="">
        <div class="sm-title mx-auto mb-3">
          PROJECTS
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="">
        <h3
          class="mb-3"
          :style="{color: $vuetify.theme.themes[theme].text}"
        >
          Our Star <span style="color: #FE6F0A;">Projects</span>
        </h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="">
        <p :style="{color: $vuetify.theme.themes[theme].p_text}" class="hidden-xs-only">
          We love to showcase the projects using Mintr to source their token economies. Click here to take a look at the <br>platforms engaging in the Polkalokr ecosystem.
        </p>
        <p :style="{color: $vuetify.theme.themes[theme].p_text}" class="hidden-sm-and-up">
          We love to showcase the projects using Mintr to source their token economies. Click here to take a look at the platforms engaging in the Polkalokr ecosystem.
        </p>
      </v-col>
    </v-row>
    <div class="row project-cards">
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-xs-12 col-sm-12">
        <v-card
          outlined
          hover
          height="235"
          max-width="290"
          class="mx-auto"
          :color="$vuetify.theme.themes[theme].card_background"
        >
          <v-img
            class="mx-auto mt-8 mb-7"
            src="@/assets/cardano.png"
            height="120"
            width="120"
          />
          <h4>CARDANO</h4>
        </v-card>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-xs-12 col-sm-12">
        <v-card
          outlined
          hover
          height="235"
          max-width="290"
          class="mx-auto"
          :color="$vuetify.theme.themes[theme].card_background"
        >
          <v-img
            class="mx-auto mt-8 mb-7"
            src="@/assets/shiba.png"
            height="120"
            width="120"
          />
          <h4>SHIBA</h4>
        </v-card>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-xs-12 col-sm-12">
        <v-card
          outlined
          hover
          height="235"
          max-width="290"
          class="mx-auto"
          :color="$vuetify.theme.themes[theme].card_background"
        >
          <v-img
            class="mx-auto mt-8 mb-7"
            src="@/assets/dogecoin.png"
            height="120"
            width="120"
          />
          <h4>DOGECOIN</h4>
        </v-card>
      </div>
    </div>
    <v-row>
      <v-col cols="">
        <v-btn
          class="mt-5 mb-15"
          height="50"
          width="173"
          color="primary"
          elevation="0"
          @click="continueToViewAllProjects"
        >
          View All Projects
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script> 

export default {
	name: "OurProjects",
  props:{},
	data () { 
		return {}
	},
	computed:{
		theme() {
			return (this.$vuetify.theme.dark) ? 'dark' : 'light'
		},
	},
	methods: {
		continueToViewAllProjects () {
			this.$router.push("/view-all-tokens");
			}
	}
}
</script>

<style lang="scss" scoped>
@import "../_home.scss";
</style>
