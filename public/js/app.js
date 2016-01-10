'use strict';

var myApp = angular.module('myApp', [
    'ngRoute',
    'chart.js',
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives'
]);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'MainCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
