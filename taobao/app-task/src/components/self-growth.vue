<template>
	<div class="sg-container md">
		<div class="sg-header">
			<div class="colored-padding"></div>
			<p class="sg-title">个人成长</p>
		</div>
		<div class="sg-content">
			<ul class="sg-list">
				<li class="sg-item">
					<img class="sg-item-icon" src="../../images/gundam.jpg">
					<div class="sg-item-desc">
						<p class="sg-item-head">[lib-mtop]</p>
						<p class="sg-item-content">请描述你对此组件功能的理解或新的体会</p>
					</div>
				</li>
				<li class="sg-item">
					<img class="sg-item-icon" src="../../images/gundam.jpg">
					<div class="sg-item-desc">
						<p class="sg-item-head">[lib-mtop]</p>
						<p class="sg-item-content">请描述你对此组件功能的理解或新的体会把所哟你所有用到的组件或者api写出来 不限于组件 也可以是某个同学分享等等等继续等继续等</p>
					</div>
				</li>
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
				display: flex;
				position: relative;				
				flex-direction: row;
				justify-content: flex-start;

				.sg-item-icon {
					margin-top: 20px;
					margin-bottom: 20px;
					margin-right: 20px;
					width: 120px;
					height: 120px;
				}

				.sg-item-desc {
					font-size: 28px;
					width: 550px;
					display: flex;
					justify-content: center;
					flex-direction: column;

					.sg-item-head {

					}

					.sg-item-content {
						max-height: 120px;
						display: -webkit-box;
						-webkit-line-clamp: 3;
  						-webkit-box-orient: vertical;
  						overflow: hidden;
  						text-overflow: ellipsis;
					}
				}

				&:not(:last-child):after {
					content: '';
					width: 100%;
					left: 0;
					background-color: #dddddd;
					height: 1px;
					position: absolute;
					bottom: 0px;
				}
			}
		}
	}
	
</style>