<template>
  <v-tooltip
    bottom
    color="primary"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        v-bind="attrs"
        v-on="on"
      >
        <slot
          name="activator-tooltip"
        />
      </div>
    </template>
    <slot name="tooltip-message" />
  </v-tooltip>
</template>

<script>
export default {
  name: "Tooltip"
}
</script>

<style scoped>

</style>