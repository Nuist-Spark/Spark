<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'app',
  created() {
    this.$router.push('/login')
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import './common/css/mixin.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  @include fade();
}
</style>
