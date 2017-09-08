"use strict";

let gulp = require("gulp");
let p = require("gulp-load-plugins")();
let del = require("del");
const production = !!p.util.env.production;

gulp.task("script", function () {
    return gulp.src("./js/**/*.js")
        .pipe(p.concat("app.js"))
        .pipe(p.uglify())
        .pipe(gulp.dest("./dist"))
});

gulp.task("sass", function () {
    return gulp.src("./scss/**/*.scss")
        //.pipe(p.sourcemaps.init())
        //.pipe(p.sass().on("error", p.sass.logError))
        //.pipe(p.sourcemaps.write())
        .pipe(p.compass({
            css: 'css',
            sass: 'scss',
            sourcemap: !production,
            environment: production ? "production" : "development"
        }))
        .pipe(p.if(production, p.cleanCss({compatibility: 'ie9'})))
        .pipe(gulp.dest("./css"));
});

gulp.task("clean", function () {
    return del([
        'dist/*',
        'css/*',
    ]);
});

gulp.task("watch", ["clean", "sass", "script"], function () {
    gulp.watch("./scss/**/*.scss", ["sass"]);
    gulp.watch("./js/**/*.js", ["script"]);
});

gulp.task("default", ["clean", "sass", "script"]);
