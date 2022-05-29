<template>
  <div>
    <p>{{dcurly true}}msg{{dcurly}}</p>
  </div>
</template>

<script>
export default {
  name: "{{pascalCase compName}}",
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
  @import "./{{createScssFileName compName}}.scss";
</style>
