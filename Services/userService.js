angular.module('myApp').service('userService', ['$window', '$http', function ($window, $http) {
    let self = this;
    self.isLogin = false;
    self.user_name = "Guest";
    self.userPOI = [];
    self.serverPOI = [];

    self.setLogin = function (login) {
        self.isLogin = login;
        if (self.isLogin) {
            self.user_name = $window.sessionStorage.getItem("user_name");
        } else {
            self.user_name = "Guest";
        }
    };
    self.getLogin = function () {
        // TODO : check token expiration
        return self.isLogin;
    };

    self.init = function (){
        self.getAllSavedInterest().then(function (response){
            self.serverPOI = response.data;
        }).catch (err => console.log(err));
    };

    self.getQuestions = function () {
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getQuestions',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS'
            }
        };
        return $http(req);
    };

    self.getUserQuestion = function (user_name) {
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getUserQuestion/' + user_name,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS'
            }
        };
        return $http(req);
    };


    self.retrievePassword = function (data) {
        var req = {
            method: 'POST',
            url: 'http://localhost:3000/getPassword',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS'
            },
            data: data
        };
        return $http(req);
    };

    self.getAllSavedInterest = function () {
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getSortedInterest',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS',
                'x-auth-token': $window.sessionStorage.getItem("token")
            }
        };
        return $http(req);
    };


    self.saveSortedInterest = function (poi) {
        var req = {
            method: 'PUT',
            url: 'http://localhost:3000/saveSortedInterest',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS',
                'x-auth-token': $window.sessionStorage.getItem("token")
            },
            data: poi
        };
        return $http(req);
    };

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

    self.getLastTwoSavedInterest = function () {
        var req = {
            method: 'GET',
            url: 'http://localhost:3000/getLastTwoSavedinterest',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS',
                'x-auth-token': $window.sessionStorage.getItem("token")
            }
        };
        return $http(req);
    };

    self.addUserPOI = function (poi) {
        self.userPOI.push(poi);
    };

    self.removeUserPOI = function (name) {
        for (let i = 0; i < self.userPOI.length; i++) {
            if (self.userPOI[i].name == name) {
                self.userPOI.splice(i, 1);

            }
        }
    };

    self.getUserPOI = function () {
        return self.userPOI;
    };

    self.getTotalNumberOfPOI = function(){
      return self.userPOI.length + self.serverPOI.length;
    };

    self.isPOIExist = function (name) {
        // check in local
        for (let i = 0; i < self.userPOI.length; i++) {
            if (self.userPOI[i].name == name) {
                return true;
            }
        }
        //check in server
        for (let i = 0; i < self.serverPOI.length; i++) {
            if (self.serverPOI[i].name == name) {
                return true;
            }
        }
        return false;
    };

    self.isPOIExistInServer = function (name) {
        for (let i = 0; i < self.serverPOI.length; i++) {
            if (self.serverPOI[i].name == name) {
                return true;
            }
        }
        return false;
    };
}]);