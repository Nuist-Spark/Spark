<template>
  <div class="register">
    <div class="logo-wrapper">
      <img src="/static/img/logo.png" alt="">
    </div>
    <el-input placeholder="nickname" v-model="input1" :icon="inputi">
      <template slot="prepend"> 昵称：</template>
    </el-input>
    <el-input placeholder="email" v-model="input2" :icon="inputi">
      <template slot="prepend"> 电邮：</template>
    </el-input>
    <el-button @click="commit()">提交</el-button>
    <el-button @click="cancel()">取消</el-button>
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
    commit() {
      this
        .$http.post('http://172.20.10.6:8000/api/login/reg/active', {
          name: this.input1,
          email: this.input2
        })
        .then(({
          data
        }) => {
          saveToLocal('user', 'data', {
            id: data.id
          })
          this.$emit('commit')
        })
    },
    cancel() {
      this.$emit('cancel')
    },
    check() {
      this
        .$http.post('http://172.20.10.6:8000/api/login/reg/nick', {
          name: this.input1,
          email: this.input2
        })
        .then(({
          data
        }) => {
          if (data.status === 200) {
            this.inputi = 'circle-check'
          } else {
            this.inputi = 'circle-cross'
          }
        })
    }
  },
  created() {},
  watch: {
    input1() {
      this.check()
    },
    input2() {
      this.check()
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
$red: #FF4949;
.register {
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
