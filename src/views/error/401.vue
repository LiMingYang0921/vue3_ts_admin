<template>
  <div class='box'>
    <div>
      <h1 class='Oops'>Oops!</h1>
      <h2 class='text1'>你没有权限去该页面</h2>
      <h6 class='text2'>如有不满请联系你领导</h6>
      <el-button type="primary" round class="button" @click="goHomeClick">回首页</el-button>
    </div>
    <img src="@/assets/images/401.gif" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '401',
  setup () {
    const router = useRouter()
    const goHomeClick = () => {
      router.push('/')
    }
    return {
      goHomeClick
    }
  }
})
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .Oops {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
    line-height: 2em;
  }

  .text1 {
    font-weight: 600;
    font-size: 40px;
    line-height: 2em;
  }

  .text2 {
    font-weight: 600;
    font-size: 20px;
    line-height: 2em;
  }

  .button {
    margin-top: 0.5em;
  }
}
</style>
