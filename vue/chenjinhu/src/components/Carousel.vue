<template>
  <div class="swiper-container" :id="id">
    <div class="swiper-wrapper">
      <!-- 插槽 接收moive传的值-->
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
    <!-- 分页器 Movie-->
  </div>
</template>
<script>
import Swiper from "swiper"; //引入swiper
import "swiper/css/swiper.min.css"; // 引入swiper css样式

// 封装组件  props+slot
export default {
  props: {
    id: String,
    swiperoptions: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    //   Swiper 实例化----死数据
    let mySwiper = new Swiper("#" + this.id, this.swiperoptions);
  },
  updated() {
    //   接口异步数据
    let mySwiper = new Swiper("#" + this.id, this.swiperoptions);
  }
};
</script>