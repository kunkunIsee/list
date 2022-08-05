import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  
   {
   
    path:'/',
  
  component:()=>import('@/views/index'),
    children:[
      {
        path:'/',
        redirect:"home"
      },
      {
        path:'home',
        name:'home',
        component:()=>import('@/views/home')
      },
      {
        path:'fabu',
        name:'fabu',
        component:()=>import('@/views/fabu')
      }, {
        path:'my',
        name:'my',
        component:()=>import('@/views/my')
      },
    

    ]

  
    
   }
   ,{
    path:'/reg',
    name:'reg',
    component:()=>import('@/views/reg')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login')
  },
  {
    path:'/search',
    name:'search',
    component:()=>import('@/views/search')
  },
  {
    path:'/user',
    name:'user',
    component:()=>import('@/views/user')
  },
  {
    path:"/forget",
    name:'forget',
    component:()=>import('@/views/forget')
  },
  {
    
      path:"/xiugai",
      name:'xiugai',
      component:()=>import('@/views/xiugai')
    
  },
  {
    path:'/main',
    name:"main",
    component:()=> import("@/views/main")
  },
  {
    path:'/sou',
    name:"sou",
    component:()=> import("@/views/sou")
  }
    
    
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(function (to, from, next) {
// 	//判断是否存在token值，不存在就去登录页面去登录
// 	if (!localStorage.getItem("geek-xiaolai")) {
// 	  if (to.path !== "/login") {
// 		return next("/login")
// 	  }
// 	}
// 	//如果存在就执行下一步
// 	next()
//   })
// import { getToken } from "@/utils/token";


export default router
