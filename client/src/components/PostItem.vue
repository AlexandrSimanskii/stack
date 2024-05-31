<template>
  <div class="post">
    <div>
      <div>
        Название: <strong>{{ firm.title }}</strong>
      </div>
      <div>
        Описание: <strong>{{ firm.director }}</strong>
      </div>
    </div>

    <div class="post__btns">
      <my-button @click="$emit('remove', firm)">Удалить</my-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    firm: {
      type: Object,
      requered: true
    }
  }
}
</script>
<style scoped>
.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid rgb(0, 255, 0);
  margin-top: 15px;
}
</style>
