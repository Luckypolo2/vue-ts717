<script  lang="ts" setup="">
import {Monitor, Setting, ShoppingBag} from "@element-plus/icons-vue";
import useLoginStore from "@/store/login/login";
import {useRouter} from "vue-router";
const loginStore = useLoginStore()
const userMenu = loginStore.userMenus

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
function handleItemClick(item) {
  const url = item.url
  router.push(url)
}

</script>

<template>
  <div class="MainMenu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">后院管理系统</h2>
    </div>
    <div class="menu">
      <el-menu :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff" background-color="#001529">
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <!--动态组件  el-icon-monitor-->
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{item.name}}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item @click="handleItemClick(subItem)" :index="String(subItem.id)">{{subItem.name}}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.MainMenu {
  height: 100%;
  background-color: #001529;
}
.logo{
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  overflow: hidden;
  .img{
    height: 100%;
    margin: 0 10px;
  }
  .title{
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
    line-height: 28px;
  }
}
.el-menu{
  border-right: none;
  user-select: none;
}
.el-sub-menu{
  .el-menu-item{
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover{
    color: white;
  }
  .el-menu-item.is-active{
    background-color: #0a60bd;
  }
}
</style>
