<template>
  <div class="app">
    <div class="container">
      <h1 class="title">Cтраница с постами</h1>

      <div class="top">
        <my-input v-model="searchQuery" placeholder="Поиск" />
        <my-button class="btn__show-dialog" @click="showDialog">Добавить</my-button>
      </div>

      <div class="app__btns"></div>

      <my-dialog v-model:show="dialogVisible">
        <post-form v-model:show="dialogVisible" @create="addFirm"
      /></my-dialog>
      <firm-table
        :firms="firms"
        @remove="removeFirm"
        @sort="setSelectedSort"
        v-if="isFirms"
      ></firm-table>

      <div v-else-if="isFirmsLoading">Загрузка...</div>
      <div v-else>Нет данных с такими параметрами...</div>
      <div class="change__page">
        <i class="pi pi-arrow-left" style="font-size: 1.5rem" @click="pageDown"></i>
        {{ this.page }}/{{ this.totalPages }}
        <i class="pi pi-arrow-right" style="font-size: 1.5rem" @click="pageUp"></i>
      </div>
      <a target="_blank" href="https://github.com/AlexandrSimanskii/stack"
        >Посмотреть код на GitHub</a
      >
    </div>
  </div>
</template>

<script>
import 'primeicons/primeicons.css'
import PostForm from '@/components/PostForm.vue'

import FirmTable from '@/components/FirmTable.vue'
import axios from '@/utils/axios.js'

export default {
  components: {
    PostForm,

    FirmTable
  },
  data() {
    return {
      firms: [],
      page: 1,
      limit: 6,
      totalPages: 0,
      dialogVisible: false,
      isFirmsLoading: false,
      selectedSort: '',
      searchQuery: '',

      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'director', name: 'По директору' }
      ]
    }
  },
  methods: {
    setSelectedSort(data) {
      this.page = 1
      this.selectedSort = data
      this.fetchFirms()
    },
    async addFirm(post) {
      try {
        const newFirm = await axios.post('api/post', {
          director: post.director,
          title: post.title,
          number: post.number
        })

        this.firms.unshift(newFirm.data.firm)
        this.firms.splice(-1, 1)
      } catch (error) {
        console.log(error)
      } finally {
        this.dialogVisible = false
      }
    },

    async removeFirm(firm) {
      try {
        await axios.delete(`/api/delete?_id=${firm._id}`)
        this.firms = this.firms.filter((p) => p._id !== firm._id)
      } catch (error) {
        console.log(error)
      }
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchFirms() {
      this.isFirmsLoading = true
      try {
        const res = await axios.get(
          `/api/get?_limit=${this.limit}&_page=${this.page}&_searchTerm=${this.searchQuery}&_sort=${this.selectedSort}`
        )
        this.firms = res.data.firms
        this.totalPages = res.data.totalPages
      } catch (error) {
        alert('Ошибка')
      } finally {
        this.isFirmsLoading = false
      }
    },
    pageUp() {
      if (this.page < this.totalPages) {
        this.page += 1
      } else {
        return
      }
    },
    pageDown() {
      if (this.page > 1) {
        this.page -= 1
      } else {
        return
      }
    }
  },
  mounted() {
    this.fetchFirms()
  },
  computed: {
    sortedFirms() {
      const sort = this.selectedSort.split('_')[0]
      const sortBy = this.selectedSort.split('_')[1]

      return [...this.firms].sort((a, b) =>
        sortBy === 'asc' ? a[sort]?.localeCompare(b[sort]) : b[sort]?.localeCompare(a[sort])
      )
    },

    isFirms() {
      return this.firms.length > 0
    }
  },
  watch: {
    page() {
      this.fetchFirms()
    },

    searchQuery() {
      this.page = 1
      this.selectedSort = ''
      const queryParams = this.$route.query
      console.log(queryParams)

      this.fetchFirms()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.title {
  margin-top: 40px;
  text-align: center;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn__show-dialog {
  margin: 15px 0;
  border-radius: 3px;
}
.change__page {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 10px;
}
</style>
