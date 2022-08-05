<template>
  <div>
    <div class="bg">
      <van-image
        @click="touxiang"
        class="tupian"
        width="70"
        height="70"
        round
        fit="cover"
        title=""
        :src="userInfo.avatar"
      ></van-image>
      <span class="name">{{ userInfo.nickname }}</span>

      <van-button class="update-btn" size="small" round to="/user"
        >编辑资料</van-button
      >
      <div class="dianzan">
        <div class="left">
          <span>{{ publish_num }}</span
          ><br />
          <span>头条</span>
        </div>
        <div class="right">
          <span>{{ liked_num }}</span
          ><br />
          <span>获赞</span>
        </div>
      </div>
    </div>

    <div class="shoucang">
      <div>
        <span><van-icon name="star-o" color="red" size="30px" /></span><br />
        <span>收藏</span>
      </div>
      <div>
        <span><van-icon name="clock-o" color="red" size="30px" /></span><br />

        <span>历史</span>
      </div>
    </div>

    <van-cell-group>
      <van-cell title="修改密码" is-link to="/xiugai" />
      <van-cell title="联系我们" is-link />
      <van-cell title="关于我们" is-link />
    </van-cell-group>

    <div class="juzhong">
      <van-button class="button" @click="xctk">退出登入</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";

import { removeToken } from "@/utils/token";
import { My } from "@/api/api";

export default {
  data() {
    return {
      publish_num:0,
      liked_num:0,
      userInfo: {},
      show: false,
    };
  },
  methods: {
    touxiang() {
      this.$router.push("/user");
    },
    xctk() {
      Dialog.confirm({
        title: "你确定要退出了吗",
      })
        .then(() => {
          this.$toast.success("退出登入成功");
          removeToken("geek-xiaolai");
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
  },

  async created() {
    const res = await My();
    console.log(res);
    this.publish_num=res.data.publish_num
    this.liked_num=res.data.liked_num
    this.userInfo = res.data.userInfo;
    console.log(this.userInfo);
  },
};
</script>

<style scoped >
.bg {
  position: relative;
  height: 180px;
  background: url("@/assets/banner.jpg");
}
.name {
  position: absolute;
  left: 28%;
  top: 35%;
  font-size: 16px;
}
.juzhong {
  margin: 10px 0;
  text-align: center;
}
.van-button--round {
  position: absolute;
  right: 20px;
  top: 50px;
}
.update-btn {
  height: 25px;
}
.tupian {
  position: absolute;
  top: 20%;
  left: 6%;
}
.dianzan {
  width: 200px;
  height: 100px;
  position: relative;
  
  color: white;
  top: 50%;
  left: 26%;
}
.dianzan .left {
  position: absolute;
  left: -9%;
  top: 40%;
  font-size: 10px;
}
.dianzan .right {
  position: absolute;
  right: 1%;
  top: 40%;
  font-size: 10px;
}
.shoucang {
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  margin-top: 2px;
  font-size: 15px;
  background-color: white;
  margin-bottom: 10px;
}
.button {
  color:white;
  background-color: #00CDFF;

  width: 50%;
}
</style>