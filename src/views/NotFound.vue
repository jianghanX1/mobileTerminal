<template>
  <div>
    <div class="m-content">
      <div class="msg-404">
        <h4 class="msg-title">404</h4>
        <p class="not-found">Not Found</p>
        <p class="msg-text">Sorry, the page you requested does not exist on this site</p>
      </div>
      <div class="adv">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-2075998924432436"
             :data-ad-slot="slot"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      <div class="popular-games">
        <h6 class="title">The Most Popular Games</h6>
        <div class="games">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getJson} from "@/utils/utils";
export default {
  name: "NotFound",
  components: {

  },
  data() {
    return {
      gameList: [],
      slot: null
    }
  },
  created() {
    let channelInfo = localStorage.getItem('channelInfo') && JSON.parse(localStorage.getItem('channelInfo'))
    const { m_404_slot } = channelInfo || {}
    this.slot = m_404_slot ? m_404_slot : '3478118221'
  },
  mounted() {
    this.getJson()
  },
  methods: {
    getJson() {
      let jsonArr = getJson()
      let newArr = []
      jsonArr && jsonArr.map((item)=>{
        newArr.push(item)
      })
      this.gameList = newArr.splice(0,30)
    },
    // 点击跳转详情
    iconClick(item) {

    }
  }
}
</script>

<style lang="less" scoped>
@media (hover: hover) {
  .item:hover {
    transform: scale(1.01869) translate(0px, -4px)!important;
  }
  .item:hover::after {
    opacity: 1;
    background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.3) 100%);
  }
  .item:hover .sc-963fcq-0 {
    opacity: 1!important;
    transform: translate(0px, 0px)!important;
  }
}
.content{
  .msg-404{
    padding-top: 42px;
    padding-bottom: 30px;
    background-color: rgba(0,0,0,.2);
    .msg-title{
      font-size: 146px;
      background-image: linear-gradient(180deg,#75ddff,#c1d8ff);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 0.1875rem 0.1875rem 0.125rem hsl(0deg 0% 100%/20%);
      text-align: center;
      line-height: 1;
      font-weight: 400;
    }
    .not-found{
      margin-top: 22px;
      font-size: 26px;
      text-align: center;
      color: #fff;
    }
    .msg-text{
      margin-top: 28px;
      font-size: 20px;
      color: #dde5ff;
      text-align: center;
    }
  }
  .popular-games{
    margin-top: 16px;
    padding: 0 21px;
    .title{
      color: #fff;
      font-size: 30px;
    }
    .games{
      margin-top: 18px;
      box-sizing: border-box;
    }
    .item {
      width: 94px;
      height: 94px;
      float: left;
      margin-right: 16px;
      display: block;
      overflow: hidden;
      margin-bottom: 10px;
      position: relative;
      box-sizing: border-box;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
        //border: 2px solid #fff;
        border-radius: 16px;
        //background: white;
      }
    }
    .item:hover {
      transform: scale(1.04255) translate(0px, -4px);
      transition-duration: 0.3s;
    }
    .games:after{
      content: ".";
      display: block;
      height: 0;
      clear: both;
    }
    .esaxGV {
      position: absolute;
      right: 0px;
      bottom: 0px;
      left: 0px;
      padding: 6px;
      color: rgb(255, 255, 255);
      font: 700 var(--tileFontSize,12px)/1.3 'Proxima Nova',sans-serif;
      text-align: center;
      z-index: 6;
      transition: transform .3s cubic-bezier(.25, .1, .25, 1) .1s,opacity .3s cubic-bezier(.25, .1, .25, 1) .1s;
      transform: translate(0px, 8px);
      opacity: 0;
      -webkit-font-smoothing: antialiased;
      pointer-events: none;
    }
  }
}
.m-content{
  .msg-404{
    padding-top: 2.3333rem;
    padding-bottom: 1.6666rem;
    background-color: rgba(0,0,0,.2);
    .msg-title{
      font-size: 8.1111rem;
      background-image: linear-gradient(180deg,#75ddff,#c1d8ff);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 0.1875rem 0.1875rem 0.125rem hsl(0deg 0% 100%/20%);
      text-align: center;
      line-height: 1;
      font-weight: 400;
    }
    .not-found{
      margin-top: 1.2222rem;
      font-size: 1.4444rem;
      text-align: center;
      color: #fff;
    }
    .msg-text{
      margin-top: 1.5555rem;
      font-size: 1.1111rem;
      color: #dde5ff;
      text-align: center;
    }
  }
  .adv{
    margin-top: 16px;
  }
  .popular-games {
    margin: 16px auto 0;
    .title {
      color: #fff;
      font-size: 0.9275rem;
    }
    .games{
      margin-top: 0.625rem;
    }
  }
}
@media (min-width: 111px) and (max-width: 550.9px) {
  .m-content .popular-games {
    width: 314px;
  }
}
@media (min-width: 551px) and (max-width: 660.9px) {
  .m-content .popular-games {
    width: 534px;
  }
}
@media (min-width: 661px) and (max-width: 880.9px) {
  .m-content .popular-games {
    width: 644px;
  }
}
@media (min-width: 881px) {
  .m-content .popular-games {
    width: 864px;
  }
}
</style>