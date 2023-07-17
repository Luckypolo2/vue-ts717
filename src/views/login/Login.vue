<script  lang="ts" setup>

import LoginPanel from "@/views/login/components/LoginPanel.vue";
</script>

<template>
  <div class="Login">
    <login-panel></login-panel>
  </div>
</template>

<style lang="less" scoped>
.Login{
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/img/login-bg.svg");
}
</style>
