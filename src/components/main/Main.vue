<template>
  <div class="main">
    <div class="router-view">
      <transition name="fade">
        <router-view :user="userData"></router-view>
      </transition>
    </div>
    <navbar :navDisplay="true"></navbar>
  </div>
</template>
<script type="text/ecmascript-6">
import navbar from '@/components/navbar/navbar'
import {
  saveToLocal,
  loadFromLocal
} from '../../common/js/store'

export default {
  props: {
    prop: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    navbar
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created() {
    this.userData = loadFromLocal('user', 'data')
    if (this.userData.name === undefined) {
      this.$router.push('/login')
    } else {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/css/mixin.scss';
.main {
  @include fade();
  .router-view {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 46px;
    overflow: hidden;
  }
}
</style>
