<template>
  <div
    class="footer"
    :background="$vuetify.theme.themes[theme].footer_background"
  >
    <v-footer>
      <v-container>
        <v-row>
          <v-col xl="4" lg="4" md="4" sm="4" xs="12">
            <v-img
              v-if="theme === 'light'"
              class=""
              src="@/assets/mintr-light.png"
              max-width="159"
              contain
            />
            <v-img
              v-if="theme === 'dark'"
              class=""
              src="@/assets/mintr-dark.png"
              max-width="159"
              contain
            />
            <div class="powered-by-container">
              <span
                class="powered-by"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Powered by | <v-img src="@/assets/lokr.png" width="66px"
            /></span>
              <span
                class="tag-line"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Enhancing trust and simplicity in DeFi.</span>
            </div>
          </v-col>
          <v-col xl="2" lg="2" md="2" sm="2" xs="6">
            <div class="heading">
              Products<hr>
            </div>
            <div class="links">
              <a
                href="#"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Mintr</a>
              <a
                href="#"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Vault</a>
              <a
                href="https://bridgr.polkalokr.com/"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Bridgr</a>
              <a
                href="#"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Swapr</a>
            </div>
          </v-col>
          <v-col xl="2" lg="2" md="2" sm="2" xs="6">
            <div class="heading">
              Company<hr>
            </div>
            <div class="links">
              <a
                href="#"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Staking</a>
              <a
                href="#"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >About</a>
              <a
                href="#"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Blog</a>
               <a
                href="https://www.polkalokr.com/"
                :style="{color: $vuetify.theme.themes[theme].footer_text}"
              >Lokr</a>
            </div>
          </v-col>
          <v-col xl="4" lg="4" md="4" sm="4" xs="12">
            <div class="heading">
              Connect<hr>
            </div>
            <div
              class="description"
              :style="{color: $vuetify.theme.themes[theme].footer_text}"
            >
              Stay informed on our latest developments<br>
              via our social channels.
            </div>
            <div class="social">
              <ul>
                <!-- <li v-for="m in socialMedias" :key="m.id" :style="{color: $vuetify.theme.themes[theme].footer_text}">
                <a :href="m.url">
                  <v-icon>{{m.icon}}</v-icon>
                </a>
              </li> -->
                <li>
                  <a
                    href="https://twitter.com/Lokr_io"
                    target="new"
                  >
                    <v-img
                      v-if="theme === 'light'"
                      class=""
                      src="@/assets/twitter.png"
                      max-width="18"
                      contain
                    />
                    <v-img
                      v-if="theme === 'dark'"
                      class=""
                      src="@/assets/twitter-dark.png"
                      max-width="18"
                      contain
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/polkalokr/"
                    target="new"
                  >
                    <v-img
                      v-if="theme === 'light'"
                      class=""
                      src="@/assets/linkedIn.png"
                      max-width="15"
                      contain
                    />
                    <v-img
                      v-if="theme === 'dark'"
                      class=""
                      src="@/assets/linked-dark.png"
                      max-width="15"
                      contain
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/polkalokr"
                    target="new"
                  >
                    <v-img
                      v-if="theme === 'light'"
                      class=""
                      src="@/assets/medium.png"
                      max-width="18"
                      contain
                    />
                    <v-img
                      v-if="theme === 'dark'"
                      class=""
                      src="@/assets/medium-dark.png"
                      max-width="18"
                      contain
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/polkalokr"
                    target="new"
                  >
                    <v-img
                      v-if="theme === 'light'"
                      class=""
                      src="@/assets/telegram.png"
                      max-width="18"
                      contain
                    />
                    <v-img
                      v-if="theme === 'dark'"
                      class=""
                      src="@/assets/telegram-dark.png"
                      max-width="18"
                      contain
                    />
                  </a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <div class="copyrights text-center">
      Copyright©{{ new Date().getFullYear() }}&nbsp;
      <v-img
        v-if="theme === 'light'"
        class=""
        src="@/assets/mintr-light.png"
        max-width="62"
        contain
      />
      <v-img
        v-if="theme === 'dark'"
        class=""
        src="@/assets/mintr-dark.png"
        max-width="62"
        contain
      />
    </div>
  </div>
</template>

<script>
	export default {
		name: "Footer",
    data() {
      return {
         socialMedias: [
          {name: "twitter", url: "https://twitter.com/polkalokr", icon: "mdi-twitter"},
          {name: "linkedin", url: "https://www.linkedin.com/company/polkalokr/", icon: "mdi-linkedin"},
          {name: "facebook", url: "#", icon: "mdi-facebook"},
          {name: "instagram", url: "#", icon: "mdi-instagram"}
        ]
      }
    },
    computed:{
      theme() {
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    },
	}
</script>

<style lang="scss">
	@import "./_footer.scss";
</style>
