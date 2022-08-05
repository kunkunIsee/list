//基于axios封装网络请求


import theaxios from 'axios'
const axios = theaxios.create({
    baseURL:"https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http",
    timeout:20000   //20秒超时时间 （请求20秒无响应）
})
//解构赋值  既是key 也是变量名 简写   没传就是默认值
export  default  ({url,method ='POST',params={},data={},headers={}}) =>{
   return  axios({
    url,
    method,
    params,
    data,
    headers
  })
}

const service= theaxios.create()
service.interceptors.request.use(respose=>{
   return respose.data
},error=>{
   return Promise.reject(error)
})

//但是 上面有局限性
//到处的axios 方法使用时
// 我在逻辑页面调用时 写这五个配置名字
/*  
 axios({
    url:'请求地址
    method:"请求方法"
    params:{}
    data:{}
    headers:{}
 })

*/
// 问题来了 万一 将莱 换成 ajax  就对不上了外边的数据