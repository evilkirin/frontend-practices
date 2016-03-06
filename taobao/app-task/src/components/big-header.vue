<template>
	<div class="md">
		<div class="app-header">
			<div class="main-info">
				<div class="personal-info">
					<p class="nickname">燮羽</p>
					<p class="mail">xieyi.xie@alibaba-inc.com</p>
					<p class="newbie">新人驾到</p>
				</div>
				<img class="user-icon" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==">
				<p class="welcome">{{welcome}}</p>
				<div class="share-button" v-on:click="shareThePage">分享</div>
			</div>
			<div class="system-time">
				<p class="time-segment">{{theYear}}</p>
				<p class="time-segment">{{monthAndDay}}</p>
				<p class="time-segment">{{dayOfWeek}}</p>
			</div>
		</div>
		<nick-list></nick-list>
		<navi></navi>
	</div>
</template>

<script>
	import mtop from '@ali/lib-mtop'
	import moment from 'moment'
	import login from '@ali/lib-login'
	import n2c from '../../lib/lib-num'
	import nickList from './nick-list.vue'
	import navi from './navigator.vue'

	export default {
		components : {nickList, navi},
		name: 'big-header',
		ready() {
			var nickPromise = lib.mtop.loginRequest({
				api: 'mtop.user.getUserSimple',
				v: '1.0',
				ecode: '1'
			});

			var mtopPromise = lib.mtop.request({
				api: 'mtop.common.getTimestamp',
				v: '1.0',
				ecode: 0,
				data: {}
			});

			var urlTmp = '//wwc.alicdn.com/avatar/getAvatar.do?userId={{USERID}}&width=100&height=100&type=sns';

			nickPromise.then(resp => {
				this.loginUserNick = resp.data.nick;
				this.welcome = `欢迎您：${resp.data.nick} ~ 访问我的页面，新手上路，敬请拍砖`;
				document.querySelector('.user-icon').src = `//wwc.alicdn.com/avatar/getAvatar.do?userId=${resp.data.userNumId}&width=100&height=100&type=sns`;
			}
			, err => {
				debugger;
				alert('出错了！' + err);
			});

			mtopPromise.then(resJson => {
				console.log(resJson)
				if(resJson.retType === lib.mtop.RESPONSE_TYPE.SUCCESS) {
					moment.locale('zh-cn');
					var d = new Date(Number(resJson.data.t));
					this.theYear = n2c(d.getFullYear()) + '年';
					this.monthAndDay = n2c(d.getMonth() + 1) + '月' + n2c(d.getDate()) + '日';
					this.dayOfWeek = moment.weekdays(d.getDay());
				}
			}).catch(resJson => {
				console.log(resJson);		
			});
		},

		data () {
			return {
				theYear: '',
				monthAndDay: '',
				dayOfWeek: '',
				welcome: '',
				headImg: '',
				loginUserNick: ''
			};
		},

		methods: {
			shareThePage: function () {
				var params = {
		            // 分享内容的标题
		            title: `分享${document.querySelector('.nickname').innerText}的主页`,
		            // 要分享的内容
		            text: `${this.loginUserNick}正在围观${document.querySelector('.nickname').innerText}的主页哦！`,
		            // 要分享的图片地址
		            image: 'http://img0.bdstatic.com/img/image/4359213b07eca806538f43aff0495dda144ac3482d1.jpg',
		            // 要分享的 URL
		            url: location.href
		        };
		        window.WindVane.call('TBSharedModule', 'showSharedMenu', params, function (e) {
		        	// alert('success: ' + JSON.stringify(e));
		        }, function (e) {
		        	alert('failure: ' + JSON.stringify(e));
		        });
		    }
	}
}
</script>

<style lang="less">
	.app-header {
		box-sizing: content-box;
		background-image: url(../../images/header-background.png);
		height: 594px;
		width: 750px;
		position: relative;
	}

	.main-info {
		width: 750px;
		height: 594px;
		position: relative;
		padding-top: 40px;
	}

	.personal-info {
		width: 340px;
		height: 340px;
		margin: auto;
		background-color: #ffffff;
		border-radius: 50%;
		overflow: hidden;
	}

	.nickname {
		font-size: 180px;
		color: #ee9922;
		width: 360px;
		height: 240px;
	}

	.mail {
		font-size: 25px;
		text-align: center;
		position: relative;
		height: 36px;

		&:after {
			content: "";
			position: absolute;
			width: 60%;
			left: 20%;
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
		padding-top: 40px;
		position: absolute;
		left: 30px;
		top: 20px;
		font-size: 24px;
		color: #ffffff;
		height: 570px;
		width: 20px;
	}

	.time-segment {
		line-height: 1.2;
		margin-bottom: 10px;
	}

	.welcome {
		color: #ffffff;
		font-style: 24px;
		margin-top: 80px;
		text-align: center;
		width: 100%;
	}

	.user-icon{
		width: 126px;
		height: 126px;   
		border-radius: 50%;
		box-shadow: 0px 2px 5px #d43b3e;/*px*/
		position: absolute;
		left: 60%;
		top: 300px;
	}

	.share-button {
		width: 241px;
		height: 50px;
		border-radius: 25px;
		font-size: 28px;
		border-width: 1px;
		border-color: #ffffff;
		text-align: center;
		margin: 30px auto;
		color: #ffffff;
		border-style: solid;
		line-height: 50px; // You must set this to make the vertical-align work
		vertical-align: middle;
	}

</style>