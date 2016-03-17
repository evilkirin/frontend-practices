<template>
	<div class="impr-container md">
		<div class="impr-header">
			<div class="colored-padding"></div>
			<p class="impr-title">阿里印象</p>
		</div>
		<div class="impr-slider">
			<div class="slider-outer">
				<ul class="slider-wrap">
					<li><img class="slider-img" data-size="710x464" data-src="https://img.alicdn.com/tps/TB1nlqmLVXXXXaqXFXXXXXXXXXX-1420-928.jpg"></li>
					<li><img class="slider-img" data-size="710x464" data-src="https://img.alicdn.com/tps/TB1nlqmLVXXXXaqXFXXXXXXXXXX-1420-928.jpg"></li>
				</ul>
			</div>
			<div class="slider-status"></div>
		</div>
	</div>
</template>

<script>
	import slider from '@ali/lib-slider'
	import img from '@ali/lib-img'

	export default {

		name: 'impression',

		ready () {
			var slide = new lib.Slider(document.querySelector('.impr-slider'),{
				trigger : '.slider-status',
            	hasTrigger : true,
            	play: true
			});

			lib.img({
				'class': 'slider-img',
				'dataSrc': 'data-src',
				'q': ['q50', 'q30'],
				'enableLazyload': true
			});

			lib.appear.init({
				container:'.slider-wrap',
				appearCallback:function(){
					console.log(1213)
				}
			});
		},

		data () {
			return {

			}
		}
	};
</script>

<style lang="less">
	.impr-header {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.impr-container {
		background-color: #ffffff;
	}

	.colored-padding {
		width: 20px;
		background-color: #6fb2cb;
		height: 64px;
	}

	.impr-title {
		padding-left: 20px;
		font-size: 32px;
		height: 64px;
		line-height: 64px;
		vertical-align: middle;
	}

	.impr-slider {
		margin-top: 24px;
	}

	.slider-status {
		height:82px;
		padding-top:18px;
		text-align:center;

		span {
			display:inline-block;
			width:14px;
			height:14px;
			background-color:#ccc;
			border-radius:10px;
			margin-right:18px;

			&:last-child {
				margin-right:0px;
			}
		}

		.sel {
			background-color:#FF8040;
		}
	}

	.slider-outer {
		width:750px;
		height:464px;
		overflow:hidden;
		position:relative;
	}

	.slider-wrap {
		position:absolute;
		// white-space: nowrap;

		li {
			// display: inline-block;
			// white-space: normal;
			float: left;
			width:750px;
			height:464px;
			background-color: #ffffff;
		}
	}

	.slider-img {
		display: block;
		width: 710px;
		height: 464px;
		margin: auto;
	}
</style>