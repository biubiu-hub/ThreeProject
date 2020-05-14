<template>
  <div class="class">
    <Head :title="detail.name" :show="true"></Head>

    <div>
      <div class="odiv">
        <p class="op" @click="showPopup" v-for="(s,i) in detail.services" :key="i">{{s.name}}</p>
      </div>
    </div>
    <!-- <div :class="animateClass"> -->
      <div class="dh">
        <h4>{{detail.address}}</h4>
        <van-icon name="phone-o" size="32" @click="call(detail.phone)"></van-icon>
      </div>

      <!-- 弹出阴影 -->
      <van-popup v-model="show" position="top">
        <div v-for="(s,i) in detail.services" :key="i" class="xx">
          <p>{{s.name}}</p>
          <b>{{s.description}}</b>
        </div>
      </van-popup>
      <!-- 图片轮播 -->
      <div class="swiper">
        <Carousel id="b3" :swiperoptions="options">
          <Carousel-item v-for="(film,i) in films" :key="i">
            <img :src="film.poster" alt />
          </Carousel-item>
        </Carousel>
      </div>
      <!-- 描述 -->
      <div
        @click="gotoFilm(film)"
        class="item"
        v-for="(film,i) in films"
        :key="i"
        v-show="active==i"
      >
        <p>
          {{film.name}} /
          <span>{{film.grade}}</span>
        </p>
        <p>{{film.category}}|{{film.runtime + "分钟"}}|{{film.director}}</p>
      </div>
    <!-- </div> -->
  </div>
</template>
<script>
// import { animate } from "@/utils";
export default {
  // mixins: [animate],
  data() {
    return {
      detail: {},
      show: false,
      options: {},
      films: [],
      active: ""
    };
  },
  methods: {
    gotoFilm(film) {
      this.$router.push({
        name: "films",
        params: {// 路由里面传的
          filmId: film.filmId //电影id
        },
        query: {
          //电影名字
          name: film.name
        }
      });
    },
    call(phone) {
      // 点击电话弹出号码
      alert(phone);
    },
    showPopup() {
      //点击弹出遮罩层
      this.show = !this.show;
    }
  },
  mounted() {
    this.$axios
      .get("/maizuo/gateway/?k=417263", {
        params: {
          cinemaId: this.$route.params.cinemaId
        },
        headers: {
          "X-Host": "mall.film-ticket.cinema.info"
        }
      })
      .then(res => {
        this.detail = res.data.data.cinema;
      });
  },
  created() {
    this.$axios
      .get("/maizuo/gateway/?k=9682114", {
        params: {
          cinemaId: this.$route.params.cinemaId
        },
        headers: {
          "X-Host": "mall.film-ticket.film.cinema-show-film"
        }
      })
      .then(res => {
        this.films = res.data.data.films;
        var that = this;
        this.options = {
          observer: true,
          effect: "coverflow",
          slidesPerView: 2,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 10,
            stretch: 10,
            depth: 20,
            modifier: 2,
            slideShadows: false // 阴影
          },
          on: {
            slideChange: function() {
              // 监听Swiper切换
              console.log("activeIndex 切换成" + this.activeIndex);
              that.active = this.activeIndex;
            }
          }
        };
      });
  }
};
</script>
<style lang="scss" scoped>
.odiv {
  box-sizing: border-box;
  width: 100%;
  // padding: 10px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
}
.op {
  padding: 5px;
  margin: 8px;
  color: #ff5f16;
}
.xx {
  display: flex;
  p {
    margin-left: 30px;
    width: 60px;
    font-size: 10px;
    color: #ffb232;
    margin-top: 25px;
    float: left;
  }
  b {
    float: left;
    line-height: 15px;
    font-weight: normal;
    flex: 1;
    padding: 20px 0;
  }
}
.dh {
  display: flex;
  justify-content: space-between;
}
.item {
  text-align: center;
  border-bottom: 0.1px solid #ccc;
  p {
    font-size: 15px;
    line-height: 18px;
    padding: 10px;
    span {
      color: #ffb232;
    }
  }
}
</style>