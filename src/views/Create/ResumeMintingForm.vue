<template>
  <div class="text-center resume-minting-modal">
    <v-dialog
      v-model="dialog"
      width="513"
      height="313"
      content-class="resume-minting"
      persistent
    >
      <v-card class="mx-auto">
        <v-card-text>
          <h3 class="mb-3">
          <v-icon color="#FE6F0A">
              mdi-alert-circle-outline
          </v-icon>
          Resume Minting</h3>
          <p class="mb-8">Do you want to resume minting token?</p>
          <v-btn
            class="mr-5 mb-3"
            height="55"
            width="157"
            color="primary"
            elevation="0"
            @click="toggleModal(true)"
          >
            Yes
          </v-btn>
          <v-btn 
            class="mb-3" 
            outlined
            height="55"
            width="157"
            color="primary"
            elevation="0"
            @click="toggleModal(false)"
          >
            No
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import EventBus from "@/components/EventBus";
export default {
  name: "ResumeMinting",
  props: {
    dialog:Boolean
  },
  methods: {
    toggleModal(resume){
      EventBus.$emit('TOGGLE_RESUME_MODAL', {visible: false, resume : resume})
    }
  }
}
</script>

<style lang="scss">
  @import "./_create.scss";
</style>
