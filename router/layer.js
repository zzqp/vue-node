const router = require('koa-router')()
const Layer = require('../db/admin/Layer')
const jwb = require('jsonwebtoken')
const constant = require('../utils/constant')
const Registered = require('../db/login/registered')
// const auth = async (ctx,next)=>{
//   const token = String(ctx.headers.authorization||'').split(' ').pop()
//   if(!token){return ctx.body = {msg:'token不存在',status:401}}
//   const verifyRes = jwb.verify(token,constant.SECRET)
//   if(!verifyRes.iat<verifyRes.exp){return ctx.body = {msg:'token过期',status:401}}
//   const res = await Registered.findById(verifyRes.id)
//   if(!res){ return ctx.body = {msg:'请先登录',status:401} }
//   await next()
// } 
const auth = async (ctx,next)=>{
  const token = String(ctx.headers.authorization||'').split(' ').pop()
  if(!token){return ctx.body = {msg:'token不存在',status:401}}
  const verifyRes = jwb.verify(token,constant.SECRET, (err, decoded) => {
    if (err) {
        console.log(err);
        if(err.name == 'TokenExpiredError'){//token过期
            let str = {
                iat:1,
                exp:0,
                msg: 'token过期'
            }
            return str;
        }else if(err.name == 'JsonWebTokenError'){//无效的token
            let str = {
                iat:1,
                exp:0,
                msg: '无效的token'
            }
            return str;
        }
    }else{
        return decoded;
    }
})
  const res = await Registered.findById(verifyRes.id)
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
  const items = await Layer.find({name:{$regex:'层'}}).populate('parent')
  const res = await Layer.find({name:{$regex:'0'}}).populate('parent')
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