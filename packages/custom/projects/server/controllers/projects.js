'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Projects) {

    return {
        /**
         * Find project by id
         */
        project: function(req, res, next, id) {
            Project.load(id, function(err, project) {
                if (err) return next(err);
                if (!project) return next(new Error('Failed to load project ' + id));
                req.project = project;
                next();
            });
        },
        /**
         * Create an project
         */
        create: function(req, res) {
            var project = new Project(req.body);
            project.user = req.user;

            project.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the project'
                    });
                }

                Projects.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/projects/' + project._id,
                    name: project.title
                });

                res.json(project);
            });
        },
        /**
         * Update an project
         */
        update: function(req, res) {
            var project = req.project;

            project = _.extend(project, req.body);


            project.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the project'
                    });
                }

                Projects.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: project.title,
                    url: config.hostname + '/projects/' + project._id
                });

                res.json(project);
            });
        },
        /**
         * Delete an project
         */
        destroy: function(req, res) {
            var project = req.project;


            project.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the project'
                    });
                }

                Projects.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: project.title
                });

                res.json(project);
            });
        },
        /**
         * Show an project
         */
        show: function(req, res) {

            Projects.events.publish({
                action: 'viewed',
                name: req.project.title,
                url: config.hostname + '/projects/' + req.project._id
            });

            res.json(req.project);
        },
        /**
         * List of Projects
         */
        all: function(req, res) {
            var query = req.acl.query('Project');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, projects) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the projects'
                    });
                }

                res.json(projects)
            });

        }
    };
}