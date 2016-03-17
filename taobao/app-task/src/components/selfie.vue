<template>
	<div class="selfie-container md">
		<div class="selfie-header">
			<div class="colored-padding"></div>
			<p class="selfie-title">我型我秀</p>
		</div>
		<div class="selfie-content">
			<ul class="selfie-list">
				<li class="selfie-item">
					<img class="item-img" src="https://gw.alicdn.com/tps/TB1cwYsLVXXXXa6XVXXXXXXXXXX-275-160.png">
					<p class="item-title">这是我的作品这是我的 ...</p>
				</li>
				<li class="selfie-item">
					<img class="item-img" src="https://gw.alicdn.com/tps/TB1cwYsLVXXXXa6XVXXXXXXXXXX-275-160.png">
					<p class="item-title">这是我的作品这是我的 ...</p>
				</li>
				<li class="selfie-item">
					<img class="item-img" src="https://gw.alicdn.com/tps/TB1cwYsLVXXXXa6XVXXXXXXXXXX-275-160.png">
					<p class="item-title">这是我的作品这是我的 ...</p>
				</li>
				<li class="selfie-item">
					<img class="item-img" src="https://gw.alicdn.com/tps/TB1cwYsLVXXXXa6XVXXXXXXXXXX-275-160.png">
					<p class="item-title">这是我的作品这是我的 ...</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {

		name: 'selfie',

		data () {
			return {

			};
		}
	};
</script>

<style lang="less" scoped>
	.selfie-header {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.selfie-container {
		background-color: #ffffff;
	}

	.colored-padding {
		width: 20px;
		background-color: #cb6f91;
		height: 64px;
	}

	.selfie-title {
		padding-left: 20px;
		font-size: 32px;
		height: 64px;
		line-height: 64px;
		vertical-align: middle;
	}

	.selfie-content {
		margin: 0 9px;

		.selfie-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.selfie-item {
				margin-top: 20px;
				margin-left: 11px;

				.item-img {
					width: 334px;
					height: 200px;
				}

				.item-title {
					margin-top: 8px;
					font-size: 28px;
					width: 344px;
				}
			}
		}
	}

</style>