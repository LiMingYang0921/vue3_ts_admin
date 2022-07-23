<template>
  <div class="user">
    <Table :loading="loading" :tableData="tableData" :tableColumn="tableColumn" :paginationData="paginationData"
      :selection="true" @paginationDataChange="paginationDataChange">
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import Table from '@/components/table/Table.vue'
import { IPaginationData, ITableColumn } from '@/components/table/interface'
import request from '@/api/index'

const useGetUserList = () => {
  const loading = ref<boolean>(false)
  const tableData = ref<Array<object>>([])
  const paginationData = reactive<IPaginationData>({
    page: 1,
    limit: 10,
    total: 0
  })
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
      prop: 'registrationTime'
    },
    {
      label: '角色',
      prop: 'role'
    }
  ])
  const getUserList = () => {
    loading.value = true
    const data = {
      page: paginationData.page,
      limit: paginationData.limit
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
  return { loading, tableColumn, tableData, paginationData, paginationDataChange }
}

export default defineComponent({
  components: { Table },
  setup () {
    const { loading, tableData, tableColumn, paginationData, paginationDataChange } = useGetUserList()
    return {
      tableData,
      tableColumn,
      paginationData,
      loading,
      paginationDataChange
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
