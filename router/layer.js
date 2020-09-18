const router = require('koa-router')()
const Layer = require('../db/admin/Layer')
const jwb = require('jsonwebtoken')
const constant = require('../utils/constant')
const Registered = require('../db/login/registered')
const auth = async (ctx,next)=>{
  const token = String(ctx.headers.authorization||'').split(' ').pop()
  if(!token){return ctx.body = {msg:'token不存在',status:401}}
  const {id} = jwb.verify(token,constant.SECRET)
  const res = await Registered.findById(id)
  if(!res){ return ctx.body = {msg:'请先登录',status:401} }
  await next()
} 
// 添加楼层
router.post('/rest/layer/add',auth,async ctx => {
  const body = ctx.request.body
  const model = await Layer.insertMany(body)
  ctx.body = model
})
// 查找楼层
router.get('/rest/layer',auth,async ctx =>{
  const items = await Layer.find().populate('parent').limit(3)
  const res = await Layer.find().populate('parent').skip(3)
  ctx.body = {items,res}
})
// 查询楼层
router.get('/rest/layer/:id',auth,async ctx =>{
  const model = await Layer.findById(ctx.params.id)
  ctx.body = model
})
// 编辑楼层
router.put('/rest/layer/:id',auth,async ctx =>{
  const model = await Layer.findByIdAndUpdate(ctx.params.id,ctx.request.body)
  ctx.body = model  
})
// 删除楼层
router.delete('/rest/layer/:id',auth,async ctx =>{
  const res = await Layer.findByIdAndDelete(ctx.params.id)
  ctx.body = {
    res
  }
})

module.exports = router.routes()