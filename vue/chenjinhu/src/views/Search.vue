<template>
  <div class="box">
    <Head title="搜索" :show="true" :search="true"></Head>
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="todoSearch">搜索</div>
      </template>
    </van-search>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    onSearch(val) {
      console.log(val);
    },
    todoSearch(e){
      console.log(e);
      console.log(this.keyword);

    }
  }
};
</script>