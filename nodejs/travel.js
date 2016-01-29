var fs = require('fs'),
	path = require('path');


process.on('uncaughtException', function (err) {
    console.log('Error: %s', err.message);
});

// 定义函数的时候，闭包的能力使得部分输入参数可以是外部的自由变量
function travel(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
    	console.log(files.length);
        (function next(i) {
            if (i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function (err, stats) {
                	if(err) {
                		console.log(err);
                	}
                    if (stats !== undefined && stats.isDirectory()) {
                        travel(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        }(0));
    });
}

travel('/usr/local/bin', function(pathname, cb) {
	console.log(pathname);
	cb();
}, function() {
	console.log('---------------------');
	console.log('finished!');
});
