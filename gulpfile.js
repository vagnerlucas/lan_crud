const gulp = require('gulp')
const browserSync = require('browser-sync')

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