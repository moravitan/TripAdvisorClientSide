let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function ($routeProvider) {

    $routeProvider
    // homepage
        .when('/', {
            // this is a template
            templateUrl: 'pages/defaultHomePage.html',
            controller: 'defaultHomePageController as defaultHomePageController'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about.html',
            controller: 'aboutController as abtCtrl'
        })
        // register
        .when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'registerController as registerController'
        })
        .when('/home', {
            templateUrl: 'pages/defaultHomePage.html',
            controller: 'defaultHomePageController as defaultHomePageController'
        })
        .when('/userHomePage', {
            templateUrl: 'pages/userHomePage.html',
            controller: 'userHomePageController as uHomeCtrl'
        })
        .when('/login', {
            // this is a template
            templateUrl: 'pages/login.html',
            controller: 'loginController as loginCtrl'
        })
        .when('/retrievePassword', {
            // this is a template
            templateUrl: 'pages/retrievePassword.html',
            controller: 'loginController as loginCtrl'
        })
        // other
        .otherwise({redirectTo: '/'});
});