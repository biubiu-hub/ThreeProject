<template>
  <div id="app">
    <!-- <transition :name="className" mode="out-in"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      className:"fade",//只执行一次
    }
  },
  watch:{
    "$route":function(to,from){// 监听组件切换
      console.log(to);
      this.className = "fade"
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
