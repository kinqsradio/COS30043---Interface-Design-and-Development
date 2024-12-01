new Vue({
    el: '#app',
    data: {
        randomNumber: 0,
        userGuess: null,
        message: "Start guessing",
    },
    methods: {
        generateRandomNumber() {
            // Generate a random number between 1 and 100
            this.randomNumber = Math.floor(Math.random() * 100) + 1;
        },
        checkGuess() {
            if (this.userGuess === null || this.userGuess === '') {
                this.message = "Please enter a number.";
                return;
            }
            if (this.userGuess < this.randomNumber) {
                this.message = "Guess higher.";
            } else if (this.userGuess > this.randomNumber) {
                this.message = "Guess lower.";
            } else {
                this.message = "You got it!";
            }
        },
        giveUp() {
            this.message = `The number was: ${this.randomNumber}`;
        },
        startOver() {
            this.generateRandomNumber();
            this.userGuess = null;
            this.message = "Start guessing";
        }
    },
    mounted() {
        // Initialize the random number when the app loads
        this.generateRandomNumber();
    }
});
