<template>
  <div id="app">
    <div class="router-view">
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <navbar></navbar>
  </div>
</template>
<script type="text/ecmascript-6">
import navbar from '@/components/navbar/navbar'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .router-view {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 46px;
    overflow: hidden;
  }
}
</style>
