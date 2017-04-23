<template>
  <div class="group-list">
    <div class="header" v-show="headerShow">
      <div class="avatar-wrapper" @click.prevent="groupDetail">
        <el-badge :value="group.level" class="item">
          <img :src="getAvatar('group'+group.avatar)" alt="">
        </el-badge>
      </div>
      <div class="info" @click.prevent="groupDetail">
        <div class="name">公会名称：{{group.name}}</div>
        <div class="logan">公会口号：{{group.logan}}</div>
        <div class="score">公会积分：{{group.score}} / {{group.complete_score}}</div>
        <div class="num">公会人数：{{group.filled_number}} / {{group.contain_number}}</div>
      </div>
      <div class="quit">
        <el-button type="warning" @click="quit()">退出</el-button>
      </div>
    </div>
    <div class="group-list-wrapper" ref="groupList">
      <div class="list" ref="list">
        <ul>
          <li class="groupItem" v-for="(item , index) in groups">
            <div class="avatar-wrapper">
              <el-badge :value="item.level" class="item">
                <img :src="getAvatar('group'+item.avatar)" alt="">
              </el-badge>
            </div>
            <div class="info">
              <div class="name">名称：{{item.name}}</div>
              <div class="logan">口号：{{item.logan}}</div>
              <div class="score">积分：{{item.score}}</div>
              <div class="num">人数：{{item.filled_number}} / {{item.contain_number}}</div>
            </div>
            <div class="join">
              <el-button type="primary" @click="join(item.id)" :disabled="!joinable">加入</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
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
      groups: {},
      group: {},
      headerShow: true
    }
  },
  computed: {
    joinable() {
      return loadFromLocal('user', 'data').group_id === 0
    },
    members() {
      let a = ''
      for (let item of this.group.users) {
        a = a + item.name + '\n'
      }
      return a
    }
  },
  methods: {
    click(event) {
      if (!event._constructed) return
    },
    getAvatar(prop) {
      return `../../../static/img/${prop}.jpg`
    },
    join(id) {
      this
        .$http.post('http://172.20.10.6:8000/api/group/join', {
          group_id: id,
          id: loadFromLocal('user', 'data').id
        })
        .then(({
          data
        }) => {
          console.log(data)
          if (data.status === 200) {
            this
              .$http.post('http://172.20.10.6:8000/api/group/detail', {
                id: loadFromLocal('user', 'data').id
              })
              .then(({
                data
              }) => {
                console.log(data)
                if (data.status === 200) {
                  this.group = data.data
                  saveToLocal('user', 'data', Object.assign({}, loadFromLocal('user', 'data'), {
                    group_id: this.group.id
                  }))
                  this.$message.success('加入成功！')
                } else {
                  this.$message('你没有加入公会！')
                }
              })
          } else {
            this.headerShow = false
            this.$message('你没有加入公会！')
          }
        })
    },
    groupDetail() {
      this.$alert(`公会成员:${this.members}`, '公会详情', {
        confirmButtonText: '确定'
      })
    },
    quit() {
      this
        .$http.post('http://172.20.10.6:8000/api/group/exit', {
          id: loadFromLocal('user', 'data').id
        })
        .then(({
          data
        }) => {
          if (data.status === 200) {
            this
              .$http.post('http://172.20.10.6:8000/api/group/detail', {
                id: loadFromLocal('user', 'data').id
              })
              .then(({
                data
              }) => {
                if (data.status !== 200) {
                  this.headerShow = false
                  saveToLocal('user', 'data', Object.assign({}, loadFromLocal('user', 'data'), {
                    group_id: 0
                  }))
                  this.$message('退出成功！')
                }
              })
          }
        })
    }
  },
  watch: {
    headerShow() {
      if (this.headerShow === false) {
        this.$refs.groupList.style.top = '88px'
        this.$refs.list.style.minHeight = 'calc( 100vh - 130px)'
      }
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  created() {
    this
      .$http.get('http://172.20.10.6:8000/api/group/list')
      .then(({
        data
      }) => {
        if (data.status === 200) {
          this.groups = data.data
        }
      })

    this
      .$http.post('http://172.20.10.6:8000/api/group/detail', {
        id: loadFromLocal('user', 'data').id
      })
      .then(({
        data
      }) => {
        if (data.status === 200) {
          this.group = data.data
        } else {
          this.headerShow = false
          this.$message('你没有加入公会！')
        }
      })
      .catch(() => {
        this.headerShow = false
      })

    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.groupList, {
        click: true
      })
    })
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.group-list {
  display: relative;
  .header {
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
    box-shadow:1px 1px 1px #dfe6ec;
    margin:0;
    padding:.4em 0;
    background: #F9FAFC;
    .avatar-wrapper {
      width: 90px;
      height: 90px;
      margin-right: 1em;
      img {
        display: inline-block;
        border-radius: 50%;
        width: 90px;
        height: 90px;
      }
      .el-badge__content.is-fixed {
        top: inherit;
        right: 1.2em;
        bottom: -12px;
        font-size: 1.2em;
        line-height: 1.4em;
        height: 1.4em;
      }
      .el-badge__content {
        background-color: #20a0ff;
      }
    }
    .info {
      line-height: 1.2em;
      font-size: 1em;
      text-align: left;
      width: 7em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      div {
        height: 1.2em;
      }
      .name {
        font-weight: 700;
      }
    }
    .quit {
      margin-left: .8em;
    }
  }
  .group-list-wrapper {
    position: fixed;
    top: 188px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .list {
      min-height: calc( 100vh - 230px);
      padding-bottom: 4em;
      .el-collapse-item__header {
        text-align: left;
      }
      .el-collapse-item__wrap {
        border-bottom: none;
      }
    }
    .el-collapse {
      border-bottom: none;
    }
    .groupItem {
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
      :last-child {
        margin-bottom: 2em;
      }
      margin:0;
      padding:.4em 0;
      border-bottom:1px solid #dfe6ec;
      box-shadow:1px 1px 1px #dfe6ec;
      text-align:left;
      .avatar-wrapper {
        width: 75px;
        height: 75px;
        margin-left: 15%;
        margin-right: 1.5em;
        img {
          display: inline-block;
          border-radius: 50%;
          width: 75px;
          height: 75px;
        }
        .el-badge__content.is-fixed {
          top: inherit;
          right: 1.2em;
          bottom: -12px;
          line-height: 1.4em;
          height: 1.4em;
        }
      }
      .info {
        line-height: 1.2em;
        font-size: 1em;
        text-align: left;
        width: 7em;
        overflow: hidden;
        div {
          height: 1.2em;
        }
        .name {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
