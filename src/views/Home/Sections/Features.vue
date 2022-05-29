<template>
  <v-row class="section-gap features">
    <v-col xl="6" lg="6" md="6" sm="12" xs="12">
      <div class="feature-description">
        <div class="sm-title mb-5">
          FEATURES
        </div>
        <h3
          class="mb-4"
          :style="{color: $vuetify.theme.themes[theme].text}"
        >
          Introducing the most <br><span style="color: #FE6F0A;">Advanced Features.</span>
        </h3>
        <p :style="{color: $vuetify.theme.themes[theme].p_text}">
          Tokens made with Mintr can carry a number of capabilities designed to meet your needs. Design your token to include whitelisting, burn and snapshot capabilities.
        </p>
        <v-btn 
          class="mt-3 see-more-left-container" 
          outlined
          height="50"
          width="173"
          color="primary"
          elevation="0"
          @click="continueToAdvanceFeatures"
        >
          See More
        </v-btn>
      </div>
    </v-col>
    <v-col xl="6" lg="6" md="6" sm="12" xs="12">
      <v-img
        class="img-fluid"
        src="@/assets/features.png"
        height="auto"
      />
      <v-btn 
          class="mt-3 see-more-right-container" 
          outlined
          height="50"
          width="173"
          color="primary"
          elevation="0"
          @click="continueToAdvanceFeatures"
        >
          See More
        </v-btn>
    </v-col>
  </v-row>
</template>

<script> 

export default {
	name: "Features",
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
    continueToAdvanceFeatures () {
      this.$router.push("/advance-features");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../_home.scss";
</style>
