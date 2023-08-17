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
                <a :href="'/#/details/'+item.Name.replace(/\s+/g, '')+'?gameId='+item.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')" v-for="(item,index) in recentGameList" :key="index" @click="iconClick(item)" v-show="item.gameId != gameInfo.gameId">
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
      <div class="app-module" v-if="iframeType">
        <div class="app-iframe">
          <div class="sc-1nfyi8d-1 kExbnh">
            <div class="iframe-box">
              <iframe id="gameIframe" :src="gameInfo.Url ? gameInfo.Url : null" width="100%" height="100%"></iframe>
            </div>
            <div class="app-promote">

            </div>
          </div>
        </div>
        <el-button class="iframe-back" id="iframe-back" :style="mobileNavDrag" @touchmove.native.prevent="backToucheMove" @touchend.native.prevent="backToucheEnd"><img :src="backType ? leftBack : rightBack" alt=""></el-button>
        <div class="unfoldContent" id="unfoldContent" style="bottom: calc(-550px); max-height: 470px;">
          <div class="gameMenu" style="width: 100vw;">
            <div>
              <div class="headBtns">
                <div class="btns">
                  <div class="home enlarge"><a href="/"></a></div>
                  <div class="refresh enlarge" @click="refreshClick"></div>
                  <div class="smallScreen enlarge" style="display: flex;" @click="smallScreenClick" v-if="fullscreenType"></div>
                  <div class="fullscreen enlarge" style="display: flex;" @click="fullscreenClick" v-else></div>
                  <div class="copy enlarge" @click="copyClick"></div>
                </div>
                <div class="btns">
                  <div class="close enlarge" @click="closeClick"></div>
                </div>
              </div>
              <div class="games">
                <div class="navigationStyle">
                  <div class="onlyBoxShadowBefore"></div>
                  <div class="onlyBoxShadow"></div>
                  <div class="gameShow">
                    <a :href="'/#/details/'+item.Name.replace(/\s+/g, '')+'?gameId='+item.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')" v-for="(item,index) in recommendGameList" :key="index" @click="iconClick(item)">
                      <div class="imgSpace clickEnlarge" style="position: relative;">
                        <div>
                          <img v-lazy="item.iconUrl" alt="">
                          <div class="historyIcon" v-show="index == 0 || index == 1 || index == 2">
                            <img :src="history" alt="" width="30px" height="30px">
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="endBtns">
                <div class="bubbleDiv like enlarge" @click="bubbleClick">
                  <div class="bubbleText">10k+</div>
                  <img :src="blueLike" alt="" :class="bubbleType ? 'bubbleUp' : 'bubble'">
                  <img :src="blueLike" alt="" :class="bubbleType ? 'bubbleUp2' : 'bubble'">
                  <img :src="blueLike" alt="" :class="bubbleType ? 'bubbleUp3' : 'bubble'">
                  <img :src="blueLike" alt="" :class="bubbleType ? 'bubbleUp4' : 'bubble'">
                  <img :src="blueLike" alt="" :class="bubbleType ? 'bubbleUp5' : 'bubble'">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getJson, shuffle, recentGame} from '@/utils/utils';
import Foot from "@/components/Foot.vue";
import history from '@/assets/history.png';
import goBack from '@/assets/goBack.png';
import rightBack from '@/assets/rightBack.png';
import leftBack from '@/assets/leftBack.png';
import blueLike from '@/assets/blue-like.png';
export default {
  name: "Details",
  components: {
    Foot
  },
  data() {
    return {
      history,
      goBack,
      leftBack,
      rightBack,
      blueLike,
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
      mobileNavDrag: {
        '--mobileNavDragY': '24px',
        '--mobileNavDragX': `${window.innerWidth - 70}px`
      },
      mobileNavDragY: '24px',
      mobileNavDragX: `${window.innerWidth - 70}px`,
      clickOrTouchType: false,
      portraitOrLandscape: false,
      bubbleType: false,
      recommendGameList: [], // 推荐游戏
      fullscreenType: false, // 全屏状态
      backType: false, // 返回按钮展示
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


      let that = this
      let match = window.matchMedia("(orientation:portrait)");
      if (match.matches) {
        console.log('竖屏');
        that.portraitOrLandscape = true
        that.mobileNavDrag = {
          '--mobileNavDragY': '24px',
          '--mobileNavDragX': `${window.innerWidth - 70}px`,
          borderRadius: '25px 0 0 25px'
        }
        this.backType = false
        this.mobileNavDragY = '24px'
        this.mobileNavDragX = `${window.innerWidth - 70}px`
      }else {
        console.log('横屏');
        that.portraitOrLandscape = false
        that.mobileNavDrag = {
          '--mobileNavDragY': '24px',
          '--mobileNavDragX': `${window.innerWidth - 70 - 76}px`,
          borderRadius: '25px 0 0 25px'
        }
        this.backType = false
        this.mobileNavDragY = '24px'
        this.mobileNavDragX = `${window.innerWidth - 70 - 76}px`
      }
      match.addListener((mql) => {
        console.log(mql);
        if (match.matches) {
          console.log('竖屏');
          that.portraitOrLandscape = true
          that.mobileNavDrag = {
            '--mobileNavDragY': '24px',
            '--mobileNavDragX': `${window.innerWidth - 70}px`,
            borderRadius: '25px 0 0 25px'
          }
          this.backType = false
          this.mobileNavDragY = '24px'
          this.mobileNavDragX = `${window.innerWidth - 70}px`
        }else {
          console.log('横屏');
          that.portraitOrLandscape = false
          that.mobileNavDrag = {
            '--mobileNavDragY': '24px',
            '--mobileNavDragX': `${window.innerWidth - 70 - 76}px`,
            borderRadius: '25px 0 0 25px'
          }
          this.backType = false
          this.mobileNavDragY = '24px'
          this.mobileNavDragX = `${window.innerWidth - 70}px`
        }
      });
      
      
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
            document.getElementById('loadingcircleright') && (document.getElementById('loadingcircleright').style.borderColor = 'rgb(53, 139, 238)')
            this.loadingcircleleftTime = setInterval(()=>{
              this.loadingcircleleft++
              if (this.loadingcircleleft == 178) {
                clearInterval(this.loadingcircleleftTime)
                this.loadingcircleleft = 178

                this.headerLoading = false
                this.loadingcircleleft = 0
                this.loadingcircleright = 0
                this.loadingText = 0
                this.iframeType = true
              }
            },5)
          }
        },5)
        this.loadingTextTime = setInterval(()=>{
          this.loadingText++
          if (this.loadingText == 98) {
            this.loadingText = 98
            clearInterval(this.loadingTextTime)
          }
        },18)

        // // iframe加载进度
        // const iframe = this.$refs.Iframe;
        // // 兼容处理
        // iframe.onload = () => {
        //   this.headerLoading = false
        //   this.loadingcircleleft = 0
        //   this.loadingcircleright = 0
        //   this.loadingText = 0
        //   this.iframeType = true
        // };
      }
    },
    // 点击游侠icon
    iconClick(item) {
      recentGame(item)
      // 推荐游戏点击如果是最大化需要
      if (this.fullscreenType) {
        this.smallScreenClick()
      }
    },
    // 鼠标拖动返回按钮
    backToucheMove(e) {
      this.clickOrTouchType = true
      this.mobileNavDrag = {
        '--mobileNavDragY': `${e.targetTouches[0].clientY - 17 > 24 ? e.targetTouches[0].clientY - 17 > window.innerHeight - 45 ? window.innerHeight - 45 : e.targetTouches[0].clientY - 17 : 24}px`,
        '--mobileNavDragX': this.portraitOrLandscape ? `${e.targetTouches[0].clientX - 35}px` : `${e.targetTouches[0].clientX - 35 - 76}px`,
        opacity: 1,
        borderRadius: e.targetTouches[0].clientX - 35 > window.innerWidth / 2 ? '25px 0 0 25px' : '0 25px 25px 0'
      }
      this.backType = e.targetTouches[0].clientX - 35 > window.innerWidth / 2 ? false : true
      this.mobileNavDragY = `${e.targetTouches[0].clientY - 17 > 24 ? e.targetTouches[0].clientY - 17 > window.innerHeight - 45 ? window.innerHeight - 45 : e.targetTouches[0].clientY - 17 : 24}px`
      this.mobileNavDragX = this.portraitOrLandscape ? `${e.targetTouches[0].clientX - 35 > window.innerWidth / 2 ? window.innerWidth - 70 : 0}px` : `${e.targetTouches[0].clientX - 35 > window.innerWidth / 2 ? window.innerWidth - 70 - 76 : 0}px`
    },
    // 鼠标离开返回按钮
    backToucheEnd() {
      if (this.clickOrTouchType) {
        this.mobileNavDrag = {
          '--mobileNavDragY': this.mobileNavDragY,
          '--mobileNavDragX': this.mobileNavDragX,
          opacity: 0.6,
          borderRadius: this.mobileNavDragX == (this.portraitOrLandscape ? `${window.innerWidth - 70}px` :  `${window.innerWidth - 70 - 76}px`) ? '25px 0 0 25px' : '0 25px 25px 0'
        }
        this.clickOrTouchType = false
        this.backType = this.mobileNavDragX == (this.portraitOrLandscape ? `${window.innerWidth - 70}px` :  `${window.innerWidth - 70 - 76}px`) ? false : true
      } else {
        this.backClick()
      }
    },
    // 点击返回
    backClick() {
      this.clickOrTouchType = false
      document.getElementById('unfoldContent').style.bottom = '80px'
      this.mobileNavDrag = {
        '--mobileNavDragY': this.mobileNavDragY,
        '--mobileNavDragX': this.mobileNavDragX,
        transition: 'left 0.5s ease 0s',
        opacity: 1,
        borderRadius: this.mobileNavDragX == (this.portraitOrLandscape ? `${window.innerWidth - 70}px` :  `${window.innerWidth - 70 - 76}px`) ? '25px 0 0 25px' : '0 25px 25px 0',
        left: this.mobileNavDragX == `${window.innerWidth - 70}px` ? '70px' : '-70px'
      }
      this.backType = this.mobileNavDragX == (this.portraitOrLandscape ? `${window.innerWidth - 70}px` :  `${window.innerWidth - 70 - 76}px`) ? false : true
      // 推荐游戏
      let recommendGameList = []
      this.recentGameList.map((item)=>{
        recommendGameList.push(item)
      })
      recommendGameList = recommendGameList.splice(0,3)
      let arr = shuffle(getJson().splice(0,20))
      arr.splice(0,7).map((item)=> {
        recommendGameList.push(item)
      })
      this.recommendGameList = recommendGameList
    },
    // 点击刷新
    refreshClick() {
      setTimeout(()=>{
        console.log('数据更新了');
        document.getElementById('scrollbar').scrollTop = 0
        this.iframeType = false
        this.fullscreenType = false
        this.mobileNavDrag = {
          left: 0
        }
        this.getAllJson()
      },200)
    },
    // 点击放大
    fullscreenClick() {
      // 打开全屏
      const { documentElement } = document;
      if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      } else if (documentElement.webkitRequestFullScreen) {
        documentElement.webkitRequestFullScreen();
      }
      this.fullscreenType = true
    },
    // 点击缩小
    smallScreenClick() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      this.fullscreenType = false
    },
    // 点击copy
    copyClick() {
      let url = window.location.href;//拿到想要复制的值
      let copyInput = document.createElement('input');//创建input元素
      document.body.appendChild(copyInput);//向页面底部追加输入框
      copyInput.setAttribute('value', url);//添加属性，将url赋值给input元素的value属性
      copyInput.select();//选择input元素
      document.execCommand("Copy");//执行复制命令
      this.$message.success("链接已复制！");//弹出提示信息，不同组件可能存在写法不同
      //复制之后再删除元素，否则无法成功赋值
      copyInput.remove();//删除动态创建的节点
    },
    // 点击浮窗关闭
    closeClick() {
      setTimeout(()=>{
        document.getElementById('unfoldContent').style.bottom = 'calc(-550px)'
        this.mobileNavDrag = {
          '--mobileNavDragY': this.mobileNavDragY,
          '--mobileNavDragX': this.mobileNavDragX,
          transition: 'left 0.5s ease 0s',
          opacity: 1,
          left: 0
        }
      },200)
    },
    // 点击喜欢
    bubbleClick() {
      this.bubbleType = true
      setTimeout(()=>{
        this.bubbleType = false
      },1000)
    }
  },
  watch: {
    '$route'(val) {
      console.log(val,'数据更新了');
      document.getElementById('scrollbar').scrollTop = 0
      this.iframeType = false
      this.fullscreenType = false
      this.mobileNavDrag = {
        left: 0
      }
      this.getAllJson()
    }
  }
}
</script>

<style lang="less" scoped>
img[lazy="loading"] {
  width: 70%!important;
  height: 10px!important;
  position: absolute!important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none!important;
}
.gameShow::-webkit-scrollbar {
  display: none;
}
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

@keyframes enlarge {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(2);
  }
}
.enlarge:active{
  animation: enlarge 0.2s linear;
}

@keyframes bubbleUp {
  0% {
    transform: scale(1);
  }
  100% {
    transform: translate(10px, -80px) scale(2);
  }
}
@keyframes bubbleUp2 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: translate(-40px, -60px) scale(4);
  }
}
@keyframes bubbleUp3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: translate(10px, 30px) scale(2);
  }
}
@keyframes bubbleUp4 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: translate(-100px, 80px) scale(5);
  }
}
@keyframes bubbleUp5 {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1);
  }
  100% {
    transform: translate(-20px, -50px) scale(2);
  }
}
.bubbleUp{
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 10;
  animation: bubbleUp 1s linear;
}
.bubbleUp2{
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 10;
  animation: bubbleUp2 1s ease;
}
.bubbleUp3{
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 10;
  animation: bubbleUp3 1s ease-in-out;
}
.bubbleUp4{
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 10;
  animation: bubbleUp4 1s ease-out;
}
.bubbleUp5{
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 10;
  animation: bubbleUp5 1.5s linear;
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
  @supports (height:100dvh) {
    .app-module {
      --minHeight: 100dvh;
      --height: 100dvh;
    }
  }
  .app-module {
    position: absolute;
    left: 0;
    top: 0;
    height: var(--height,100%);
    width: var(--width,100%);
    --width: 100vw;
    min-height: var(--minHeight,100vh);
    z-index: 201;
    background-color: #127DAB;
    overflow: hidden;
    .app-iframe{
      display: flex;
      justify-content: center;
      margin: 0px auto;
      position: relative;
      z-index: 1;
      width: 100% !important;
      height: 100% !important;
      .kExbnh {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-grow: 0;
        width: 100%;
        height: 100%;
        background: var(--denim-blue);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 12px 0px;
        .iframe-box{
          width: 100%;
          height: 100%;
          padding: 0 2px 2px 0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          position: relative;
          #gameIframe{
            border: 1px solid #cccccc;
          }
        }
      }
    }
    .unfoldContent{
      position: fixed;
      z-index: 1001;
      width: 100vw;
      transition: bottom 1s ease;
      .gameMenu {
        overflow: hidden;
        margin: 0 auto;
        height: 100%;
      }
      .gameMenu>div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        box-sizing: border-box;
        margin: auto;
        padding: 10px 10px 0 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 320px;
        height: 100%;
        background: #ffffff;
        .headBtns, .endBtns {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          .btns {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .home {
              background-image: url('~@/assets/home.png');
              background-size: 25px 21px;
            }
            .refresh {
              background-image: url('~@/assets/refresh.png');
              background-size: 20px 20px;
            }
            .fullscreen {
              background-image: url('~@/assets/fullscreen.png');
              background-size: 20px 20px;
            }
            .smallScreen {
              background-image: url('~@/assets/smallscreen.png');
              background-size: 20px 20px;
            }
            .copy {
              background-image: url('~@/assets/copy.png');
              background-size: 20px 20px;
            }
            .close {
              background-image: url('~@/assets/close.png');
              background-size: 20px 20px;
            }
            .home,.refresh,.fullscreen,.smallScreen,.copy,.close{
              background-repeat: no-repeat;
              background-position: center;
              //background-size: contain;
              cursor: pointer;
            }
          }
          .btns>div{
            margin-right: 10px;
            --stretchBtnBoxShadow: 0 0 10px 0 rgb(0 0 0 / 16%);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            width: 40px;
            height: 40px;
            box-shadow: var(--stretchBtnBoxShadow);
            a{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
        .games {
          border-radius: 10px;
          width: 100%;
          height: 90px;
          box-shadow: rgb(0 0 0 / 16%) 0 0 10px 0;
          .navigationStyle {
            display: flex;
            overflow: hidden;
            position: relative;
            justify-content: center;
            align-items: center;
            padding: 0 1px;
            width: 100%;
            height: 100%;
            .onlyBoxShadowBefore {
              position: absolute;
              left: -1px;
              top: 0;
              z-index: 2;
              border-radius: 10px;
              width: 15px;
              height: 100%;
              background: linear-gradient(to left, rgba(255, 255, 255, 0) 0, rgb(255, 255, 255) 100%);
            }
            .onlyBoxShadow {
              position: absolute;
              right: -2px;
              top: 0;
              z-index: 2;
              border-radius: 10px;
              width: 15px;
              height: 100%;
              background: linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgb(255, 255, 255) 100%);
            }
            .gameShow {
              display: flex;
              overflow-x: scroll;
              align-items: center;
              width: inherit;
              height: 90px;
              .imgSpace {
                margin: 5px;
                width: 60px;
                height: 60px;
                display: block;
                img{
                  width: 100%;
                  height: 100%;
                  border-radius: 5px;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 9px 5px 0px;
                }
                .historyIcon {
                  position: absolute;
                  right: -6px;
                  top: -2px;
                  img{
                    width: 30px;
                    height: 30px;
                    border-radius: 0;
                    box-shadow: none;
                  }
                }
              }
            }
          }
        }
        .endBtns>div {
          --stretchBtnBoxShadow: 0 0 10px 0 rgb(0 0 0 / 16%);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          box-shadow: var(--stretchBtnBoxShadow);
        }
        .endBtns>div:last-child {
          margin-right: 0;
        }
        .bubbleDiv {
          position: relative;
          background-image: url('~@/assets/blue-like.png');
          background-position: 10px 5px;
          background-size: 18px 18px;
          background-repeat: no-repeat;
          cursor: pointer;
          .bubbleText {
            position: absolute;
            top: 22px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            font-size: 12px;
            color: #378ef5;
          }
          .bubble {
            position: absolute;
            z-index: -1;
          }
        }
      }
    }
  }
  @media screen and (orientation: portrait){
    .app-iframe {
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      position: relative;
    }
    .iframe-back{
      z-index: 1;
      position: fixed;
      top: 0;
      overflow: hidden;
      width: 70px;
      height: 45px;
      text-align: center;
      transform: translate(var(--mobileNavDragX,24px),var(--mobileNavDragY,24px));
      border: none;
      background: #FFFFFF;
      opacity: 0.6;
      padding: 0;
      left: 0;
      box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
      display: flex;
      justify-content: center;
      border-radius: 25px 0 0 25px;
      align-items: center;
      img{
        width: 50px;
        height: 40px;
      }
    }
    .app-promote {
      height: 76px;
      overflow: hidden;
      background-color: #127DAB;
      padding: 10px 0;
      flex-grow: 0;
      flex-shrink: 0;
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      position: relative;
      z-index: 3;
      box-sizing: border-box;
    }
  }
  @media screen and (orientation: landscape){
    .app-module{
      display: flex!important;
      flex-direction: row-reverse;
    }
    .kExbnh {
      flex-direction: row-reverse!important;
    }
    .app-iframe {
      width: 100%;
      height: 100%!important;
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      position: relative;
    }
    .iframe-back{
      z-index: 1;
      text-align: center;
      position: fixed;
      top: 0;
      left: 76px;
      overflow: hidden;
      width: 70px;
      height: 45px;
      transform: translate(var(--mobileNavDragX,24px),var(--mobileNavDragY,24px));
      border: none;
      opacity: 0.6;
      background: #FFFFFF;
      box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
      display: flex;
      justify-content: center;
      border-radius: 25px 0 0 25px;
      align-items: center;
      img{
        width: 50px;
        height: 40px;
      }
    }
    .app-promote {
      height: 100%;
      width: 76px;
      overflow: hidden;
      background-color: #127DAB;
      flex-grow: 0;
      flex-shrink: 0;
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      position: relative;
      z-index: 3;
      box-sizing: border-box;
    }
  }
}
</style>