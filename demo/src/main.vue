<style lang="less">
  .page-content {
    background-color: #eeeeee;
  }

  @font-face {
    font-family: "m-iconfont";
    src: url(http://at.alicdn.com/t/font_1444445527_4098153.eot);
    src: url(http://at.alicdn.com/t/font_1444445527_4098153.eot?#iefix) format('embedded-opentype'),url(http://at.alicdn.com/t/font_1444445527_4098153.woff) format('woff'),url(http://at.alicdn.com/t/font_1444445527_4098153.ttf) format('truetype'),url(http://at.alicdn.com/t/font_1444445527_4098153.svg#iconfont) format('svg')
  }

  .mod {
    margin-bottom: 18px;

    &:last-child {
      margin-bottom: 0px;
    }
  }

</style>

<template>
  <div class="page-content">
    <banner></banner>
    <navigator></navigator>
    <items></items>
    <image></image>
  </div>
</template>

<script>
import Banner from './banner.vue'
import Navigator from './nav.vue'
import Items from './items.vue'
import Image from './image.vue'

export default {
  components: {
    Banner,
    Navigator,
    Items,
    Image
  }
}
</script>
