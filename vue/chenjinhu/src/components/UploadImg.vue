<template>
  <div>
    <input type="file" class="fileone" ref="file" @change="uploadFile" />
    <img :src="pic" alt class="avatar" @click="handClick" />
  </div>
</template>
<script>
import pic from "@/assets/images/photo.png";
import {
  // 2.上传头像
  baseURL
} from "@/utils/axios";
export default {
  data() {
    return {
      pic: ""
    };
  },
  mounted() {
    //  方案2.判断本地存储有没有头像，有是否和手机号一样
    // 手机号不一样在获取数据库
    if (localStorage.users) {
      var users = JSON.parse(localStorage.users);
      if (users.mobile == localStorage.mobile) {//有头像 不请求ajax
        this.pic = users.path;
      } else {//没头像
        this.getAvatar();
      }
    } else {//没头像
      this.getAvatar();
    }
  },
  methods: {
    getAvatar() {
      this.$axios.post("/vue/getavatar")
      .then(res => {
        if (res.data.type) {
          this.pic = res.data.result.avatar.replace(/public/, baseURL);
        } else {
          this.pic = pic;// 数据库没有 ，默认本地
        }
      });
    },
    handClick() {
      this.$refs.file.click();
    },
    uploadFile() {
      console.log("开始上传头像");
      var file = this.$refs.file.files[0]; //得到文件对象' 可以上传多个图片
      console.log(file);
      var data = new FormData(); //FormData内置对象 ， 实例化一个对象（application/formdata）
      data.append("avatar", file); //添加头像  key:avatar  value:file
      this.$axios({
        //头像上传
        url: "/vue/uploadimg",
        method: "POST", //FormData发送数据必须post
        data: data
      }).then(res => {
        // this.pic = res.data.path.replace(/public/,"http://localhost:3000");//头像替换
        // this.pic = '/'+res.data.path
        this.pic = res.data.path.replace(/public/, baseURL); // 2.头像替换
        let users = {
          // 本地存储头像
          path: this.pic,
          mobile: res.data.mobile
        };
        localStorage.setItem("users", JSON.stringify(users)); // 存储头像
        console.log(this.pic);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.fileone {
  display: none;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  left: 40%;
  
}
div{
  margin-top: 10px;
  width: 100%;
  height: 100px;
  background: #fff;
  position: relative;
}
</style>