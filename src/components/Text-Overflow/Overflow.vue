<template>
  <div class="ellipsis">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Overflow"
}
</script>

<style scoped>
.ellipsis:before {
  float: right;
  content: attr(data-tail);
}

.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>