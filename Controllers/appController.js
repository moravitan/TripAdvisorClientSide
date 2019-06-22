angular.module("myApp").controller('appController', ['userService', 'POIService', '$window', '$location', '$rootScope',
    function (userService, POIService, $window, $location, $rootScope) {
        let self = this;
        self.user_name = "Guest";
        self.explore = [];
        self.isLogin = function () {
            if (userService.getLogin()) {
                console.log($window.sessionStorage.getItem("user_name"));
                self.user_name = $window.sessionStorage.getItem("user_name");
                return true;
            }
        };
        self.signOut = function () {
            userService.setLogin(false);
            self.user_name = "Guest";
            $location.path('/defaultHomePage')

        };
        POIService.getAllPOI().then(function (response){
            $rootScope.POI = response.data;
        }).catch(err => console.log(err));
        // userService.getQuestions().then().catch(err => console.log(err));
        // userService.getCategories().then().catch(err => console.log(err));

        self.userPOI = function () {

        };

        self.login = function(){
          $location.path('/login');
        };

        self.init = function (){
            POIService.getRandomThreeMostPopularPointOfInterest().then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    self.explore.push(response.data[i]);
                }
            }).catch(err => console.log(err));
        };

        self.search = function () {
            var POI = $rootScope.POI;
            for (let i = 0; i <POI.length; i++) {
                if (POI[i].name.equals(self.POIName)){
                    self.POI = "found";
                    return;
                }
            }
            self.POI = "not found";        };

    }]);