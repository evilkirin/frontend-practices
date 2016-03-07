<template>
  <div class="main-area">
    <big-header></big-header>
    <impr id="impression"></impr>
    <self-growth id="self-growth"></self-growth>
    <bonding id="bonding"></bonding>
    <selfie id="selfie"></selfie>
  </div>
</template>

<script>
import bigHeader from './components/big-header.vue'
import impr from './components/impression.vue'
import selfGrowth from './components/self-growth.vue'
import bonding from './components/bonding.vue'
import selfie from './components/selfie.vue'

export default {

  components: {
    bigHeader,
    impr,
    selfGrowth,
    bonding,
    selfie
  },

  data () {
    return {

    };
  }
};
</script>

<style lang="less">
  .main-area {
    background-color: #eeeeee;
  }

  .md {
    margin-bottom: 20px;
  }

@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1457240919_649429.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1457240919_649429.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/font_1457240919_649429.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/font_1457240919_649429.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1457240919_649429.svg#iconfont') format('svg'); /* iOS 4.1- */
}
                    
</style>