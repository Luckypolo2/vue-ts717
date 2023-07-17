<script  lang="ts" setup>
import {ref, watch} from "vue";
import {Iphone, UserFilled} from "@element-plus/icons-vue";
import AccountPanel from "@/views/login/components/AccountPanel.vue";
import {localCache} from "@/utils/cache";
import PhonePanel from "@/views/login/components/PhonePanel.vue";
const isRemPwd = ref<boolean>(localCache.getCache("isRemPwd") ?? false);
watch(isRemPwd, (newVal) => {
  console.log(newVal)
  localCache.setCache("isRemPwd", newVal)
  console.log('isRemPwd',localCache.getCache("isRemPwd"))
});
const activeName = ref("account")
// const accountRef = ref<InstanceType<typeof AccountPanel> |null>(null)
type accountRefType = InstanceType<typeof AccountPanel | any>
// const accountRef = ref<{loginAction:()=>void} | null>(null)
const accountRef = ref<accountRefType| null>(null)
function handleLoginBtnClick() {
  if (activeName.value === "account") {
    // console.log('account login',accountRef.value?.loginAction)
    accountRef.value?.loginAction(isRemPwd.value)
    // console.log(accountRef.value)
  } else {
    console.log("phone login")
  }
}
</script>

<template>
  <div class="LoginPanel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane label="账号登录" name="account">
          <template v-slot:label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </div>
          </template>
<!--          <div>账号登录content</div>-->
          <AccountPanel ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template v-slot:label>
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </template>
          <PhonePanel />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large"></el-checkbox>
      <el-link type="primary" size="large">忘记密码</el-link>
    </div>
      <el-button @click="handleLoginBtnClick" class="login-btn" type="primary" size="large" round>登录</el-button>
  </div>
</template>

<style lang="less" scoped>
.LoginPanel{
  width:330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
