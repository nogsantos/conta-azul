/**
 * Grunt v0.1.0 
 */
(function () {
    "use strict";
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
            dist: "./dist",
            bumpup: {
                options: {
                    dateformat: 'DD-MM-YYYY HH:mm',
                    normalize: true,
                    updateProps: {
                        pkg: 'package.json'
                    }
                },
                setters: {
                    timestamp: () => new Date()
                },
                file: 'package.json'
            },
            shell: {
                options: {
                    stderr: false
                },
                dist: {
                    command: () => 'au build --env prod'
                },
                test: {
                    command: () => 'au build'
                },
                dev: {
                    command: () => 'au run --watch'
                },
                version: {
                    command: v => `echo ${v} > VERSION`
                }
            },
            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        '<%=dist%>/index.html': './index.html'
                    }
                }
            },
            copy: {
                main: {
                    files: [{
                        expand: true,
                        cwd: '.',
                        src: ['scripts/*-bundle.js'],
                        dest: '<%=dist%>/'
                    }, {
                        expand: true,
                        cwd: '.',
                        src: ['img/**'],
                        dest: '<%=dist%>/'
                    }],
                },
            }
        });
        grunt.loadNpmTasks('grunt-bumpup');
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.registerTask('build', (ambiente, versao) => {
            defineVersao(versao);
            defineAmbiente(ambiente);
        });

        function defineVersao(versao) {
            if (typeof versao !== "undefined") {
                switch (versao) {
                    case 'major':
                    case 'maior':
                    case '>':
                        grunt.task.run(`bumpup:major`);
                        grunt.task.run('atualiza-versao');
                        break;
                    case 'minor':
                    case 'menor':
                    case '<':
                        grunt.task.run(`bumpup:minor`);
                        grunt.task.run('atualiza-versao');
                        break;
                    case 'patch':
                    case 'correcao':
                        grunt.task.run(`bumpup:patch`);
                        grunt.task.run('atualiza-versao');
                        break;
                    case 'test':
                        grunt.task.run(`bumpup:build`);
                        break;
                    default:
                        help();
                        break;
                }
            } else {
                grunt.log.writeln('Versão não definida, continuará a mesma: ' + grunt.config.process('<%= pkg.version %>'));
            }
        }

        function defineAmbiente(ambiente) {
            if (typeof ambiente !== "undefined") {
                switch (ambiente) {
                    case "producao":
                    case "prod":
                        grunt.task.run('build-env-dist');
                        break;
                    case "teste":
                    case "test":
                        grunt.task.run('build-env-test');
                        break;
                    case "desenvolvimento":
                    case "dev":
                        grunt.task.run('build-env-dev');
                        break;
                }
            } else {
                grunt.log.writeln('Ambiente não definido');
            }
        }
        grunt.registerTask('atualiza-versao', () => grunt.task.run(`shell:version:${grunt.config.process('<%= pkg.version %>')}`));
        grunt.registerTask('build-env-dist', () => {
            grunt.task.run('shell:dist');
            grunt.task.run('htmlmin');
            grunt.task.run('copy');
        });
        grunt.registerTask('build-env-test', () => grunt.task.run('shell:test'));
        grunt.registerTask('build-env-dev', () => grunt.task.run('shell:dev'));
        grunt.registerTask('default', () => help());
        grunt.registerTask('help', () => help());

        function help() {
            grunt.log.subhead("Para gerar o projeto, informe como parâmetro as possíveis opções abaixo:");
            grunt.log.writeln("\t Versão: ");
            grunt.log.writeln("\t\t - Maior:");
            grunt.log.writeln("\t\t\t Opções: major, maior ou símbolo >");
            grunt.log.writeln("\t\t - Menor:");
            grunt.log.writeln("\t\t\t Opções: minor, menor ou símbolo <");
            grunt.log.writeln("\t\t - Correção:");
            grunt.log.writeln("\t\t\t Opções: patch ou correcao");
            grunt.log.writeln("\t Ex.: ");
            grunt.log.writeln("\t\t - $ grunt build:[ambiente]:[versao]");
            grunt.fail.warn('Chamada incorreta');
        }
    };
}());
