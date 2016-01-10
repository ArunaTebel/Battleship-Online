'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', []);
services.value('version', '0.1');

services.factory('InformationParserService', [function () {
    var o = {};
    o.getEntityData = function (obj) {
        var types = [];
        var relevances = [];
        var sentiment_types = [];
        var sentiment_scores = [];
        var counts = [];
        var texts = [];
        angular.forEach(obj.entities, function (value, key) {
            types.push(value.type);
            relevances.push(value.relevance);
            sentiment_types.push(value.sentiment.type);
            if (value.sentiment.type === "neutral") {
                sentiment_scores.push(0);
            } else {
                sentiment_scores.push(value.sentiment.score);
            }
            counts.push(value.count);
            texts.push(value.text);
        });
        return {
            types: types,
            relevances: relevances,
            sentiment_types: sentiment_types,
            sentiment_scores: sentiment_scores,
            counts: counts,
            texts: texts
        };
    };

    o.getKeywordData = function (obj) {
        var relevances = [];
        var sentiment_types = [];
        var sentiment_scores = [];
        var texts = [];
        angular.forEach(obj.keywords, function (value, key) {
            relevances.push(value.relevance);
            sentiment_types.push(value.sentiment.type);
            if (value.sentiment.type === "neutral") {
                sentiment_scores.push(0);
            } else {
                sentiment_scores.push(value.sentiment.score);
            }
            texts.push(value.text);
        });
        return {
            relevances: relevances,
            sentiment_types: sentiment_types,
            sentiment_scores: sentiment_scores,
            texts: texts
        };
    };

    o.getRelationData = function (obj) {
        var sentences = [];
        var subjects = [];
        var actions = [];
        var objects = [];
        var locations = [];
        angular.forEach(obj.relations, function (value, key) {
            sentences.push(value.sentence);
            subjects.push(value.subject);
            actions.push(value.action);
            objects.push(value.object);
            locations.push(value.location);
        });
        return {
            all: obj.relations,
            sentences: sentences,
            subjects: subjects,
            actions: actions,
            objects: objects,
            locations: locations
        };
    };

    o.getConceptData = function (obj) {
        var texts = [];
        var relevances = [];
        angular.forEach(obj.concepts, function (value, key) {
            texts.push(value.text);
            relevances.push(value.relevance);
        });
        return {
            all: obj.concepts,
            texts: texts,
            relevances: relevances
        };
    };

    o.getTextCategoryData = function (obj) {
        return obj;
    };
    return o;
}]);
