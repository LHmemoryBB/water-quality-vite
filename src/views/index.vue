<template>
  <el-container class="index-con">
    <el-header class="index-header">
      <navcon></navcon>
    </el-header>
    <el-container class="main-con">
      <el-aside>
        <leftnav ref="leftnav"></leftnav>
      </el-aside>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
// 导入组件
import navcon from "../components/navcon.vue";
import leftnav from "../components/leftnav.vue";
</script>
<style>
/* .main-con{
  min-width: 1600px !important;
} */
.index-header {
  min-width: 1310px !important;
}
.el-main {
  min-width: 1070px !important;
}
</style>
<style>
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.asideshow {
  width: 185px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.index-con .index-header {
  width: 100%;
  padding: 0px !important;
  /* border-left: 2px solid #333; */
}
.el-header {
  padding: 0px !important;
}
.el-menu.el-menu--horizontal {
  /* border-bottom: solid 1px #334157; */
}
.index-con .index-main {
  /* max-height: 825px !important; */
  width: 100%;
}
</style>
