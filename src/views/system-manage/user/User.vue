<template>
  <div class="user">
    <Table :loading="loading" :tableData="tableData" :tableColumn="tableColumn" :paginationData="paginationData"
      @paginationDataChange="paginationDataChange">
      <template v-slot:date>
        <a href="">时间</a>
      </template>
      <template v-slot:name>
        <a href="">姓名</a>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import Table from '@/components/table/Table.vue'
import { IPaginationData, ITableColumn } from '@/components/table/interface'
export default defineComponent({
  components: { Table },
  setup () {
    const loading = ref<boolean>(false)
    const tableColumn = reactive<Array<ITableColumn>>([{
      label: '时间', prop: 'date', headerSlots: 'date'
    }, {
      label: '姓名', prop: 'name', headerSlots: 'name'
    }, {
      label: '地址', prop: 'address'
    }])

    const tableData = ref<Array<any>>([])
    loading.value = true
    setTimeout(() => {
      loading.value = false
      tableData.value = [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }, 500)

    const paginationData = reactive<IPaginationData>({
      page: 1,
      limit: 10,
      total: 1000
    })
    const paginationDataChange = (data: IPaginationData) => {
      paginationData.page = data.page
      paginationData.limit = data.limit
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 150)
    }
    return { tableData, tableColumn, paginationData, loading, paginationDataChange }
  }
})
</script>
<style lang="scss" scoped>

</style>
