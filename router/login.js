const router = require('koa-router')()
const registered = require('../db/login/registered')
const jwb = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const constant = require('../utils/constant')
//login页面注册接口
router.post('/login/registered', async ctx =>{
  const findRes = await registered.findOne({user:ctx.request.body.user})
  if(findRes){return ctx.body ={msg:'用户存在',status:422}}
  const res = await registered.insertMany(ctx.request.body)
  ctx.body=res
})
//login页面登录接口
router.post('/login/login', async (ctx) =>{
  // 先根据前端传来的user查找是否有此用户
  const {user,password} = ctx.request.body
  const findRes = await registered.findOne({user})
  if(!findRes){ return ctx.body={msg:'用户不存在请注册',status:422}}
  const validate = bcrypt.compareSync(password,findRes.password)
  if(!validate){ return ctx.body={msg:'账号或密码不正确',status:422}}
  const token = jwb.sign({id:findRes._id,user:findRes.user},constant.SECRET,{expiresIn:'600000'})
  ctx.body={msg:`欢迎${findRes.user}进入`,status:200,token}
})
const token = async (ctx,next)=>{
  const token = String(ctx.headers.authorization)
  const res = jwb.verify(token,constant.SECRET)
  console.log(res);
  await next()
}

module.exports = router.routes()