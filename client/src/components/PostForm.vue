<template>
  <form @submit.prevent>
    <h4 class="form__title">Добавить организацию</h4>
    <div class="form__group">
      <my-input v-model="post.title" placeholder="Название фирмы" />
      <my-input v-model="post.director" placeholder="ФИО дериктора" />
      <InputMask
        class="input"
        v-model="post.number"
        mask="+7(999) 999-99 99"
        placeholder="(999) 999-9999"
      />
    </div>

    <div class="form__btns">
      <my-button @click="hideDialog">Отмена</my-button>
      <my-button
        :class="isFormValid ? '' : 'form__btn'"
        :disabled="!isFormValid"
        @click="createPost"
        >{{ isFormValid ? 'Создать' : 'Заполните поля...' }}</my-button
      >
    </div>
  </form>
</template>
<script>
import InputMask from 'primevue/inputmask'
export default {
  components: {
    InputMask
  },
  data() {
    return {
      post: { title: '', number: '', director: '' }
    }
  },
  methods: {
   
    createPost() {
      this.$emit('create', this.post)

      this.post = {
        title: '',
        number: '',
        director: ''
      }
    },
    hideDialog() {
      this.$emit('update:show', false)
    }
  },
  computed: {
    isFormValid() {
      return this.post.title && this.post.director && this.post.number
    }
  }
}
</script>
<style scoped>
.form__title {
  font-size: 22px;
  text-align: center;
  padding: 20px;
}
.form__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  border-bottom: 1px solid rgb(93, 46, 46);
  border-top: 1px solid black;
  padding: 50px 20px;
}
.form__btns {
  display: flex;

  gap: 20px;
  padding: 10px 20px;
  justify-content: space-between;
}
.btn.form__btn {
  color: red;
}
.input {
  border: 1px solid teal;
  padding: 12px;

  border-radius: 2px;
}
</style>
