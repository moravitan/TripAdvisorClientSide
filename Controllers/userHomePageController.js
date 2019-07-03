angular.module("myApp").controller('userHomePageController',['POIService', function (POIService) {

    var self = this;

    self.recommendedPOI = [];

    self.getRecommendedPOI = function(){
        POIService.getRecommendedPOI().then(function (response){
            self.recommendedPOI = response.data;
        }).catch(err => console.log(err));
    };

}]);