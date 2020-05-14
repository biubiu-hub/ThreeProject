<template>
  <div>
    <Head title="登录 && 注册" :show="true" :login="true"></Head>
    <van-tabs v-model="active" color="blue" title-active-color="blue">
      <van-tab title="注册">
        <van-form @submit="registerSubmit">
          <van-field
            v-model="register.mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="register.username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="register.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="register.dbpwd"
            type="password"
            name="dbpwd"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '请确认密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">马上注册</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="登录">
        <van-form @submit="loginSubmit">
          <van-field
            v-model="login.mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="login.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">马上登录</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="验证码登录">
        <van-field v-model="mobile" name="mobile" label="手机号" placeholder="请输入手机号" />
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button @click="sendSms" size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="checkSms">验证码登录</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1, //刷新之后在哪个登陆方式的下标
      login: {//登录之后存储手机号
        mobile:localStorage.mobile
      },
      register: {},
      sms: "",
      mobile: ""
    };
  },
  methods: {
    checkSms() {
      //验证码登录
      this.$axios
        .get("/yun/captcha/verify", {
          params: {
            phone: this.mobile,
            captcha: this.sms
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            localStorage.mobile = this.mobile;
            localStorage.isLogin = true;
            this.$router.push({ name: "mine" }); //跳转
          } else {
            localStorage.isLogin = false;
          }
        });
    },
    loginSubmit(val) {
      console.log("submit", val);
      console.log("登录");
      this.$axios
        .post("/vue/login", this.login) //后端写接口前端发送请求
        .then(res => {
          if (res.data.type) {//1表示成功
            localStorage.mobile = this.login.mobile;
            localStorage.isLogin = true;
            this.$router.push({ name: "mine" }); //跳转
            sessionStorage.token=res.data.token;//存token

          }
        });
    },
    registerSubmit(val) {
      //注册
      this.$axios.post("/vue/register", this.register).then(res => {
        if (res.data.type) {
          this.active = 1;
          // this.login.username = res.data.result[0].username
          this.login.mobile = res.data.result[0].mobile; //result 后端注册接口
        }
      });
    },

    sendSms() {
      // 发送验证码
      // 绝对路径
      // http://47.104.209.44:3333/captcha/sent
      this.$axios
        .get("/yun/captcha/sent", {
          params: {
            phone: this.mobile
          }
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>
