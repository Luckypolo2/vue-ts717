<script  lang="ts" setup>
import {reactive, ref} from "vue";
import type {FormInstance, FormRules} from "element-plus";
import {ElMessage} from "element-plus";
import useLoginStore from "@/store/login/login";
import type {IAccount} from "@/types";
import {localCache} from "@/utils/cache";

const LOGIN_INFO = 'loginInfo'
const account = reactive<IAccount>({
  name:localCache.getCache(LOGIN_INFO)?.name || ('' as string),
  password:localCache.getCache(LOGIN_INFO)?.password || ('' as string)
})
const accountRoles:FormRules = {
  name: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'change'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'change'}
  ]
}
const formRef = ref<FormInstance | undefined>()
const loginStore = useLoginStore()
function loginAction(isRemPwd:boolean) {
  formRef.value?.validate((valid,fields)=> {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({name,password}).then(()=>{
        ElMessage.success('登录成功')
        if (isRemPwd) {
          localCache.setCache(LOGIN_INFO,{name,password})
        } else {
          localCache.removeCache(LOGIN_INFO)
        }
      }).catch(()=>{
        ElMessage.error('登录失败')
      })
    } else {
      console.log(fields)
      ElMessage.error('请输入正确的账号密码')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<template>
  <div class="account-panel">
    <el-form
        ref="formRef"
        :model="account"
        :rules="accountRoles"
        label-width="60px"
        style="max-width: 460px"
        size="large"
        status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
