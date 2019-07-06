angular.module("myApp").controller('myPOIController', ['userService', 'POIService', '$window', '$location',
    function (userService, POIService, $window, $location) {
        var self = this;

        self.userPOI = [];
        self.isExist = false;

        $('#footer').hide();

        /*
            self.init = function () {
                self.reset();
                self.temp = [];
                self.userPOI = [];
                self.temp = userService.getUserPOI();
                console.log(self.temp);
                userService.getAllSavedInterest().then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        self.temp.push(response.data[i]);
                    }
                    self.userPOI = self.temp;
                    if (self.userPOI.length > 0) {
                        self.isExist = true;
                    }
                    console.log(self.userPOI);
                }).catch(err => console.log(err));

            };
        */


        self.localPOI = [];
        self.serverPOI = [];

        self.init = function () {
            self.reset();
            self.localPOI = userService.getUserPOI();

            if (self.localPOI.length > 0) {
                for (let i = 0; i < self.localPOI.length; i++) {
                    self.userPOI.push(self.localPOI[i]);
                }
                self.isExist = true;
            }

            userService.getAllSavedInterest().then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    self.serverPOI.push(response.data[i]);
                }
                if (self.serverPOI.length > 0) {
                    for (let i = 0; i < self.serverPOI.length; i++) {
                        self.userPOI.push(self.serverPOI[i]);
                    }
                    self.isExist = true;
                }
            }).catch(err => console.log(err));


        };

        self.remove = function (index) {
            self.localPOI.splice(index, 1);

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
            var index = self.userPOI.indexOf(poi);
            var poiName = self.userPOI[index].name;
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

        self.saveToServer = function () {
            var poiNames = [];
            for (let i = 0; i < self.userPOI.length; i++) {
                poiNames[i] = self.userPOI[i].name;
            }
            var data = {
                'interests': poiNames
            }
            userService.saveSortedInterest(data).then(function (response) {
                $window.alert("all points saved to server");
            }).catch(err => console.log(err));
        };

        self.tempPOI = "";
        self.showChangeOrder = false;
        self.savePOI = function (poi) {
            self.tempPOI = poi;
            self.showChangeOrder = true;
        };


        self.order = "";

        self.changeOrder = function () {
            var index = parseInt(self.order);
            if (self.userPOI.indexOf(self.tempPOI) > -1) {
                var poiIndex = self.userPOI.indexOf(self.tempPOI);
                var temp = self.userPOI[index];
                self.userPOI[index] = self.tempPOI;
                self.userPOI[poiIndex] = temp;

/*                if (index + 1 < self.userPOI.length) {
                    var temp2 = self.userPOI[index + 1];
                }
                for (let i = index + 1; i < self.userPOI.length; i++) {
                    self.userPOI[i] = temp;
                    temp = temp2;
                }
                var temp2 = self.userPOI[0];
                for (let i = 0; i < index; i++) {
                    self.userPOI[i] = temp;
                    temp = temp2;
                }*/
            }

            $('#changeOrder').modal('hide');
            console.log(self.userPOI);

        };

        self.index = "";

        self.saveIndex = function (index) {
            self.index = index;
        };

    }]);