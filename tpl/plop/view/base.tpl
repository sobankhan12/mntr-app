<template>
  <div>
    <p>{{dcurly true}}msg{{dcurly}}</p>
  </div>
</template>

<script>
export default {
  name: "{{pascalCase viewName}}",
  props: {
    msg: String
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  @import "./{{createScssFileName viewName}}.scss";
</style>
