<template>
  <button class="btn"><slot></slot></button>
</template>
<script>
export default {
  name: 'my-button'
}
</script>
<style scoped>
.btn {
  background-color: inherit;
  color: teal;
  border: 1px solid teal;
  padding: 10px 15px;
  border-radius: 4px;
}
</style>
