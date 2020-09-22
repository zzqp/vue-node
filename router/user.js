const router = require('koa-router')()
const Layer = require('../db/admin/Layer')
const HouseInfo = require('../db/admin/HouseInfo')
const Info = require('../db/admin/Info')
const Cost = require('../db/admin/Cost')
const History = require('../db/admin/History')
const jwb = require('jsonwebtoken')
const Registered =require('../db/login/registered')
const constant = require('../utils/constant')
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
function abc(res) {
  let zbc = []
  for (key of res) {
    let a = new Obj(key.name, key._id)
    zbc.push(a)
  }
  return zbc
}
class Obj {
  constructor(name, id) {
    this.label = name
    this.value = id
  }
}
//级联接口
router.get('/user/cascader', auth,async ctx => {
  //find().lean()就可以修改返回的数据
  const res = await Layer.find()
  const obj = abc(res)
  let layer = obj.slice(0, 3)
  const san = obj.slice(3, 7)
  const si = obj.slice(7, 11)
  const wu = obj.slice(11)
  layer[0].children = san
  layer[1].children = si
  layer[2].children = wu
  ctx.body = { layer }
})
//在新建租客的时候layer：false的话就不查出来了
router.get('/user/cascader/history', auth,async ctx => {
  //find().lean()就可以修改返回的数据
  const res = await Layer.find({name:{$regex:"层"}})
  const obj = abc(res)
  const status = await Layer.find({status:false})
  const z = abc(status)
  const san = []
  const si = []
  const wu = []
  z.forEach(i => {
    if(i.label=='301'||i.label=='302'||i.label=='303'||i.label=='304'){
      san.push(i)
    }else if(i.label=='401'||i.label=='402'||i.label=='403'||i.label=='404'){
      si.push(i)
    }else{
      wu.push(i)
    }
  })
  obj[0].children = san
  obj[1].children = si
  obj[2].children = wu
  ctx.body = { obj }
})
//添加租客接口
router.post('/user/add', auth,async ctx => {
  const body = ctx.request.body
  const HouseInfoRes = await HouseInfo.insertMany(body)
  const CostRes = await Cost.insertMany(body)
  ctx.body = {
    HouseInfoRes,
    CostRes
  }
})
//渲染房客信息的接口
router.get('/user/info', auth,async ctx => {
  const pagesize = Number(ctx.query.pagesize)
  const pagenum = Number(ctx.query.pagenum)
  const query = ctx.query.query
  const start = (pagenum-1)*pagesize
  const res = await Info.find({name:{$regex:query,$options:'$i'}}).populate({path:'cost',populate:{path:'layer'}}).skip(start).limit(pagesize)
  const total = await Info.find().estimatedDocumentCount()
  ctx.body = { res,total} 
})
//删除单个信息接口
router.delete('/user/delete/:id', auth,async ctx => {
  const res = await HouseInfo.findByIdAndDelete(ctx.params.id)
  ctx.body = {
    res
  }
})
//更改网络费用接口
router.put('/user/network/:id', auth,async ctx => {
  await HouseInfo.findOneAndUpdate({ _id: ctx.params.id }, { network: ctx.request.body.network })
  const res = await HouseInfo.findById(ctx.params.id)
  ctx.body = {
    res
  }
})
//添加水电网基本费用
router.post('/user/cost', auth,async ctx => {
  const res = await Cost.insertMany(ctx.request.body)
  ctx.body = { res }
})
//添加租客信息内渲染电费水费网费房费的接口
router.get('/user/cost/:id',auth,async ctx => {
  const res = await Cost.findOne({ layer: ctx.params.id }).populate('layer')
  ctx.body = { res }

})
//添加租客信息
router.post('/user/info',auth,async ctx => {
  const res = await Info.insertMany(ctx.request.body)
  ctx.body = {
    res
  }
})
//使用在添加租客里面的，如果添加了新用户房间状态就会开启表示已租赁
router.put('/user/layer/status/:id',auth,async ctx => {
  const res = await Layer.findByIdAndUpdate(ctx.params.id,{status:true})
  ctx.body ={res}
})
//使用在list里删除到info后layer和cost都改为false初始化
router.delete('/user/info/delete/:aid/:bid/:cid',auth,async ctx =>{
  const res = await Info.findByIdAndDelete(ctx.params.aid)
  await Layer.findByIdAndUpdate(ctx.params.bid,{status:false})
  await Cost.findByIdAndUpdate(ctx.params.cid,{status:false})
  ctx.body ={res}
})
//修改list中网络状态
router.put('/user/cost/network',auth,async ctx =>{
  const {id,network} = ctx.request.body
  const res = await Cost.findByIdAndUpdate(id,{network})
  ctx.body = res
})
//在新建用户里面顺便插入展示历史水电情况
router.post('/user/cost/history',auth,async ctx =>{
  const res = await History.insertMany(ctx.request.body)
  ctx.body = res
})
module.exports = router.routes()