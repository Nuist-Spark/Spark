<template>
  <div class="group">
    <div class="header">
      <el-button-group>
        <el-button @click="groupList">公会列表</el-button>
        <el-button @click="groupFight">公会战</el-button>
      </el-button-group>
      <div class="plus-wrapper" @click="openForm">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div class="router-wrapper">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    user: {
      type: Object,
      default () {
        return {}
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
    click(event) {
      if (!event._constructed) return
    },
    openForm() {
      this.$prompt('请输入公会名称', '创建公会', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({
        value
      }) => {
        this.$prompt('请输入公会口号', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then((logan) => {
          this
            .$http.post('http://172.20.10.6:8000/api/group/apply', {
              create_user_id: this.user.id,
              name: value,
              logan: logan.value,
              avatar: 1
            })
            .then(({
              data
            }) => {
              if (data.status === 200) {
                this.$message.success('添加成功')
              }
            })
        })
      })
    },
    groupList() {
      this.$router.push('/group/groupList')
    },
    groupFight() {
      this.$router.push('/group/groupFight')
    }
  },
  created() {
    this.groupList()
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/css/mixin.scss';
.group {
  position: absolute;
  top: 0;
  width: 100%;
  @include fade();
  .header {
    margin-top: 1.5em;
    padding-bottom: 1em;
    .plus-wrapper {
      position: absolute;
      right: 2em;
      top: 2.3em;
      i {
        display: inline-block;
        border: 2px solid #bfcbd9;
        color: #bfcbd9;
        padding: .3em;
        border-radius: 50%;
        margin-top: -.5em;
      }
    }
  }
  .router-wrapper {
    position: absolute;
    width: 100%;
    top: 84px;
    bottom: 0;
  }
}
</style>
