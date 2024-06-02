<template>
  <table class="table">
    <thead class="thead">
      <tr>
        <th id="title" @click="transferSortParms">
          Название
          <i class="pi pi-sort-alt arrow" style="font-size: 1.5rem"></i>
        </th>
        <th id="director" @click="transferSortParms">
          ФИО директора
          <i class="pi pi-sort-alt arrow" style="font-size: 1.5rem"></i>
        </th>
        <th>Номер телефона</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr v-for="firm in firms" :firm="firm" :key="firm._id" @remove="$emit('remove', firm)">
        <td cla>{{ firm.title }}</td>
        <td>{{ firm.director }}</td>
        <td>{{ firm.number }}</td>
        <td @click="$emit('remove', firm)">
          <i class="pi pi-times" style="font-size: 1.5rem"></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data() {
    return {
      sortBy: 'asc'
    }
  },
  props: {
    firms: {
      type: Array,
      requered: true
    }
  },
  methods: {
    transferSortParms(e) {
      this.sortBy === 'asc' ? (this.sortBy = 'desc') : (this.sortBy = 'asc')
      this.$emit('sort', `${e.target.id}_${this.sortBy}`)
    }
  }
}
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-left: 10px;
}
th {
  border: 2px solid black;
  text-align: start;
  padding: 20px;
  text-wrap: nowrap;
}

td {
  border: 2px solid black;
  padding: 20px;
}
th:last-child {
  text-align: center;
  width: 2rem;
}
.table {
  border-collapse: collapse;
 
  border-radius: 8px;
  width: 100%;
  background-color: rgb(219, 230, 230);
}
.thead {
  width: 100%;
}
</style>
