angular.module('myApp').service('POIService', function ($http, $window) {
    let self = this;
    self.getAllPOI = function () {
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getAllPOI',
            headers: {
                // 'Access-Control - Allow - Origin':'http:localhost:3000'
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS',
            }
        };
        return $http(req);
    };


    self.getCategories = function () {
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getCategories',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS'
            }
        };
        return $http(req);
    }

    self.getRecommendedPOI = function(){
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getRecommendedInterest',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS',
                'x-auth-token' : $window.sessionStorage.getItem("token")
            }
        };
        return $http(req);
    };

    self.getRandomThreeMostPopularPointOfInterest = function(){
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getRandomThreeMostPopularPointOfInterest',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS'
            }
        }
        return $http(req);
    };


});
