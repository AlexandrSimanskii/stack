<template>
  <input class="input" :value="modelValue" @input="updateInput" type="text" />
</template>
<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
<style>
.input {
  border: 1px solid teal;
  padding: 12px;

  border-radius: 2px;
}
</style>
