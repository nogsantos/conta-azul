import * as project from '../aurelia.json';
import * as gulp from 'gulp';
import * as del from 'del';
import * as typescript from 'gulp-typescript';
import * as tsConfig from '../../tsconfig.json';
import { CLIOptions } from 'aurelia-cli';

import { webdriver_update, protractor } from 'gulp-protractor';

function clean() {
    return del(project.e2eTestRunner.dist + '*');
}

function build() {
    var typescriptCompiler = typescriptCompiler || null;
    if (!typescriptCompiler) {
        delete tsConfig.compilerOptions.lib;
        typescriptCompiler = typescript.createProject(Object.assign({}, tsConfig.compilerOptions, {
            module: 'commonjs'
        }));
    }
    return gulp.src(project.e2eTestRunner.typingsSource.concat(project.e2eTestRunner.source))
        .pipe(typescript(typescriptCompiler))
        .pipe(gulp.dest(project.e2eTestRunner.dist));
}

function e2e() {
    return gulp.src(project.e2eTestRunner.dist + '**/*.js').pipe(
        protractor({
            configFile: 'protractor.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:9000']
        }))
        .on('end', () => {
            process.exit();
        })
        .on('error', e => {
            console.log(e.message);
        });
}

export default gulp.series(
    webdriver_update,
    clean,
    build,
    e2e
);
