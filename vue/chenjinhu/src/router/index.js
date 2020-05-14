import Vue from 'vue'
import VueRouter from 'vue-router'//导入路由


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/guide",
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import("@/views/Guide.vue")
  },
  {
    path: '/main',
    component: () => import("@/views/Main.vue"),
    redirect: "/main/movie",
    children: [
      {
        path: "movie",
        name: "movie",
        component: () => import("@/views/Movie.vue"),
      },
      {
        path: "cinema",
        name: "cinema",
        component: () => import("@/views/Cinema.vue"),

      },
      {
        path: "news",
        name: "news",
        component: () => import("@/views/News.vue"),
      },
      {
        path: "shop",
        name: "shop",
        component: () => import("@/views/Shop.vue"),
      },
      {
        path: "mine",
        name: "mine",
        component: () => import("@/views/Mine.vue"),

      },


    ]
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/search",
    name: 'search',
    component: () => import("@/views/Search.vue"),
  },
  {
    path: "/city",
    name: 'city',
    component: () => import("@/views/City.vue"),
  },
  {
    path: "/yydetail/:cinemaId",
    name: 'yydetail',
    component: () => import("@/views/Yydetail.vue"),
  },
  {
    path: "/films/:filmId",//:后的必传
    name: 'films',
    component: () => import("@/views/Films.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue")
  },
  {
    path: "*",
    redirect: { name: "404" }
  },
]
// 创建路由实例对象
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由进入之前
router.beforeEach((to,from,next)=>{
    document.getElementsByClassName('box').className="box enter";
    next();
})

export default router
