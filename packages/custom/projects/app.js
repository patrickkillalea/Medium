'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Projects = new Module('projects');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Projects.register(function(app, auth, database, circles, swagger) {

    //We enable routing. By default the Package Object is passed to the routes
    Projects.routes(app, auth, database);

    Projects.aggregateAsset('css', 'projects.css');

    //We are adding a link to the main menu for all authenticated users
    Projects.menus.add({
        title: 'Projects',
        link: 'all projects',
        roles: ['all'],
        menu: 'main'
    });

    Projects.events.defaultData({
        type: 'post',
        subtype: 'project'
    });

    /**
      //Uncomment to use. Requires meanio@0.3.7 or above
      // Save settings with callback
      // Use this for saving data from administration pages
      Projects.settings({
          'someSetting': 'some value'
      }, function(err, settings) {
          //you now have the settings object
      });

      // Another save settings example this time with no callback
      // This writes over the last settings.
      Projects.settings({
          'anotherSettings': 'some value'
      });

      // Get settings. Retrieves latest saved settigns
      Projects.settings(function(err, settings) {
          //you now have the settings object
      });
      */

    return Projects;
});