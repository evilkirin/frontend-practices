<template>
	<div class="bonding-container md">
		<div class="bonding-header">
			<div class="colored-padding"></div>
			<p class="bonding-title">心动接触</p>
		</div>
		<div class="bonding-content">
			<div class="compare">
				<img src="../../images/big-brother.jpg">
				<p style="font-size: 64px">VS</p>
				<img src="../../images/fist.jpg">
			</div>
			<div class="desc">放两张图片对比 可以是你认识的人 比如师兄 刚开始觉得是什么样的 后来发现是什么样的； 比如食堂，理想中以为是什么样的，实际是什么样的 ...</div>
		</div>
	</div>
</template>

<script>
	export default {

		name: 'bonding',

		data () {
			return {

			};
		}
	};
</script>

<style lang="less" scoped>
	img {
		height: 300px;
		width: 300px;
	}

	.bonding-header {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.bonding-container {
		background-color: #ffffff;
	}

	.colored-padding {
		width: 20px;
		background-color: #cb9e6f;
		height: 64px;
	}

	.bonding-title {
		padding-left: 20px;
		font-size: 32px;
		height: 64px;
		line-height: 64px;
		vertical-align: middle;
	}

	.bonding-content {
		margin: 0 20px;
		padding-bottom: 30px;
	}

	.compare {
		margin: 30px 0;
		height: 300px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.desc {
		font-size: 28px;
		// margin-bottom: 30px 为什么在这里写mb不生效？
	}
</style>