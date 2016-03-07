<template>
	<div class="sg-container md">
		<div class="sg-header">
			<div class="colored-padding"></div>
			<p class="sg-title">个人成长</p>
		</div>
		<div class="sg-content">
			<ul class="sg-list">
				<li class="sg-item">
					<img class="sg-item-icon" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==">
					<div class="sg-item-desc">
						<p class="sg-item-head"></p>
						<p class="sg-item-content"></p>
					</div>
				</li>
				<li class="sg-item"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {

		name: 'self-growth',

		data () {
			return {

			};
		}
	};
</script>

<style lang="less" scoped>
	.sg-header {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.sg-container {
		background-color: #ffffff;
	}

	.colored-padding {
		width: 20px;
		background-color: #6fcb9c;
		height: 64px;
	}

	.sg-title {
		padding-left: 20px;
		font-size: 32px;
		height: 64px;
		line-height: 64px;
		vertical-align: middle;
	}

	.sg-content {
		margin: 0 20px;
	
		
		.sg-list {
			
		
			.sg-item {
				display: block;

				.sg-item-icon {
					
				}

				.sg-item-desc {
					font-size: 28px;
					.sg-item-head {

					}

					.sg-item-content {

					}
				}
			}
		}
	}
	
</style>