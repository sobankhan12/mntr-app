<template>
  <div class="advance-features">
    <div class="top-section">
      <div class="info-container">
        <v-container>
          <h1>Our Features</h1>
          <p class="mt-3 hidden-xs-only">
            A simple and secure way to deploy your custom token <br> on blockchain directly from mintr.
          </p>
          <p class="mt-3 hidden-sm-and-up">
           A simple and secure way to deploy your custom token on blockchain directly from mintr.
          </p>
          <v-btn
            class="mt-5"
            height="55"
            width="159"
            color="#FFFFFF"
            elevation="0"
            @click="continueToMintToken"
          >
            Mint Token
          </v-btn>
        </v-container>
      </div>
    </div>
    <div class="cards-section">
      <div class="heading mb-10">
        <h1 :style="{color: $vuetify.theme.themes[theme].footer_text}">
          Introducing the most Advanced Features.
        </h1>
      </div>
      <v-row>
        <v-col xl="4" lg="4" md="6" sm="6" xs="12">
          <FeatureCard 
            title="Transaction Fee"
            :img="theme==='light' ? 'feature674' : 'feature683'"
            description="Include a transaction fee as part of your token smart contract. Opting for this capability means a specified amount will be automatically sent to your wallet every time a user carries out transactions using your token."
          />
        </v-col>
        <v-col xl="4" lg="4" md="6" sm="6" xs="12">
          <FeatureCard 
            title="Mint Capability"
            :img="theme==='light' ? 'feature682' : 'feature684'"
            description="The tokens that you mint are placed on the blockchain of your choosing. By incorporating the mint capability, you can quickly boost your token supply."
          />
        </v-col>
        <v-col xl="4" lg="4" md="6" sm="6" xs="12">
          <FeatureCard 
            title="Burn Capability"
            :img="theme==='light' ? 'feature676' : 'feature685'"
            description="Should you wish to reduce the number of tokens you’ve minted, you can make use of this capability to burn tokens and easily remove them from the token supply."
          />
        </v-col>
        <v-col xl="4" lg="4" md="6" sm="6" xs="12">
          <FeatureCard 
            title="Snapshot Capability"
            :img="theme==='light' ? 'feature679' : 'feature688'"
            description="Including this capability enables you to take snapshots of wallet transactions. Keep track of past token balances and store them on-chain for querying at any point in time."
          />
        </v-col>
        <v-col xl="4" lg="4" md="6" sm="6" xs="12">
          <FeatureCard 
            title="Black Listing Capability"
            :img="theme==='light' ? 'feature678' : 'feature689'"
            description="Wallets can be blacklisted to prevent wallet holders from carrying out transactions. This handy feature is great for security purposes as it enables users to freeze tokens in the event of an infringement."
          />
        </v-col>
        <v-col xl="4" lg="4" md="6" sm="6" xs="12">
          <FeatureCard 
            title="Pausing Capability"
            :img="theme==='light' ? 'feature677' : 'feature686'"
            description="There are times when you need to limit transactions to bolster your token economy. The pausing capability allows you to restrict token holders from carrying out transactions against your token until you decide to unpause. You can also designate a sub-list of whitelisted wallet addresses through this feature."
          />
        </v-col>
        <v-col
          class="mb-15"
          xl="4" lg="4" md="6" sm="6" xs="12">
          <FeatureCard 
            title="Auditor Verification"
            :img="theme==='light' ? 'feature680' : 'feature689'"
            description="Get your token verified by Hacken. This simple process will boost your newly minted token’s market presence and stability. Audit reports will be available on Hacken’s website for you to share with your community."
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import FeatureCard from './FeatureCard.vue'

export default {
	name: "AdvanceFeatures",
	components: {
		FeatureCard
	},
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
		continueToMintToken() {
      this.$router.push("/mint-token");
    }
	}
}
</script>

<style lang="scss">
@import "./_Advancefeatures.scss";
</style>
