angular.module("myApp").controller('userHomePageController',['POIService', function (POIService) {

    var self = this;

    self.recommendedPOI = [];

    self.getRecommendedPOI = function(){
        POIService.getRecommendedPOI().then(function (response){
            for (let i = 0; i < response.data.length; i++) {
                var data = {
                    name : response.data[i].name,
                    picture : response.data[i].picture,
                    category : response.data[i].category,
                    rank : response.data[i].rank
                }
                self.recommendedPOI.push(data);
            }
        }).catch(err => console.log(err));
    };

}]);