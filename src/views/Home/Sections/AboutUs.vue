<template>
  <v-row class="about-us">
    <v-col
      xl="6"
      lg="6"
      sm="12"
      md="12"
      class="desktop-about-us-img"
    >
      <div class="img-container">
        <v-img
          class="img-fluid desktop-about-us-img"
          src="@/assets/about-us.png"
        />
      </div>
    </v-col>
    <v-col
      lg="6"
      sm="12"
      md="12"
      xs="12"
    >
      <div class="about-us-description">
        <div class="sm-title mb-5">
          ABOUT US
        </div>
        <h3
          class="mb-4"
          :style="{color: $vuetify.theme.themes[theme].text}"
        >
          What is<span style="color: #FE6F0A;"> Lokr?</span>
        </h3>
        <p :style="{color: $vuetify.theme.themes[theme].p_text}">
          In a nutshell, we are the first all-in-one, multi-chain token locking and escrow platform with built-in privacy functionality. Our core values are trust, simplicity and scalability. We strive to make DeFi accessible to all without compromising on our commitment to high quality and high security. By removing the human element and focusing on governance through code, we aim to build trust in the crypto space. Mintr is the first stage in the Lokr ecosystem, and part of a collection of tools we’ve designed to facilitate your project from its inception to its continued development. 
        </p>
      </div>
      <div class="img-container">
        <v-img
          class="img-fluid mx-auto ipad-about-us-img mt-15"
          src="@/assets/about-us.png"
          max-width="550px"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script> 

export default {
	name: "AboutUs",
  props:{},
	computed:{
		theme() {
			return (this.$vuetify.theme.dark) ? 'dark' : 'light'
		},
	}
}
</script>

<style lang="scss" scoped>
@import "../_home.scss";
</style>
