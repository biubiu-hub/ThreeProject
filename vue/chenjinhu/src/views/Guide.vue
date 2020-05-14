<template>
  <div class="guide box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(img,i) in imgs" :key="i">
        <img @click="gotomain(i)" :src="img" alt class="g-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
// 主页轮播
import img4 from "@/assets/images/slide4.png";
export default {
  data() {
    return {
      imgs: [
        require("@/assets/images/slide1.png"),
        require("@/assets/images/slide2.png"),
        require("@/assets/images/slide3.png"),
        img4
      ]
    };
  },
  mounted(){
    if(localStorage.visitCount){
      localStorage.visitCount++
      if(localStorage.visitCount>3){
        this.$router.push({name:"movie"})
      }

    }else{
      localStorage.visitCount=1
    }
  },
  methods: {
    gotomain(i) {
      if (i == this.imgs.length - 1) {
        this.$router.push({ name: "movie" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.my-swipe,
.g-img {
  height: 100%;
  width: 100%;
}
</style>