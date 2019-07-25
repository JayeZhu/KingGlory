module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')
  // 增
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  });
  // 查 populate - 查看父级
  router.get('/categories', async (req, res) => {
    const items = await Category.find().populate('parent').limit(10);
    res.send(items);
  });
  // 根据ID查
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  });
  // 改
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 删
  router.delete('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });
  app.use('/admin/api', router);
}