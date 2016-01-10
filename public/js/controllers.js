'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

controllers.controller('AppCtrl', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/api/name'
    }).
        success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!';
        });

});

controllers.controller('MainCtrl', ['$scope', '$http', 'InformationParserService',
    function ($scope, $http, InformationParserService) {
        $scope.textToAnalyze = "";
        $scope.loadingComplete = true;
        $scope.analyze = function (type) {

            if (type === 'all') {
                $scope.loadingComplete = false;
                $http({
                    method: 'POST',
                    url: '/api/entities',
                    data: {
                        text: $scope.textToAnalyze
                    }
                }).then(function (response) {
                    var arrayObj = InformationParserService.getEntityData(response.data);
                    $scope.ent_response = response.data;
                    $scope.ent_labels = arrayObj.texts;
                    $scope.ent_data = [arrayObj.counts, arrayObj.relevances, arrayObj.sentiment_scores];
                    $scope.ent_series = ['Counts', 'Relevances', 'Sentiment Scores'];
                    $scope.loadingComplete = true;
                }, function (err) {
                    $scope.loadingComplete = true;
                    $scope.error = 'Error!';
                });

                $http({
                    method: 'POST',
                    url: '/api/keywords',
                    data: {
                        text: $scope.textToAnalyze
                    }
                }).then(function (response) {
                    var arrayObj = InformationParserService.getKeywordData(response.data);
                    $scope.keyw_response = response.data;
                    $scope.keyw_labels = arrayObj.texts;
                    $scope.keyw_data = [arrayObj.relevances, arrayObj.sentiment_scores];
                    $scope.keyw_series = ['Relevances', 'Sentiment Scores'];
                    $scope.loadingComplete = true;
                }, function (err) {
                    $scope.loadingComplete = true;
                    $scope.error = 'Error!';
                });

                $http({
                    method: 'POST',
                    url: '/api/relations',
                    data: {
                        text: $scope.textToAnalyze
                    }
                }).then(function (response) {
                    var arrayObj = InformationParserService.getRelationData(response.data);
                    $scope.rel_response = arrayObj.all;
                    $scope.rel_sentences = arrayObj.sentences;
                    $scope.rel_subjects = arrayObj.subjects;
                    $scope.rel_actions = arrayObj.actions;
                    $scope.rel_objects = arrayObj.objects;
                    $scope.rel_locations = arrayObj.locations;
                    $scope.loadingComplete = true;
                }, function (err) {
                    $scope.loadingComplete = true;
                    $scope.error = 'Error!';
                });

                $http({
                    method: 'POST',
                    url: '/api/concepts',
                    data: {
                        text: $scope.textToAnalyze
                    }
                }).then(function (response) {
                    var arrayObj = InformationParserService.getConceptData(response.data);
                    $scope.con_response = arrayObj.all;
                    $scope.con_texts = arrayObj.texts;
                    $scope.con_relevances = [arrayObj.relevances];
                    $scope.loadingComplete = true;
                }, function (err) {
                    $scope.error = 'Error!';
                    $scope.loadingComplete = true;
                });

                $http({
                    method: 'POST',
                    url: '/api/text-category',
                    data: {
                        text: $scope.textToAnalyze
                    }
                }).then(function (response) {
                    var obj = InformationParserService.getTextCategoryData(response.data);
                    $scope.txt_cat_response = obj.all;
                    $scope.txt_cat_category = obj.category;
                    $scope.txt_cat_score = obj.score * 100;
                    $scope.txt_cat_progressbar_style = {width: obj.score * 100 + '%'};
                    $scope.loadingComplete = true;
                }, function (err) {
                    $scope.loadingComplete = true;
                    $scope.error = 'Error!';
                });

            }

        };
    }]);

controllers.controller('MyCtrl2', function ($scope) {
    // write Ctrl here

});
