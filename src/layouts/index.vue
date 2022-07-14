<template>
  <div class="layouts">
    <div class="menu">
      <Menu />
    </div>
    <div class="content">
      <Header />
      <div class="views">
        <div class="views_box beauty-scroll-crude">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Menu from './menu/index.vue'
import Header from './header/index.vue'
export default defineComponent({
  components: {
    Menu,
    Header
  }
})
</script>
<style lang="scss" scoped>
.layouts {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;

  .menu {
    height: 100vh;
    overflow-y: hidden;
    // overflow-y: auto;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .views {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: calc(100vh - 50px);
      background: rgb(238, 240, 243);
      padding: 18px;

      // overflow-y: auto;
      .views_box {
        position: absolute;
        width: calc(100% - 36px);
        background: #fff;
        overflow-x: auto;
      }
    }
  }
}

.beauty-scroll-crude {
  scrollbar-color: #ccc #666;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: var(--el-color-primary);
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 5px;
    background: #666;
  }
}
</style>
