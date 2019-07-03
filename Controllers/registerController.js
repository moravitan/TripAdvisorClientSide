angular.module("myApp").controller('registerController', ['registerService', 'userService', 'POIService', 'UserModel',
    function (registerService, userService, POIService, UserModel) {
        let self = this;
        self.loginState = false;
        self.user = new UserModel();
        self.user_categories = [];
        self.message = self.user.user_name;
        self.countries = [];
        self.questions = [];
        self.secondQuestions = [];
        self.categories = [];


        self.init = function () {
            var XMLhttp = new XMLHttpRequest();
            XMLhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    self.initialCountries(this);
                }
            };
            XMLhttp.open("GET", "./countries.xml", true);
            XMLhttp.send();

            self.initialCountries = function (xmlInput) {
                var temp = [];
                var xmlFile = xmlInput.responseXML;
                var xmlCountries = xmlFile.getElementsByTagName("Country");
                for (var i = 0; i < xmlCountries.length; i++) {
                    var data = xmlCountries[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue.toString();
                    var country = {"Name": data};
                    temp.push(country);
                }
                self.countries = temp;
                console.log(self.countries)
            };

            // get questions from the server
            userService.getQuestions().then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    var data = {"question": response.data[i].question};
                    self.questions.push(data);
                }
                console.log(self.questions);
            }).catch(error => console.log(error));

            // get categories from the server
            POIService.getCategories().then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    var data = {"Name": response.data[i], "checked": false};
                    self.categories.push(data);
                    self.user_categories.push(data);
                }

            }).catch(error => console.log(error));


        };
        self.register = function () {
            var questions = [self.user.questions[0].question, self.user.questions[1].question];
            var answers = [self.user.answers[0], self.user.answers[1]];
            var data = {
                user_name: self.user.user_name,
                password: self.user.password,
                first_name: self.user.first_name,
                last_name: self.user.last_name,
                country: self.user.country.Name,
                city: self.user.city,
                email: self.user.email,
                questions: questions,
                answers: answers,
                interest: self.c
            }
            console.log(data);
            registerService.register(data).then(function (response) {
                console.log(response);
            }).catch(error => console.log(error));

        };

        self.setSecondQuestion = function () {
            var temp = [];
            for (let i = 0; i < self.questions.length; i++) {
                if (self.questions[i].question != self.user.questions[0].question) {
                    temp.push(self.questions[i]);
                }
            }
            self.secondQuestions = temp;
        };
        self.c = [];
        self.selectCategory = function (select) {
            if (select.checked) {
                // self.user_categories.push(select.Name);
                self.c.push(select.Name);
            } else {
                var index = self.user_categories[select.Name];
                self.c.splice(index, 1);
            }
        };


    }]);
