<template>
	<div class="selfie-container md">
		<div class="selfie-header">
			<div class="colored-padding"></div>
			<p class="selfie-title">我型我秀</p>
		</div>
	</div>
	<div class="selfie-content">
		<ul class="selfie-list">
			<li class="selfie-item"></li>
			<li class="selfie-item"></li>
			<li class="selfie-item"></li>
			<li class="selfie-item"></li>
		</ul>
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

</style>