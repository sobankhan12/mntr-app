<template>
  <v-card
    outlined
    hover
    height="345"
    max-width="376"
    :color="$vuetify.theme.themes[theme].card_background"
  >
    <v-card-text>
      <v-img
        class=""
        :src="require('@/assets/features/' + img + '.png')"
        height="51"
        width="51"
      />
      <h4 class="mb-2">
        {{ title }}
      </h4>
      <p>{{description}}</p>
    </v-card-text>
  </v-card>
</template>

<script> 

export default {
	name: "FeatureCard",
    props: {
		img: String,
		title: String,
    description: String
	},
	data () { 
		return {}
	},
	computed:{
		theme() {
			return (this.$vuetify.theme.dark) ? 'dark' : 'light'
		},
	}
}
</script>

<style lang="scss">
@import "./_Advancefeatures.scss";
</style>
