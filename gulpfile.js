const gulp = require('gulp'),
    less = require('gulp-less'),
    pump = require('pump'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();



/* Task to compile less */

gulp.task('compile-less', function (cb) {
    pump([
        gulp.src(['development/less/main.less']),
        less(),
        prefix('last 2 versions'),
        gulp.dest('development/css/')
    ], cb);
});


/* Task to watch less changes */
gulp.task('watch-less', function () {
    gulp.watch('./development/less/**/*.less', ['compile-less']);
});



gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./development/"
        }
    });
    gulp.watch("./development/less/**/*.less").on("change", browserSync.reload);
    gulp.watch("./development/*.html").on("change", browserSync.reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'serve']);
