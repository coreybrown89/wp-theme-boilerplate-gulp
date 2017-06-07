// gulp dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// sass & css dependencies
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

// js dependencies
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var pump = require('pump');


// ===========
//  Gulp Tasks
// ===========

// compile sass files
gulp.task('sass', function() {

	console.log('compiling sass ...')

	return gulp.src('public/scss/app.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/css'))
});

// lint app.js
gulp.task('jshint', function() {

	console.log('linting javascript ...')

	return gulp.src('public/js/app.js')
	.pipe(jshint())
	.pipe(jshint.reporter(stylish, {beep: true}))
		.pipe(jshint.reporter('fail'))
});


// compress app.js
gulp.task('compress', function(cb) {

	console.log('compressing javascript ...')

	pump([
			gulp.src('public/js/app.js'),
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest('public/js')
		],
		cb
	);
});


// default gulp task
gulp.task('default', function() {

	gulp.watch('public/scss/**/*.scss', ['sass']);
	gulp.watch('public/js/app.js', ['jshint','compress']);

});
