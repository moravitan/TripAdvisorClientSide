angular.module("myApp").controller('defaultHomePageController', ['userService', 'loginService', 'POIService', '$window', '$location'
    , function (userService, loginService, POIService, $window, $location) {
        var self = this;

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

        /*
                if (userService.getLogin()) {
                    $location.path("/userHomePage");
                }*/

        self.isLogin = function () {
            return userService.getLogin();
        };
        self.imageURL = [];
        self.init = function () {
            POIService.getAllPOI().then(function (response) {
                self.allPOI = response.data;
                console.log(self.allPOI);
                for (let i = 0; i < self.allPOI.length; i++) {
                    self.imageURL[i] = "starEmpty.png";
                }
            }).catch(err => console.log(err));
        };

        self.orderByRank = function () {
            console.log(self.isOrderByRank);
            if (self.isOrderByRank) {
                self.isOrderByRank = false;
            } else {
                self.isOrderByRank = true;
            }
        };

        self.POInformation = "";
        self.getInformation = function (poiIndex) {
            var poiName = self.allPOI[poiIndex].name;
            console.log(poiName);
            POIService.getPOInformation(poiName).then(function (response) {
                self.POInformation = response.data[0].description;
                console.log(self.POInformation);
                $location.path('/POInformation');
            }).catch(err => console.log(err));

        };

        self.show = false;
        self.description = "";
        self.rank = "";
        self.getPOInformation = function (index) {
            var poiName = self.allPOI[index].name;
            self.show = true;
            POIService.getPOInformation(poiName).then(function (response) {
                self.description = response.data[0].description;
                self.rank = response.data[0].rank;
                console.log(self.POInformation);
            }).catch(err => console.log(err));

        };

        self.changeURL = function (index) {
            if (self.imageURL[index] === "starEmpty.png") {
                //self.imageSource = "starFull.png";
                self.imageURL[index] = "starFull.png";
                userService.addUserPOI(self.allPOI[index]);
            } else {
                //self.imageSource = "starEmpty.png";
                self.imageURL[index] = "starEmpty.png";
                userService.removeUserPOI(index);
            }
        };
    }]);