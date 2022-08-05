//此文件 封装三个方法 -专门才最token
// 疯转点东西 ：目的 代码封层 跟风方便 清晰 以后方柏霓修开
const key ="geek-xiaolai"
export const setToken=(key,val)=>{
   return  localStorage.setItem(key,val)
}
export const getToken=()=>{
   return  localStorage.getItem(key)
}
export const removeToken =()=>{
    return  localStorage.removeItem(key)
}
