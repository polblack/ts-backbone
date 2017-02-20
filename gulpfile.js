var gulp = require('gulp');
//var Server = require('karma').Server;
var ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
var htmlmin = require('gulp-htmlmin');
var insert = require('gulp-insert');
var rename = require("gulp-rename");
var watch = require("gulp-watch");

///Task de desarrollo
/**
 * Run test once and exit
 */
// gulp.task('karma', function (done) {
//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });
var tsProject = ts.createProject('tsconfig.json');
gulp.task('tsc', function() {
    var tsResult = tsProject.src() 
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('release'));
});



gulp.task('test',['tsc'], () => 
    gulp.src('test/**.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}))
);

gulp.task('tplttomodule',function(){
    return gulp.src('src/**/*.tplt.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(insert.transform(function(contents, file) {
        console.log(typeof(file.path));
        var exportname = file.path.split('/').reverse()[0].replace('.tplt.html','');
        var comment = '// tsc template file for: ' + file.path + '\r\n'+
                    'import * as _ from "underscore"\r\n';
        var declaration='let tplt=`'+contents+'`;\r\n'+
                        'let tpltf=function(){return _.template(tplt);}\r\n'+
                        'export {tplt as '+exportname+' }';
                       
        return comment + declaration;
    }))
    .pipe(rename(function (path) {
            //path.dirname += "/ciao";
            //path.basename += "-goodbye";
            path.extname = ".ts"
        }))
    .pipe(gulp.dest('src/'));


});

gulp.task('watch',function(){
    return watch('src/**/*.tplt.html', { ignoreInitial: false },function(){
        gulp.start('tplttomodule');
    })
        ;
});