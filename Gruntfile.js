var path = require('path');
module.exports = function (grunt) {

  grunt
  .initConfig({
    pkg: grunt.file.readJSON('package.json'),
    publicDir: 'public',
    serverDir: 'server',
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['public/**'], dest: 'dest/'}
        ],
      },
    },
    uglify: {
      my_production: {
        options: {
          sourceMap: true,
          sourceMapName: 'dest/public/app.map',
          mangle: {
            except: ['require', 'exports', 'module', 'window']
          },
          compress: {
            global_defs: {
              PROD: true
            },
            dead_code:true,
            pure_funcs: ["console.log","console.info"]
          }
        },
        files: {
          'output.js':[
            // Here should be the files need to be process
          ]
        }
      },
      my_dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'dest/public/app.map',
          beautify: true,
          mangle: {
            except: ['require', 'exports', 'module', 'window']
          }
        },
        files: {
          'output.js':[
            // Here should be the files need to be process
          ]
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'archive/archive.zip'
        },
        expand: true,
        cwd: 'dest/public',
        src: ['**/*'],
        dest: '/public'
      }
    },
    watch: {
      express: {
        files:  [ '<%= serverDir %>/**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      html: {
        tasks: ['copy', 'uglify'],
        options: {
          livereload: true
        },
        files: ['<%= publicDir %>/**/*.js', '<%= publicDir %>/**/*.html', '<%= publicDir %>/**/*.css', '<%= publicDir %>/**/img/**']
      }
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: '<%= serverDir %>/server.js'
        }
      },
      prod: {
        options: {
          script: '<%= serverDir %>/server.js',
          node_env: 'production'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', ['copy', 'uglify:my_dev', 'express:dev', 'watch']);
  grunt.registerTask('build', ['copy', 'uglify:my_production', 'compress']);

};
