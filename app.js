const Koa = require('koa')//引入koa
const router = require('koa-router')()//引入koa2的路由
const static = require('koa-static')//引入静态管理
const app = new Koa()//new一个Koa实例出来
require('./db/connect')//连接数据库

app.use(require('koa2-cors')())//解决跨域问题

app.use(static(__dirname + '/public'))//静态管理
app.use(static(__dirname + '/dist'))//静态管理

app.use(require('koa-bodyparser')())//post中间件

//增删改查
router.use('/admin/api',require('./router/layer'))
router.use('/admin/api',require('./router/user'))
router.use('/admin/api',require('./router/costHistory'))
router.use('/admin/api',require('./router/login'))
//配置router
app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('服务器连接成功');
})