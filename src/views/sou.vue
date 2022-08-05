<template>
  <div class="po">
    <div class="eeee">
<van-nav-bar
      title="搜索详情"
      class="dr"
      left-arrow
      @click-left="onClickLeft"
    />

    </div>
    
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="list"
        v-for="(list, index) in list"
        :key="index"
      
      >
        <p>{{ list.title }}</p>
        <div class="image" v-for="(list, index) in list.imageSrc" :key="index">
          <img :src="list" alt="" />
        </div>
        <div>
          <span class="pppp">{{ list.author }}</span
          ><span>{{ list.comment }}评论</span>
          <span>{{ list.time | formatTime }}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Search } from "@/api/api";

export default {
  data() {
    return {
      value: this.$route.query.value,
      skip: 0,
      limit: 10,
      list: [],
      loading: false,
      finished: false,
    
    };
  },
  async created() {
   
  },
  methods: {
    onClickLeft() {
      this.list = [];
      this.$router.push("/search");
    },
    async onLoad() {
        console.log(this.list.length);
          this.limit+=10
          const rse = await Search(this.value, this.skip,this.limit);
        if (this.list.length >= rse.data.count) {
          this.finished = true;
          this.loading = true;
        }
          this.list=rse.data.data
          this.loading=false

        // const rse = await Search(this.value, this.skip, this.limit);
        // console.log(rse);
        // this.list = rse.data.data;
        // console.log(this.list);
      
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.eeee{
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}


.nvalist {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  padding-bottom: 50px;
}
.list {
  margin-top: 46px;
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
.list.image {
  display: flex;
  justify-content: space-between;
}
.list .image img {
  width: 30%;
  height: 75px;
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
</style>