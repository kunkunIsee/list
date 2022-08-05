<template>
  <div class="box">
    <van-nav-bar title="文章详情" left-arrow @click-left="onClickLeft" />
    <h4>{{ main.title }}</h4>
    <!-- 用户信息 -->
    <div class="user">
      <div class="userimg">
        <img :src="main.avatar" alt="" />
      </div>
      <div class="qwer">
        <span class="pppp">作者:{{ main.author }}</span
        ><br />
        <span>{{ main.time | formatTimes }}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      {{ main.content }}
    </div>
    <!-- 评论个数 和收藏 -->
    <div class="asdf">
      <div class="asdfleft">
        <span>评论: &nbsp; {{ main.comment }}</span>
      </div>
      <div class="asdfright">
        <span> 收藏:&nbsp;{{ main.fav }} </span>
        &nbsp;
        <span>点赞:&nbsp;{{ main.like }}</span>
      </div>
    </div>

    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="user" v-for="(list, index) in main_list" :key="index">
        <div class="userimg">
          <img :src="list.info.avatar" alt="" />
        </div>
        <div class="qwer">
          <span>{{ list.info.nickname }}</span
          ><br />
          <span class="qwerasdf">{{ list.content }} </span><br />
          <span>{{ main.time | formatTimes }}</span
          ><span class="geshu" @click="towhuifu(index)">
            {{ list.reply_num }}回复</span
          >
        </div>

        <div class="eeee">
          <van-icon
            name="thumb-circle-o"
            :color="list.is_like ? '#e22829' : '#777'"
            @click="listdianzan(index)"
          />
          <span>{{ list.like_count }}</span>
        </div>
      </div>
    </van-list>

    <!-- 写评论 -->
    <div class="footer">
      <div>
        <input type="text" @click="showPopup" placeholder="写评论" />
        <span>
          <van-icon name="chat-o" :badge="main.comment" />
        </span>
        <span>
          <van-icon
            name="star-o"
            @click="shoucang"
            :color="main.is_fav ? '#e22829' : '#777'"
          />
        </span>
        <span>
          <van-icon
            name="thumb-circle-o"
            @click="dianzan"
            :color="main.is_like ? '#e22829' : '#777'"
          />
        </span>
        <van-popup v-model="show" position="bottom"
          ><van-field
            class="zhezhao"
            v-show="show"
            rows="1"
            autosize
            type="textarea"
            placeholder="友善是交流的起点"
            v-model="content"
          />
          <van-button type="primary" class="eee" @click="huifu"
            >发布</van-button
          >
        </van-popup>
      </div>
    </div>
    <!-- tow评论 -->
    <div>
      <van-popup
        v-model="towshow"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <div class="shu">
          <span>{{ shu }}条评论</span>
        </div>
        <div
          class="user"
          id="user"
          v-for="(list, index) in towpinglun"
          :key="index"
        >
          <div class="userimg">
            <img :src="list.info.avatar" alt="" />
          </div>
          <div class="qwer">
            <div class="qaz">
              <span>{{ list.info.nickname }}</span
              ><br />
              <span>{{ list.content }} </span>
            </div>
            <span>{{ main.time | formatTimes }}</span>
            <div class="eeee">
              <van-icon
                name="thumb-circle-o"
                :color="list.is_like ? '#e22829' : '#777'"
                @click="listdianzan(index)"
              />
              <span>{{ list.like_count }}</span>
            </div>
          </div>
        </div>
        <!-- 二级评论 -->
        <div class="liebiaohuifu">
          <div class="user" v-for="(list, index) in sanpinglun" :key="index">
            <div class="userimg">
              <img :src="list.info.avatar" alt="" />
            </div>
            <div class="qwer">
              <div>
                <span>{{ list.info.nickname }}</span
                ><br />
                <span>{{ list.content }} </span><br />
              </div>
              <span>{{ main.time | formatTimes }}</span>
            </div>
          </div>
        </div>
        <!-- 二级 回复评论 -->
        <div class="towbtn">
          <button class="ww" @click="tow1huifu">回复</button>
          <van-popup
            v-model="tow1show"
            round
            position="bottom"
            :style="{ height: '30%' }"
          >
            <van-field
              class="zhezhao"
              v-show="tow1show"
              rows="1"
              autosize
              type="textarea"
              placeholder="友善是交友的起点"
              v-model="content1"
            >
            </van-field>
            <van-button type="primary" class="eee" @click="sanjihuifu"
              >发布</van-button
            >
          </van-popup>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import {
  Add_fav,
  Getcomment,
  Add_comment,
  Scang,
  Qcang,
  Dianzan,
  QDianzan,
  Hliebiao,
  Comment_like,
  Comment_unlike,
} from "@/api/api";
export default {
  data() {
    return {
      main: {}, //文章详情
      main_list: [],//评论列表
      towpinglun: [],
      sanpinglun: [],
      content: "", //一级评论
      content1: "", //二级评论
      show: false, //弹出层
      dzshow: false, //点赞show
      towshow: false,
      tow1show: false,
      comment_type: "0", //评论类型
      comment_type1: "1", //评论类型
      shu: "", //评论个数
      wz_id: this.$route.query.id, //文章id
      user_id: JSON.parse(localStorage.getItem("uid")), //用户uid
      loading: false,
      finished: false,
      num: 2,
    };
  },
  async created() {
    //获取 文章详情
    const res = await Add_fav(this.wz_id, this.user_id);
    this.main = res.data.data;
    console.log(this.main);
    console.log(this.main_list);
  },
  methods: {
    //下拉刷新
    async onLoad() {
      if (this.main_list.length >= 0) {
        this.num += 10;
        const req = await Getcomment(this.wz_id, this.user_id, this.num);
        if (this.main_list.length === req.data.count) {
          this.finished = true;
          this.loading = true;
        }
        this.main_list = [...req.data.data];
        this.loading = false;
      }
    },
    //回到主页
    onClickLeft() {
      this.$router.push("/");
    },
    //弹出层
    showPopup() {
      this.show = true;
    },
    //tow回复
    async sanjihuifu() {
      this.tow1show = false;
      await Add_comment(
        this.user_id,
        this.wz_id,
        this.content1,
        this.comment_type1,
        this.towpinglun[0]._id
      );
      this.content1 = "";
      const towpinglun = await Hliebiao(
        this.wz_id,
        this.user_id,
        this.towpinglun[0]._id
      );
      this.sanpinglun = towpinglun.data.data;
      console.log(2);

    },
    //回复弹出层
    async towhuifu(index) {
      //获取 二级回复列表
      const eee = await Hliebiao(this.wz_id, this.user_id);
      this.shu = eee.data.count;
      this.towpinglun = [];
      this.towpinglun.push(this.main_list[index]);
      this.towshow = true;
      //tow 回复成功在请求列表
      const towpinglun = await Hliebiao(
        this.wz_id,
        this.user_id,
        this.towpinglun[0]._id
      );
      this.name = towpinglun;
      this.sanpinglun = towpinglun.data.data;
      console.log(3);
    },
    //2弹出层
    tow1huifu() {
      this.tow1show = true;
    },
    //one回复
    async huifu() {
      this.show = false;
      await Add_comment(
        this.user_id,
        this.wz_id,
        this.content,
        this.comment_type
      );
      //回复成功在请求下评论列表
      const req = await Getcomment(this.wz_id, this.user_id);
      this.main_list = req.data.data;
      this.shu = req.data.count;
      this.main.comment = req.data.count;
      this.content = "";
      console.log(1);
    },
    //list 点赞
    async listdianzan(index) {
      console.log(index);
      if (this.main_list[index].is_like) {
        await Comment_unlike(this.user_id, this.main_list[index]._id);
        this.$toast.success("取消成功");
        this.main_list[index].is_like = !this.main_list[index].is_like;
        this.main_list[index].like_count = this.main_list[index].like_count - 1;
      } else {
        await Comment_like(this.user_id, this.main_list[index]._id);
        this.$toast.success("点赞成功");
        this.main_list[index].is_like = !this.main_list[index].is_like;
        this.main_list[index].like_count = this.main_list[index].like_count + 1;
      }
    },
    //底部点赞和取消点赞
    async dianzan() {
      if (this.main.is_like) {
        await QDianzan(this.wz_id, this.user_id);
        this.main.is_like = !this.main.is_like;
        this.$toast.success("取消成功");
      } else {
        await Dianzan(this.wz_id, this.user_id);
        this.main.is_like = !this.main.is_like;
        this.$toast.success("点赞成功");
      }
    },
    //收藏 和取消收藏
    async shoucang() {
      if (this.main.is_fav) {
        await Qcang(this.wz_id, this.user_id);
        this.main.is_fav = !this.main.is_fav;
        this.$toast.success("取消成功");
      } else {
        await Scang(this.wz_id, this.user_id);
        this.main.is_fav = !this.main.is_fav;
        this.$toast.success("收藏成功");
      }
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.box {
  padding: 20px;
}
.box h4 {
  padding: 20px;
  margin-top: 40px;
}
.user {
  position: relative;
  width: 100%;
  padding: 9px;
  display: flex;
  border-bottom: rgb(207, 211, 215) 1px solid;
}
.user .userimg img {
  float: left;
  width: 50px;
  height: 40px;
  border-radius: 50px;
  margin-top: 10px;
}
.user .qwer {
  margin-left: 20px;
  float: left;
}
.pppp{
word-break: break-all;
}
.van-list {
  padding-bottom: 50px;
}
.user .qwer span {
  color: darkgrey;
  font-size: 10px;
}
.user .qwer .geshu {
  text-align: center;
  display: inline-block;
  width: 40px;
  height: 16px;
  background-color: rgb(233, 237, 241);
  border-radius: 10px;
}
.qwerasdf {
  width: 200px;
  overflow: hidden;
  display: inline-block;
  white-space: normal;
}

.liebiaohuifu .user .qwer div span {
  margin-left: -70px;
}
.qaz {
  margin-left: -70px;
}
.content {
  padding: 10px;

  font-size: 16px;
  word-wrap: break-word;
}
.van-nav-bar__content {
  position: fixed;
  top: 0;
  left: 0;
}
.asdf {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: rgb(233, 237, 241) 1px solid;
  border-top: rgb(233, 237, 241) 1px solid;
  padding: 10px 0;
}
.asdfleft span {
  color: black;
  font-size: 22px;
}
#user {
  margin-top: 40px;
}
.asdfright span {
  display: inline-block;
  height: 29px;
  line-height: 29px;
}
.eeee {
  position: absolute;
  top: 10%;
  right: 10%;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  background-color: white;
  text-align: center;
}
.footer input {
  text-align: center;
  width: 50%;
  height: 20px;
  border-radius: 20px;
  border: solid rgb(217, 216, 212) 1px;
  font-size: 16px;
}
.footer span {
  display: inline-block;
  margin: 5px 10px;
}
.van-popup--bottom {
  text-align: center;
}

.van-popup--bottom button {
  margin: 20px 0;
  width: 30%;
  background-color: #07c160;
}
.van-nav-bar__content {
  background-color: white;
}
.liebiaohuifu .user {
  border-bottom: rgb(233, 237, 241) 1px solid;
}
.van-cell {
  height: 100px;
}
.shu {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  /* background-color: white; */
}
.towbtn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border: 0;
  background-color: white;
  border-top: solid 1px rgb(215, 212, 212);
}
.towbtn .ww {
  width: 60%;
  padding: 2px 0;
  border-radius: 20px;
  background-color: rgb(247, 243, 243);
  font-size: 16px;
  border: solid 1px rgb(215, 212, 212);
}
.van-popup--bottom button {
  width: 80%;
}
.van-nav-bar__content {
  position: fixed;
  top: 0;
  left: 0;
}
.van-popup--bottom.van-popup--round {
  border-radius: 0;
}
.van-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.van-field__value {
  padding: 20px;
}
</style>