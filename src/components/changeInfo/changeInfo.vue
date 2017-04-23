<template>
  <div class="changeInfo">
    <div class="logo-wrapper" v-show="avatarShow" @click="changeAvatar">
      <img :src="logoSource" alt="">
    </div>
    <el-input placeholder="自我介绍" v-model="input1" type="textarea" :rows="2">
    </el-input>
    <el-input placeholder="password" v-model="input2">
      <template slot="prepend"> 设置密码：</template>
    </el-input>
    <el-button @click="commit">提交</el-button>
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
      logoSourceIndex: '1'
    }
  },
  computed: {
    logoSource() {
      return `/static/img/avatar${this.logoSourceIndex}.jpg`
    },
    avatarShow() {
      if (loadFromLocal('user', 'data').name === undefined) {
        // this.$notify.success({
        //   message: '点击头像选择头像！',
        //   offset: 100
        // })
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    commit() {
      this
        .$http.post('http://192.168.5.169:8000/api/login/reg/change', {
          id: loadFromLocal('user', 'data').id,
          password: this.input2,
          logan: this.input1,
          avatar: this.logoSourceIndex || 0
        })
        .then(({
          data
        }) => {
          if (data.status === 200) {
            this.$message.success('更新成功')
            if (loadFromLocal('user', 'data').name === undefined) {
              this.$router.push('/')
            }
          }
        })
    },
    changeAvatar() {
      this.logoSourceIndex === 3 ? this.logoSourceIndex = 1 : this.logoSourceIndex++
    }
  },
  created() {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
.changeInfo {
  .logo-wrapper {
    width: 30%;
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
