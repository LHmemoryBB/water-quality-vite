/** * 头部菜单 */
<template>
  <div style="display: flex; background: rgba(30, 144, 250, 1)">
    <div class="title">
      <div style="height: 100%; display: inline-flex">
        <div style="padding-left: 1px">水质监测平台</div>
      </div>
    </div>

    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      background-color="#1e90fa"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-sub-menu index="2" class="submenu">
        <template #title>
          <el-icon>
            <User />
          </el-icon>
          {{ userInfo.username }}
        </template>
        <el-menu-item @click="dialogVisible = true" index="2-2">
          修改密码</el-menu-item
        >
        <el-menu-item @click="exit()" index="2-3"> 退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>

    <el-dialog title="修改密码" v-model="dialogVisible" width="30%">
      <el-form ref="form" :model="passForm" label-width="80px">
        <el-form-item label="登录密码">
          <el-input type="password" v-model="passForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="passForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="passForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logout, changePass } from "@/api/route";
import { ElMessage } from "element-plus";

const router = useRouter();
const dialogVisible = ref(false);
const passForm = ref({
  password: "",
  confirmPassword: "",
  oldPassword: "",
  id: "",
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const exit = () => {
  logout().then((res) => {
    router.push("/login");
  });
};
const updatePassword = () => {
  passForm.value.id = localStorage.getItem("id");
  changePass(passForm.value).then((res) => {
    ElMessage({
      message: res+ '，请重新登录',
      type: 'success',
    });
    setTimeout(() => {
      exit();
    }, 1500);
    
  });
};
</script>

<style scoped>
.el-menu-demo {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}

.right {
  width: calc(100% - 431px);
  display: flex;
  justify-content: flex-end;
}

.title {
  min-width: 411px;
  height: 60px;
  margin-left: 20px;
  float: left;
  color: #ffffff;
  font-size: 22px;
  /* text-align: center; */
  line-height: 60px;
  /* background-image: url("../assets/img/top-back.png"); */
}

.submenu {
  float: right;
}

/* .buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
} */
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}

.showimg:active {
  border: none;
}

.marquee {
  width: 800px;
  height: 100%;
  line-height: 60px;
  color: #ffffff;
  margin-right: 70px;
}

.element-btn {
  margin-top: 13px;
}

.set-btn {
  width: 25px;
  color: #ffffff;
  padding-top: 20px;
  cursor: pointer;
}

.erweima-div {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.erweima-div:hover .erweima2-div {
  display: inline-block;
}

.erweima2-div {
  display: none;
  position: absolute;
  right: -63px;
  top: 59px;
  z-index: 1000;
  background: #ffffff;
  text-align: center;
}
</style>
