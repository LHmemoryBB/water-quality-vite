import axios from "axios";
import { ElMessage } from "element-plus";
import { router } from '@/router/index'
/**
 * 自定义axios实例
 */
const service = axios.create({
  baseURL: "/",
  timeout: 1000 * 10,
});

/**
 * 配置请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 如果需要，可以在此处添加认证 token
    // if (localStorage.getItem('token')) {
    //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    // }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * 配置响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const { data, code, msg } = response.data;
    if (code === 1) {
      return data;
    } else if (msg == "NOTLOGIN") {
      ElMessage({
        type: "error",
        message: '登录信息失效，请重新登录',
      });
      
      setTimeout(() => {
        router.push({
          path: '/login'
        })
      }, 1000);
    } else {
      ElMessage({
        type: "error",
        message: msg,
      });
      return Promise.reject(new Error(msg));
    }
  },
  (err) => {
    if (err.response) {
      ElMessage.error(err.response.data);
    } else {
      ElMessage.error(err.message);
    }
    return Promise.reject(err);
  }
);

export default service;
