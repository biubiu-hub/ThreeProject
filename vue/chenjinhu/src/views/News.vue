<template>
  <div>
    <Head title="咨询"></Head>
    <div v-html="page" :class="animateClass"></div>
  </div>
</template>
<script>
import{
  animate
} from "@/utils"
export default {
  mixins: [animate],
  data() {
    return {
      page: ""
    };
  },
  mounted() {
    this.$axios
      .get("/maizuo/gateway?actId=ElzMZU125260", {
        headers: {
          "X-Host": "mall.act.static-page.info"
        }
      }).then(res => {
        this.page = res.data.data.data.content;
        console.log(res)
      });
  }
};
</script>