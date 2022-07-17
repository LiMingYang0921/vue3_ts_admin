<template>
  <div class="table_page">
    <div class="table_box">
      <el-table v-loading="loading" :style="{ minWidth: `${tableMinWidth}px` }" :data="tableData">
        <el-table-column v-for="(item, index) in tableColumn" :key="index" :prop="item.prop" :label="item.label" />
      </el-table>
    </div>
    <div class="pagination">
      <div class="placeholder" />
      <el-pagination class="el_pagination" ref="elPagination" :currentPage="paginationData.page"
        :page-size="paginationData.limit" :total="paginationData.total" :page-sizes="limitList" :background="true"
        layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'
import { IPaginationData, ITableColumn } from './interface'
export default defineComponent({
  props: {
    loading: {
      require: true,
      type: Boolean
    },
    tableData: Array,
    tableColumn: Array as PropType<Array<ITableColumn>>,
    paginationData: {
      require: true,
      type: Object as PropType<IPaginationData>,
      default: function () {
        return {
          page: 1,
          limit: 10
        }
      }
    },
    limitList: {
      require: false,
      default: () => [10, 20, 30]
    }
  },
  setup (props, ctx) {
    const elPagination = ref()
    const tableMinWidth = ref<number>(0)
    onMounted(() => {
      tableMinWidth.value = elPagination?.value?.$el.clientWidth || 0
    })
    const handleSizeChange = (val: number) => {
      ctx.emit('limitChange', val)
    }
    const handleCurrentChange = (val: number) => {
      ctx.emit('pageChange', val)
    }
    return {
      elPagination, tableMinWidth, handleSizeChange, handleCurrentChange
    }
  }
})
</script>
<style lang="scss" scoped>
.table_page {
  display: flex;
  flex-direction: column;

  .pagination {
    display: flex;

    .placeholder {
      width: 1px;
      flex: 1;
    }

    .el_pagination {
      flex: 1;
      margin: 18px;
    }
  }
}
</style>
