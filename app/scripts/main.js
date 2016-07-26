$(function() {
    /* Questions constructor */
    var Question = function(questionText, correspondingIngredient) {
        var self = this;
        self.questionText = questionText;
        self.correspondingIngredient = correspondingIngredient;
        self.answer = ko.observable('false');
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

    /* Preferences constructor */
    var Preferences = function() {
        var self = this;
        self.preferenceList = ko.observableArray([]);
        self.test = 'test';
    };

    Preferences.prototype.addPreference = function(preference) {
        this.preferenceList.push(preference);
    };

    /* Pantry constructor */
    var Pantry = function() {
        var self = this;
    };

    /* Bartender constructor */
    var Bartender = function() {
        var self = this;
    };

    Bartender.prototype.createDrink = function() {};

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

        };
    };

    ko.applyBindings(new BarViewModel());
});
