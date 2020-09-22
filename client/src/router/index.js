import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/login',
      component:()=>import('../views/Login'),
      meta:{isPublic:true}
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:()=>import('../views/Home'),
      children:[
        {
          path:'/layer/create',
          component:()=>import('../views/layer/Layer')
        },
        {
          path:'/layer/list',
          component:()=>import('../views/layer/List')
        },
        {
          name:'Edit',
          path:'/layer/edit/:id',
          component:()=>import('../views/layer/Layer')
        },
        {
          path:'/houseinfo/create',
          component:()=>import('../views/houseInfo/HouseInfo'),
        },
        {
          path:'/houseinfo/list',
          component:()=>import('../views/houseInfo/List')
        },
        {
          path:'/houseinfo/Cost',
          component:()=>import('../views/houseInfo/Cost')
        },
        {
          path:'/cost/history',
          component:()=>import('../views/cost/History')
        }
      ]
    }
  ]

  
  const router = new VueRouter({
    mode:'hash',
    routes
  })
  const isPublic=['/login']
  router.beforeEach((to,from,next)=>{
    if(localStorage.token){
        next()
    }else{
      if(isPublic.indexOf(to.path) !=-1){
        next()
      }else{
        next('/login')
      }
    }
  })
export default router
