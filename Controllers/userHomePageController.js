angular.module("myApp").controller('userHomePageController', ['POIService', 'userService', '$window', '$location',
    function (POIService, userService, $window, $location) {

        var self = this;

        self.recommendedPOI = [];
        $('#footer').show();


        self.imageURL = [];
        self.init = function(){
            self.reset();
            self.getRecommendedPOI();
            self.getSavedPOI();
            self.counter = userService.getTotalNumberOfPOI();
            $('#counter').text(self.counter);
        };
        self.getRecommendedPOI = function () {

            self.counter = userService.getTotalNumberOfPOI();
            $('#counter').text(self.counter);
            userService.getRecommendedPOI().then(function (response) {
                self.recommendedPOI = response.data;
                for (let i = 0; i < self.recommendedPOI.length; i++) {
                    if (userService.isPOIExist(self.recommendedPOI[i].name)) {
                        self.imageURL[self.recommendedPOI[i].name] = "starFull.png";
                    } else {
                        self.imageURL[self.recommendedPOI[i].name] = "starEmpty.png";

                    }
                }
            }).catch(err => console.log(err));
        };
        self.existSaved = false;
        self.savedPOI = [];
        self.getSavedPOI = function(){
            userService.getLastTwoSavedInterest().then(function(response){
                self.savedPOI = response.data;
                if (self.savedPOI.length > 0){
                    self.existSaved = true;
                }
            }).catch(err => console.log(err));
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
            var index = self.recommendedPOI.indexOf(poi);
            var poiName = self.recommendedPOI[index].name;
            self.showInformation = true;
            POIService.getPOInformation(poiName).then(function (response) {
                self.description = response.data[0].description;
                self.rank = response.data[0].rank;
                self.numberOfWatchers = response.data[0].number_of_watchers;

                if (response.data[0].review != null) {
                    self.isExistReviews = true;
                    for (let i = 0; i < response.data.length && i < 2; i++) {
                        if (i == 0) {
                            self.firstReview = response.data[i].review;
                            self.firstReviewDate = response.data[i].date;
                            self.firstReviewDate = self.firstReviewDate.substring(0, 10);
                            self.firstReviewRank = response.data[i].reviewRank;
                        }
                        if (i == 1) {
                            self.secondReview = response.data[i].review;
                            self.secondReviewDate = response.data[i].date;
                            self.secondReviewDate = self.secondReviewDate.substring(0, 10);
                            self.secondReviewRank = response.data[i].reviewRank;
                            self.isExistSecondReviews = true;
                        }
                    }
                }
            }).catch(err => console.log(err));
        };

        self.reset = function () {
            self.firstReview = "";
            self.firstReviewDate = "";
            self.firstReviewRank = "";
            self.secondReview = "";
            self.secondReviewDate = "";
            self.secondReviewRank = "";
            self.isExistReviews = false;
            self.isExistSecondReviews = false;
        };

        self.clickFavorite = function (poi) {
            var index = self.recommendedPOI.indexOf(poi);
            if (self.imageURL[self.recommendedPOI[index].name] === "starEmpty.png") {
                //self.imageSource = "starFull.png";
                self.imageURL[self.recommendedPOI[index].name] = "starFull.png";
                userService.addUserPOI(self.recommendedPOI[index]);

            } else {
                //self.imageSource = "starEmpty.png";
                if (userService.isPOIExistInServer(self.recommendedPOI[index].name)) {
                    $window.alert("This point already saved. you can't remove it");
                    return;
                }
                self.imageURL[self.recommendedPOI[index].name] = "starEmpty.png";
                userService.removeUserPOI(self.recommendedPOI[index].name);
            }


            self.counter = userService.getTotalNumberOfPOI();
            $('#counter').text(self.counter);
        };

        self.clickFavoriteFromModal = function (poi) {
            var index = self.recommendedPOI.indexOf(poi);
            if (self.imageURL[self.recommendedPOI[index].name] === "starEmpty.png") {
                //self.imageSource = "starFull.png";
                self.imageURL[self.recommendedPOI[index].name] = "starFull.png";
                userService.addUserPOI(self.recommendedPOI[index]);
                $('#favoriteButton').text('UnSave to favorite');
            } else {
                //self.imageSource = "starEmpty.png";
                self.imageURL[self.recommendedPOI[index].name] = "starEmpty.png";
                userService.removeUserPOI(self.recommendedPOI[index].name);
                $('#favoriteButton').text('Save to favorite');
            }

        };

        self.tempPOI = "";
        self.showReview = false;
        self.savePOI = function (poi) {
            self.tempPOI = poi;
            self.showReview = true;
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

    }]);