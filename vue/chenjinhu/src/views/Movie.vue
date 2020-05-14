<template>
  <div>
    <Head title="电影"></Head>
    <!-- 死数据 -->
    <!-- <Carousel id="b1" :swiperoptions="swiperOptions" v-if="false" -->
    <!-- 父组件传值  Carousel  solt接收-->
    <!-- <div class="swiper-slide" v-for="(item,i) in imgs" :key="i">
        <img :src="item" alt="" class="m-img" />
    </div>-->
    <!-- Carousel-item 组件 -->
    <!-- <Carousel-item v-for="(item,i) in imgs" :key="i">
        <img :src="item" alt class="m-img" />
    </Carousel-item>-->
    <!-- </Carousel> -->
    <!-- 异步数据 -->
    <!-- <div class="m-box" :class="animateClass">
      <p class="m-city" @click="gotoCity">{{city.name}}</p>
      <Carousel id="banner" :swiperoptions="swiperOptions">
        <Carousel-item v-for="(m,i) in obj.banner" :key="i">
          <img :src="m.images.large.replace(/img7/,'img3')" alt class="m-img" />
        </Carousel-item>
      </Carousel>
    </div>-->
    <p class="m-city" @click="gotoCity">{{city.name}}</p>
    <div class="shouye">
      <van-tabs v-model="active" title-active-color="#ff5f16">
        <van-tab title="正在热映">
          <div v-for="(f,i) in obj.filmList" :key="i" class="now">
            <img :src="f.poster" alt />
            <div>
              <h3>{{f.name}} {{f.filmType.name}}</h3>
              <p>
                观众评分
                <span>{{f.grade}}</span>
              </p>
              <p>主演:{{f.actors}}</p>
              <p>{{f.nation}} | {{f.runtime}}分钟</p>
            </div>
          </div>
          <div class="no-more">- 无更多电影 -</div>
        </van-tab>
        <van-tab title="即将上映" @click="changeCome()">
          <div v-for="(c,index) in obj.filmList" :key="index" class="now">
            <img :src="c.poster" alt />
            <div>
              <h3>{{c.name}} {{c.filmType.name}}</h3>
              <p>
                观众评分
                <span>{{c.grade}}</span>
              </p>
              <p>主演:{{c.actors}}</p>
              <p>{{c.nation}} | {{c.runtime}}分钟</p>
            </div>
          </div>
          <div class="no-more">- 无更多电影 -</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { myMixin, animate } from "@/utils";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [myMixin, animate],
  computed: {
    ...mapState([
      // 取值
      "obj"
    ])
  },
  data() {
    return {
      active: 0,
      imgs: [
        //导入图片
        require("@/assets/images/img1.jpg"),
        require("@/assets/images/img2.jpg"),
        require("@/assets/images/img3.jpg"),
        require("@/assets/images/img4.jpg")
      ],
      mv: [],
      swiperOptions: {
        // loop: true, // 自动轮播
        autoplay: true, // 时间间隔
        pagination: {
          // 分页器  Carousel
          el: ".swiper-pagination"
        },
        observer: true // 修改swiper自己或子元素时，自动初始化swiper
      },
      city: {},
      filmList: {}
      // filmListOne:{}
    };
  },
  methods: {
    ...mapActions([
      // "getBanner", //this.getBanner = this.$store.dispatch('getBanner')
      "getFilmList"
    ]),
    gotoCity() {
      //跳转城市页面
      this.$router.push({ name: "city" });
    },
    changeCome() {
      console.log("出不来啊出不来");
    }
  },

  created() {
    // 动态传输数据轮播--Carousel
    // this.$axios.get("/vue/movie?limit=6").then(res => {
    //   this.mv = res.data.result; //进入updated
    //   this.mv.splice(2, 1);
    // });
    if (!this.obj.banner.length > 0) {
      // vuex 临时缓存
      // this.getBanner();
    }
  },
  mounted() {
    // this.$axios
    //   .get(
    //     "/maizuo/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5725270",
    //     // "gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=1385503",
    //     {
    //       params: {
    //         cityId: this.city.cityId
    //       },
    //       headers: {
    //         "X-Host": "mall.film-ticket.film.list"
    //       }
    //     }
    //   )
    //   .then(res => {
    //     this.filmList = res.data.data.films;
    //   });
    if(!this.obj.filmList.length>0){
      this.getFilmList()
    }
  }
};
</script>
<style lang="scss" scoped>
.op {
  width: 150px;
  height: 150px;
  background: purple;
}
.m-img {
  width: 100%;
  height: 150px;
}
.m-box {
  position: relative;
}
.m-city {
  height:25px;
  width: 60px;
  color: #23ac41;
  line-height: 30px;
  font-size: 15px;
  margin-left: 20px;
}
.now {
  display: flex;
  padding: 15px 15px 15px 0;
  background: #fff;
  img {
    height: 90px;
    width: 66px;
    margin-left: 30px;
  }
  div {
    padding: 0 10px;
    p {
      font-size: 13px;
      color: #797d82;
      line-height: 18px;
      span {
        color: #ffb232;
        font-size: 14px;
      }
    }
  }
}
.no-more {
  height: 59px;
  background-color: #ededed;
  color: #bdc0c5;
  font-size: 13px;
  text-align: center;
  margin: auto;
  line-height: 59px;
}
.shouye{
  margin-top: 10px;
}
</style>