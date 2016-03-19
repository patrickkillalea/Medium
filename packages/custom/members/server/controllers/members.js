'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Member = mongoose.model('Member'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Members) {

    return {
        /**
         * Find member by id
         */
        member: function(req, res, next, id) {
            Member.load(id, function(err, member) {
                if (err) return next(err);
                if (!member) return next(new Error('Failed to load member ' + id));
                req.member = member;
                next();
            });
        },
        /**
         * Create an member
         */
        create: function(req, res) {
            var member = new Member(req.body);
            member.user = req.user;

            member.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the member'
                    });
                }

                Members.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/members/' + member._id,
                    name: member.title
                });

                res.json(member);
            });
        },
        /**
         * Update an member
         */
        update: function(req, res) {
            var member = req.member;

            member = _.extend(member, req.body);


            member.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the member'
                    });
                }

                Members.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: member.title,
                    url: config.hostname + '/members/' + member._id
                });

                res.json(member);
            });
        },
        /**
         * Delete an member
         */
        destroy: function(req, res) {
            var member = req.member;


            member.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the member'
                    });
                }

                Members.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: member.title
                });

                res.json(member);
            });
        },
        /**
         * Show an member
         */
        show: function(req, res) {

            Members.events.publish({
                action: 'viewed',
                name: req.member.title,
                url: config.hostname + '/members/' + req.member._id
            });

            res.json(req.member);
        },
        /**
         * List of Members
         */
        all: function(req, res) {
            var query = req.acl.query('Member');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, members) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the members'
                    });
                }

                res.json(members)
            });

        }
    };
}