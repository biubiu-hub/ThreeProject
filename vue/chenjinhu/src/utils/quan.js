// 允许全局注册组件
import Vue from "vue"
import Foot from "@/components/Foot"//底部
import Vfoot from "@/components/Vfoot.vue"//vant底部
import Head from "@/components/Head.vue"//头部
import Carousel from "@/components/Carousel.vue"//轮播
import CarouselItem from "@/components/CarouselItem.vue"//子轮播
import UploadImg from "@/components/UploadImg.vue"//上传头像
import Vuex from "@/components/Vuex.vue"//


Vue.component('Foot', Foot)
Vue.component('Vfoot', Vfoot)
Vue.component('Head', Head)
Vue.component('Carousel', Carousel)
Vue.component('CarouselItem', CarouselItem)
Vue.component('UploadImg', UploadImg)
Vue.component('Vuex', Vuex)


Vue.filter("price", value => {
    if (!value) return value;
    return "￥" + value.toFixed() + " " + '起';
})