<style scoped>
  p {display: block; text-align: center;}
  p .qux {margin: 1em 2em;}
</style>

<template>
  <p v-on:click="changeName" v-bind:class="baz">
    <slot></slot>
  </p>
</template>

<script>
  var cdn = require('../lib/lib-cdnurl.js')
  module.exports = {
    props: ['baz'],
    components: {
    },
    data: function () {
      return {}
    },
    methods: {
      changeName: function (e) {
        this.$dispatch('append-name', ', Amfe')
      }
    },
    ready: function () {
    }
  }
</script>
