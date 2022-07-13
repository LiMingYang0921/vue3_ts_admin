<template>
  <div class="header">
    <div class="collapse">
      <el-icon @click="changeMenuStateClick">
        <Expand v-show="store.state.menuIsCollapse" />
        <Fold v-show="!store.state.menuIsCollapse" />
      </el-icon>
    </div>
    <el-dropdown>
      <el-avatar :size="40" :src="circleUrl" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logOutClick">退出登入</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { Expand, Fold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { Expand, Fold },
  setup () {
    const store = useStore()
    const router = useRouter()
    const changeMenuStateClick = () => {
      store.commit('setMenuIsCollapse')
    }
    const circleUrl = ref<string>('https://img0.baidu.com/it/u=2044521786,1479427660&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500')
    const logOutClick = () => {
      router.push('/login')
      localStorage.removeItem('token')
    }
    return { changeMenuStateClick, logOutClick, store, circleUrl }
  }
})
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 18px;
  box-sizing: border-box;

  .collapse {
    font-size: 18px;
  }
}
</style>
