"use strict"

var gulp = require("gulp"),   
    clean = require("gulp-clean"),   //清除文件
    concat = require("gulp-concat"),   //合并文件
    connect = require("gulp-connect"),   //创建本地服务器
    less = require("gulp-less"),   //less
    cleanCss = require("gulp-clean-css"),   //压缩css
    rename = require("gulp-rename"),   //重命名
    uglify = require("gulp-uglify");   //js压缩

//创建本地服务器
gulp.task('connect',function(){
    connect.server({
        root:'.',
        livereload: true
    });
});

//less解析
gulp.task('less',function(){
    gulp.src('./assets/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./assets/css/'))
});

//压缩css文件
gulp.task('minCss',['clean-css','less'],function(){
     gulp.src('./assets/css/*.css')
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/css/'))
});

//清空css
gulp.task('clean-css',function(){
    return gulp.src('./assets/css/*.min.css')
    .pipe(clean({force:true}));
});

//监听css、js、html
gulp.task('reload',['minCss'],function(){
    return gulp.src(['./*html','./assets/**/*'])
    .pipe(connect.reload());
});
gulp.task('watch-html',function(){
    gulp.watch(['./*.html'],['reload']);
});
gulp.task('watch-less',function(){
    gulp.watch(['./assets/less/*.less'],['reload']);
});
gulp.task('watch',['watch-html','watch-less']);
  
gulp.task('develop',['connect','minCss','watch']);
gulp.task('pre',['connect']);




gulp.src(['./javis/static/build/css/*.css','!./javis/static/build/css/areaMap.css'])
    .pipe(concat('all.css'))

