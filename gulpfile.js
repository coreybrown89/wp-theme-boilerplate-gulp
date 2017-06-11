// gulp dependencies
var gulp = require('gulp');

// files and compression
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
const imagemin = require('gulp-imagemin');

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

	return gulp.src('resources/scss/app.scss')
		// compile sass
		.pipe(sass())

		// run autoprefixer
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(gulp.dest('resources/css'))

		// minify css
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/css'))

		//gzip css
		.pipe(gzip())
    .pipe(gulp.dest('public/css'));
});

// lint app.js
gulp.task('jshint', function() {

	console.log('linting javascript ...')

	return gulp.src('resources/js/app.js')
	.pipe(jshint())
	.pipe(jshint.reporter(stylish, {beep: true}))
		.pipe(jshint.reporter('fail'))
});


// compress app.js
gulp.task('compress', function(cb) {

	console.log('compressing javascript ...')

	pump([
			gulp.src('resources/js/app.js'),

			// minify js
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest('public/js'),

			// gzip js
			gzip(),
	    gulp.dest('public/js')
		],
		cb
	);
});


// compress images
gulp.task('images', function() {

	console.log('compressing images ...')

	gulp.src('resources/images/**')
			.pipe(imagemin([
				imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({plugins: [{removeViewBox: true}]})
			],{
				verbose: true
			}))
			.pipe(gulp.dest('public/images'))
});


// default gulp task
gulp.task('default', function() {

	gulp.watch('resources/scss/**/*.scss', ['sass']);
	gulp.watch('resources/js/app.js', ['jshint','compress']);

});
