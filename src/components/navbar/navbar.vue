<template>
  <div class="navbar">
    <el-tabs @tab-click="routerPush">
      <el-tab-pane :label="tabs[index].name" v-for="(value,index) in tabs"></el-tab-pane>
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
          name: '主页',
          router: '/'
        }, {
          name: '博客',
          router: '/blog'
        }, {
          name: '新闻',
          router: '/news'
        }, {
          name: '其他',
          router: '/more'
        }]
      }
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
  .el-tabs__header {
    margin: 0;
    .el-tabs__nav {
      float: none;
      .el-tabs__item {
        width: 25%;
      }
    }
  }
}
</style>
