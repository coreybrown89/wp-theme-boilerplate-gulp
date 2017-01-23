// gulp dependencies
const gulp = require('gulp');
const rename = require('gulp-rename');

// sass & css dependencies
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

// js dependencies
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const uglify = require('gulp-uglify');
const pump = require('pump');


// change this variable, to the
// slug of your theme folder
//=============================
const themeName = 'theme-name';
//=============================


// ===========
//  Gulp Tasks
// ===========

// compile sass files
gulp.task('sass', function() {

	return gulp.src(themeName + '/public/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(themeName + '/public/css'))

});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(themeName + '/public/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish, {beep: true}))
  	.pipe(jshint.reporter('fail'))
});


// compress app.js
gulp.task('compress', function(cb) {

	pump([
			gulp.src(themeName + '/public/js/app.js'),
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest(themeName + '/public/js')
		],
		cb		
	);
});

// default gulp task
gulp.task('default', function() {

	gulp.watch(themeName + '/public/scss/**/*.scss', ['sass']);
	gulp.watch(themeName + '/public/js/app.js', ['jshint','compress']);

});

