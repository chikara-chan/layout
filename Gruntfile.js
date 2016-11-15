module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: 'dist',
            docs: 'docs/dist'
        },

        // CSS build configuration
        scsslint: {
            options: {
                bundleExec: true,
                config: 'scss/.scss-lint.yml',
                reporterOutput: null
            },
            core: {
                src: ['scss/*.scss', '!scss/_normalize.scss']
            },
            docs: {
                src: ['docs/assets/scss/*.scss', '!docs/assets/scss/docs.scss']
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie9,-properties.zeroUnits',
                sourceMap: true,
                // sourceMapInlineSources: true,
                advanced: false
            },
            core: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            },
            docs: {
                files: [{
                    expand: true,
                    cwd: 'docs/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'docs/assets/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['dist-css']
            }
        },

        exec: {
            postcss: {
                command: 'npm run postcss'
            }
        },

    });


    grunt.registerTask('test-scss', ['scsslint:core']);

    require('./grunt/bs-sass-compile/libsass.js')(grunt);

    grunt.registerTask('sass-compile', ['sass:core', 'sass:extras', 'sass:docs']);
    grunt.registerTask('dist-css', ['sass-compile', 'exec:postcss', 'cssmin:core', 'cssmin:docs']);
    grunt.registerTask('build', ['clean:dist', 'dist-css']);

};
