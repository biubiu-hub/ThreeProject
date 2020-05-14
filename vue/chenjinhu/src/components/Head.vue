<template>
  <van-nav-bar
    :title="title"
    :left-text="show?'返回':''"
    :left-arrow="show"
    @click-left="onClickLeft"
  >
    <template #right>
      <van-icon v-if="!login" @click="gotoLogin" name="friends-o" size="38" />
      <van-icon v-if="!search" @click="gotoSearch" name="search" size="38" />
    </template>
  </van-nav-bar>
</template>
<script>
import { Toast } from "vant";

export default {
  props: {
    title: String,
    show: Boolean,
    login:Boolean,
    search:Boolean
  },
  methods: {
    onClickLeft() {
      this.show ? this.$router.go(-1) : "Z";
    },
    gotoLogin(){
        this.$router.push({name:"login"})
    },
    gotoSearch(){
        this.$router.push({name:"search"})

    }
    
  }
};
</script>
