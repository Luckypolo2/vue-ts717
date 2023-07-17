<script  lang="ts" setup="">
import {ref} from "vue";

// 自定义内部事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuIconClick(){
  isFold.value = !isFold.value
  emit('foldChange',isFold.value)
}
</script>

<template>
  <div class="MainHeader">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <header-info></header-info>
    </div>
  </div>
</template>

<style lang="less" scoped>
.MainHeader{
  display: flex;
  align-content: center;
  flex: 1;
  height: 100%;
  .menu-icon{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
