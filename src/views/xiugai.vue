<template>
  <div>
    <div>
      <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" />
      <div>
        <van-form>
            <van-field
              type="password"
            v-model="username"
            name="用户名"
            placeholder="请输入旧密码"
            :rules="[{ required: true, message: '请输入旧密码' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            placeholder="请设置新的密码"
            :rules="[{ required: true, message: '请设置新的密码' }]"
          />
          <div style="margin: 40px">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="xiugai"
              >确定修改</van-button
            >
          </div>
        </van-form>
       
      </div>
    </div>
  </div>
</template>
<script>
import {  updatePwd} from "@/api/api";

export default {
  data() {
    return {
      username: "",
      password: "",
     
    };
  },
  methods: {

    // 修改密码
    async xiugai() {
      const res = await updatePwd(this.username, this.password,);
      console.log(res);
    },
    onClickLeft() {
      this.$router.push("/my");

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
.van-nav-bar__content{
  background-color: #07c160;

}
.van-button--round{
  background-color: #07c160;
  border-radius: 0;

}
.zhuce{
  background-color: aliceblue;
  color: darkgray;
border: 0;
float: right;
}


</style>