<template>
	<div class="nick-list-container">
		<ul class="nick-list">
			<li class="nick-item">徊老板</li>
			<li class="nick-item">景大爷</li>
			<li class="nick-item">麻美子</li>
			<li class="nick-item">云姐</li>
			<li class="nick-item">欧老板</li>
			<li class="nick-item">仙山</li>
			<li class="nick-item">石泉</li>
		</ul>
	</div>
</template>

<script>
import scroll from '@ali/lib-scroll'
import sticky from '@ali/lib-sticky'

export default {

  name: 'nick-list',

  ready () {
  	var Scroll = lib.scroll;
  	var options = {
  		scrollWrap: document.querySelector('.nick-list-container'),
  		direction: 'x',
  		isPrevent: true
  	};
  	var scroller = new Scroll(options);
  	scroller.init();
  	new lib.sticky({element: '.nick-list-container'});
  },

  data () {
    return {

    };
  }
};
</script>

<style lang="less">
.nick-list-container {
	background-color: #333333;
	width: 750px;
	overflow: auto;
	z-index: 100;
}

.nick-list {
	display: flex;
	flex-direction: row;
	height: 68px;
	background-color: #333333;
	align-items: center;
	width: 1120px;
}

.nick-item {
	width: 160px;
	text-align: center;
	font-size: 24px;
	color: #ffffff;

	&:not(:last-child) {
		border-right-width: 1px;
		border-right-color: #aaaaaa;
		border-right-style: solid;
	}
}

</style>