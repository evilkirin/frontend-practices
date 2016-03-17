<template>
	<div class="navi-container md">
		<ul class="navi-list">
			<li class="navi-item">
				<a href="#impression">
					<div class="navi-icon" style="background-color: #6fb2cb;">&#xe601;</div>
					<p class="navi-label">阿里印象</p>
				</a>
			</li>
			<li class="navi-item">
				<a href="#self-growth">
					<div class="navi-icon" style="background-color: #6fcb9c;">&#xe603;</div>
					<p class="navi-label">个人成长</p>
				</a>
			</li>
			<li class="navi-item">
				<a href="#bonding">
					<div class="navi-icon" style="background-color: #cb9e6f;">&#xe600;</div>
					<p class="navi-label">心动接触</p>
				</a>
			</li>
			<li class="navi-item">
				<a href="#selfie">
					<div class="navi-icon" style="background-color: #cb6f91;">&#xe602;</div>
					<p class="navi-label">我型我秀</p>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {

  name: 'navi',

  data () {
    return {

    };
  }
};
</script>

<style lang="less">
.navi-container {
	background-color: #ffffff;
}

.navi-list {
	overflow: auto;
	height: 211px;
}

.navi-item {
	margin-top: 24px;
	display: block;
	width: 25%;
	height: 187px;
	float: left;

	a:visited,a:active,a:hover {
		text-decoration: none;
	}
}

.navi-icon {
	font-family: iconfont;
	margin: auto;
	width: 121px;
	height: 121px;
	color: #ffffff;
	border-radius: 10px;
	font-size: 54px;
	text-align: center;
	vertical-align: middle;
	line-height: 121px;
}

.navi-label {
	width: 121px;
	height: 32px;
	text-align: center;
	margin: 0 auto;
	margin-top: 10px;
	color: #666666;
}
</style>