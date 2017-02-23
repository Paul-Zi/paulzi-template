module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pug: {
            options: {
                pretty: true
            },
            frontend: {
                files: [{
                    cwd: 'src/pug',
                    src: ['*.pug', '!_*.pug'],
                    dest: '.',
                    expand: true,
                    ext: '.html'
                }]
            }
        },
        sass: {
            frontend: {
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'IE >= 9', 'Safari >= 5.1', 'Opera >= 15', 'Android >= 4', 'iOS >= 5.1']
                    })
                ]
            },
            frontend: {
                src: 'css/*.css'
            }
        },
        cssmin: {
            frontend: {
                files: [{
                    expand: true,
                    cwd: 'dest/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        eslint: {
            frontend: {
                src: ['src/js/**/*.js']
            }
        },
        jsBuild: {
            frontend: {
                src: 'src/js',
                dest: 'js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            frontend: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'js',
                    ext: '.min.js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('gruntify-eslint');
    grunt.loadNpmTasks('grunt-js-build');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('frontend:pug', ['pug:frontend']);
    grunt.registerTask('frontend:js', ['eslint:frontend', 'jsBuild:frontend']);
    grunt.registerTask('frontend:css', ['sass:frontend', 'postcss:frontend']);

    grunt.registerTask('frontend', ['frontend:css', 'cssmin:frontend', 'frontend:js', 'uglify:frontend']);
    grunt.registerTask('default', ['frontend']);
};