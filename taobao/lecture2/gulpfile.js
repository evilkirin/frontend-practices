var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var htmlone = require('gulp-htmlone');
var del = require('del');
var concat = require('gulp-concat');
var px2rem = require('gulp-px3rem');

// Workaround for https://github.com/gulpjs/gulp/issues/71
var origSrc = gulp.src;
gulp.src = function () {
    return fixPipe(origSrc.apply(this, arguments));
};

function fixPipe(stream) {
    var origPipe = stream.pipe;
    stream.pipe = function (dest) {
        arguments[0] = dest.on('error', function (error) {
            var nextStreams = dest._nextStreams;
            if (nextStreams) {
                nextStreams.forEach(function (nextStream) {
                    nextStream.emit('error', error);
                });
            } else if (dest.listeners('error').length === 1) {
                throw error;
            }
        });
        var nextStream = fixPipe(origPipe.apply(this, arguments));
        (this._nextStreams || (this._nextStreams = [])).push(nextStream);
        return nextStream;
    };
    return stream;
}

gulp.task('uglify', function () {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .on('error', function (error) {
            console.error('' + error);
        });

});

gulp.task('less_px2rem', function () {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(px2rem())
        .pipe(rename(function (path) { 
            path.basename=path.basename.replace('.debug','');
        }))
        .pipe(gulp.dest('./src/css/'))

    .on('error', function (error) {
        console.error('' + error);
    });
});

gulp.task('cssmin', function () {
    gulp.src('./src/css/*.css')
        .pipe(cssmin({
            keepBreaks: true
        }))
        .pipe(gulp.dest('./build/css'))
        .on('error', function (error) {
            console.error('' + error);
        });

});

gulp.task('htmlone', function () {
    gulp.src(['./src/*.html'])
        .pipe(htmlone())
        .pipe(gulp.dest('./dest'))
        .on('error', function (error) {
            console.error('' + error);
        });
});

gulp.task('watches', function () {
    gulp.watch(['./src/js/*.js'], ['uglify']);
    gulp.watch(['./src/css/*.less'], ['less_px2rem', 'cssmin']);
});


gulp.task('concat', function () {
    // 有了htmlone ，基本可以不用concat, 如果有 concat 需求，自己在这里配置 concat list
    // 
});



gulp.task('default', ['uglify', 'less_px2rem', 'cssmin', 'concat', 'watches']);
gulp.task('build', ['uglify', 'less_px2rem', 'cssmin', 'concat', 'htmlone']);
gulp.task('watch', ['default']);
