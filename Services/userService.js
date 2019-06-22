angular.module('myApp').service('userService', ['$window', '$http' ,function ($window, $http) {
    let self = this;
    self.isLogin = false;
    self.user_name = "Guest";

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


}]);