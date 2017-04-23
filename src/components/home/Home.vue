<template>
  <div class="home">
    <div class="header">
      <div class="window1">
        <div>步数</div>
        <div>{{Number(local.step).toFixed(2)}}</div>
      </div>
      <div class="window2">
        <div>距离</div>
        <div>{{Number(local.step * 0.4).toFixed(2)}}</div>
      </div>
      <div class="window3">
        <div>能量</div>
        <div>{{Number(local.step * 0.4 * 150 / 4920).toFixed(2)}}</div>
      </div>
    </div>
    <div class="graph">
      <el-progress type="circle" :percentage="graphNumber" class="graph-circle" :status="status"></el-progress>
      <div class="task">{{ localTap.content }} {{localTap.step_number}} 步</div>
      <div id="demoComponent" class="demo-component" :center="center">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
      </div>
    </div>
    <transition name="fade">
      <div class="card" v-show="cardShow">
        <div class="logo-wrapper">
          <div class="words">打卡完成！</div>
          <img src="/static/img/logo.png" alt="">
          <p>打卡 {{cardCount.days || 0}} 天,成功获得 {{cardCount.score || 0}} 积分</p>
          <i class="el-icon-share"></i><i class="el-icon-close" @click.stop="close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import {
  saveToLocal,
  loadFromLocal
} from '../../common/js/store'

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
    let self = this

    return {
      local: {
        step: 140
      },
      localTap: {},
      timer: 6000,
      lastPos: null,
      cardShow: false,
      cardCount: {},
      plugin: [{
        pName: 'Geolocation',
        events: {
          init(instance) {
            setInterval(() => {
              instance.getCurrentPosition((status, result) => {
                self.changePosition(result.position)
              })
            }, 6000)
          }
        }
      }]
    }
  },
  computed: {
    graphNumber() {
      let num = Number(Number(this.local.step / this.localTap.step_number * 100).toFixed(2))
      if (num >= 100) {
        this.card()
      }
      saveToLocal('user', 'local', this.local)
      return num >= 100 ? 100 : num
    },
    status() {
      saveToLocal('user', 'local', this.local)
      return this.graphNumber === 100 ? 'success' : (this.graphNumber === 0 ? '' : '')
    }
  },
  methods: {
    click(event) {
      if (!event._constructed) return
    },
    card() {
      this
        .$http.post('http://172.20.10.6:8000/api/task/complete', {
          id: this.user.id
        })
        .then(({
          data
        }) => {
          if (data.status === 200) {
            this.cardCount = data.data
          }
        })
      this.cardShow = true
    },
    close() {
      this.cardShow = false
    },
    changePosition(pos) {
      if (this.lastPos === null) {
        this.local.step += 0
      } else {
        this.local.step += this.getDistance(this.lastPos.lng, this.lastPos.lat, pos.lng, pos.lat) * 5 / 2
        this.lastPos = pos
      }
    }
  },
  created() {
    this
      .$http.post('http://172.20.10.6:8000/api/task', {
        id: loadFromLocal('user', 'data').id
      })
      .then(({
        data
      }) => {
        if (data.status === 200) {
          this.localTap = data.data
        }
      })
  },
  getDistance(lat1, lon1, lat2, lon2) {
    function rad(d) {
      return d * Math.PI / 180.0
    }
    let radLat1 = rad(lat1)
    let radLat2 = rad(lat2)
    let a = radLat1 - radLat2
    let b = rad(lon1) - rad(lon2)
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378137
    s = Math.round(s * 10000) / 10000
    return s
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/css/mixin.scss';
$Black:#D3DCE6;
$LBlack:#E5E9F2;
$EBlack:#EFF2F7;
$LSilver:#99A9BF;
.home {
  #cc {
    width: 500px;
    height: 100px;
  }
  display: flex;
  flex-direction: column;
  .header {
    flex: 1;
    margin-top: 2em;
    & > div {
      display: inline-block;
      vertical-align: top;
      width: 30%;
      background: $LBlack;
      color: $LSilver;
      font-size: 2em;
      line-height: 1.5em;
      padding: 1em 0;
      overflow: hidden;
    }
    .window1 {
      background: $Black;
    }
    .window3 {
      background: $EBlack;
    }
  }
  .graph {
    flex: 2;
    display: flex;
    position: absolute;
    top: 14em;
    width: 100%;
    bottom: 0;
    justify-content: center;
    align-items: center;
    .graph-circle {
      position: relative;
      top: -2em;
      transform: scale(1.8);
    }
    .task {
      position: absolute;
      bottom: 15%;
      font-size: 1em;
    }
  }
  .card {
    @include fade();
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1;
    backdrop-filter: blur(10px);
    .logo-wrapper {
      width: 70%;
      .words {
        font-size: 1.5em;
        color: #fff;
        font-weight: 700;
      }
      img {
        width: 100%;
      }
      p,
      i {
        color: #eee;
      }
      i {
        margin: 1em 1em 1em 0;
        font-size: 1.5em;
      }
    }
  }
}
</style>
