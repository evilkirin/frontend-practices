<template>
	<div class="app-header md">
		<div class="main-info">
			<div class="personal-info">
				<p class="nickname">师影</p>
				<p class="mail">shiying.zsy@alibaba-inc.com</p>
				<p class="newbie">新人驾到</p>
			</div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<p class="system-time">{{{systemTime}}}</p>
	</div>
</template>

<script>
import mtop from '@ali/lib-mtop'
import moment from 'moment'
import n2c from '../../lib/lib-num'

export default {
  name: 'big-header',
  ready() {
  	var self = this;

	var mtopPromise = lib.mtop.request({
		api: 'mtop.common.getTimestamp',
		v: '1.0',
		ecode: 0,
		data: {}
	});

	mtopPromise.then(function (resJson) {
		console.log(resJson)
		if(resJson.retType === lib.mtop.RESPONSE_TYPE.SUCCESS) {
			moment.locale('zh-cn');
			// console.log(self.getMyDate());
			// self.systemTime = moment(Number(resJson.data.t)).format('ll');
			self.systemTime = self.getMyDate(Number(resJson.data.t));
		}
	}).catch(function (resJson) {
		console.log(resJson);		
	});
  },
  data () {
    return {
    	systemTime:'',
    	getMyDate: function(t) {
			var d = new Date(t);
			debugger;
			return n2c(d.getFullYear()) + '年' + n2c(d.getMonth() + 1) + '月' + n2c(d.getDate()) + '日' + moment.weekdays(d.getDay());
		}
    };
  }
}
</script>

<style lang="less">
.app-header {
	background-image: url(../../images/header-background.png);
	height: 570px;
	width: 750px;
	padding-top: 40px;
	position: relative;
}

.main-info {
	width: 750px;
	height: 570px;
}

.personal-info {
	width: 340px;
	height: 340px;
	margin: auto;
	background-color: #ffffff;
	border-radius: 170px;
	overflow: hidden;
}

.nickname {
	font-size: 180px;
	color: #ee9922;
	width: 360px;
	height: 220px;
}

.mail {
	font-size: 24px;
	text-align: center;
	position: relative;
	height: 36px;

	&:after {
		content: "";
		position: absolute;
		width: 70%;
		left: 15%;
		bottom: 0;
		height: 1px;
		background: #aaaaaa;
	}
}

.newbie {
	font-size: 32px;
	color: #aaaaaa;
	width: 130px;
	margin: auto;
}

.system-time {
	position: absolute;
	left: 30px;
	top: 20px;
	font-size: 24px;
	color: #ffffff;
	height: 570px;
	width: 20px;
}

</style>