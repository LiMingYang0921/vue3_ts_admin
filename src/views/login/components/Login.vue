<template>
  <div class="box">
    <div class="title">后台管理系统</div>
    <el-form
      label-width="70px"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="手机号" prop="account">
        <el-input v-model="ruleForm.account" maxlength="11" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
    </el-form>
    <div class="login_button">
      <el-button
        class="button"
        type="primary"
        @click="submitForm"
        :loading="loading"
      >
        登入
      </el-button>
    </div>
    <div class="footer">
      <el-button
        @click="goRegisterClick"
        class="footer_button"
        type="info"
        link
      >
        暂无账号？去注册
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { utilValidatePhone } from '@/utils/util'

const effectForm = () => {
  const router = useRouter()
  const loading = ref(false)
  const ruleForm = reactive({
    account: '',
    password: ''
  })
  const validatePhone = (rule: any, value: any, callback: any) => {
    if (!utilValidatePhone(ruleForm.account)) {
      callback(new Error('请输入正确的手机号'))
    }
    callback()
  }
  const rules = reactive<FormRules>({
    account: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'change'
      },
      {
        validator: validatePhone,
        trigger: ['blur', 'change']
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change'
      }
    ]
  })
  const ruleFormRef = ref<FormInstance>()
  const submitForm = async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate((valid) => {
      if (valid) {
        console.log('submit!')
        loading.value = true
        setTimeout(() => {
          localStorage.token = 'token'
          router.push('/')
          loading.value = false
          ElMessage({
            message: '登入成功',
            type: 'success'
          })
        }, 1500)
      }
    })
  }

  return { loading, ruleForm, rules, ruleFormRef, submitForm }
}

export default defineComponent({
  setup (props, ctx) {
    const { loading, ruleForm, rules, ruleFormRef, submitForm } = effectForm()

    const goRegisterClick = () => {
      console.log(123123)

      ctx.emit('goRegister')
    }

    return {
      loading,
      ruleForm,
      rules,
      ruleFormRef,
      submitForm,
      goRegisterClick
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 40px;
  }

  .demo-ruleForm {
    width: 400px;
  }

  .login_button {
    text-align: center;

    .button {
      width: 400px;
      margin-top: 20px;
    }
  }

  .footer {
    width: 400px;
    margin-top: 16px;
    text-align: right;
  }
}
</style>