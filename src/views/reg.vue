<template>
  <div>
    <div>
      <van-nav-bar title="注册"  class="dr" left-arrow @click-left="onClickLeft" />
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
              @click="zhuce"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import { sendSms, Reg } from "@/api/api";
export default {
  data() {
    return {
      username: "",
      password: "",
      vercode: "",
    };
  },
  methods: {
    //注册
    async zhuce() {
      const ww = await Reg(this.username, this.password, this.vercode);
      this.$toast.success("注册成功")

    },
    // 发送验证码
    async fasong() {
      const qwer = await sendSms(this.username);
      this.$toast.success("发送成功")

    },
    //回到登入
    onClickLeft() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
::v-deep .van-nav-bar__title{
color:white
}
.dr{
  background-color: #00CDFF;

}
.van-button--round {
  background-color: #00CDFF;

  border-radius: 0;
  border: 0;
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