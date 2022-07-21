<template>
  <div class="user">
    <Table :loading="loading" :tableData="tableData" :tableColumn="tableColumn" :paginationData="paginationData"
      :selection="true" @paginationDataChange="paginationDataChange" @selection-change="selectionChange"
      @select="select" @select-all="selectAll">
      <template v-slot:expand="{ scope }">
        <div m="4">
          <p m="t-0 b-2">时间: {{ scope.row.date }}</p>
          <p m="t-0 b-2">姓名: {{ scope.row.name }}</p>
        </div>
      </template>
      <template v-slot:dateHeader>
        <a href="">时间</a>
      </template>
      <template v-slot:nameHeader>
        <a href="">姓名</a>
      </template>
      <template v-slot:name="{ scope }">
        <a @click="click(scope)">{{ scope.row.name }}</a>
      </template>
      <template v-slot:operate="{ scope }">
        <a @click="click(scope)">点击</a>
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
    const tableColumn = reactive<Array<ITableColumn>>([
      // {
      //   type: 'expand'
      // },
      {
        label: '时间',
        prop: 'date',
        headerSlot: 'dateHeader'
      },
      {
        label: '姓名',
        prop: 'name',
        slot: 'name',
        headerSlot: 'nameHeader'
      },
      {
        label: '地址',
        prop: 'address'
      },
      {
        label: '操作',
        slot: 'operate'
      }
    ])

    const tableData = ref<Array<object>>([])
    loading.value = true
    setTimeout(() => {
      loading.value = false
      tableData.value = [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom1',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom1',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-022',
          name: 'Tom2',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-041',
          name: 'Tom3',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-024',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-046',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
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
    const click = (scope: object) => {
      console.log(scope)
    }
    const select = (val: object[], row: object) => {
      console.log('select')
      console.log(val)
      console.log(row)
    }
    const selectAll = (val: object[]) => {
      console.log('selectAll')
      console.log(val)
    }
    const selectionChange = (val: object[]) => {
      console.log('selectionChange')
      console.log(val)
    }
    return {
      tableData,
      tableColumn,
      paginationData,
      loading,
      paginationDataChange,
      click,
      select,
      selectAll,
      selectionChange
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
