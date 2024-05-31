eslint-disable vue/no-mutating-props
<template>
  <select v-model="localValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'my-select',
data(){
    return{
        localValue:this.modelValue
    }
},

  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods:{
    changeOption(e){
        this.$emit('update:modelValue',e.target.value)
    }
  }
}
</script>
<style></style>
