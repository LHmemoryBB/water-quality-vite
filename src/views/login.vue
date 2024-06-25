<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-header">
        <img class="logo mr10" src="@/assets/img/logo.svg" alt="" />
        <div class="login-title">水质检测系统</div>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginFormData"
        :rules="loginFormRules"
        @keyup.enter="handleLogin"
        v-if="isLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginFormData.username"
            placeholder="用户名"
            type="text"
            :prefix-icon="User"
            tabindex="1"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginFormData.password"
            placeholder="密码"
            type="password"
            tabindex="2"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <div style="text-align: end; width: 100%">
            <el-button type="success" text @click="isLogin = false"> 没有账号，前往注册 </el-button>
          </div>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          size="large"
          @click.prevent="handleLogin"
          style="float: right"
          >登 录</el-button
        >
      </el-form>
      <el-form
        ref="regsionFormRef"
        :model="regsionForm"
        :rules="regsionFormRules"
        v-else
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="regsionForm.username"
            placeholder="用户名"
            type="text"
            :prefix-icon="User"
            tabindex="1"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model.trim="regsionForm.phone"
            placeholder="手机号"
            type="text"
            :prefix-icon="PhoneFilled"
            tabindex="1"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="regsionForm.password"
            placeholder="密码"
            type="password"
            tabindex="2"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input
            v-model.trim="regsionForm.confirmPass"
            placeholder="确认密码"
            type="password"
            tabindex="2"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <div style="text-align: end; width: 100%">
            <el-button type="primary" text @click="isLogin = true"> 已有账号，前往登录 </el-button>
          </div>
        </el-form-item>
        <el-button
          :loading="loading"
          style="float: right"
          type="success"
          size="large"
          @click.prevent="handlerRegsion"
          >注 册</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Lock, User, PhoneFilled} from "@element-plus/icons-vue";
import { userLogin, RegisterApi } from "@/api/route";
import { useRouter } from "vue-router";
const loginFormData = ref({
  username: "test01",
  password: "123",
});
const isLogin = ref(true);
const regsionForm = ref({
  username: "",
  password: "",
  phone: "",
  confirmPass: "",
});
const router = useRouter();
const loginFormRef = ref(null);
const regsionFormRef = ref(null);

const loginFormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" },
  ],
};
const regsionFormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" },
  ],
  confirmPass: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" },
  ],
};
const loading = ref(false);

const handleLogin = () => {
  loginFormRef.value?.validate(async (valid, fields) => {
    if (valid) {
      const res = await userLogin(loginFormData.value);
      console.log(res);
      localStorage.setItem("userInfo", JSON.stringify(loginFormData.value));
      localStorage.setItem("id", res.id);
      ElMessage({
        message: "登录成功",
        type: 'success',
      });
      router.push({
        path: "/view/waterTable",
      });
    } else {
      ElMessage({
        message: "表单校验不通过",
        type: "error",
      });
    }
  });
};
const handlerRegsion = () => {
  regsionFormRef.value?.validate(async (valid, fields) => {
    if (valid) {
      const res = await RegisterApi(regsionForm.value);
      console.log(res);
      ElMessage({
        message: "注册成功",
        type: 'success',
      });
      isLogin.value = true
    } else {
      ElMessage({
        message: "表单校验不通过",
        type: 'error',
      });
    }
  });
};
</script>

<style scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.logo {
  width: 35px;
}

.login-title {
  font-size: 22px;
  color: #333;
  font-weight: bold;
}

.login-container {
  width: 450px;
  border-radius: 5px;
  background: #fff;
  padding: 40px 50px 50px;
  box-sizing: border-box;
}

.pwd-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: -10px 0 10px;
  color: #787878;
}

.pwd-checkbox {
  height: auto;
}

.login-btn {
  display: block;
  width: 100%;
}

.login-tips {
  font-size: 12px;
  color: #999;
}

.login-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #787878;
}
</style>
