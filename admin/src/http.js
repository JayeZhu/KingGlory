import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api' // 设定api基础网址
})

export default http