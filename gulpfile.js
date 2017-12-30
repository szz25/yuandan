const gulp = require('gulp');
const urls = require('url');
const mock = require('mockjs');
const htmlmin = require('gulp-htmlmin');
const webserver = require('gulp-webserver');
const minify = require('gulp-minify-css');
const minimg = require('gulp-imagemin');
const obj = [];
const yshtml = {
    removeComments: true, //清除html注释
    collapseWhitespace: true, //压缩html
    collapseBooleanAttributes: true, //省略布尔属性的值<input checked="true"/>==><input/>
    removeEmptyAttributes: true, //删除所有空格做属性值<input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJs: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};
for (let i = 7; i <= 11; i++) {
    obj.push(mock.mock({
        "img": './Content/img/' + i + '.jpg'
    }))
}
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            port: 8080,
            middleware: function(req, res, next) {
                const method = req.method;
                const url = urls.parse(req.url);
                const pathname = url.pathname;
                res.setHeader('Access-Control-Allow-Origin', '*')
                if (method === 'POST') {
                    let data = "";
                    req.on('data', function(chunk) {
                        data += chunk
                    })
                    req.on('end', function() {
                        switch (pathname) {
                            case '/list':
                                res.writeHead(200, {
                                    'Content-type': 'application/json;charset=utf-8'
                                })
                                res.write(JSON.stringify(obj));
                                res.end();
                                break;
                            default:
                                res.end()
                                break;
                        }
                    })
                }
            }
        }))
})
gulp.task('minify', function() {
    gulp.src('./Content/css/*.css')
        .pipe(minify())
        .pipe(gulp.dest('./Content/css/yz/'))
})
gulp.task('htmlmin', function() {
    gulp.src('./*.html')
        .pipe(htmlmin(yshtml))
        .pipe(gulp.dest('./yshtml/'))
})

gulp.task('minImage', function() {
    gulp.src('./Content/img/*.jpg')
        .pipe(minimg())
        .pipe(gulp.dest('./Content/img/ys/'))
})
gulp.task('default', ['webserver', 'minify', 'htmlmin', 'minImage'])