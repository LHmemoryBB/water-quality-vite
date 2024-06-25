/** * 左边菜单 */
<template>
  <!-- <div style="color:#ffffff">{{allmenu}}</div> -->
  <div style="position: relative"  class="left-nav">
    <el-menu
      :default-active="currentPath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#1e90fa"
      text-color="#FFF"
      active-text-color="#FFF"
      router
    >
      <el-menu-item v-for="(item, index) in routes[3].children" :index="item.path" :key="index">
        <el-icon><CreditCard /></el-icon>
        <span>{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { useRoute} from 'vue-router'
import { ref} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  CreditCard 
} from "@element-plus/icons-vue";
import { routes } from "@/router/index";
const route = useRoute();
const currentPath = ref('')
currentPath.value = route.path
const handleOpen = (key, keyPath) => {
};
const handleClose = (key, keyPath) => {
};

</script>
<style>
.el-menu-vertical-demo {
  height: calc(100vh - 60px);
  overflow: hidden;
  overflow-y: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 240px; */
  min-height: 200px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 30px;
  line-height: 20px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 5px 0px;
}
.logoimg {
  height: 24px;
}
.menu-icon {
  text-align: center;
  width: 26px;
  display: inline-block;
}
/* .icon-width :before{
  width: 21px;
  display:inline-block;
} */
</style>

<style lang="less" scoped>
.left-nav :deep(.el-menu-item.is-active){
    background-color: #00000082;
}
</style>
