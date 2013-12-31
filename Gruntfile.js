module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'src/laroux.js',
                    'src/laroux.ajax.js',
                    'src/laroux.cookies.js',
                    'src/laroux.css.js',
                    'src/laroux.date.js',
                    'src/laroux.dom.js',
                    'src/laroux.events.js',
                    'src/laroux.forms.js',
                    'src/laroux.helpers.js',
                    'src/laroux.stack.js',
                    'src/laroux.storage.js',
                    'src/laroux.templates.js',
                    'src/laroux.timers.js',
                    'src/laroux.triggers.js',
                    'src/laroux.ui.js'
                ],
                dest: '<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/', src: ['**/*.css'], dest: './', filter: 'isFile' }
                ]
            }
        },
        clean: {
            dist: {
                src: [
                    '<%= pkg.name %>.js',
                    '<%= pkg.name %>.min.js',
                    '*.css'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy']);

};