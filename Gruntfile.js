module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'webroot/styles/styles.css': 'scss/styles.scss'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    },
                    pretty: true
                },
                files: {
                    'webroot/index.html': "jade/index.jade"
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'webroot/scripts/main.js': ['scripts/**/*.js']
                },
                options: {
                    debug: false
                }
            },
            dev: {
                files: {
                    'webroot/scripts/main.js': ['scripts/**/*.js']
                },
                options: {
                    debug: true
                }
            }
        },
        watch: {
            scss: {
                files: 'scss/*.scss',
                tasks: ['sass']
            },
            jade: {
                files: 'jade/*.jade',
                tasks: ['jade']
            },
            scripts: {
                files: 'scripts/**/*.js',
                tasks: ['browserify:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['sass']);
};