<template>
  <div>
    <div>
    
      <van-nav-bar title="登入" color="pink"   class="dr" left-arrow @click-left="onClickLeft" />
      <div>
        <van-form>
          <div class="shoujihao">

            
              <img src="../../public/imges/shoujihao.png" alt="">
        
             <van-field
            
            v-model="username"
            name="用户名"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请输入手机号' }]"
          />
          
  

          </div>
          
    <div class="shoujihao">
      <img src="../../public/imges/mima.png" alt="">
       <van-field
          
            v-model="password"
            type="password"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
    </div>
         
          <div style="margin: 40px">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="dengru"
              >登入</van-button
            >
          </div>
        </van-form>
        <van-button type="primary" to="/forget" class="zhuce"
          >忘记密码找回密码</van-button
        >
        <van-button type="primary" to="/reg" class="zhuce"
          >还没账号立即注册</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>

import { getToken, setToken } from "@/utils/token";
import { Login } from "@/api/api";



export default {
  data() {
    return {
      username: "",
      password: "",
      
    };
  },

  created(){
  this.$store.commit('getuserinfo',localStorage.getItem("userinfo"))
  console.log(localStorage.getItem("userinfo"));
  },
  methods: {
    // 登入页面
    async dengru() {
      const res = await Login(this.username, this.password);
     localStorage.setItem('userinfo',JSON.stringify(res.data) )
      console.log(res);
      this.$store.commit('getuserinfo',res.data)
      
      setToken("geek-xiaolai", res.data.token);

      localStorage.setItem("uid", JSON.stringify(res.data.uid));
      if (
        JSON.stringify(getToken("geek-xiaolao")) ==
        JSON.stringify(res.data.token)
      ) {
            this.$toast.success("登入成功")
        this.$router.push("/");
    
      }else if(this.username==""){
        this.$toast.success("请输入账号")

      }else{
    
        this.$toast.success("密码错误")

      }
    },


    onClickLeft() {
      this.$router.push("/home")
    },

  },
};
</script>


<style  scoped >

::v-deep .van-nav-bar__title{
color:white
}
a {
  margin-top: 20px;
  float: right;
  font-size: 15px;
}
.dr{
  background-color: #00CDFF;
  color: white;
  
}



 .van-button--round {
  background-color: #00CDFF;
  border: 0;
  border-radius: 0;
}
.zhuce {
  background-color: aliceblue;
  color: darkgray;
  border: 0;
  float: right;
}
.shoujihao{
  display: flex;
  align-items: center;
  background-color: white;
}
.shoujihao img {
  background-color: white;
  height: 20px;
  width: 20px;
  margin-left: 20px;
 

}
</style>