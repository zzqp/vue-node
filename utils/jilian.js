module.exports = ()=>{
  return async (ctx,next)=>{
    const token = String(ctx.headers.authorization)
    const res = jwb.verify(token,constant.SECRET)
    console.log(res);
    await next()
  }
}