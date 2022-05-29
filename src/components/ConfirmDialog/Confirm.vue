<template>
  <v-dialog
    v-model="isOpen"
    max-width="500"
    class="confirm-modal"
    medium
    @click:outside="changeStatus(false)"
    @input="changeStatus"
  >
    <v-card>
      <v-card-title
        v-if="title && !!title.length"
        class="confirm-modal__title text-h5"
      >
        {{ !!title.length && title }}
      </v-card-title>

      <v-card-text
        v-if="content && !!content.length"
        class="confirm-modal__content"
        :style="{color: $vuetify.theme.themes[theme].text}"
      >
        <v-img
          src="@/assets/warning.png"
          max-width="160"
          contain
        />
        {{ !!content.length && content }}
      </v-card-text>

      <v-card-actions class="confirm-modal__footer pb-10">
        <v-btn
          text
          height="49px"
          class="mb-6 mt-0 d-flex v-btn v-btn--has-bg confirm-modal__footer--confirm theme--light elevation-0 v-size--default primary"
          @click="handleConfirm"
        >
          Yes
        </v-btn>

        <v-btn
          text
          height="49px"
          class="float-right mb-6 mt-0 d-flex v-btn v-btn--has-bg confirm-modal__footer--cancel theme--light elevation-0 v-size--default "
          @click="changeStatus(false)"
        >
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "Confirm",
  props:{
    title:{
      required:false
    },
    content:{
      required:false
    },
    isOpen: {
      required:true
    }
  },
  data(){
    return{}
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  methods:{
    changeStatus(value){
      this.$emit('changeStatus', value)
    },
    handleConfirm(){
      this.$emit('handleConfirm')
    }
  }
}
</script>

<style lang="scss">
  .confirm-modal__content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-style: normal;
    font-weight: normal;
    font-family: Manrope;
    font-size: 18px;
    line-height: 138.19%;
    text-align: center;
    padding: 24px !important;
    .v-image{
      margin-bottom: 21px;
      width: 82px;
    }
  }
  .confirm-modal__footer{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .confirm-modal__footer--confirm{
    min-width: 150px !important;
  }
  .confirm-modal__footer--cancel{
    border: 1px solid #FE6F0A;
    background: white !important;
    background-color:  white !important;
    min-width: 150px !important;
  }
  .theme--dark .confirm-modal__footer--cancel{
    color: black;
  }
</style>