<template>
  <div>
    <slot name="text" />
    <v-icon right>
      <slot name="icon" />
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "TextAndIcon"
}
</script>

<style scoped>

</style>