<template>
  <div class="layouts">
    <div class="menu">
      <Menu />
    </div>
    <div class="content">
      <Header />
      <div class="views">
        <div class="views_box">
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
  .menu {
    height: 100vh;
    overflow-y: auto;
  }
  .content {
    flex: 1;
    .views {
      box-sizing: border-box;
      width: 100%;
      height: calc(100vh - 50px);
      background: rgb(238, 240, 243);
      padding: 18px;
      overflow-y: auto;
      .views_box{
        width: 100%;
        height: 100%;
        background: #fff;
        overflow-y: auto
      }
    }
  }
}
</style>
