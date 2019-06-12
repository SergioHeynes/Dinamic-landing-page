const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const usemin = require('gulp-usemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const del = require('del');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano'); 
const uglify = require('gulp-uglify');


// File paths
const paths = {
    styles: {
      src: './app/assets/styles/**/*.scss',
      dest: './app/temp/styles/'
    },
    scripts: {
      src: './app/assets/scripts/**/*.js',
      dest: './app/temp/scripts/'
    }
  };


// Styles
function styles(done) {
    console.log('Starting styles task');
    return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
    done();
}


// Scripts
function scripts(done) {
    console.log('Starting scripts task');
    done();
}


// Images
function optimizeImages() {
  return gulp.src(['./app/assets/images/**/*'])
  .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
  }))
  .pipe(gulp.dest('./docs/assets/images'));
}


// Watch
function watch() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });

    gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload);
    gulp.watch(paths.styles.src, styles);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
}


// Preparing files for go live
function useminTask() {
  return gulp.src('./app/index.html')
  .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
  }))
  .pipe(gulp.dest('./docs'));
}

// Preview of the project from dist/docs folder
function previewDist() {
  browserSync.init({
      notify: false,
      server: {
          baseDir: 'docs'
      }
  });
}


// Delete dist folder
function deleteDistFolder(){
  return del('./docs');
}


// Build
const build = gulp.series(deleteDistFolder, 
  gulp.parallel(gulp.series(styles, scripts, useminTask), optimizeImages));


exports.watch = watch;
exports.build = build;
exports.previewDist = previewDist;
