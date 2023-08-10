<template>
  <div class="globalMain globalImg">
    <div class="content">
      <div class="content-top">
        <div style="grid-area: in0">
          <div class="globalBtn">
            <a href="/" class="logo">logo</a>
            <div class="btn-bottom">
              <a href="/" class="btn-home"><div class="btn-home" style="border-right: 2px solid #ececec"><img :src="home" alt="" width="24px" height="20px"></div></a>
              <div class="btn-search">
                <div class="round"></div>
                <div class="round"></div>
                <div class="round"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="onlyBoxShadowBefore"></div>
        <div class="onlyBoxShadow"></div>
        <div class="top-list" style="grid-area: in1">
          <div class="imgSpace clickEnlarge" v-for="(item,index) in topList" :key="index">
            <a :href="'/#/details/'+item.Name.replace(/\s+/g, '')+'?gameId='+item.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="item.iconUrl" alt=""></a>
          </div>
        </div>
      </div>
      <div class="homeAd" style="margin: 20px auto 0;position: relative;z-index: 2;"></div>
      <div class="cardLayout" v-for="(item,index) in structureList" :key="index" :style="index == structureList.length -1 ? {marginBottom: '25px'} : null">
        <div class="card" v-if="index == 0">
          <div class="big-img">
            <div class="bright clickEnlarge"><a :href="'/#/details/'+index1[0].Name.replace(/\s+/g, '')+'?gameId='+index1[0].gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="index1[0] && index1[0].iconUrl" alt=""></a></div>
          </div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,9)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'bright' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,9)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'trembling' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="index == 0">
          <div class="ads_area" style="width: 100%;height: 100%;overflow: hidden"></div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,6)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'leftTop' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,6)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'rightTop trembling' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="index == 0">
          <div class="ads_area" style="width: 100%;height: 100%;overflow: hidden"></div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,6)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'leftBottom' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,9)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'bright' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="index == 0">
          <div class="ads_area" style="width: 100%;height: 100%;overflow: hidden"></div>
        </div>
        <div class="card" v-if="index == structureList.length -1">
          <div class="three_game_area">
            <div class="three_game_area_header">Idle Games</div>
            <div class="three_game_area_line"></div>
            <div class="three_game_area_context">
              <div v-for="(bottomItem,bottomIndex) in bottomList" :key="bottomIndex">
                <div class="three_game_area_context_detail">
                  <a :href="'/#/details/'+bottomItem.Name.replace(/\s+/g, '')+'?gameId='+bottomItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')" style="display: flex" class="clickEnlarge">
                    <div><img v-lazy="bottomItem.iconUrl" alt=""></div>
                    <div class="context_title">
                      <div>
                        <div>{{bottomItem.Name}}</div>
                        <div>{{bottomItem.desc}}</div>
                      </div>
                      <div>
                        <div class="playtext"> Play </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,6)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'leftTop' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="item.length >= 1">
          <div class="nine_grid_area">
            <div class="grid-box">
              <div v-for="(partItem,partIndex) in item.splice(0,6)" :key="partIndex" class="clickEnlarge" :class="partIndex == 0 ? 'rightBottom' : null"><a :href="'/#/details/'+partItem.Name.replace(/\s+/g, '')+'?gameId='+partItem.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')"><img v-lazy="partItem.iconUrl" alt=""></a></div>
            </div>
          </div>
        </div>
        <div class="card" v-if="index == structureList.length -1">
          <div class="contentText">
            <div class="onlyBoxShadow"></div>
            <div class="textStyle">
              <div class="markdown">
                <h1>ABOUT XXXXX.VIP</h1>
                <h2>Oline Games on XXXXX.VIP - Fun Time With Friends</h2>
                <p>
                  Hi! Welcome to XXXXX.com!
                  <br><br>
                  You can enjoy the best free online games which are playable on mobile, tablets and PC every day.
                  <br><br>
                  Our editors choose the most addicing games developed by our partners, such as car games, 3d games, cartoon
                  games, skill games, arcade game, sport games, racing games and many other kinds of fashion games often.
                  You can play all our games on your mobile phone, tablet, pad without download or installation, just visit
                  XXXXX.com in your browser such as safari, chrome, firefox, etc, and then enjoy playing the games.
                  <br><br>
                  So, what are you waiting for? If you feel happy when playing our games, remember to bookmark XXXXX.com and
                  share it to your friends. Have fun!
                </p>
              </div>
            </div>
            <div class="onlyBoxShadowDown"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="footStyle">
        <div class="foot-tab">
          <a @click="privacyClick">Privacy</a>
          <a @click="contactClick">Contact us</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getJson, shuffle } from '@/utils/utils'
import home from '@/assets/home.png'
export default {
  name: 'HomeView',
  components: {

  },
  data() {
    return {
      home,
      topList: [], // 头部数据
      bottomList: [], // 底部数据
      structureList: [], // 布局列表
      index1: [],
    }
  },
  mounted() {
    this.getTopList()
    this.splitJson()
  },
  methods: {
    // 获取头部数据
    getTopList() {
      let arr = shuffle(getJson().splice(0,20))
      this.topList = arr.splice(0,10)
      this.bottomList = arr.splice(0,3)
      console.log(this.bottomList);
    },
    // 拆分全部数据
    splitJson() {
      let arr = getJson()
      this.index1 = arr.splice(0,1)
      let num = Math.ceil(arr.length / 57)
      for (let i = 1; i <= num; i++) {
        this.structureList[i -1] = arr.splice(0,57)
      }
      console.log(this.structureList);
    },
    privacyClick() {
      let { channel } = this.$route.query
      let pathInfo = this.$router.resolve({
        path: '/privacy',
        query: {
          channel
        }
      })
      window.open(pathInfo.href, '_blank')
    },
    contactClick() {
      let { channel } = this.$route.query
      let pathInfo = this.$router.resolve({
        path: '/contactUs',
        query: {
          channel
        }
      })
      window.open(pathInfo.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
a{
  text-decoration: none;
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
@media screen and (min-width: 879px){
  .content-top {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100%;
    --gridTemplateColumns: 8;
    grid-template-areas: "in0 in1 in1 in1 in1 in1 in1 in1";
    grid-template-rows: repeat(1, 110px);
    --cellSpacing: 16px;
    grid-gap: var(--cellSpacing);
    grid-template-columns: repeat(var(--gridTemplateColumns), 85px);
    .top-list {
      margin-left: -15px;
    }
  }
  .cardLayout {
    grid-auto-rows: 85px!important;
    grid-template-columns: repeat(8, 85px)!important;
  }
  .three_game_area_line {
    position: relative;
    top: 0!important;
    width: 348px!important;
  }
  .three_game_area_context {
    top: 16px!important;
    height: 368px!important;
  }
  .three_game_area_context_detail{
    padding-top: 15px!important;
  }
  .three_game_area_context_detail .context_title {
    margin-left: 20px;
  }
  .three_game_area_context>div:first-child .context_title:after, .three_game_area_context>div:nth-child(2) .context_title:after {
    display: block;
    position: absolute;
    top: 81px!important;
    border-radius: 1px;
    width: 246px!important;
    height: 2px;
    background: #e3e3e5;
    content: "";
  }
}
@media screen and (min-width: 325px) and (max-width: 878px){
  .content-top {
    display: grid;
    justify-content: center;
    align-items: center;
    --gridTemplateColumns: 4;
    grid-template-areas: "in0 in1 in1 in1";
    grid-template-rows: repeat(1, 110px);
    --cellSpacing: 16px;
    grid-gap: var(--cellSpacing);
    grid-template-columns: repeat(var(--gridTemplateColumns), 73px);
  }
  .cardLayout {
    grid-auto-rows: 73px!important;
    grid-template-columns: repeat(4, 73px)!important;
  }
  .three_game_area_context>div:first-child .context_title:after, .three_game_area_context>div:nth-child(2) .context_title:after {
    display: block;
    position: absolute;
    top: 100px;
    border-radius: 1px;
    width: 246px;
    height: 2px;
    background: #e3e3e5;
    content: "";
  }
}
@media screen and (min-width: 329px) and (max-width: 374px){
  .three_game_area_context>div:first-child .context_title:after, .three_game_area_context>div:nth-child(2) .context_title:after {
    display: block;
    position: absolute;
    top: 81px;
    border-radius: 1px;
    width: 210px;
    height: 2px;
    background: #e3e3e5;
    content: "";
  }
}
@media screen and (min-width: 329px) and (max-width: 374px){
  .three_game_area_line {
    position: relative;
    top: -10px!important;
  }
}
@media screen and (max-width: 328px){
  .three_game_area_context {
    left: 8px;
    top: 3px;
    height: 400px!important;
    transform: scaleX(.95) scaleY(.9);
  }
  .three_game_area_context>div:first-child {
    top: 0;
  }
  .three_game_area_line {
    position: relative;
    top: 10px!important;
  }
  .three_game_area_context_detail {
    position: relative;
    left: -16px;
  }
}
@media screen and (min-width: 375px) {
  .three_game_area_line {
    position: relative;
    top: -10px;
  }
  .three_game_area_context {
    top: -6px;
  }
  .three_game_area_context>div:first-child {
    top: 0!important;
  }
  .three_game_area_context>div:first-child .context_title:after, .three_game_area_context>div:nth-child(2) .context_title:after {
    display: block;
    position: absolute;
    top: 81px;
    border-radius: 1px;
    width: 210px;
    height: 2px;
    background: #e3e3e5;
    content: "";
  }
}
@media screen and (min-width: 104px) and (max-width: 324px){
  .content-top {
    display: grid;
    justify-content: center;
    align-items: center;
    --gridTemplateColumns: 4;
    grid-template-areas: "in0 in1 in1 in1";
    grid-template-rows: repeat(1, 110px);
    --cellSpacing: 16px;
    grid-gap: var(--cellSpacing);
    grid-template-columns: repeat(var(--gridTemplateColumns), 66px);
  }
  .cardLayout {
    grid-auto-rows: 66px!important;
    grid-template-columns: repeat(4, 66px)!important;
  }
}
@keyframes bright {
  0% {
    transform: translateX(-180%) skewX(45deg)
  }

  to {
    transform: translateX(420%) skewX(45deg)
  }
}

@-webkit-keyframes bright {
  0% {
    transform: translateX(-180%) skewX(45deg)
  }

  to {
    transform: translateX(420%) skewX(45deg)
  }
}
.globalMain {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  .content {
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 125px);
    .content-top{
      position: relative;
      .globalBtn {
        overflow: hidden;
        border-radius: 15px;
        width: 80px;
        height: 80px;
        background-color: #fff;
        box-shadow: 0 12px 10px 0 rgb(0 0 0/16%);
        transition: top .5s;
        .logo{
          display: flex;
          justify-content: center;
          padding: 13px 8px 0 6px;
          height: 41%;
        }
        .btn-bottom{
          display: flex;
          border-top: 2px solid #ececec;
          height: 44%;
          .btn-home{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 94%;
          }
          .btn-search{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 91%;
            .round{
              margin: 2px 2px 0 0;
              border-radius: 50%;
              width: 5px;
              height: 5px;
              background-color: #388ef5;
            }
          }
        }
      }
      .onlyBoxShadowBefore, .onlyBoxShadow{
        position: absolute;
        top: 0;
        z-index: 2;
        width: 15px;
        height: 110px;
        background: linear-gradient(270deg, hsla(0, 0%, 100%, 0) 0, #fff);
      }
      .onlyBoxShadowBefore{
        left: 85px;
      }
      .onlyBoxShadow{
        right: 0;
        background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, #fff);
      }
      .top-list {
        display: flex;
        overflow-x: scroll;
        margin-top: 10px;
        width: inherit;
        height: 100px;
        .imgSpace{
          margin: 5px 5px 0;
          a{
            display: inline-block;
            width: 80px;
            height: 80px;
            border-radius: 15px;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 8px 10px 0px;
            img{
              width: 100%;
              height: 100%;
              border-radius: 15px;
            }
          }
        }
      }
      .top-list::-webkit-scrollbar{
        display: none;
      }
    }
    .cardLayout {
      display: grid;
      height: 100%;
      grid-auto-rows: 85px;
      grid-gap: 16px;
      grid-template-columns: repeat(8, 85px);
      margin-top: 15px;
      .card {
        position: relative;
        z-index: 2;
        border-radius: 15px;
        height: 100%;
        box-shadow: 0 3px 18px 0 rgb(0 0 0/16%);
        grid-row: span 4;
        grid-column: span 4;
        .big-img {
          width: 100%;
          height: 340px;
          img{
            width: 100%;
            border-radius: 15px;
          }
        }
        .nine_grid_area{
          --nine-grid-area-padding: 16px;
          --nine-grid-template-columns: repeat(3, calc(33.33% - 10.6656px));
          --nine-grid-template-rows: repeat(3, calc(33.33% - 10.6656px));
          --nine-grid-gap: 16px;
          box-sizing: border-box;
          padding: var(--nine-grid-area-padding);
          width: 100%;
          height: 100%;
          .grid-box{
            display: grid;
            width: 100%;
            height: 100%;
            grid-template-columns: var(--nine-grid-template-columns);
            grid-template-rows: var(--nine-grid-template-rows);
            grid-gap: var(--nine-grid-gap) var(--nine-grid-gap);
            img{
              width: 100%;
              height: 100%;
              border-radius: 15px;
            }
            .leftTop{
              grid-column-start: 1;
              grid-column-end: 3;
              grid-row-start: 1;
              grid-row-end: 3;
            }
            .rightTop{
              grid-column-start: 2;
              grid-column-end: 4;
              grid-row-start: 1;
              grid-row-end: 3;
            }
            .leftBottom{
              grid-column-start: 1;
              grid-column-end: 3;
              grid-row-start: 2;
              grid-row-end: 4;
            }
            .rightBottom{
              grid-column-start: 2;
              grid-column-end: 4;
              grid-row-start: 2;
              grid-row-end: 4;
            }
          }
          .grid-box>div{
            position: relative;
          }
        }
        .bright, .bright:after {
          z-index: 1;
          width: 100%;
          height: 100%;
        }
        .bright {
          overflow: hidden;
        }
        .bright:after {
          position: absolute;
          top: 0;
          background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, .5) 25%, #fff 50%, hsla(0, 0%, 100%, .5) 75%, hsla(0, 0%, 100%, 0));
          content: "";
          -webkit-animation: bright 5.5s infinite;
          animation: bright 5.5s infinite;
        }
        @keyframes trembling{
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
        .trembling{
          animation: trembling 4s linear infinite backwards;
          -webkit-animation: trembling 4s linear infinite backwards;
        }
        .three_game_area{
          display: flex;
          overflow: hidden;
          position: relative;
          flex-direction: column;
          border-radius: 12px;
          width: 100%;
          height: 100%;
          -webkit-tap-highlight-color: transparent;
          .three_game_area_header {
            overflow: hidden;
            padding-left: 16px;
            width: 90%;
            height: 72px;
            line-height: 60px;
            text-overflow: ellipsis;
            font-family: Helvetica;
            font-size: 25px;
            color: #000;
            white-space: nowrap;
            font-weight: 700;
          }
          .three_game_area_line {
            margin-left: 16px;
            border-radius: 1px;
            width: 292px;
            height: 2px;
            background: #e3e3e5;
          }
          .three_game_area_context {
            overflow: hidden;
            position: relative;
            height: 268px;
            cursor: pointer;
          }
          .three_game_area_context>div {
            display: flex;
            //position: absolute;
            left: 0;
            transition: left .5s;
            .three_game_area_context_detail:last-child {
              padding-right: 40px !important;
            }
            .three_game_area_context_detail {
              display: flex;
              padding-right: 10px;
              padding-top: 5px;
              height: 33%;
              overflow: hidden;
            }
            .three_game_area_context_detail>a>div:first-child {
              margin-left: 16px;
              width: 83px;
              height: 83px;
            }
            .three_game_area_context_detail>a>div:first-child>img {
              border-radius: 15px;
              width: 78px;
              height: 78px;
            }
            .three_game_area_context_detail .context_title {
              display: flex;
              flex: 1;
              height: 83px;
              position: relative;
            }
            .three_game_area_context_detail .context_title>div:first-child {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding-left: 7px;
              width: 140px;
            }
            .three_game_area_context_detail .context_title>div:first-child>div:first-child {
              overflow: hidden;
              width: 217px;
              height: 20px;
              text-overflow: ellipsis;
              font-family: Helvetica;
              font-weight: 700;
              font-size: 17px;
              color: #000;
              white-space: nowrap;
            }
            .three_game_area_context_detail .context_title>div:first-child>div:last-child {
              overflow: hidden;
              margin-top: 5px;
              width: 100%;
              height: 20px;
              text-overflow: ellipsis;
              font-family: Helvetica;
              font-weight: 400;
              font-size: 15px;
              color: #747474;
              white-space: nowrap;
            }
            .three_game_area_context_detail .context_title>:last-child {
              display: flex;
              justify-content: center;
              align-items: center;
              flex: 1;
              margin-top: 27px;
            }
            .three_game_area_context_detail .context_title>div:last-child>div.playtext {
              border-radius: 26px;
              width: 60px;
              height: 21px;
              background: #e3e3e5;
              line-height: 21px;
              text-align: center;
              font-family: Helvetica;
              font-weight: 700;
              font-size: 15px;
              color: #378ef5;
            }
          }
        }
        .contentText {
          --content-text-color-title: rgb(55, 142, 245);
          --content-text-color-secondary: #747474;
          --content-text-color: rgb(128, 144, 170);
          --content-text-color-link: rgb(55, 142, 245);
          position: relative;
          height: 100%;
          overflow: hidden;
          border-radius: 15px;
          .onlyBoxShadow{
            position: absolute;
            left: 0;
            top: -1px;
            z-index: 1;
            border-radius: 15px;
            width: 95%;
            height: 29px;
            background: linear-gradient( rgba(255, 255, 255) 0, rgba(255, 255, 255, 0) 100% );
          }
          .textStyle {
            overflow-y: auto;
            position: relative;
            padding: 0 10px;
            height: inherit;
            .markdown {
              word-break: break-word;
              font-weight: bolder;
              font-family: Helvetica;
              h1 {
                font-size: 27px;
                border-bottom: 1px solid #e3e3e5;
                color: var(--content-text-color-title);
                margin-top: 20px;
                margin-bottom: 14px;
              }
              h2 {
                color: var(--content-text-color-secondary);
                margin-bottom: 14px;
              }
              p {
                color: var(--content-text-color);
                margin-bottom: 20px;
              }
            }
          }
          .onlyBoxShadowDown {
            position: absolute;
            left: 0;
            bottom: -1px;
            border-radius: 15px;
            width: 95%;
            height: 29px;
            background: linear-gradient( rgba(255, 255, 255, 0) 0, rgb(255, 255, 255) 100% );
          }
          .textStyle::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          .textStyle::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #bfbfbf;
          }
          .textStyle::-webkit-scrollbar-track {
            border-radius: 2px;
            background: #fff;
          }
        }
      }
    }
  }
  .foot{
    width: 100%;
    font-size: 18px;
    .footStyle {
      padding-top: 70px;
      --foot-box-shadow: 0 15px 64px 16px rgba(0, 0, 0, .15);
      position: relative;
      margin-top: 22px;
      padding-bottom: 80px;
      width: 100%;
      box-shadow: var(--foot-box-shadow);
      text-align: center;
      font-family: Helvetica;
      font-weight: 400;
      color: #747474 !important;
      flex-flow: row nowrap;
      a{
        cursor: pointer;
      }
      a:not(:last-child) {
        margin-right: 1rem;
      }
    }
    .footStyle::before {
      position: absolute;
      top: 23px;
      left: 50%;
      transform: translateX(-50%);
      //background-image: url();
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      height: 32px;
      width: 160px;
      display: block;
      content: "";
    }
  }
}
.globalMain:after {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  content: "";
}
</style>
