angular.module("myApp").controller('loginController', ['userService', 'loginService', 'POIService', '$window', '$location'
    , '$rootScope', function (userService, loginService, POIService, $window, $location, $rootScope) {

        var self = this;
        self.isLogin = true;
        self.user_name = "";
        self.password = "";
        self.message = "";
        self.question = "";
        self.answer = "";
        self.userQuestions = [];
        $('#footer').show();

        if (userService.getLogin()) {
            $location.path("/userHomePage");
        }

        self.login = function () {
            self.isLogin = true;
            var data = {"user_name": self.user_name, "password": self.password};
            loginService.login(data).then(function (response) {
                $window.sessionStorage.setItem("token", response.data);
                $window.sessionStorage.setItem("user_name", self.user_name);
                userService.setLogin(true);
                userService.init();
                $location.path('/userHomePage');

            }).catch(function (error) {
                console.log(error);
                self.message = "Your username or password is incorrect";
            });
        };

        self.setLoginNav = function () {
            self.isLogin = true;
            self.message = "";

        };

        self.getIsLogin = function () {
            return self.isLogin;
        };


        self.retrievePassword = function () {
            console.log("get");
            self.password = "";
            self.isLogin = false;
        };

        self.getQuestion = function () {
            var temp = [];
            console.log(self.user_name);
            userService.getUserQuestion(self.user_name).then(function (response) {
                console.log(response.data.length);
                for (let i = 0; i < response.data.length; i++) {
                    var data = {"question": response.data[i].question};
                    temp.push(data);
                }
                if (response.data.length == 0){
                    self.message = "user name doesn't exit"
                }
                else{
                    self.message = "";
                }
            }).catch(err => console.log(err));
            self.userQuestions = temp;

        };


        self.getPassword = function () {
            var data = {
                "user_name": self.user_name,
                "question": self.question.question,
                "answer": self.answer
            }
            userService.retrievePassword(data).then(function (response) {
                self.message = "Your password is " + response.data;
            }).catch(err => self.message = "Are you sure this is the correct answer ?")
        };


    }]);
