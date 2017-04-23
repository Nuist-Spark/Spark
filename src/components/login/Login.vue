<template>
  <div class="login">
    <transition name="fade">
      <div class="logo" v-show="logoShow">
        <div class="logo-wrapper">
          <img src="/static/img/logo.png" alt="">
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="login-wrapper" v-show="!logoShow">
        <div class="login-form">
          <loginInsert v-show="loginStatus === 0" @register="loginStatus = 1"></loginInsert>
          <register v-show="loginStatus === 1" @cancel="loginStatus = 0" @commit="loginStatus = 2"></register>
          <changeInfo v-show="loginStatus === 2"></changeInfo>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import loginInsert from '@/components/login-insert/loginInsert'
import register from '@/components/register/Register'
import changeInfo from '@/components/changeInfo/changeInfo'
import {
  saveToLocal,
  loadFromLocal
} from '../../common/js/store'

export default {
  props: {
    loginStatus: {
      type: Number,
      default: 0
    }
  },
  components: {
    loginInsert,
    register,
    changeInfo
  },
  data() {
    return {
      logoShow: true
    }
  },
  computed: {

  },
  methods: {

  },
  created() {
    setTimeout(() => {
      this.logoShow = false
    }, 3000)

    const userData = loadFromLocal('user', 'data')
    if (userData.id !== undefined) {
      this.logoShow = false
    }
    if (userData.name === undefined) {
      this.loginStatus === 0
    } else {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/css/mixin.scss';
.login {
  @include fade();
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .logo {
    .logo-wrapper {
      width: 50%;
      img {
        width: 100%;
      }
    }
  }
  .login-wrapper {
    .login-form {
      position: relative;
      top: -3em;
      width: 80%;
    }
  }
}
</style>
