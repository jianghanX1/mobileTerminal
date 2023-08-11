<template>
  <div class="foot">
    <div class="footStyle">
      <div class="foot-tab">
        <a @click="privacyClick">Privacy</a>
        <a @click="contactClick">Contact us</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Foot",
  methods: {
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
</style>