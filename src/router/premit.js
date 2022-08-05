import router  from "@/router/index";
import { getToken } from "@/utils/token";
//白名单
const whitelist =["/home","/reg","/login","/forget"]
router.beforeEach((to,from,next)=>{
    if(getToken()){
        if(to.path=="/login"){
            next('/home')
        }
        next()
    }else{
        if(whitelist.indexOf(to.path)>=0){
            next()
        }else{
            next('/login')
        }
    }
})