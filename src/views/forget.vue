<template>
  <div>
    <div>
      <van-nav-bar title="忘记密码" left-arrow @click-left="onClickLeft" class="dr" />
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
         

           <div class="shoujihao">
           <img src="../../public/imges/yanzengma.png" alt="">

   <van-field
            center
            clearable
            v-model="vercode"
            

            name="code"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="primary" class="dr"  @click="fasong"
                >发送验证码</van-button
              >
            </template>
          </van-field>
</div>
          <div style="margin: 40px">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="xiugai"
              >修改密码</van-button
            >
          </div>
        </van-form>
       
      </div>
    </div>
  </div>
</template>
<script>
import { Forget,sendDmd } from "@/api/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      vercode:''
    };
  },
  methods: {
    // 修改密码页面
     async fasong() {
      const qwer = await sendDmd(this.username);
      this.$toast.success("发送成功")
      console.log(qwer);
    },
    async xiugai() {
      const res = await Forget(this.username, this.password,this.vercode);
      console.log(res);
      this.$toast.success("修改成功")

    },
    onClickLeft() {
        this.$router.push('/login')
    },
  },
};
</script>

<style scoped>
a {
  margin-top: 20px;
  float: right;
  font-size: 15px;
}
.dr{
  background-color: #00CDFF;

}
::v-deep .van-nav-bar__title{
color:white
}
.van-button--round{
  background-color: #00CDFF;

  border-radius: 0;

}
.zhuce{
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