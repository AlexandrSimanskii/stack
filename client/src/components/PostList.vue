<template>
  <div>
    <div v-if="firms?.length > 0">
      <h3>Список пользователей</h3>
      <transition-group name="firm-list">
        <post-item
          v-for="firm in firms"
          :firm="firm"
          :key="firm._id"
          @remove="$emit('remove', firm)"
      /></transition-group>
    </div>
    <p v-else>Список постов пуст</p>
  </div>
</template>
<script>
import PostItem from '@/components/PostItem.vue'

export default {
  components: { PostItem },
  props: {
    firms: {
      type: Array,
      requered: true
    }
  }
}
</script>
<style scoped>
.firm-list-enter-active,
.firm-list-leave-active {
  transition: all 0.5s ease;
}
.firm-list-enter-from,
.firm-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.firm-list-move {
  transition: transform 1s ease;
}
</style>
