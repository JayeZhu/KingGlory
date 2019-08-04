import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api' // 设定api基础网址
})

http.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      message: err.response.data.message,
      type: 'error'
    })
    if (err.response.status === 401) {
      router.push('/login');
    }
  }
  return Promise.reject(err)
})

export default http