import pkg from 'gulp';

const { src, dest, watch, series, parallel } = pkg;

import fileinclude from 'gulp-file-include';

import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import glob from 'gulp-sass-glob';
import postCss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
const sassfn = gulpSass( dartSass );

import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import babel from 'gulp-babel';

import rename from 'gulp-rename';
import newer from 'gulp-newer';
import webp from 'gulp-webp';
import woff2 from 'gulp-ttf2woff2';

import browserSync from 'browser-sync';
import cache from 'gulp-cache';
import { deleteAsync } from 'del';

function html() {
  return src( `${getCurrentFolder()}/app/*.html` )
    .pipe( fileinclude() )
    .pipe( dest( `${getCurrentFolder()}/dist` ) )
    .pipe( browserSync.stream() );
}

function sassForDev() {
  return src( `${getCurrentFolder()}/app/sass/**/*.sass` )
    .pipe( glob() )
    .pipe( sassfn() )
    .pipe( postCss( [ mqpacker() ] ) )
    .pipe( rename( { suffix: '.min', prefix : '' } ) )
    .pipe( dest( `${getCurrentFolder()}/dist/style` ) )
    .pipe( browserSync.stream() );
}

function sassForProd() {
  return src( `${getCurrentFolder()}/app/sass/**/*.sass` )
    .pipe( glob() )
    .pipe( sassfn() )
    .pipe( postCss( [
      autoprefixer( { grid: 'autoplace' } ),
      cssnano( { preset: [ 'default', { discardComments: { removeAll: true } } ] } ),
      mqpacker(),
    ] ) )
    .pipe( rename( { suffix: '.min', prefix : '' } ) )
    .pipe( dest( `${getCurrentFolder()}/dist/style` ) )
    .pipe( browserSync.stream() );
}

function scriptForDev() {
  return src( `${getCurrentFolder()}/app/script/app.js` )
    .pipe( webpackStream( {
      mode: 'development',
      plugins: [ new webpack.ProvidePlugin( { $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' } ) ],
      output: { filename: 'app.min.js' },
    } ) )
    .pipe( dest( `${getCurrentFolder()}/dist/script` ) )
    .pipe( browserSync.stream() );
}

function scriptForProd() {
  return src( `${getCurrentFolder()}/app/script/app.js` )
    .pipe( babel() )
    .pipe( webpackStream( {
      mode: 'production',
      performance: { hints: false },
      plugins: [ new webpack.ProvidePlugin( { $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' } ) ],
      output: { filename: 'app.min.js' },
    } ) )
    .pipe( dest( `${getCurrentFolder()}/dist/script` ) )
    .pipe( browserSync.stream() );
}

function convertToWebp() {
  return src( `${getCurrentFolder()}/app/img/**/*.{png,jpg,jpeg}` )
    .pipe( newer( `${getCurrentFolder()}/dist/img` ) )
    .pipe( webp( { quality: 95 } ) )
    .pipe( dest( `${getCurrentFolder()}/dist/img` ) )
    .pipe( browserSync.stream() );
}

function copyWebp() {
  return src( `${getCurrentFolder()}/app/img/**/*.{json,webp,svg}` )
    .pipe( newer( `${getCurrentFolder()}/dist/img` ) )
    .pipe( dest( `${getCurrentFolder()}/dist/img` ) )
    .pipe( browserSync.stream() );
}

function convertToWoff2() {
  return src( `${getCurrentFolder()}/app/font/**/*.{ttf,otf}` )
    .pipe( newer( `${getCurrentFolder()}/dist/font` ) )
    .pipe( woff2() )
    .pipe( dest( `${getCurrentFolder()}/dist/font` ) )
    .pipe( browserSync.stream() );
}

function copyWoff2() {
  return src( `${getCurrentFolder()}/app/font/**/*.woff2` )
    .pipe( src( `${getCurrentFolder()}/app/font/**/*.woff2` ) )
    .pipe( newer( `${getCurrentFolder()}/dist/font` ) )
    .pipe( dest( `${getCurrentFolder()}/dist/font` ) )
    .pipe( browserSync.stream() );
}

function getCurrentFolder() {
  // eslint-disable-next-line no-undef
  const params = process.argv.filter( item => item.match( /--/gm ) );
  return params.length ? params[0].slice( 2 ) : null;
}

async function clearcache() {
  await cache.clearAll();
}

async function removedist() {
  await deleteAsync( `${getCurrentFolder()}/dist/**/*`, { force: true } );
}

function browsersync() {
  browserSync.init( {
    server: { baseDir: `${getCurrentFolder()}/dist` },
    ghostMode: { clicks: false },
    notify: false,
    online: true,
    open: false,
  } );
}

function startwatch() {
  watch( `${getCurrentFolder()}/app/font`, { usePolling: true }, parallel( convertToWoff2, copyWoff2 ) );
  watch( `${getCurrentFolder()}/app/img`, { usePolling: true }, parallel( convertToWebp, copyWebp ) );
  watch( `${getCurrentFolder()}/app/script/**/*.js`, { usePolling: true }, scriptForDev );
  watch( `${getCurrentFolder()}/app/sass/**/*.sass`, { usePolling: true }, sassForDev );
  watch( [ `${getCurrentFolder()}/app/*.html` ], { usePolling: true }, html );
}

export { clearcache, html, sassForDev, sassForProd, scriptForDev, scriptForProd, convertToWebp, copyWebp, convertToWoff2, copyWoff2, getCurrentFolder };

export const build = series( removedist, html, sassForProd, scriptForProd, convertToWebp, copyWebp, convertToWoff2, copyWoff2 );

export default series( clearcache, html, sassForDev, scriptForDev, convertToWebp, copyWebp, convertToWoff2, copyWoff2, parallel( browsersync, startwatch ) );
