<template>
  <div class="app">
    <div class="container">
      <h1 class="title">Cтраница с постами</h1>

      <div class="top">
        <my-input v-model="searchQuery" placeholder="Поиск" /><my-button
          class="btn__show-dialog"
          @click="showDialog"
          >Добавить</my-button
        >
      </div>

      <div class="app__btns"></div>

      <my-dialog v-model:show="dialogVisible">
        <post-form v-model:show="dialogVisible" @create="addFirm"
      /></my-dialog>
      <firm-table :firms="sortedAndSearchedFirm" @remove="removeFirm"></firm-table>
      <!-- <post-list :firms="sortedAndSearchedFirm" @remove="removeFirm" v-if="!isFirmsLoading" /> -->

      <!-- <div v-else>Идет загрузка...</div> -->
      <div class="change__page">
        <i class="pi pi-arrow-left" style="font-size: 1.5rem" @click="pageDown"></i>

        {{ this.page }}/{{ this.totalPages }}
        <i class="pi pi-arrow-right" style="font-size: 1.5rem" @click="pageUp"></i>
      </div>
    </div>
  </div>
</template>

<script>
import 'primeicons/primeicons.css'
import PostForm from '@/components/PostForm.vue'
// import PostList from '@/components/PostList.vue'
import FirmTable from '@/components/FirmTable.vue'
import axios from '@/utils/axios.js'

export default {
  components: {
    PostForm,
    // PostList,
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
    async addFirm(post) {
      try {
        const newFirm = await axios.post('api/post', {
          director: post.director,
          title: post.title,
          number: post.number
        })

        this.firms.unshift(newFirm.data.firm)
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
        const res = await axios.get(`/api/get?_limit=${this.limit}&_page=${this.page}`)
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
      return [...this.firms].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      })
    },
    sortedAndSearchedFirm() {
      return this.sortedFirms.filter((post) =>
        post.director.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    page() {
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
