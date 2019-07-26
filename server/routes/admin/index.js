module.exports = app => {
  const express = require('express')
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
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require(`../../models/${modelName}`);
    next()
  }, router);
}