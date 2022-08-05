<template>
  <div class="container">
    <van-form>
      <van-nav-bar class="nav"  title="发布" />
      <div>
        <van-field
          class="biaoti"
          name="用户名"
          placeholder="请输入标题"
          v-model="title"
        />

        <div @click="qwerid">
          <van-field
            toolbar-position="top"
            readonly
            clickable
            name="picker"
            :value="value"
            placeholder="点击要发布的"
            @click="showPicker"
          >
          </van-field>
        </div>
 

 <van-popup v-model="show"
 position="bottom"
 
 >  <van-picker
          title="标题"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
          v-show="show"
          @click="showPicker"
        /></van-popup>

      
      </div>

      <div>
        <van-field
          v-model="content"
          style="margin-top: 10px"
          rows="5"
          autosize
          type="textarea"
          placeholder="请输内容"
        />
      </div>
 
<div class="personal">
    


  <van-field name="uploader">
        
        <template #input>
          <van-uploader v-model="imageSrc" multiple :max-count="3" />
        </template>
      </van-field>
</div>
    

      <div style="margin: 30px 50px">
        <van-button
        class="btn"
          round
          block
          type="primary"
          size="normal"
          :square="true"
          native-type="submit"
          @click="fabu"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// import bus from "@/utils/EventBus";

import { FaBu } from "@/api/api";
export default {
  data() {
    return {
      title: "", //标题
      content: "", //内容
      value: "", //发布类型
      columns: [], //发布类型数组
      list_id: [], //id数组
      id: "",
      show: false,
      list: [], //戒指
      uploader: [],
      imageSrc:[
      ],
    };
  },
  created() {
    this.list = JSON.parse(localStorage.getItem("wzfl"));
    //获取分类
    const listwzfl = [];
    this.list.forEach((item) => {
      listwzfl.push(item.name);
    });
    this.columns = listwzfl;
    let listid = [];
    this.list.forEach((item) => {
      listid.push(item._id);
      this.list_id = listid;
    });
  },
  methods: {
    //id
    qwerid(index) {
      this.id = this.list_id[index];
      console.log(this.id);
    },
    //显示
    showPicker() {
      this.show = true;
      console.log(this.columns[0]);
    },
    //取消
    onCancel() {
      this.show = !this.show;
    },
    //确定
    onConfirm(value, index) {
      this.value = value;
      this.show = false;
      this.qwerid(index);
    },
    async fabu() {
      const res = await FaBu(this.title, this.content, this.value, this.id,this.imageSrc);
      this.$toast.success("发布成功");

      console.log(res);
    },


     async afterRead(file) {
        let files = file.file
        console.log(files);

                let { type } = files;
                console.log(type);
     
    
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
        console.log(res);
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
      console.log(result.data);
      
    
        this.imageSrc.push(`http://toutiao.longxiaokj.com/` + result.data.key);
        console.log(this.imageSrc);
    

      //  // `http://toutiao.longxiaokj.com/` + result.key  这个地址就是传到服务器的地址
      //  // 发布文章时 imageSrc  字段需要的就是这个
    },
  },
};
</script>

<style scoped>
.nav {
  color: white;
  background-color: #00CDFF;
  margin-bottom: 10px;
}
.van-nav-bar__title .van-ellipsis{
  color: white;
}
.container.shangchuan {
  margin-top: 10px;
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
.van-van-uploader__file {
  display: none;
}
.btn{
  background-color: #00CDFF;
  border: 0;
}
</style>
