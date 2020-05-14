import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { axios } from "@/utils/axios";
const store = new Vuex.Store({
  state: {
    obj: {
      banner: [],
      cinemaList: [],
      cityList: [],
      filmList: []
    },
  },
  mutations: {
    getBanner(state, payload) {
      state.obj = { ...state.obj, banner: payload }
    },
    getCinemas(state, payload) {
      state.obj = { ...state.obj, cinemaList: payload }
    },
    getCityList(state, payload) {
      state.obj = { ...state.obj, cityList: payload }
    },
    getFilmList(state, payload) {
      state.obj = { ...state.obj, filmList: payload }

    }
  },
  actions: {
    getBanner({ commit }) {// 轮播图
      axios.get("/vue/movie?limit=5")
        .then(res => {
          commit("getBanner", res.data.result)
        })
    },
    getCinemas({ commit }, { cityId, cb }) {// 影院
      axios
        .get("/maizuo/gateway?ticketFlag=1&k=635051", {
          params: {
            cityId
          },
          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"15729643184239132721923","bc":"110100"}',
            "X-Host": "mall.film-ticket.cinema.list" // 根据请求头返回数据
          }
        })
        .then(res => {
          cb();
          commit("getCinemas", res.data.data.cinemas)
        });
    },
    getCityList({ commit }) {// 城市列表
      axios({
        url: "/maizuo/gateway?k=2020849",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15729643184239132721923","bc":"110100"}',
          "X-Host": "mall.film-ticket.city.list"
        }
      }).then(res => {
        commit("getCityList", res.data.data.cities)
      });
    },
    getFilmList({ commit }) {
      axios
        .get(
          "/maizuo/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5725270",
          // "gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=1385503",
          {
            params: {
              
            },
            headers: {
              "X-Host": "mall.film-ticket.film.list"
            }
          }
        )
        .then(res => {
          commit("getFilmList", res.data.data.films)
        });
    }
  },
  modules: {
  }
})
export default store;
