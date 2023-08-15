<template>
  <div class="globalMain">
    <div class="content">
      <div class="notfound">
        <div class="whiteBackground">
          <img src="" alt="" height="22px" style="margin-top: 20px;">
          <img :src="notFound" alt="" height="161px" style="margin-top: 36px;">
        </div>
      </div>
      <div class="text">
        <div style="text-align: center;margin-top:15px">
          <span style="font-size: 20px;font-weight: 500;line-height: 20px;">Page Not Found:</span><br>
          <span style="font-size: 16px;line-height: 19px;">
            Oops! The page you are looking
            <br>
            for doesn't exist.
          </span>
        </div>
        <a href="/" style="width: 142px;height: 42px;background: #6A92F0;border-radius: 21px;font-size: 16px;font-weight: 600;color: #FFFFFF;line-height: 22px;display: flex;justify-content: center;align-items: center;margin: 12px auto 20px;text-decoration: none;">Return Home</a>
        <div>
          <div class="crossPromotion">
            <h2>People Also Play</h2>
            <div></div>
            <div class="crossPromotionList">
              <a :href="'/#/details/'+item.Name.replace(/\s+/g, '')+'?gameId='+item.gameId+($route.query.channel ? ('&channel='+$route.query.channel): '')" v-for="(item,index) in peopleAlsoPlay" :key="index" @click="iconClick(item)">
                <img v-lazy="item.iconUrl" alt="" class="clickEnlarge">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import {getJson, recentGame, shuffle} from "@/utils/utils";
import Foot from "@/components/Foot.vue";
import notFound from '@/assets/404.png'
export default {
  name: "NotFound",
  components: {
    Foot
  },
  data() {
    return {
      slot: null,
      notFound,
      peopleAlsoPlay: [], // People Also Play
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
      // People Also Play
      let arr = shuffle(getJson().splice(0,20))
      this.peopleAlsoPlay = arr.splice(0,10)
    },
    // 点击跳转详情
    iconClick(item) {
      recentGame(item)
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (min-height: 375px) and (max-width: 880px){
  .text {
    min-height: 320px!important;
  }
}
.globalMain {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  .content{
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 125px);
    .notfound {
      margin: 0 10px;
      width: 95%;
      height: 100%;
      word-break: break-word;
      .whiteBackground {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
    .text {
      margin-top: 0;
      min-height: 574px;
      color: #747474;
      font-size: 18px;
      font-family: Helvetica;
      font-weight: 400;
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
    }
  }
}
</style>