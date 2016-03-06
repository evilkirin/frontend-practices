<template>
	<div class="bonding-container md">
		<div class="bonding-header">
			<div class="colored-padding"></div>
			<p class="bonding-title">心动接触</p>
		</div>
		<div class="bonding-content">
			<div class="compare">
				<img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==">
				<span></span>
				<img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==">
			</div>
			<div class="desc"></div>
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
		margin-top: 24px;
	}

</style>