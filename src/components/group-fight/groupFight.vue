<template>
  <div class="group-fight">
    <div class="header">
      <header v-show="start">公会战已经开始</header>
      <header v-show="!start">公会战距离{{rtimer}}开始</header>
    </div>
    <div class="group-list-wrapper" ref="groupFight">
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

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
      groups: []
    }
  },
  computed: {
    timer() {
      let a = new Date()
      if (a.getDay() === 0 || a.getDay() === 6) {
        return 0
      }
      return a.getDay() * 24 * 60 * 60 + (23 - a.getHours()) * 60 * 60 + (59 - a.getMinutes()) * 60
    },
    start() {
      return !(this.timer > 0)
    }
  },
  methods: {
    click(event) {
      if (!event._constructed) return
    },
    getAvatar(prop) {
      return `../../../static/img/${prop}.jpg`
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.groupFight, {
        click: true
      })
    })

    if (this.start === true) {
      this
        .$http.get('http://192.168.5.169:8000/api/fight/init')
        .then(({
          data
        }) => {
          if (data.status === 200) {
            this.groups = data.data
          }
        })
    }

    this
      .$http.get('http://192.168.5.169:8000/api/group/list')
      .then(({
        data
      }) => {
        if (data.status === 200) {
          this.groups = data.data
          this.groups.forEach((el, index, self) => {
            self[index].score = 0
          })
        }
      })
    this.middle = setInterval(() => {
      this
        .$http.get('http://192.168.5.169:8000/api/fight/middle')
        .then(({
          data
        }) => {
          if (data.status === 200) {
            this.groups = data.data
          }
        })
    }, 30 * 60 * 1000)

    setTimeout(() => {
      if (this.middle) {
        clearInterval(this.middle)
        this
          .$http.get('http://192.168.5.169:8000/api/fight/final')
          .then(({
            data
          }) => {
            if (data.status === 200) {
              this.groups = data.data
            }
          })
      }
    }, 2 * 24 * 60 * 60 * 1000)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.group-fight {
  .header {
    font-size: 1.1em;
    position: absolute;
    top: 0;
    width: 100%;
    margin-top: .3em;
    color: #475669;
  }
  .list-wrapper {
    position: absolute;
    top: 226px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .list {
      min-height: calc( 100vh - 226px);
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
  }
  .group-list-wrapper {
    position: fixed;
    top: 110px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .list {
      min-height: calc( 100vh - 180px);
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
