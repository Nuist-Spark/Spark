<template>
  <div class="home">
    <div class="list-wrapper">
      <div class="list">
        <div class="me-header">
          <div class="avatar-wrapper">
            <el-badge :value="user.level" class="item">
              <img :src="logoSource" alt="">
            </el-badge>
          </div>
          <div class="count-wrapper">
            <ul>
              <li>{{user.name}}</li>
              <li>总计走了{{ Number(steps).toFixed(2) }}步</li>
              <li>大约{{ Number(steps * 0.4).toFixed(2) }}米</li>
              <li>消耗了{{ Number(steps * 0.4 * 150 / 4920).toFixed(2) }}卡路里</li>
              <li>积攒了{{ Number(user.score).toFixed(2) }}积分</li>
            </ul>
          </div>
        </div>
        <div class="scroll-wrapper" ref="homeList">
          <div class="botton-list">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
              <el-collapse-item title="徽章墙" name="1">
                <div class="i-wrapper" v-for="(item,index) in user.badges">
                  <div class="avatar"><img :src="getAvatar(item.pic)" alt="" width="50" height="50"></div>
                  <div class="info">
                    <div class="name">{{item.name}}</div>
                    <div class="from">{{item.get_from}}</div>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="更新资料" name="2">
                <changeInfo></changeInfo>
              </el-collapse-item>
              <el-collapse-item title="退出" name="3">
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import changeInfo from '@/components/changeInfo/changeInfo'
import {
  saveToLocal,
  loadFromLocal
} from '../../common/js/store'

export default {
  props: {
    user: {
      type: Object,
      default () {
        return {
          steps: 0
        }
      }
    }
  },
  components: {
    changeInfo
  },
  data() {
    return {
      activeNames: ['1']
    }
  },
  computed: {
    logoSource() {
      return '../../../static/img/logo.png'
    },
    steps() {
      return this.user.step + Number(loadFromLocal('user', 'local', 0).step)
    }
  },
  methods: {
    click(event) {
      if (!event._constructed) return
    },
    quit() {
      this
        .$http.post('http://172.20.10.6:8000/api/step', {
          id: loadFromLocal('user', 'data').id,
          step: loadFromLocal('user', 'local').step
        })
        .then(({
          data
        }) => {
          if (data.status === 200) {
            this.$message.success('同步成功!')
          }
        })
      saveToLocal('user', 'data', undefined)
      this.$router.push('/login')
    },
    handleChange(event) {
      if (event.indexOf('3') !== -1) {
        this.quit()
      }
    },
    getAvatar(index) {
      return `http://172.20.10.6:8000${index}`
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.homeList, {
        click: true
      })
    })
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
$blue: #475669;
$deblue: #8492A6;
$gray: #E5E9F2;
.home {
  .list-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .list {
      display: flex;
      flex-direction: column;
      .me-header {
        flex: 0 0 10em;
        padding-top: 2em;
        color: $deblue;
        border-bottom: 1px solid $gray;
        background: #F9FAFC;
        & > div {
          display: inline-block;
          vertical-align: middle;
          margin: 0 .8em;
        }
        .avatar-wrapper {
          width: 30%;
          img {
            display: inline-block;
            box-shadow: 1px 1px 1px;
            border-radius: 50%;
            width: 100%;
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
        .count-wrapper li {
          line-height: 1.3em;
          font-size: 1em;
          overflow: hidden;
          &:first-child {
            color: #475669;
            font-weight: 700;
            font-size: 1.3em;
          }
        }
      }
      .scroll-wrapper {
        position: absolute;
        top: 12.5em;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .botton-list {
          flex: 1;
          min-height: calc( 100vh - 230px);
          .el-collapse-item__header {
            font-size: 1em;
            text-align: left;
          }
          .el-collapse-item__content:last-child {
            padding: 0;
          }
          .changeInfo {
            margin: 1em;
          }
          .i-wrapper {
            & > div {
              display: inline-block;
              vertical-align: middle;
            }
            text-align:left;
            .avatar {
              margin-left: 2em;
            }
            .info {
              margin: 0 .4em;
              .name {
                font-size: 1.2em;
                line-height: 1.4em;
                height: 1.3em;
              }
              .from {
                color: #8492A6;
              }
            }
            border-bottom: 1px solid #dfe6ec;
            padding:.3em 0;
          }
        }
      }
    }
  }
}
</style>
