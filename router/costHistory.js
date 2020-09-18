const router = require('koa-router')()
const History = require('../db/admin/History')
const multer = require('@koa/multer')
const upload = multer({dest:__dirname+'/../public/upload'})
const jwb = require('jsonwebtoken')
const Registered =require('../db/login/registered')
const constant = require('../utils/constant')
const auth = async (ctx,next)=>{
  const token = String(ctx.headers.authorization||'').split(' ').pop()
  if(!token){return ctx.body = {msg:'token不存在',status:401}}
  const {id} = jwb.verify(token,constant.SECRET)
  const res = await Registered.findById(id)
  if(!res){ return ctx.body = {msg:'请先登录',status:401} }
  await next()
} 
router.post('/history/month',auth,async ctx=>{
  console.log(ctx.request.body);
  const start = ctx.request.body.month[0]
  const end = ctx.request.body.month[1]
  const res = await History.find({created:{$gte:start,$lt:end}}).populate('layer')
  ctx.body=res
})
router.get('/history/cost',auth,async ctx=>{
  const res = await History.find().populate('layer')
  ctx.body=res
})
// 上传图片
router.post('/upload',auth,upload.single('file'),async ctx =>{
  // console.log(ctx.file);
  ctx.file.url = `http://localhost:3000/upload/${ctx.file.filename}`
  ctx.body=ctx.file
})

module.exports = router.routes()