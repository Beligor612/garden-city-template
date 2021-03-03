const {src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const concat 			 = require('gulp-concat');
const uglify 			 = require('gulp-uglify-es').default;
const sass 				 = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss		 = require('gulp-clean-css')
const newer 			 = require('gulp-newer')
const imagemin		 = require('gulp-imagemin')

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'src/'
		},
		notify: false,
		online: true,
	}
		)
}

function styles() {
	return src('src/sass/style.sass')
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({overrideBrowserslist:['last 10 versions'], grid: true}))
	.pipe(cleanCss(({level: {1: {specialComments: 0}}})))
	.pipe(dest('src/css'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src('src/js/main.js')
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('src/js'))
	.pipe(browserSync.stream())
}

function images(){
	return src('src/img/**/*')
	.pipe(newer('dist/img/'))
	.pipe(imagemin())
	.pipe(dest('dist/img/'))
}
	function cleanimg() {
	return del('src/dist/img/**/*', { force: true })
}
function startwatch() {
	watch('src/sass/*.sass', styles)
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts)
	watch('src/*.html').on('change', browserSync.reload)
	watch('src/img/**/*', images);
}
function buildcopy() {
	return src(['src/css/*.min.css',
							'src/js/*.min.js',
							'src/img/**/*',
							'src/*.html',
		], { base: 'src' })
	.pipe(dest('dist')) 
}
exports.browsersync = browsersync;
exports.scripts 		= scripts;
exports.default 		= parallel(scripts, browsersync, startwatch, styles, images)
exports.build = series(styles, scripts, images, buildcopy);