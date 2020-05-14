export var foots = [
  { txt: "电影", name: "movie", path: "/main/movie", icon: "&#xe717;" },
  { txt: "影院", name: "cinema", path: "/main/cinema", icon: "&#xe8c0;" },
  { txt: "咨询", name: "news", path: "/main/news", icon: "&#xe61a;" },
  { txt: "电商", name: "shop", path: "/main/shop", icon: "&#xe617;" },
  { txt: "我的", name: "mine", path: "/main/mine", icon: "&#xe619;" }
];

// 封装的混入对象
export const myMixin = {
  data() {
    return {
      token: localStorage.token || "", //取token
      count: 1903,
      city: {}
    }
  },
  created() {
    //如果没选择城市，跳转选择
    console.log("这是一个混入的钩子函数")
    if (localStorage.city) {
      var city = JSON.parse(localStorage.city);
      console.log(city);
      this.city = city
    } else {
      this.$router.push({ name: "city" });
    }
  },
  mounted() {

  },
  filters: {

  },
  computed: {

  }
}

// 混入动画   movie，cinema混入
export const animate = {
  data() {
    return {
      animateClass: "enter"
    }
  },
  beforeRouteEnter(to, from, next) {// 进入
    console.log("进入")
    next();
  },
  beforeRouteLeave(to, from, next) {// 离开
    console.log("离开")
    this.animateClass = "leave";
    setTimeout(() => {
      next();
    }, 400)
  }
}