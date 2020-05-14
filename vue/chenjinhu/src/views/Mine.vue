<template>
  <div class="my">
    <Head title="个人中心"></Head>
    <div v-if="token">
      <!-- <h3>个人中心----{{count}}</h3> -->
      <UploadImg ref="one"></UploadImg>

      <!-- <h4>token--{{token}}</h4> -->
      <div class="mesg">
        <p>
          用户名:{{userInfo.username}}
          <span>&gt;</span>
        </p>
        <p>
          手机号:{{userInfo.mobile}}
          <span>&gt;</span>
        </p>
        <p>
          卖座券
          <span>&gt;</span>
        </p>
        <p>
          组合红包
          <span>&gt;</span>
        </p>
        <p>
          余额
          <span>&gt;</span>
        </p>
        <h4>
          设置
          <span>&gt;</span>
        </h4>
      </div>
    </div>
    <div v-else>
      <h4>你还未登录，请立马登录</h4>
    </div>
  </div>
</template>
<script>
import { myMixin } from "@/utils"; //混入到组件实例
import {
  // 2.上传头像
  baseURL
} from "@/utils/axios";
export default {
  mixins: [myMixin], // 混入到组件实例

  data() {
    return {
      token: sessionStorage.token || "", //取token
      userInfo: {},
      count: 1314 // 变量直接覆盖优先显示，优先级较高
    };
  },
  mounted() {
    this.$axios.get("/vue/getuserinfo").then(res => {
      if (res.data.type) {
        //有type 登陆成功
        this.userInfo = res.data.result;
        // 1. 每次上传头像会获取本地头像
        // this.$refs.one.pic = res.data.result.avatar.replace(/public/, baseURL); // 1.头像替换
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.my {
  // box-sizing: border-box;
}
.mesg {
  width: 100%;
  background: #fff;
  margin-top: 30px;
  p {
    margin-left: 30px;
    line-height: 50px;
    width: 80%;
    border-bottom: 1px solid #ccc;
    color: #191a1b;
    font-size: 15px;
  }
  h4 {
    margin-left: 30px;
    line-height: 50px;
    width: 80%;
  }
  span {
    float: right;
    color: #ccc;
  }
}
</style>