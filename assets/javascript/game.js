var currentGuessedWordDisplay = '';
var currentGuessedWord = '';
var holder = '';

var hangman = {
    listWords: ['pacman', 'tetris', 'war', 'donkey kong', 'centipede'],
    currentWord: '',
    currentGuess: '',
    numberWin: 0,
    numberLoss: 0,
    startText: "Press any key to get started!",
    successText: "Congratulations!  You Guessed Correctly!",
    failText: "You failed to guess the word correctly.",
    numberGuessesRemaining: 10,
    listGuess: [],
    listLettersGuessed: [],

    // Choose Word
    chooseWord: function() {
        var index = Math.floor(Math.random() * this.listWords.length);
        this.currentWord = this.listWords[index];
        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === ' ') {
                this.listGuess.push('$');
            } else {
                this.listGuess.push('_');
            }
        }
    },

    // Search Current Word for letter and return update Current Guess
    searchWord: function(userGuess) {
        for (var ii = 0; ii < this.currentWord.length; ii++) {
            if (userGuess === this.currentWord.charAt(ii)) {
                this.listGuess[ii] = userGuess;
            }
        }
        this.numberGuessesRemaining--;
        if (this.listLettersGuessed.indexOf(userGuess) === -1) {
            this.listLettersGuessed.push(userGuess);
        } else {
            this.numberGuessesRemaining++
        }
        this.currentGuess = this.listGuess.join(' ');
        return this.currentGuess;
    },

    // Reset counters and choose another word
    resetGame: function() {
        this.currentWord = '';
        this.currentGuess = '';
        this.numberGuessesRemaining = 10;
        this.listGuess = [];
        this.listLettersGuessed = [];
        this.chooseWord();
        currentGuessedWordDisplay = this.listGuess.join(' ');
        if (currentGuessedWordDisplay.indexOf('$') !== -1) {
            currentGuessedWordDisplay = currentGuessedWordDisplay.replace('$', '&nbsp;');
        }
    }

};

// Initialize script and output to html
hangman.resetGame();
document.querySelector("#winsOutput").innerHTML = hangman.numberWin;
document.querySelector("#lossesOutput").innerHTML = hangman.numberLoss;
document.querySelector("#currentWordOutput").innerHTML = currentGuessedWordDisplay;
document.querySelector("#guessesRemainingOutput").innerHTML = hangman.numberGuessesRemaining;
document.querySelector("#lettersGuessedOutput").innerHTML = hangman.listLettersGuessed;

document.onkeyup = function(event) {
    // Make Word Lower Case
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

    // Get Current Guessed Word
    currentGuessedWordDisplay = hangman.searchWord(userGuess);
    if (currentGuessedWordDisplay.indexOf('$') !== -1) {
        holder = currentGuessedWordDisplay.replace(/\s/g,'');
        currentGuessedWordDisplay = currentGuessedWordDisplay.replace('$', '&nbsp;');
        currentGuessedWord = holder.replace('$', ' ');
    } else {
        currentGuessedWord = currentGuessedWordDisplay.replace(/\s/g,'');
    }

    // Check if word guessed correctly
    if (currentGuessedWord === hangman.currentWord) {
        console.log(hangman.successText);
        hangman.numberWin++;
        hangman.resetGame();
    } 

    // Check if word guess failed and guesses remaining is 0
    if (currentGuessedWord !== hangman.currentWord && hangman.numberGuessesRemaining === 0) {
        console.log(hangman.failText);
        hangman.numberLoss++;
        hangman.resetGame();
    }

    // Output results to html
    document.querySelector("#winsOutput").innerHTML = hangman.numberWin;
    document.querySelector("#lossesOutput").innerHTML = hangman.numberLoss;
    document.querySelector("#currentWordOutput").innerHTML = currentGuessedWordDisplay;
    document.querySelector("#guessesRemainingOutput").innerHTML = hangman.numberGuessesRemaining;
    document.querySelector("#lettersGuessedOutput").innerHTML = hangman.listLettersGuessed;

}

// Photo for Guessed Output
// Optional Sound for Guessed Output
