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

        $('#footer').show();


        /*
                if (userService.getLogin()) {
                    $location.path("/userHomePage");
                }*/

        self.isLogin = function () {
            return userService.getLogin();
        };
        self.imageURL = [];
        self.init = function () {
            self.counter = userService.getTotalNumberOfPOI();
            $('#counter').text(self.counter);
            $('#footer').show();

            POIService.getAllPOI().then(function (response) {
                self.allPOI = response.data;
                for (let i = 0; i < self.allPOI.length; i++) {
                    if (userService.isPOIExist(self.allPOI[i].name)) {
                        self.imageURL[self.allPOI[i].name] = "starFull.png";
                    } else {
                        self.imageURL[self.allPOI[i].name] = "starEmpty.png";

                    }
                }
            }).catch(err => console.log(err));
        };

        self.orderByRank = function () {
            if (self.isOrderByRank) {
                self.isOrderByRank = false;
            } else {
                self.isOrderByRank = true;
            }
        };

        self.showInformation = false;
        self.description = "";
        self.rank = "";
        self.numberOfWatchers = "";
        self.firstReview = "";
        self.firstReviewDate = "";
        self.firstReviewRank = "";
        self.secondReview = "";
        self.secondReviewDate = "";
        self.secondReviewRank = "";
        self.isExistReviews = false;
        self.isExistSecondReviews = false;
        self.poiInformation = "";
        self.getPOInformation = function (poi) {
            self.poiInformation = poi;
            var index = self.allPOI.indexOf(poi);
            var poiName = self.allPOI[index].name;
            self.showInformation = true;
            POIService.getPOInformation(poiName).then(function (response) {
                self.description = response.data[0].description;
                self.rank = response.data[0].rank;
                self.numberOfWatchers = response.data[0].number_of_watchers;

                if (response.data[0].review != null) {
                    self.isExistReviews = true;
                    for (let i = 0; i < response.data.length && i < 2; i++) {
                        if (i == 0){
                            self.firstReview = response.data[i].review;
                            self.firstReviewDate = response.data[i].date;
                            self.firstReviewDate = self.firstReviewDate.substring(0,10);
                            self.firstReviewRank = response.data[i].reviewRank;}
                        if (i == 1){
                            self.secondReview = response.data[i].review;
                            self.secondReviewDate = response.data[i].date;
                            self.secondReviewDate = self.secondReviewDate.substring(0,10);
                            self.secondReviewRank = response.data[i].reviewRank;
                            self.isExistSecondReviews = true;
                        }
                    }
                }
            }).catch(err => console.log(err));
        };

        self.reset = function (){
            self.firstReview = "";
            self.firstReviewDate = "";
            self.firstReviewRank = "";
            self.secondReview = "";
            self.secondReviewDate = "";
            self.secondReviewRank = "";
            self.isExistReviews = false;
            self.isExistSecondReviews = false;
        };
        self.counter = 0;
        self.clickFavorite = function (poi) {
            var index = self.allPOI.indexOf(poi);
            if (self.imageURL[self.allPOI[index].name] === "starEmpty.png") {
                //self.imageSource = "starFull.png";
                self.imageURL[self.allPOI[index].name] = "starFull.png";
                userService.addUserPOI(self.allPOI[index]);

            } else {
                //self.imageSource = "starEmpty.png";
                if(userService.isPOIExistInServer(self.allPOI[index].name)){
                    $window.alert("This point already saved. you can't remove it");
                    return;
                }
                self.imageURL[self.allPOI[index].name] = "starEmpty.png";
                userService.removeUserPOI(self.allPOI[index].name);
            }


            self.counter = userService.getTotalNumberOfPOI();
            $('#counter').text(self.counter);
        };

        self.clickFavoriteFromModal = function (poi) {
            var index = self.allPOI.indexOf(poi);
            if (self.imageURL[self.allPOI[index].name] === "starEmpty.png") {
                //self.imageSource = "starFull.png";
                self.imageURL[self.allPOI[index].name] = "starFull.png";
                userService.addUserPOI(self.allPOI[index]);
                $('#favoriteButton').text('UnSave to favorite');
            } else {
                //self.imageSource = "starEmpty.png";
                self.imageURL[self.allPOI[index].name] = "starEmpty.png";
                userService.removeUserPOI(self.allPOI[index].name);
                $('#favoriteButton').text('Save to favorite');
            }

        };

        self.selectedSort = "category";
        self.isOrderByRank = false;
        self.isOrderByCategory = true;
        self.orderBy = function () {
            if (self.selectedSort == "rank") {
                self.isOrderByRank = true;
                self.isOrderByCategory = false;
                if (self.selectedFilter != "") {
                    self.isOrderByRank = false;
                    self.isOrderByCategory = false;
                }
            } else {
                self.isOrderByRank = false;
                self.isOrderByCategory = true;
                if (self.selectedFilter != "") {
                    self.isOrderByRank = false;
                    self.isOrderByCategory = false;
                }
            }
        };

        self.selectedFilter = "";
        self.isFiltered = false;
        self.filterBy = function () {
            if (self.selectedFilter == "") {
                self.isFiltered = false;
                self.orderBy();
            } else {
                self.isFiltered = true;
                self.isOrderByRank = false;
                self.isOrderByCategory = false;

            }
        };

        self.review = "";
        self.reviewRank = "";
        self.addReview = function () {
            var data = {
                'name': self.tempPOI.name,
                'review': self.review,
                'rank': self.reviewRank
            }
            POIService.addReview(data).then(function (response) {
                self.showReview = false;
                $('#reviewModal').modal('hide');
                $location.path('/');
            }).catch(error => console.log(error))

        };

        self.tempPOI = "";
        self.showReview = false;
        self.savePOI = function (poi) {
            self.tempPOI = poi;
            self.showReview = true;
        };

        self.searchPOI = "";
        self.poiNameSeach = "";
        self.search = function () {
            if (self.searchPOI == "") {
                self.poiNameSeach = "";
                return;
            }
            for (let i = 0; i < self.allPOI.length; i++) {
                if (self.allPOI[i].name.toUpperCase() == self.searchPOI.toUpperCase()) {
                    self.poiNameSeach = self.allPOI[i].name;
                    return;
                }
            }
            $window.alert("Sorry we didn't match any result to your search. Please try something else")

        };
    }])
;