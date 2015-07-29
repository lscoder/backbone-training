require.config({
  baseUrl: 'scripts/app',
  paths: {
    'jquery': '../lib/jquery/jquery',
    'requirejs': '../lib/requirejs/require',
    'domReady': '../lib/requirejs-domready/domReady',
    'underscore': '../lib/underscore/underscore',
    'backbone': '../lib/backbone/backbone'
  },
  shim: {
  },
  deps: ['app']
});
