'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

  // Initialize method
  initialize: function(){
    this.pkg = require('../package.json');
  },

  // Prompting before initialize scaffold
  prompting: function () {
    var done = this.async();

    // Have greet the user.
    this.log(yosay(
      'Welcome, let\'s generate a ' + chalk.blue('Web Starter Kit') + ' Scaffold out a mobile project that helps you build fast, modern mobile and browser web apps.'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?',
      default: 'Web Starter Kit',
    }];

    // Arguments Prompt
    this.prompt(prompts, function (props) {

      this.appName = props.appName;

      done();
    }.bind(this));
  },

  writing: {

    // packageJSON
    packageJSON: function () {
      this.template('_package.json', 'package.json');
    },

    // Files
    projectfiles: function () {

      // Create directories
      mkdirp('app');

      // Scripts
      this.fs.copy(
        this.templatePath('_docs'),
        this.destinationPath('docs')
      );

      this.fs.copy(
        this.templatePath('app/_scripts'),
        this.destinationPath('app/scripts')
      );

      // Styles
      this.directory(
        this.templatePath('app/_styles'),
        this.destinationPath('app/styles')
      );

      // Images
      this.directory(
        this.templatePath('app/_images'),
        this.destinationPath('app/images')
      );

      // HTML
      this.template('app/_index.html', 'app/index.html');
      this.template('app/_basic.html', 'app/basic.html');

      // Favicon.ico
      this.template('app/_favicon.ico', 'app/favicon.ico');

      // Editor Config
      this.template('editorconfig', '.editorconfig');

      // JSHint validate u javascript code
      this.template('babelrc', '.babelrc');

      // Text Files
      this.template('app/_humans.txt', 'app/humans.txt');
      this.template('app/_robots.txt', 'app/robots.txt');

      // Manifest
      this.template('app/_manifest.webapp', 'app/manifest.webapp');
      this.template('app/_manifest.json', 'app/manifest.json');

      // Service Worker
      this.template('app/_service-worker.js', 'app/service-worker.js');

      // Gulp
      this.template('_gulpfile.babel.js', 'gulpfile.babel.js');

    },
  },

  //  Run command install
  install: function () {

    this.installDependencies({
      skipInstall: this.options['skip-install']
    });

    this.on('end', function () {
        this.log(yosay(
          'Yeah! You\'re all set and done!' +
          ' Now simply run and start coding!'
        ));
        this.spawnCommand('gulp');
    });

  }

});
