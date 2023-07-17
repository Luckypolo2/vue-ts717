<script  lang="ts" setup="">
import {localCache} from "@/utils/cache";
import {LOGIN_TOKEN} from "@/global/constants";
import {useRouter} from "vue-router";
import MainHeader from "@/components/main-header/main-header.vue";
import {ref} from "vue";

const router = useRouter()
const isCollapse = ref(false)
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<template>
  <div class="Main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px': '210px'">
        <MainMenu :isFold="isCollapse"></MainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="handleFoldChange"></MainHeader>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.Main {
  width: 100%;
  height: 100%;
}
.main-content {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.2s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  //.el-header {
  //  background-color: skyblue;
  //}
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
