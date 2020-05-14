<template>
  <div>
    <Head :title="$route.query.name" :show="true"></Head>
    <img :src="film.poster" alt class="f-img" />
    <!-- 点两层解决namebug -->
    <div v-if="film.filmType" class="f-content">
      <p class="f-title">
        {{film.name}} / {{film.filmType.name}}
        <span>{{film.grade}}分</span>
      </p>
      <p>{{film.category}}</p>
      <p>{{film.nation}} | 分钟</p>
      <p>{{film.synopsis}}</p>
    </div>
    <div class="f-man">
      <h3>演职人员</h3>
      <div class="actors">
        <div v-for="(ac,i) in film.actors" :key="i">
          <img :src="ac.avatarAddress" alt />
          <p class="ac-name">{{ac.name}}</p>
          <p class="ac-role">{{ac.role}}</p>
        </div>
      </div>
    </div>
    <div class="jz">
      <h1>剧照</h1>
      <div class="photos">
        <div v-for="(p,i) in film.photos" :key="i">
          <img :src="p" alt class="op" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      film: {}
    };
  },
  methods: {
    showDiglog() {
      Dialog.confirm({
        message: "该影片目前没有排期，到首页观看其他的电影",
        confirmButtonColor: "#ff5f16",
        overlay: false
      })
        .then(() => {
          //   on confirm
          this.$router.push({ name: "movie" });
        })
        .catch(() => {
          //   on cancel
        });
    }
  },
  mounted() {
    this.$axios
      .get("/maizuo/gateway?k=4388992", {
        params: {
          filmId: this.$route.params.filmId //路由冒号传的参
        },
        headers: {
          "X-Host": "mall.film-ticket.film.info"
        }
      })
      .then(res => {
        this.film = res.data.data.film;
        if (!this.film.isPresale) {
          this.showDiglog();
        }
      });
  }
};
</script>
<style lang="scss" scoped>
div {
}
.f-img {
  height: 200px;
  width: 100%;
}
.f-content,
.f-man,
.jz {
  padding: 15px;
  background: #fff;

  p {
    font-size: 18px;
    color: #797d82;
    margin-top: 4px;
  }
  .f-title {
    width: 100%;
    color: #191a1b;
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    margin-right: 7px;
    span {
      color: #ffb232;
      float: right;
    }
  }
}
.f-man {
  height: 210px;
  padding: 10px 10px 0 10px;
  overflow: hidden;
  margin-top: 10px;
  .actors {
    height: 227px;
    width: 100%;
    display: flex;
    padding-bottom: 10px;
    overflow-x: scroll;

    img {
      height: 115px;
      width: 95px;
      padding: 10px 0;
      margin-left: 10px;
    }
    p {
      font-size: 12px;
      text-align: center;
    }
    .ac-name {
      font-size: 14px;
    }
    .ac-role {
      color: #797d82;
    }
  }
}
.jz {
  height: 130px;
  margin-top: 10px;
  overflow: hidden;
}
.photos {
  display: flex;
  height: 187px;
  overflow: scroll;
  overflow-y: hidden;
  margin-top: 10px;

  .op {
    width: 172px;
    height: 100px;
    margin-right: 10px;
  }
}
</style>