<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="table_page">
    <div class="table_box">
      <el-table v-loading="loading" :style="{ minWidth: `${tableMinWidth}px` }" :data="tableData" :border="border"
        :height="height" @selection-change="selectionChange" @select="select" @select-all="selectAll">
        <el-table-column v-for="(item, index) in tableColumn" :type="item.type" :key="index" :prop="item.prop"
          :width="item.width" :label="item.label">
          <template v-if="item.type === 'expand'" #default="scope">
            <slot name="expand" :scope="scope"></slot>
          </template>
          <template v-if="item.headerSlot" #header="scope">
            <slot :name="item.headerSlot" :scope="scope"></slot>
          </template>
          <template v-if="item.slot" #default="scope">
            <slot :name="item.slot" :scope="scope" />
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
type ComponentProps = ExtractPropTypes<typeof props>
const usePaginationChange = (paginationData: IPaginationData, ctx: SetupContext) => {
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
const useSelect = (ctx: SetupContext) => {
  const select = (selection: object[], row: object) => {
    ctx.emit('select', selection, row)
  }
  const selectAll = (selection: object[]) => {
    ctx.emit('select-all', selection)
  }
  const selectionChange = (selection: object[]) => {
    ctx.emit('selection-change', selection)
  }
  return { select, selectAll, selectionChange }
}
export default defineComponent({
  props,
  setup (props: ComponentProps, ctx: SetupContext) {
    const elPagination = ref()
    const tableMinWidth = ref<number>(0)
    onMounted(() => {
      tableMinWidth.value = elPagination?.value?.$el.clientWidth || 0
    })
    const { handleCurrentChange, handleSizeChange } = usePaginationChange(props.paginationData, ctx)
    const { select, selectAll, selectionChange } = useSelect(ctx)
    return {
      elPagination, tableMinWidth, handleSizeChange, handleCurrentChange, select, selectAll, selectionChange
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
      margin: 18px;
    }
  }
}
</style>
