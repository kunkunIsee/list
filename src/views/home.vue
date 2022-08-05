<template>
  <div class="container">
    <div class="header">
      <div class="seach" @click="search">
        <van-icon name="search" size="20px" />
        搜索
      </div>
    </div>

    <div class="nva">
      <van-tabs  v-model="activeName" @click="onClickDisabled">
        <van-tab
          v-for="(wzfl, index) in wzfl"
          :key="index"
          :title="wzfl.name"
          :name="wzfl._id"
        ></van-tab>
      </van-tabs>
    </div>

 

    <div class="nvalist">
      <van-pull-refresh v-model="isLoading1" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div
          class="list"
          v-for="(wzxq, index) in wzxq"
          :key="index"
          @click="getid(wzxq._id)"
        >
          <p>{{ wzxq.title }}</p>
          <div class="content">
            <div
              :class="{
                none: wzxq.imageSrc.length == 0,
                nones: wzxq.imageSrc.length == 1,
                more: wzxq.imageSrc.length == 2,
                mores: wzxq.imageSrc.length == 3,
              }"
            >
              <img
                :src="wzxq"
                alt=""
                v-for="(wzxq, index) in wzxq.imageSrc"
                :key="index"
              />
            </div>
          </div>

          <div>
            <span class="pppp">{{ wzxq.author }}</span
            ><span>{{ wzxq.comment }}评论</span>
            <span>{{ wzxq.time | formatTime }}</span>
          </div>
        </div>
        <div class="jiazai"></div>
      </van-list>
      </van-pull-refresh>
    </div>
   
  </div>
</template>

<script>
import { getAllChannelsAPI, get_article_list } from "@/api/api";
import { Toast } from 'vant';
export default {
  data() {
    return {
      activeName: "",
      wzfl: [], //文章分类
      wzxq: [], //文章详情
      loading: false,
      finished: false,
      skip: 0,
      name: "",
       
      isLoading1: false,
    };
  },
  //文章分类
  async created() {
    const res = await getAllChannelsAPI();
    this.wzfl = res.data.data;
    let _id = this.wzfl[0]._id;
    this.onClickDisabled(_id);
    localStorage.setItem("wzfl", JSON.stringify(this.wzfl));
  },
  methods: {
    //下拉刷新
   async   onRefresh() {
    var that =this
      this.skip=0
      this.wzxq=[]
      // setTimeout(() => {
      //   Toast('刷新成功');
      //   this.isLoading1 = false;

      // }, 1000);
      setTimeout(function(){
           Toast("刷新成功")
           that.isLoading1=false;
       
          
      },100)
     
      const wwww=     await get_article_list(this.name, this.skip);
           this.wzxq=[...this.wzxq,...wwww.data.data]
    },

    //上拉刷新
    async onLoad() {
      if (this.wzxq.length >= 10) {
        this.skip += 10;
        const res12 = await get_article_list(this.name, this.skip);
        console.log(res12);
        this.wzxq = [...this.wzxq, ...res12.data.data];
      if (res12.data.data == 0) {
          this.finished = true;
          this.loading = true;
        }

        this.loading = false;
      }
    },
    //文章详情
    async onClickDisabled(name) {
      this.wzxq = [];
      this.skip =0;
      this.name = name;
      const www = await get_article_list(name, this.skip);
      this.wzxq = [...this.wzxq, ...www.data.data];
    
    },
    //点击进入搜索框
    search() {
      this.$router.push("/search");
    },
    getid(id) {
      console.log(id);
      this.$router.push({
        path: "/main",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background-color: #00CDFF;
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.seach {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 30px;
  background-color:rgb(255, 250, 250);
  border-radius: 16px;
  font-size: 16px;
  color: rgb(56, 56, 59);
  z-index: 9999;
}
.nva {
  width: 100%;
  position: fixed;
  top: 43.5px;
  left: 0;
  z-index: 9999;
}
i::before{
  color: white;
}
.nvalist {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  padding-bottom: 50px;
}

.list {
  width: 90%;
  padding: 1% 0;
  margin-left: 5%;
  margin-bottom: 5%;
  border-bottom: solid darkgray 1px;
}
.list p {
  word-wrap: break-word;
}
.pppp {
  word-break: break-all;
}
.list p {
  font-size: 16px;
  color: black;
}
.list span {
  display: inline-block;
  font-size: 10px;
  color: darkgray;
  margin-left: 10px;
}
.jiazai {
  text-align: center;
  width: 40px;
  height: 40px;
}
.jiazai img {
  width: 100%;
  height: 100%;
}
.content {
  overflow: hidden;
}

img {
  max-width: 100%;
}

.none img {
  display: none;
}

.nones {
  width: 100%;
}

.nones img {
  width: 100%;
  height: 240px;
}

.more img {
  width: 47%;
  height: 150px;
  padding-left: 10px;
  margin-top: 10px;
}

.mores img {
  width: 32%;
  padding-left: 4px;
  height: 100px;
}
</style>
