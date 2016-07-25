$(function () {

    /* Questions constructor */
    var Question = function(questionText, correspondingIngredient) {
        var self = this;

        self.questionText = questionText;
        self.correspondingIngredient = correspondingIngredient;
    };

    /* Ingredient constructor */
    var Ingredient = function(typeOfIngredient, listOfIngredients) {
        var self = this;

        self.typeOfIngredient = typeOfIngredient;
        self.listOfIngredients = listofIngredients;
    };

    /* Pantry constructor */
    var Pantry = function() {
        var self = this;
    };

    /* Bartender constructor */
    var Bartender = function() {
        var self = this;

        self.createDrink = function() {

        };
    };

    var BarViewModel = function() {
        var self = this;

        self.questions = [];
        self.ingredients = [];

        self.initializeQuestions = function(questions) {
            ko.utils.arrayForEach(questions, function(question) {
                self.questions.push(new Question(question.questionText, question.correspondingIngredient));
            });
        };

        self.initializeQuestions(questionsData);


    };

    ko.applyBindings(new BarViewModel());
});
