<template>
  <div style="min-width: 800px">
    <el-table :data="tableData">
      <el-table-column v-for="(item, index) in tableColumn" :key="index" :prop="item.prop" :label="item.label" />
    </el-table>
    <div class="pagination">
      <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
        :background="true" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const tableData = [{
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
    const tableColumn = [{
      label: '时间', prop: 'date'
    }, {
      label: '姓名', prop: 'name'
    }, {
      label: '地址', prop: 'address'
    }]

    const pageSize4 = ref(100)
    const currentPage4 = ref(4)
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    return { tableData, tableColumn, pageSize4, currentPage4, handleSizeChange, handleCurrentChange }
  }
})
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-direction: row-reverse;
  margin: 18px;
}
</style>
