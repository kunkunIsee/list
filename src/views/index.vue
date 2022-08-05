<template>
  
  <div class="index">
    <router-view />
<van-tabbar route>
  <van-tabbar-item  replace to="/home" icon="home-o">主页</van-tabbar-item>
  <van-tabbar-item replace to="/fabu" icon="add-o">发布</van-tabbar-item>
  <van-tabbar-item @user="add" replace to="/my" icon="contact">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:{}
    }
  },
  methods:{
    add(val){
      console.log(val);
    }
    
  }
}
</script>

<style scoped>
</style>