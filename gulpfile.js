var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  StaticServer = require('static-server'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

gulp.task('scss', function() {
  return gulp.src('./assets/scss/application.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scss:watch', ['scss'], function() {
  gulp.watch('./assets/scss/*.scss', ['scss']);
});

// gulp.task('jshint', function() {
//   return gulp.src('./assets/js/**/*.js')
//     .pipe(babel())
//     .pipe(jshint.reporter('jshint-stylish'));
// });

gulp.task('server', function() {
  var server = new StaticServer({
    rootPath: '.',            // required, the root of the server file tree
    port: 8787,               // optional, defaults to a random port
    host: '127.0.0.1',       // optional, defaults to any interface
    followSymlink: true      // optional, defaults to a 404 error
  });

  server.start(function () {
    console.log('Server listening to', server.port);
  });

  server.on('request', function (req, res) {
    console.log('URL resource: ', req.path);
    console.log('Elapsed time: ', req.elapsedTime);
  });
});

gulp.task('js', function() {
  return browserify({ entries: './assets/js/app.js', debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'));
});

// gulp.task('js:watchify', function() {
//   var opts = assign({}, watchify.args, { entries: './assets/js/app.js', debug: true });
//   var b = watchify(browserify(opts));

//   b.on('update', bundle); // on any dep update, runs the bundler
//   // b.on('log', gutil.log); // output build logs to terminal

//   function bundle() {
//     return b.transform(babelify)
//       .bundle()
//       .pipe(source('app.js'))
//       .pipe(gulp.dest('./dist/js'));
//   }
// });

gulp.task('js:watch', ['js'], function() {
  gulp.watch('./assets/js/**/*.js', ['js']);
});

gulp.task('watch', ['scss:watch', 'js:watch']);

gulp.task('sync', function() {
   // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8787
    });

    gulp.watch("./dist/**/*").on("change", browserSync.reload);
});

// gulp.task('default', ['watch']);
