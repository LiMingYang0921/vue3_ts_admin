<template>
  <div class="table_page">
    <div class="table_box">
      <el-table v-loading="loading" :style="{ minWidth: `${tableMinWidth}px` }" :data="tableData">
        <el-table-column v-for="(item, index) in tableColumn" :key="index" :prop="item.prop" :label="item.label">
          <template v-if="item.headerSlots" #header>
            <slot :name="item.headerSlots"></slot>
          </template>
        </el-table-column>
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
import { defineComponent, ref, onMounted, ExtractPropTypes, SetupContext } from 'vue'
import { IPaginationData } from './interface'
import { props } from './props'
export type ComponentProps = ExtractPropTypes<typeof props>
const paginationChange = (paginationData: IPaginationData, ctx: SetupContext) => {
  const handleCurrentChange = (val: number) => {
    ctx.emit('paginationDataChange', {
      page: val,
      limit: paginationData.limit
    })
  }
  const handleSizeChange = (val: number) => {
    ctx.emit('paginationDataChange', {
      page: paginationData.page,
      limit: val
    })
  }
  return { handleSizeChange, handleCurrentChange }
}
export default defineComponent({
  props,
  setup (props: ComponentProps, ctx: SetupContext) {
    const elPagination = ref()
    const tableMinWidth = ref<number>(0)
    onMounted(() => {
      tableMinWidth.value = elPagination?.value?.$el.clientWidth || 0
    })
    const { handleCurrentChange, handleSizeChange } = paginationChange(props.paginationData, ctx)
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
