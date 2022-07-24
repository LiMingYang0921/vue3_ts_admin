<template>
  <div class="user">
    <Table :loading="loading" :tableData="tableData" :tableColumn="tableColumn" :paginationData="paginationData"
      :selection="true" @paginationDataChange="paginationDataChange" @sort-change="sortChange">
      <template v-slot:roleHeader="{}">
        <TableFilter name="角色" :filterList="[]" :queryValue="query.role" queryLabel="role" @setQuery="setQuery" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import Table from '@/components/table/Table.vue'
import TableFilter from '@/components/table_filter/TableFilter.vue'
import { IPaginationData, ITableColumn, ISort } from '@/components/table/interface'
import request from '@/api/index'
import { roleList } from '@/utils/data'

const useGetUserList = () => {
  const loading = ref<boolean>(false)
  const tableData = ref<Array<object>>([])
  const paginationData = reactive<IPaginationData>({
    page: 1,
    limit: 10,
    total: 0
  })
  interface IQuery {
    role: Array<number>
  }
  interface IQueryItem {
    label: 'role',
    value: any
  }
  const query = reactive<IQuery>({
    role: []
  })
  const sort = reactive<ISort>({
    order: '',
    prop: ''
  })
  const getUserList = () => {
    loading.value = true
    const data = {
      pagination: {
        page: paginationData.page,
        limit: paginationData.limit
      },
      sort,
      query
    }
    request.XHRGetUserList(data).then((res: any) => {
      if (res.code === 200) {
        tableData.value = res.data ?? []
        paginationData.total = res.total ?? 0
      }
    }).finally(() => {
      loading.value = false
    })
  }
  getUserList()
  const paginationDataChange = (data: IPaginationData) => {
    paginationData.page = data.page
    paginationData.limit = data.limit
    getUserList()
  }

  const sortChange = (column: any) => {
    sort.order = column.order
    sort.prop = column.prop
    getUserList()
  }

  const setQuery = (e: IQueryItem) => {
    query[e.label] = e.value
    getUserList()
  }
  return { loading, tableData, paginationData, query, paginationDataChange, sortChange, setQuery }
}

export default defineComponent({
  components: { Table, TableFilter },
  setup () {
    const formatter = (row: any, column: any, cellValue: any, index: number) => {
      const text = roleList.find((item) => {
        return item.value === cellValue
      })?.text
      return text
    }
    const tableColumn = reactive<Array<ITableColumn>>([
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '手机号',
        prop: 'phone'
      },
      {
        label: '邮箱',
        prop: 'email'
      },
      {
        label: '身份证号',
        prop: 'IDCard'
      },
      {
        label: '地址',
        prop: 'address'
      },
      {
        label: '出生日期',
        prop: 'registrationTime',
        sortable: 'custom'
      },
      {
        label: '角色',
        prop: 'role',
        headerSlot: 'roleHeader',
        formatter: formatter
      }
    ])

    const { loading, tableData, paginationData, query, paginationDataChange, sortChange, setQuery } = useGetUserList()
    const click = (scope: any) => {
      console.log(scope)
    }
    return {
      tableData,
      tableColumn,
      paginationData,
      loading,
      query,
      paginationDataChange,
      sortChange,
      click,
      setQuery
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
