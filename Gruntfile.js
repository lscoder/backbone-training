'use strict';

var path = require('path');

module.exports = function(grunt) {
  var _ = grunt.util._,
      buildUtil = require('./build/utils'),
      env = process.env.ENV = grunt.option('env') || process.env.ENV || 'dev',
      port = process.env.PORT = grunt.option('port') || process.env.PORT || 3000,
      targetPath = path.join(process.cwd(), '.target/' + env),
      serverPath = targetPath,
      clientPath = path.join(serverPath, 'public'),
      buildOnly = buildUtil.runBuildOnly(grunt),
      startServer = _.contains(grunt.cli.tasks, 'server'),
      open = startServer && !!grunt.option('open');

  if (buildOnly) {
    require('time-grunt')(grunt);
  }

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'build/grunt/tasks'),
    init: true,
    data: {
      pkg: grunt.file.readJSON('package.json'),
      port: port,
      targetPath: targetPath,
      serverPath: serverPath,
      clientPath: clientPath,
      open: open
    },
    loadGruntTasks: false
  });

  // Npm tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-notify');

  // Task(s)
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', function() {
    var copyNodeModules = !!grunt.option('copy-modules');

    grunt.task.run([
      'clean:target',
      'bower',
      'jshint:server',
      'jshint:client',
      'sass:' + env,
      'copy:pkg',
      'copy:procfile',
      'copy:server',
      'copy:clientHtml',
      'copy:clientScripts'
    ]);

    if (copyNodeModules) {
      grunt.task.run([
        'copy:nodeModules',
      ]);
    }

    grunt.task.run([
      'notify:build'
    ]);
  });

  grunt.registerTask('server', function() {
    grunt.task.run([
      'build',
      'concurrent'
    ]);
  });

  grunt.registerTask('test', function() {
    grunt.task.run([
      'build',
      'jasmine'
    ]);
  });
};
