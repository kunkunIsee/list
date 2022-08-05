<template>
  <div>
    <form action="/">
      <div class="sou">
        <span class="wwww">
          <van-icon name="arrow-left" size="20px" @click="home" />
        </span>

        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        >
        </van-search>
        <span @click="sosuo">搜索</span>
      </div>

      <div class="sosuo">
        &nbsp; <span>搜索历史</span>
        <div class="right">
          <span @click="quanbushanchu">全部删除</span>

          <van-icon class="shanchu" name="delete-o" />
        </div>
      </div>

      <div v-for="(list, index) in searchlist" :key="index">
        <van-cell :title="list">
          <van-icon name="close" @click="shanchu(index)" />
        </van-cell>
      </div>
    </form>
  </div>
</template>

<script>
import { Search } from "@/api/api";
export default {
  data() {
    return {
      value: "",
      list: [],
      searchlist:[]
    };
  },

  created(){
    if(localStorage.getItem("searchlist")){

this.searchlist= JSON.parse(localStorage.getItem("searchlist"))
    }
  },
  methods: {
    home(){
      this.$router.push("/home")
    },
   
    quanbushanchu() {
      localStorage.removeItem("searchlist")
      this.searchlist=[]
    },
    shanchu(index) {
      console.log(1);
      this.searchlist.splice(index, 1);
      localStorage.setItem("searchlist",JSON.stringify(this.searchlist) )


    },
    async sosuo() {
      if (this.value) {
      this.searchlist.push(this.value)
      localStorage.setItem("searchlist",JSON.stringify(this.searchlist) )

        const res = await Search(this.value,0,10);
        console.log(res);
        this.list.push(res.data.data[0].title);
        console.log(this.list);
        this.$router.push({
          path:'/sou',
          query:{
            
            value:this.value
          }
        })
        this.value = "";

      }
    },

    onSearch() {},
    onCancel() {},
  },
};
</script>

<style scoped>
.sou {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.sou .wwww {
  text-align: center;
  width: 2%;
}
.sou span {
  display: inline-block;
  height: 30px;
  font-size: 16px;
  line-height: 50px;
  width: 10%;
}
.sou .van-search {
  width: 80%;
}
.sosuo {
  width: 100%;
  height: 50px;
  padding-top: 20px;
}
.sosuo .right {
  float: right;
}
.sosuo span {
  font-size: 16px;
  padding-right: 10px;
}

.van-icon-delete-o:before {
  font-size: 16px;
}
</style>