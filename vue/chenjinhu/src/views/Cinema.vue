<template>
  <div class="box">
    <Head title="影院" class="top"></Head>
    <div class="c-list" :class="animateClass">
      <router-link
        :to="{name:'yydetail',params:{cinemaId:c.cinemaId}}"
        class="c-item"
        v-for="(c,i) in obj.cinemaList"
        :key="i"
      >
        <div class="c-left">
          <h4>{{c.name}}</h4>
          <h6>{{c.address}}</h6>
        </div>
        <div class="c-right">
          <p>{{c.lowPrice/100 | price}}</p>
          <strong>距离未知</strong>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { myMixin, animate } from "@/utils";
import { mapState, mapActions } from "vuex"; //
export default {
  mixins: [myMixin, animate],
  data() {
    return {
      cinemaList: []
    };
  },
  methods: {
    ...mapActions(["getCinemas"])
  },
  computed: {
    ...mapState(["obj"])
  },
  mounted() {
    this.getCinemas({cityId:this.city.cityId,cb:()=>{
      // 可以实现跳转逻辑，警告，弹窗
      console.log("Are you ok")
    }})
    // this.$axios
    //   .get("/maizuo/gateway?ticketFlag=1&k=635051", {
    //     params: {
    //       cityId: this.city.cityId
    //     },
    //     headers: {
    //       "X-Client-Info":
    //         '{"a":"3000","ch":"1002","v":"5.0.4","e":"15729643184239132721923","bc":"110100"}',
    //       "X-Host": "mall.film-ticket.cinema.list" // 根据请求头返回数据
    //     }
    //   })
    //   .then(res => {
    //     this.cinemaList = res.data.data.cinemas;
    //   });
  }
};
</script>
<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  width: 100%;
}
.c-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-top: 50px;
  .c-item {
    width: 100%;
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    .c-left {
      width: 70%;
      h4 {
        margin-top: 2px;
        color: #191a1b;
      }
      h6 {
        margin-top: 10px;
        display: block;
        max-width: 80%;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #797d82;
      }
    }
    .c-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin-top: 2px;
        text-align: right;
        color: #ff5f16;
      }
      strong {
        margin-top: 10px;
        color: #797d82;
        text-align: right;
      }
    }
  }
}
</style>

