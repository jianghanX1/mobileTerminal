<template>
  <div class="details">
    <div class="stageCtx" style="position:fixed;z-index:0;">
      <div class="stageCtxLayout loadingLayout" style="margin-bottom:80px;">
        <div class="verticalStage">
          <div id="scrollbar" class="scrollbar" style="height:calc(100vh - 80px);overflow:hidden;overflow-y:auto;">
            <div class="firstPageHeader">
              <div :style="{background: `url(${gameInfo.iconUrl}) no-repeat center/ cover`}"></div>
              <div>
                <div :style="{background: `url(${gameInfo.iconUrl}) no-repeat center/ contain`}" :class="headerLoading ? 'icon1' : 'icon'">
                  <div v-if="headerLoading" class="loadingcircleleft" :style="{transform: `rotate(${loadingcircleleft}deg)`}"></div>
                  <div v-if="headerLoading" id="loadingcircleright" class="loadingcircleright" :style="{transform: `rotate(${loadingcircleright}deg)`}"></div>
                </div>
                <div class="content">
                  <h1>{{gameInfo.Name}}</h1>
                  <div class="rate">
                    <div>
                      <el-rate
                          v-model="gameScore"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                      </el-rate>
                    </div>
                    <div>
                      <div class="count">
                        {{ likeScore }}k+
                      </div>
                    </div>
                  </div>
                  <div class="tag">
                    <div>
                      <span v-for="(item,index) in gameInfo.Type && gameInfo.Type.split(',')" :key="index">{{item}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="other">
                <div class="desc">
                  <span>{{gameInfo.desc}}</span>
                </div>
                <div v-if="headerLoading" class="text">
                  <div class="loaders ball-pulse" style="transform:scale(1);">
                    <div style="background-color:rgb(255,255,255);"></div>
                    <div style="background-color:rgb(255,255,255);"></div>
                    <div style="background-color:rgb(255,255,255);"></div>
                  </div>
                  <div class="loadingText"><div class="loadingTextCss">{{loadingText}}%</div></div>
                </div>
                <div v-else class="clickEnlarge trembling play" @click="playClick">
                  Play now
                </div>
              </div>
            </div>
            <div class="adDisplay" style="margin:10px auto;padding:10px 0;border-radius:10px;width:calc(100% - 20px);">
              <span class="advertisement-text">Advertisement</span>
              <div class="adv"></div>
            </div>
            <div class="crossPromotion">
              <h2>People Also Play</h2>
              <div></div>
              <div class="crossPromotionList">
                <a :href="'/#/details/'+item.Name.replace(/\s+/g, '')+'?gameId='+item.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')" v-for="(item,index) in peopleAlsoPlay" :key="index" @click="iconClick(item)">
                  <img v-lazy="item.iconUrl" alt="" class="clickEnlarge">
                </a>
              </div>
            </div>
            <div class="crossPromotion">
              <h2>Recently Played</h2>
              <div></div>
              <div class="crossPromotionList">
                <a :href="'/#/details/'+item.Name.replace(/\s+/g, '')+'?gameId='+item.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')" v-for="(item,index) in recentGameList" :key="index" @click="iconClick(item)">
                  <img v-lazy="item.iconUrl" alt="" class="clickEnlarge">
                  <div class="historyIcon">
                    <img :src="history" alt="">
                  </div>
                </a>
              </div>
            </div>
            <div class="titleContent">
              <h2>How To Play {{ gameInfo.Name }}</h2>
              <div></div>
              <div>
                <br>
                {{gameInfo.desc}}
              </div>
            </div>
            <Foot></Foot>
          </div>
        </div>
      </div>
      <div class="iframeBox" v-show="iframeType">
        <iframe :src="gameInfo.Url ? gameInfo.Url : null" width="100%" height="100%" id="iframe" ref="Iframe"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import {getJson, shuffle, recentGame} from '@/utils/utils'
import Foot from "@/components/Foot.vue";
import history from '@/assets/history.png'
export default {
  name: "Details",
  components: {
    Foot
  },
  data() {
    return {
      history,
      gameInfo: {}, // 游戏详情
      gameScore: 0,
      likeScore: 2000,
      peopleAlsoPlay: [], // People Also Play
      recentGameList: [], // 常玩游戏
      headerLoading: false, // 头像loading
      loadingcircleleft: 0, // 头像加载条
      loadingcircleright: 0, // 头像加载条
      loadingText: 0, // loading值
      iframeType: false, // iframe状态
    }
  },
  mounted() {
    const { query, params } = this.$route
    const { gameId } = query || {}
    const { gameName } = params || {}
    this.getAllJson()
  },
  methods: {
    // 获取全部数据
    getAllJson() {
      const { query } = this.$route
      const { gameId, channel } = query || {}
      let jsonArr = getJson()
      let gameInfo = {}
      jsonArr && jsonArr.map((item)=>{
        if (item.gameId == gameId) {
          gameInfo = item
        }
      })
      // 渠道
      if (channel) {
        gameInfo.Urlpc = gameInfo.Urlpc + `?channel=` + channel + '-P'
      }
      this.gameInfo = gameInfo

      // 游戏评分
      let score = Math.random()*0.8 + 4.2
      this.gameScore = Number(score.toFixed(1))

      // 喜欢
      let likeScore = Math.random()*1900 + 100
      this.likeScore = likeScore.toFixed(1)
      
      // People Also Play
      let arr = shuffle(getJson().splice(0,20))
      this.peopleAlsoPlay = arr.splice(0,10)

      // 常玩游戏
      this.recentGameList = localStorage.getItem('recentGame') && JSON.parse(localStorage.getItem('recentGame'))
    },
    // 开始游戏
    playClick() {
      if (!this.headerLoading) {
        this.headerLoading = true
        this.loadingcirclerightTime = setInterval(()=>{
          this.loadingcircleright++
          if (this.loadingcircleright == 180) {
            clearInterval(this.loadingcirclerightTime)
            this.loadingcircleright = 0
            document.getElementById('loadingcircleright').style.borderColor = 'rgb(53, 139, 238)'
            this.loadingcircleleftTime = setInterval(()=>{
              this.loadingcircleleft++
              if (this.loadingcircleleft == 172) {
                clearInterval(this.loadingcircleleftTime)
                this.loadingcircleleft = 172
              }
            },20)
          }
        },20)
        this.loadingTextTime = setInterval(()=>{
          this.loadingText++
          if (this.loadingText == 98) {
            this.loadingText = 98
            clearInterval(this.loadingTextTime)
          }
        },72)

        // iframe加载进度
        const iframe = this.$refs.Iframe;
        // 兼容处理
        iframe.onload = () => {
          this.headerLoading = false
          this.loadingcircleleft = 0
          this.loadingcircleright = 0
          this.loadingText = 0
          this.iframeType = true
        };
      }
    },
    // 点击游侠icon
    iconClick(item) {
      recentGame(item)
    }
  },
  watch: {
    '$route'(val) {
      console.log(val,'数据更新了');
      document.getElementById('scrollbar').scrollTop = 0
      // document.documentElement.scrollTop = 0
      this.getAllJson()
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes trembling {
  26% {
    transform: rotate(0deg) scale(1);
    -webkit-transform: rotate(0deg) scale(1);
  }
  28% {
    transform: rotate(-2deg) scale(1.04);
    -webkit-transform: rotate(-2deg) scale(1.04);
  }
  32% {
    transform: rotate(1deg) scale(1.01);
    -webkit-transform: rotate(1deg) scale(1.01);
  }
  34% {
    transform: rotate(-2deg) scale(1.02);
    -webkit-transform: rotate(-2deg) scale(1.02);
  }
  36% {
    transform: rotate(3deg) scale(1);
    -webkit-transform: rotate(3deg) scale(1);
  }
  39% {
    transform: rotate(-1deg) scale(1);
    -webkit-transform: rotate(-1deg) scale(1);
  }
  44% {
    transform: rotate(0deg) scale(1);
    -webkit-transform: rotate(0deg) scale(1);
  }
}
.trembling {
  animation: trembling 3s linear infinite backwards;
  -webkit-animation: trembling 3s linear infinite backwards;
  -moz-animation: trembling 3s linear infinite backwards;
}
@keyframes clickEnlarge {
  0% {
    transform: scale(1);
    box-shadow: 0 3px 18px 0 rgb(0 0 0 / 16%);
  }
  100% {
    transform: scale(1.4);
    box-shadow: 0 3px 18px 0 rgb(0 0 0 / 16%);
  }
}
.clickEnlarge:active {
  -webkit-tap-highlight-color: transparent;
  animation: clickEnlarge 0.2s linear;
}
.details{
  max-width: 100vw;
  min-height: 98dvh;
  max-height: 100dvh;
  background: #fff;
  .loadingLayout {
    display: flex;
    position: fixed;
    right: calc(50vw - 378px);
    top: 0;
    bottom: 0;
    z-index: 201;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 756px;
    .verticalStage {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      background: #ffffff;
      .scrollbar::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }
      .scrollbar::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #bfbfbf;
      }
      .scrollbar::-webkit-scrollbar-track {
        border-radius: 2px;
        background: #fff;
      }
      .scrollbar{
        .firstPageHeader {
          overflow: hidden;
          position: relative;
          margin: 10px auto;
          border-radius: 10px;
          width: calc(100% - 20px);
          height: 232px;
          font-family: Helvetica;
          background: rgba(0, 0, 0, 0.2);
          .other {
            padding: 0 10px;
            .desc {
              box-sizing: border-box;
              max-height: 40px;
              min-height: 20px;
              background: rgba(0, 0, 0, .3);
              border-radius: 4px;
              font-size: 12px;
              font-family: Helvetica;
              color: #FFFFFF;
              line-height: 20px;
              text-align: left;
              padding: 0 10px;
              margin-bottom: 8px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .play {
              border-radius: 32px;
              width: 100%;
              height: 55px;
              line-height: 55px;
              background: #ff9901;
              box-shadow: 0 4px 0 #b15c00;
              text-align: center;
              font-weight: bold;
              font-size: 20px;
              color: #fff;
              -moz-box-shadow: 0 4px 0 #b15c00;
              -webkit-box-shadow: 0 4px 0 #b15c00;
            }
            .text {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 32px;
              width: 100%;
              height: 55px;
              line-height: 55px;
              background: #ff9901;
              box-shadow: 0 4px 0 #b15c00;
              text-align: center;
              font-weight: bold;
              font-size: 20px;
              color: #fff;
              -moz-box-shadow: 0 4px 0 #b15c00;
              -webkit-box-shadow: 0 4px 0 #b15c00;
              .loadingText {
                height: 23px;
                opacity: 0.8;
                line-height: 23px;
                text-align: left;
                font-weight: bold;
                font-size: 16px;
                color: #fff;
                .loadingTextCss {
                  text-align: center;
                  font-weight: bold;
                  color: rgb(255, 255, 255);
                  font-size: 24px;
                }
              }
              .loaders {
                display: flex;
                -webkit-box-sizing: content-box;
                box-sizing: content-box;
                font-size: 0;
                margin-right: 10px;
              }
              .ball-pulse>div {
                width: 15px;
                height: 15px;
                border-radius: 100%;
                margin: 2px;
              }
              @keyframes scale{
                0%, 80% {
                  -webkit-transform: scale(1);
                  transform: scale(1);
                  opacity: 1;
                }
                45% {
                  -webkit-transform: scale(.1);
                  transform: scale(.1);
                  opacity: .7;
                }
              }
              .ball-pulse>div:nth-child(1) {
                -webkit-animation: scale .75s -.24s infinite cubic-bezier(.2,.68,.18,1.08);
                animation: scale .75s -.24s infinite cubic-bezier(.2,.68,.18,1.08);
                display: inline-block;
              }
              .ball-pulse>div:nth-child(2) {
                -webkit-animation: scale .75s -.12s infinite cubic-bezier(.2,.68,.18,1.08);
                animation: scale .75s -.12s infinite cubic-bezier(.2,.68,.18,1.08);
                display: inline-block;
              }
              .ball-pulse>div:nth-child(3) {
                -webkit-animation: scale .75s 0s infinite cubic-bezier(.2,.68,.18,1.08);
                animation: scale .75s 0s infinite cubic-bezier(.2,.68,.18,1.08);
                display: inline-block;
              }
            }
          }
          .other>div {
            width: 100%;
          }
        }
        .firstPageHeader>div:nth-child(1) {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: -1;
          filter: blur(10px);
        }
        .firstPageHeader>div:nth-child(2) {
          display: flex;
          position: absolute;
          top: 0;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          width: 100%;
          height: 120px;
          .icon {
            box-sizing: border-box;
            overflow: hidden;
            margin: 10px;
            border: 5px solid #fff;
            border-radius: 100%;
            width: 64px;
            height: 64px;
          }
          .icon1 {
            overflow: hidden;
            position: relative;
            margin: 10px;
            border-radius: 100%;
            width: 64px;
            height: 64px;
            box-shadow: inset 0 0 0 5px rgb(53, 139, 238);
            .loadingcircleleft {
              border: 5px solid #fff;
              border-radius: 50%;
              clip: rect(0, 32px, 64px, 0);
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            .loadingcircleright {
              border: 5px solid #fff;
              border-radius: 50%;
              clip: rect(0, 64px, 64px, 32px);
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
            }
          }
          .content {
            display: flex;
            overflow: hidden;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            flex: 1;
            margin-right: 4px;
            height: 100%;
            h1 {
              box-sizing: border-box;
              margin-block-start: 0px;
              margin-block-end: 0px;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
              margin-top: 16px;
              padding: 0 4px;
              border-radius: 20px;
              width: 100%;
              line-height: 28px;
              max-height: 56px;
              text-align: left;
              font-weight: bold;
              font-size: 20px;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .rate {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              box-sizing: border-box;
              /deep/.el-rate__text{
                color: #ffffff!important;
                margin-left: 3px;
              }
              /deep/.el-rate__icon{
                font-size: 20px;
                margin-right: 0;
              }
              .count{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 10px;
                margin-top: 3px;
                font-size: 12px;
                color: #ffffff;
              }
              .count::before {
                position: absolute;
                left: -24px;
                top: -3px;
                content: "";
                width: 20px;
                height: 20px;
                background-image: url('~@/assets/like.png');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
              }
            }
            .rate>div {
              display: flex;
            }
            .rate>div:first-child {
              padding-left: 10px;
            }
            .rate>div:last-child {
              padding-right: 10px;
            }
            .tag {
              display: flex;
              flex-direction: row;
              span{
                font-size: 12px;
              }
              span:not(.title) {
                height: 19px;
                line-height: 19px;
                background: rgba(0, 0, 0, .3);
                display: inline-block;
                padding: 0 10px;
                color: #fff;
                border-radius: 4px;
                box-sizing: border-box;
                white-space: nowrap;
                margin: 2px;
                cursor: pointer;
              }
            }
            .tag>div {
              display: flex;
              flex: 1;
              overflow-x: scroll;
            }
            .tag>div::-webkit-scrollbar {
              display: none;
            }
          }
          .content>div {
            width: 100%;
          }
        }
        .firstPageHeader>div:nth-child(3) {
          box-sizing: border-box;
          display: flex;
          position: absolute;
          bottom: 0;
          flex-direction: column;
          align-items: center;
          border-radius: 10px;
          width: 100%;
          height: calc(100% - 120px);
        }
        .adDisplay {
          overflow: hidden;
          position: relative;
          .advertisement-text {
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translate(-50%,0);
            display: inline-block;
            font-size: 16px;
          }
        }
        .crossPromotion {
          box-sizing: border-box;
          height: 191px;
          width: calc(100% - 20px);
          margin: 10px auto;
          padding: 10px 20px 0 20px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 3px 18px 0 rgb(0 0 0 / 16%);
          display: flex;
          flex-direction: column;
          font-family: Helvetica;
          background: #ffffff;
          h2 {
            height: 30px;
            font-size: 18px;
            font-weight: bold;
            color: #000000;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-block-start: 0px;
            margin-block-end: 0px;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
          }
          .crossPromotionList{
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            padding: 10px 0;
            a {
              position: relative;
              margin: 2px;
              display: flex;
              width: calc((100% - 20px) / 5);
              height: 40%;
              justify-content: center;
              align-items: center;
              img {
                position: relative;
                width: 50px;
                height: 50px;
                border-radius: 10px;
                border: 1px solid rgb(0 0 0 / 16%);
              }
              .historyIcon {
                display: flex;
                position: absolute;
                right: -6px;
                top: -2px;
                width: 30px;
                height: 30px;
                img {
                  width: 30px;
                  height: 30px;
                  border: none;
                }
              }
            }
          }
        }
        .crossPromotion>div:nth-of-type(1) {
          margin-top: 10px;
          height: 1px;
          background: #e3e3e5;
        }
        .titleContent>div:nth-of-type(1) {
          margin-top: 10px;
          height: 1px;
          background: #e3e3e5;
        }
        .titleContent>div:nth-of-type(2) {
          font-size: 12px;
          white-space: pre-line;
          line-height: 18px;
          padding-bottom: 10px;
          margin-top: -7px;
          color: #000000;
        }
        .titleContent{
          box-sizing: border-box;
          min-height: 90px;
          width: calc(100% - 20px);
          margin: 10px auto;
          padding: 10px 20px 0 20px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 3px 18px 0 rgb(0 0 0 / 16%);
          display: flex;
          flex-direction: column;
          font-family: Helvetica;
          background: #ffffff;
          h2 {
            min-height: 19px;
            max-height: 39px;
            font-size: 18px;
            font-weight: bold;
            color: #000000;
            margin-block-start: 0px;
            margin-block-end: 0px;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
    }
    .verticalStage>div {
      margin: auto;
      min-width: 320px;
      max-width: 375px;
    }
  }
  .iframeBox{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 201;
    background: #ffffff;
  }
}
</style>