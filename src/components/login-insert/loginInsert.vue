<template>
  <div class="login-insert">
    <div class="logo-wrapper">
      <img src="/static/img/logo.png" alt="">
    </div>
    <el-input placeholder="nickname" v-model="input1">
      <template slot="prepend"> 昵称：</template>
    </el-input>
    <el-input placeholder="password" v-model="input2" type="password" :icon="inputi">
      <template slot="prepend"> 密码：</template>
    </el-input>
    <el-button @click="login">登录</el-button>
    <el-button @click="register">没有帐号？注册</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
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

  },
  data() {
    return {
      input1: '',
      input2: '',
      inputi: ''
    }
  },
  computed: {

  },
  methods: {
    login() {
      this
        .$http.post('http://192.168.5.169:8000/api/login', {
          name: this.input1,
          password: this.input2
        })
        .then(({
          data
        }) => {
          if (data.status === 200) {
            saveToLocal('user', 'data', data.data)
            this.$router.push('/')
          } else {
            if (data.status === 400) {
              this.inputi = 'circle-cross'
            }
          }
        })
    },
    register() {
      this.$emit('register')
    }
  },
  created() {

  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.login-insert {
  .logo-wrapper {
    width: 60%;
    margin: 0 auto 1em;
    img {
      width: 100%;
    }
  }
  div {
    margin-bottom: .8em;
  }
  .el-select .el-input {
    width: 30%;
  }
}
</style>
