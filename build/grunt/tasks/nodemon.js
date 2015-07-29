'use strict';

module.exports = function(grunt, options) {
  return {
    server: {
      script: '<%= serverPath %>/index.js',
      options: {
        nodeArgs: ['--debug'],
        //ignore: ['<%= clientPath %>'],
        watch: ['<%= serverPath %>'],
        callback: function(nodemon) {
          nodemon.on('log', function(event) {
            console.log(event.colour);
          });

          // Opens browser on initial server start
          nodemon.on('config:update', function() {
            if (!options.open) {
              return;
            }

            // Delay before server listens on port
            setTimeout(function() {
              require('open')('http://localhost:' + options.port);
            }, 1000);
          });

          // refreshes browser when server reboots
          // nodemon.on('restart', function() {
          //   setTimeout(function() {
          //     require('fs').writeFileSync('.grunt/rebooted', 'rebooted');
          //   }, 1000);
          // });
        }
      }
    }
  };
};
