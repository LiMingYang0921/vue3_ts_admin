<template>
  <div class="user">
    <Table :loading="loading" :tableData="tableData" :tableColumn="tableColumn" :paginationData="paginationData"
      @limitChange="limitChange" @pageChange="pageChange">
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
    }, 1000)

    const paginationData = reactive<IPaginationData>({
      page: 1,
      limit: 10,
      total: 1000
    })

    const limitChange = (val: number) => {
      paginationData.limit = val
      console.log('limit', paginationData.limit)
    }
    const pageChange = (val: number) => {
      paginationData.page = val
      console.log('page', paginationData.page)
    }
    return { tableData, tableColumn, paginationData, loading, limitChange, pageChange }
  }
})
</script>
<style lang="scss" scoped>
.user {
  // width: 100%;
}
</style>
