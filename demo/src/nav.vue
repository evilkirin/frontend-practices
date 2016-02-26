<style lang="less">
	.nav {
		display: flex;
		background-color: #fff;

		li {
			flex:1;
			display: flex;
			flex-direction: column;
			height: 124px;
			font-size: 26px;
			justify-content: center;
			align-items: center;
			position: relative;

			&.selected {
				color: #df231c;

				&:after {
					content:"";
					position: absolute;
					width: 100%;
					left: 0;
					bottom: 0;
					height: 6px;
					background: #dd2727;
				}
			}
		}
	}

	.nav-icon {
		font-family: "m-iconfont";
		font-size: 42px;
		margin-bottom: 10px;
	}
</style>

<template>
	<ul class="nav mod">
		<li class="nav-item selected"><span class="nav-icon">&#xe60a;</span><span>首页</span></li>
		<li class="nav-item"><span class="nav-icon">&#xe607;</span><span>全部商品</span></li>
		<li class="nav-item"><span class="nav-icon">&#xe609;</span><span>上新</span></li>
		<li class="nav-item"><span class="nav-icon">&#xe608;</span><span>店铺活动</span></li>
	</ul>
</template>

<script>
</script>
