<template>
  <div class="common-header">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in items">
        <img :src="item">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    items: {
      type: Array,
      default () {
        return ['', '', '', '']
      }
    }
  },
  components: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created() {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
.el-carousel {
  .el-carousel__item {
    h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    &:nth-child(2n) {
      background-color: #99a9bf;
    }
    &:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
}
</style>
