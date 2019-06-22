angular.module('myApp').service('loginService', function ($http) {
    let self = this;
    self.login = function (data) {
        var req = {
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data,
            headers: {
                // 'Access-Control - Allow - Origin':'http:localhost:3000'
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS'
            }
        };
        return $http(req);
    };
});