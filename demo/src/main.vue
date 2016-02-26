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
    <v-banner></v-banner>
    <v-nav></v-nav>
    <v-items></v-items>
    <v-image></v-image>
  </div>
</template>

<script>
  module.exports = {
    components: {
      'v-banner': require("./banner.vue"),
      'v-nav': require("./nav.vue"),
      'v-items': require("./items.vue"),
      'v-image': require("./image.vue")
    }
  }
</script>
