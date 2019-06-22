angular.module("myApp").factory('UserModel', [function () {
    function User(object) {
        this.user_name = object.user_name;
        this.password = object.password;
        this.first_name = object.first_name;
        this.last_name = object.last_name;
        this.city = object.city;
        this.country = object.country;
        this.email = object.email;
        this.categories = object.categories;
        this.questions = object.questions;
        this.answers = object.answers;

    };

    function User() {
        this.user_name = "";
        this.password = "";
        this.first_name = "";
        this.last_name = "";
        this.city = "";
        this.country = "";
        this.email = "";
        this.categories = [];
        this.questions = [];
        this.answers = [];

    };
    return User;
}]);
