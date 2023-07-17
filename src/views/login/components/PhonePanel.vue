<script  lang="ts" setup>

</script>

<template>
  <div class="PhonePanel">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input></el-input>
          <span>
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.verify-code{
  display: flex;
  .get-btn{
    margin-left: 8px;
  }
}
</style>
