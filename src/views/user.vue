<template>
  <div>
    <div>
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="personal">
      <input
        type="file"
        accept="image/*"
        ref="file"
        class="upload"
        @change="uploading"
      />
      <van-cell title="头像" center>
        <van-image
          width="50"
          height="50"
          round
          fit="cover"
          :src="userInfo.avatar"
        ></van-image>
      </van-cell>

      <van-cell
        title="昵称"
        is-link
        :value="userInfo.nickname"
        @click="changename"
      />
      <!-- 修改昵称 -->
      <van-dialog
        v-model="showname"
        title="修改昵称"
        show-cancel-button
        @confirm="changename"
        v-show="showname"
      >
      <div class="ipt">
        <input type="text"    v-model="userInfo.nickname" />

      </div>
      </van-dialog>

      <!-- 修改性别 -->
      <van-cell title="性别" is-link :value="userInfo.sex" @click="changesex" />

      <van-popup v-model="sexshow" position="bottom">
        <van-picker
          title="性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>

      <van-cell
        title="生日"
        is-link
        :value="userInfo.birthday"
        @click="changebirthday"
      />
      <van-popup v-model="sgshow" position="bottom">
        <van-datetime-picker
        @confirm="confirm"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
         :formatter="formatter"
        />
        
      </van-popup>
    </div>
    <div class="juzhu">
      <van-button type="primary" to="" @click="gengxin">点击修改</van-button>
    </div>
  </div>
</template>

<script>
import { User, XgUser } from "@/api/api";

export default {
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),

      userInfo: {},
      columns: ["男", "女"],
      showname: false,
      showsex: false,
      sgshow: false,
      sexshow: false,
    };
  },
  // 获取用户信息
  async created() {
    const res = await User();
    this.userInfo = res.data.userInfo;
    console.log(this.userInfo);
  },
  methods: {
    //去到my页面
    onClickLeft() {
      this.$router.push("/my");
    },
    //修改名字
    changename() {
      this.showname = true;
    },

    onConfirm(value, index) {
      console.log(value);
      console.log(index);
    },
    //修改性别
    changesex() {
      this.sexshow = true;
    },
    onConfirm(value) {
      this.userInfo.sex = value;
      this.sexshow = false;
    },
    //取下
    onCancel() {
      this.sexshow = false;
    },
    //修改生日
     formatter (type, value) {
      if (type === 'year') {
        this.value1 = value   // 可以拿到当前点击的数值
        return `${value}年`
      } else if (type === 'month') {
        this.value2 = value
        return `${value}月`
      }
      this.value3 = value
      return `${value}日`
    },
    changebirthday() {
      this.sgshow = true;
    },
  confirm(){
  var selectTime = `${this.value1}-${this.value2}-${this.value3}`
      console.log('用户选择的日期', new Date(this.currentDate).getTime(), selectTime);
      this.userInfo.birthday=selectTime
 this.sgshow=false
  },
  
    

    //全部更新
    async gengxin() {
      const qwer = await XgUser(
        this.userInfo.avatar,
        this.userInfo.nickname,
        this.userInfo.sex,
        this.userInfo.birthday
      );
      console.log(qwer);
      this.$router.push("/my");
    },

    async uploading(e) {
      let file = e.target.files[0]; // 获取到文件  //
      console.log(file);
      let { type } = file;

      console.log(type);
      //  拿到类型  比如jpg
      type = type.split("/")[1];
      // 重新命名
      let file_name = `${new Date().getTime()}_${Math.random()
        .toString(36)
        .slice(2)}.${type}`;
      console.log(1);

      // //       // 去自己的服务器拿到上传七牛云需要的 token  为何放在服务端呢?  主要是为了安全，因为里边包含了一些账号信息
      let token;
      await this.$http.post("/upload/token").then((res) => {
        token = res.data.token;
      });
      console.log(token);

      //       // new一个form data   并且把文件 token  和文件的名字放进去  file token key是固定的 不能改
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("token", token);
      formdata.append("key", file_name);

      // // https://upload-z1.qiniup.com 是上传到七牛的真正接口  其中z1是华北区域

      let result = await this.$http.post(
        "https://upload-z1.qiniup.com",
        formdata
      );
      console.log(result);
      console.log(`http://toutiao.longxiaokj.com/` + result.data.key);
      this.userInfo.avatar = `http://toutiao.longxiaokj.com/` + result.data.key;

      //  // `http://toutiao.longxiaokj.com/` + result.key  这个地址就是传到服务器的地址
      //  // 发布文章时 imageSrc  字段需要的就是这个
    },
  },
};
</script>

<style scoped>
.juzhu {
  text-align: center;
}
.personal {
  position: relative;
}
.personal .upload {
  width: 100%;
  height: 77.2px;
  position: absolute;
  left: 0;
  z-index: 2;
  opacity: 0;
}
.van-button {
  margin: 20px 0;
}
.ipt{
  text-align: center;
}
.ipt input{
  text-align: center;
 height: 30px;
}
</style>