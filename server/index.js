const express = require("express")

const app = express()

app.set('secret', 'awef32341fawefawef1');

app.use(require('cors')())   // 解决跨域
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)  // 链接mongo数据库
require('./routes/admin')(app)  // 导入 管理页面的 路由

app.listen(3000, () => {
  console.log('http://localhost:3000');
});