// Load modules
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	changed = require('gulp-changed'),
	htmlReplace = require('gulp-html-replace'),
	htmlMin = require('gulp-htmlmin'),
	del = require('del'),
	sequence = require('run-sequence');

// config
var config = {
	dist: 'dist/',
	src: 'src/',
	
	in:
	{
		css: 'src/css/**/*.css',
		js: 'src/js/*.js',
		img: 'src/images/**/*.{jpg,jpeg,png,gif,ico,svg}',
		index: 'src/*.html',
		scss: 'src/scss/**/*.scss',
		portfolio: 'src/portfolio/**/*.html'
	},

	out:
	{
		css: 'dist/css/',
		js: 'dist/js/',
		img: 'dist/images/',
		index: 'dist/',
		scss: 'src/css/',
		css_name: 'style.css',
		js_name: 'main.min.js',
		css_replace: 'css/style.css',
		js_replace: 'js/main.min.js'
	}
};

gulp.task('reload', function() {
	browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
	browserSync.init({
        server: "./src"
    });

	gulp.watch([config.in.index, config.in.js], ['reload']);
	gulp.watch(config.in.scss, ['sass']);
});

// SCSS task
gulp.task('sass', function() {
	return gulp.src(config.in.scss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.out.scss))
		.pipe(browserSync.stream());
});

// CSS task
gulp.task('css', function() {
	return gulp.src(config.in.css)
		.pipe(concat(config.out.css_name))
		.pipe(cleanCSS())
		.pipe(gulp.dest(config.out.css));
});

// JS task
gulp.task('js', function() {
	return gulp.src(config.in.js)
		.pipe(concat(config.out.js_name))
		.pipe(uglify())
		.pipe(gulp.dest(config.out.js));
});

// Images
gulp.task('img', function() {
	return gulp.src(config.in.img)
		.pipe(changed(config.out.img))
		.pipe(imagemin())
		.pipe(gulp.dest(config.out.img));
});

// HTML
gulp.task('html', function() {
	return gulp.src(config.in.index)
		.pipe(htmlReplace({
			'css': config.out.css_replace,
			'js': config.out.js_replace
		}))
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest(config.dist))
});

// Clean task
gulp.task('clean', function() {
	return del([config.dist]);
});

// Build task
gulp.task('build', function() {
	sequence('clean', ['html', 'js', 'css', 'img']);
});

gulp.task('default', ['serve']);