<template>
  <el-menu class="el-menu-vertical-demo" :collapse="store.state.menuIsCollapse" @select='onOpenChange'>
    <template v-for="item in menuRouterList" :key="item.name">
      <template v-if="item.meta?.showInMenu !== false">
        <el-sub-menu v-if="item?.children" :index="item.path">
          <template #title>
            <el-icon>
              <Location />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="ite in item?.children" :key="ite.path" :index="ite.path">
              {{ ite.meta?.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon>
            <icon-menu />
          </el-icon>
          <template #title>{{ item.meta?.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Menu as IconMenu, Location } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()
const routerList = router.getRoutes()

const menuRouterList = reactive(
  routerList.find((item) => item.name === 'home')?.children || []
)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const onOpenChange = (d: string) => {
  router.push(d)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
