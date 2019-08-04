module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert');
  const AdminUser = require('../../models/AdminUser');
  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth');
  // 资源管理中间件
  const resourceMiddleware = require('../../middleware/resource');
  const router = express.Router({
    mergeParams: true
  })
  
  // 增
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  });
  // 查 populate - 查看父级
  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  });
  // 根据ID查
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
  // 改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 删
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);

  const multer = require('multer');
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 1-根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password');
    assert(user, 422, '用户不存在')
    // 2-校验密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    assert(isValid, 422, '密码错误')
    // 3-返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({token});

    // 4-错误处理函数
    app.use(async (err, req, res, next) => {
      console.log(err);
      res.status(err.statusCode || 500).send({
        message: err.message
      });
    });
  });
  
}