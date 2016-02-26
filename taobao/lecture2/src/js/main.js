/*
流程: DOMContentLoaded事件触发(页面加载完毕) -> 执行initApp -> 执行requestUserDataAndDisplay -> 执行startGame
*/

;
(function () { //最外层用一个立即执行的匿名函数包裹, 防止变量定义泄漏到window对象上. 可以理解为创造一个namespace

    var initApp = function () { //入口函数
        requestUserDataAndDisplay();
    };

    var requestUserDataAndDisplay = function () {

        //考虑到不一定mock的是预发域名, 所以为了方便, 强制设置使用预发环境, 实际开发中一般不需要这么做
        lib.mtop.config.subDomain = 'wapa';
        lib.login.config.subDomain = 'wapa';           

        lib.mtop.loginRequest({
            api: 'mtop.user.getUserSimple',
            v: '1.0',
            ecode: '1'
        }, function success(resp) {
            //成功回调

            document.querySelector('.head>.user-nick').innerText = resp.data.nick; //设置昵称显示

            var urlTmp = '//wwc.alicdn.com/avatar/getAvatar.do?userId={{USERID}}&width=100&height=100&type=sns';
            document.querySelector('.head>.user-icon').src = urlTmp.replace('{{USERID}}', resp.data.userNumId); //设置头像显示

            function calcAccountValue(userId) { //计算账户价值的函数
                return (userId % 77 + userId % 42) * 100;
            }
            var value = calcAccountValue(parseInt(resp.data.userNumId, 10));
            startGame(value); //将账户价值传入游戏初始化函数

        }, function fail(err) {
            //失败回调           

            alert('请求出错了:' + err.ret[0]);

        });
    };

    var startGame = function (targetValue) { //游戏内容初始化
        var value = targetValue; //账户价值
        var timeCount = 0; //已猜次数
        var currentInput = 0; //当前猜的数值

        var stageInput = document.querySelector('#input-container'),
            stageFail = document.querySelector('#fail-container'),
            stageSucc = document.querySelector('#succ-container');
        //缓存我们将要频繁操作的3个DOM对象 


        // view管理函数, 管理下方的3个不同的 界面(stage)切换
        function switchToStage(name) {
            switch (name) {
                case 'input':
                    stageInput.querySelector('input').value = '';

                    stageInput.style.display = 'block';
                    stageSucc.style.display = 'none';
                    stageFail.style.display = 'none';
                    break;
                case 'succ':
                    stageSucc.querySelector('.sub-title>span').innerText = timeCount;

                    stageInput.style.display = 'none';
                    stageSucc.style.display = 'block';
                    stageFail.style.display = 'none';

                    break;
                case 'fail':
                    stageFail.querySelector('.sub-title>span').innerText = timeCount;
                    stageFail.querySelector('.title>span').innerText = currentInput > value ? '大' : '小';

                    stageInput.style.display = 'none';
                    stageSucc.style.display = 'none';
                    stageFail.style.display = 'block';
                    break;
                default:
                    ;
            }
        }


        // 绑定输入界面的猜测按钮点击事件, 在事件回调中获取输入值, 完成游戏逻辑
        stageInput.querySelector('.btn').addEventListener('click', function () {
            var inp = parseInt(stageInput.querySelector('input').value, 10);
            if (!inp) {
                alert('请输入数字');
                return;
            }
            currentInput = inp; //保存当前输入值
            timeCount++; //猜测次数+1
            if (Math.abs(value - inp) < 100) { //猜中了
                switchToStage('succ');

            } else { //猜错了
                switchToStage('fail');
            }

        });

        // 绑定成功界面的分享按钮点击事件, 在回调中调用windvane的逻辑, 唤起native的分享组件
        stageSucc.querySelector('.btn').addEventListener('click', function () {
            var params = {
                // 分享内容的标题
                title: 'My Game',
                // 要分享的内容
                text: document.querySelector('.user-nick').innerText + '只用了' + timeCount + '次就猜出了TA的账号值' + value + '哦',
                // 要分享的图片地址
                image: 'http://img0.bdstatic.com/img/image/4359213b07eca806538f43aff0495dda144ac3482d1.jpg',
                // 要分享的 URL
                url: location.href
            };
            window.WindVane.call('TBSharedModule', 'showSharedMenu', params, function (e) {
                alert('success: ' + JSON.stringify(e));
            }, function (e) {
                alert('failure: ' + JSON.stringify(e));
            });

        });


        //绑定失败界面的按钮点击, 返回输入界面
        stageFail.querySelector('.btn').addEventListener('click', function () {
            switchToStage('input');
        });

        //游戏开始的时候应该展示输入界面
        switchToStage('input');

    };

    //绑定页面加载事件, 在页面加载完毕后执行
    document.addEventListener('DOMContentLoaded', initApp);

})();