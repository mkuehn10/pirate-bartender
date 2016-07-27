$(function() {
    /* Questions constructor */
    var Question = function(questionText, correspondingIngredient) {
        var self = this;
        self.questionText = questionText;
        self.correspondingIngredient = correspondingIngredient;
        self.answer = ko.observable('null');
    };


    /* Ingredient constructor */
    var Ingredient = function(typeOfIngredient, listOfIngredients) {
        var self = this;
        self.typeOfIngredient = typeOfIngredient;
        self.listOfIngredients = listOfIngredients;
    };

    Ingredient.prototype.formattedList = function() {
        return this.listOfIngredients.join(', ');
    };

    Ingredient.prototype.generateRandomIngredient = function(preferences) {
        return this.listOfIngredients[getRandomInt(0, this.listOfIngredients.length)];
    };

    /* Preferences constructor */
    var Preferences = function() {
        var self = this;
        self.preferenceList = ko.observableArray([]);
        self.test = 'test';
    };

    Preferences.prototype.formattedPreferences = function() {
        return this.preferenceList().join(', ');
    };

    Preferences.prototype.addPreference = function(preference) {
        this.preferenceList.push(preference);
    };

    /* Bartender constructor */
    var Bartender = function() {
        var self = this;
        self.currentDrinkIngredients = ko.observableArray([]);
    };

    Bartender.prototype.createDrink = function(preferences) {
        // console.log(this.currentDrinkIngredients);
    };

    Bartender.prototype.compileIngredient = function(ingredient) {
        this.currentDrinkIngredients.push(ingredient);
    };

    Bartender.prototype.formattedIngredients = function() {
        return this.currentDrinkIngredients().join(', ');
    };

    /* Pantry constructor */
    var Pantry = function() {
        var self = this;
    };

    Pantry.prototype.takeItem = function(ingredient) {
    };

    var BarViewModel = function() {
        var self = this;

        self.currentCounter = ko.observable(0);

        self.questions = ko.observableArray(ko.utils.arrayMap(questionsData, function(question) {
            return new Question(question.questionText, question.correspondingIngredient);
        }));

        self.currentQuestion = ko.observable(self.questions()[self.currentCounter()]);

        self.ingredients = ko.observableArray(ko.utils.arrayMap(ingredientsData, function(ingredient) {
            return new Ingredient(ingredient.typeOfIngredient, ingredient.listOfIngredients);
        }));

        self.preferences = new Preferences();
        self.bartender = new Bartender();

        self.handleClick = function(data, event) {
            if (data.currentQuestion().answer() === 'true') {
                self.preferences.addPreference(data.currentQuestion().correspondingIngredient);
            }

            if (self.currentCounter() < self.questions().length) {
                self.currentCounter(self.currentCounter() + 1);

            }
            if (self.currentCounter() != self.questions().length) {
                self.currentQuestion(self.questions()[self.currentCounter()]);
            }

            if (self.currentCounter() === 5) {

                self.performBartending();
            }

        };

        self.performBartending = function() {
            self.ingredients().forEach(function(item) {
                if (self.preferences.preferenceList().includes(item.typeOfIngredient)) {
                    self.bartender.compileIngredient(item.generateRandomIngredient(self.preferences));
                }
            });
            self.bartender.createDrink();
        };
    };

    ko.applyBindings(new BarViewModel());

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };


});