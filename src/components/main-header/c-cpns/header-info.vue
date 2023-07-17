<script  lang="ts" setup="">

import {ChatDotRound, CircleClose, InfoFilled, Lock, Message, Search} from "@element-plus/icons-vue";
import {localCache} from "@/utils/cache";
import {LOGIN_TOKEN} from "@/global/constants";
import {useRouter} from "vue-router";

const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message></Message></el-icon>
      </span>
      <span>
        <el-icon><ChatDotRound></ChatDotRound></el-icon>
        <span class="dot"></span>
      </span>
      <span>
        <el-icon><Search></Search></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info ">
          <el-avatar :size="30" src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"></el-avatar>
          <span class="name">CoderWhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu @click="handleExitClick">
            <el-dropdown-item>
              <el-icon><CircleClose></CircleClose></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><info-filled></info-filled></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Lock></Lock></el-icon>
              <span>修改密码 </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-info{
  display: flex;
  align-items: center;
}
.operation{
  display: inline-flex;
  margin-right: 20px;
  span{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
  }
  &:hover{
    background: #f0f2f2;
  }
  i{
    font-size: 20px;
  }
  .dot{
    position: relative;
    top: -9px;
    right: -1px;
    z-index: 10;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 100%;
  }
}
.info{
  .user-info{
    display: flex;
    align-items: center;
    cursor: pointer;
    .name{
      margin-left: 5px;
    }
  }
}
.info{
  // 全局样式 拿到内部样式
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
