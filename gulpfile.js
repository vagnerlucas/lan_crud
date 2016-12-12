const gulp = require('gulp')
const browserSync = require('browser-sync')
const gulpIf = require('gulp-if')
//const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
//const replace = require('gulp-replace')

gulp.task('watch', () => {

    browserSync.init({
        server: {
            baseDir: './'
        },
        browser: 'chrome'
    })

    gulp.watch(['./index.html', 'src/**/*']).on('change', () => {
        browserSync.reload()
    })
})

gulp.task('build', () => {
    return gulp.src(['./index.html', './public/**/*', './src/**/*'], { base: '.'})
           //.pipe(replace('../../src', '/'))
           .pipe(gulpIf('*.js', babel({presets: ['es2015']})))
           //.pipe(gulpIf('*.js', uglify().on('error', (e) => { console.log(e) })))
           .pipe(gulp.dest('./build/'))
})
