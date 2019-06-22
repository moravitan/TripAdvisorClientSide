angular.module("myApp").controller('defaultHomePageController', ['userService', 'loginService', 'POIService', '$window', '$location'
    ,'$rootScope', function (userService, loginService, POIService, $window, $location, $rootScope) {
        var self = this;
        self.isLogin = true;
        self.user_name = "";
        self.password = "";
        self.message = "";
        self.question = "";
        self.answer = "";
        self.userQuestions = [];
        self.POIName = "";
        self.POI = "";
        self.allPOI = [];
        self.isOrderByRank = false;


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
                $location.path('/userHomePage');

            }).catch(function (error) {
                console.log(error);
                self.message = "Your username or password is incorrect";
            });
        };

        self.setLoginNav = function(){
            self.isLogin = true;
        };

        self.getIsLogin = function (){
            return self.isLogin;
        };


        self.categoryName = "";
        self.sortByCategory = function () {
            POIService.getCategories().then(function(response){
                // TODO
            }).catch(err => console.log(err));
        };


        self.retrievePassword = function(){
            console.log("get");
            self.password = "";
            self.isLogin = false;
        };

        self.getQuestion = function(){
            console.log(self.user_name);
            if (self.userQuestions.length == 0) {
                userService.getUserQuestion(self.user_name).then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        var data = {"question": response.data[i].question};
                        self.userQuestions.push(data);
                    }
                }).catch(err => self.message = "user name doesn't exit")
            }
        };

        self.getPassword = function(){
            var data = {
                "user_name" : self.user_name,
                "question" : self.question.question,
                "answer" : self.answer
            }
            userService.retrievePassword(data).then(function (response){
                    self.message = "Your password is " + response.data;
            }).catch(err => self.message = "Are you sure this is the correct answer ?")
        };

        self.init = function () {
            POIService.getAllPOI().then(function (response){
                self.allPOI = response.data;
                console.log(self.allPOI);
            }).catch(err => console.log(err));
        };

        self.orderByRank = function () {
            console.log(self.isOrderByRank);
            if (self.isOrderByRank){
                self.isOrderByRank = false;
            }
            else{
                self.isOrderByRank = true;
            }
        };
    }]);