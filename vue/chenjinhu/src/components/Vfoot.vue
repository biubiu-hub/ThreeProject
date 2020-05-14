<template>
  <van-tabbar v-model="active" active-color="orange" :route="true">
    <van-tabbar-item
      v-for="(foot,i) in foots"
      :key="i"
      icon="foot.icon"
      @click="gotoRouter(foot.name)"
      :to="{name:foot.name}"
      :badge="i===3?'5':''"
    >
      <!-- <i class="iconfont" v-html="foot.icon"></i> -->
      <span>{{foot.txt}}</span>
      <!-- 脚图标 -->
      <template #icon="props">
        <i class="iconfont" v-html="foot.icon"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { foots } from "@/utils";
export default {
  data() {
    return {
      active: 0,
      foots
    };
  },
  methods: {
    gotoRouter(name) {
      //跳转
      //   this.$router.push({ name });
    }
  },
  watch: {
    // active:function(newVal){
    //     console.log(newVal);
    //     this.$router.push({name:this.foots[newVal].name})//跳转(有bug)
    // }
  },
  mounted() {
    // console.log(this.$router);
    // var name = this.$route.name;
    // this.foots.forEach((item, i) => {
    //   //解决刷新高亮问题
    //   // this.active=item.name==this.$router.name && i;
    //   if (item.name === name) {
    //     this.active = i;
    //   }
    // });
  }
};
</script>