var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('webpack', function(){
	return gulp.src('./src/**/*.js')
				.pipe(webpack(require('./webpack.config.js')))
				.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
	gulp.watch('./src/**/*.js', ['webpack']);
});

gulp.task('default', ['webpack', 'watch']);