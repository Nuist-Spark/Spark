<template>
  <div class="navbar" v-show="navDisplay">
    <el-tabs @tab-click="routerPush">
      <el-tab-pane :label="tabs[index].name" v-for="(value,index) in tabs" :key="index"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    tabs: {
      type: Array,
      default () {
        return [{
          name: '运动',
          router: '/home'
        }, {
          name: '小组',
          router: '/group'
        }, {
          name: '我',
          router: '/me'
        }]
      }
    },
    navDisplay: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  data() {
    return {}
  },
  computed: {

  },
  methods: {
    routerPush({
      _data: {
        index
      }
    }) {
      this.$router.push(this.tabs[index].router)
    }
  },
  created() {

  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 3em;
  .el-tabs__header {
    margin: 0;
    .el-tabs__nav {
      float: none;
      .el-tabs__item {
        width: 33%;
        font-size: 1.1em;
      }
    }
  }
}
</style>
