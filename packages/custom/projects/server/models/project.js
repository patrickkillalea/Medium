'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    },
    rank: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
});

/**
 * Validations
 */
ProjectSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

ProjectSchema.path('content').validate(function(content) {
    return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
ProjectSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Project', ProjectSchema);